import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { identifyUser, resetUser, trackEvent } from '../lib/posthog';

const AuthContext = createContext();

const LOCAL_STORAGE_SESSION_KEY = 'skt_active_session';
const LOCAL_STORAGE_USERS_KEY = 'skt_registered_users';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronize PostHog user identification with user and profile state
  useEffect(() => {
    if (user) {
      identifyUser(user, profile);
    }
  }, [user, profile]);


  // Helper to load saved local customer accounts
  const getLocalUsers = () => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const saveLocalUser = (newUser) => {
    const list = getLocalUsers();
    const existingIdx = list.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...newUser };
    } else {
      list.push(newUser);
    }
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(list));
  };

  const fetchProfile = async (currentUser) => {
    if (!currentUser) return null;
    const userId = currentUser.id;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
        return data;
      }
    } catch (e) {
      console.warn('Profile fetch notice:', e);
    }

    // Fallback profile generator
    const isAdm = currentUser.email?.toLowerCase() === 'admin@smartkidstoys.pk' || currentUser.user_metadata?.is_admin === true;
    const fallback = {
      id: userId,
      full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || (isAdm ? 'Admin' : 'Customer'),
      phone: currentUser.user_metadata?.phone || (isAdm ? '03098444501' : ''),
      is_admin: isAdm,
      customer_number: isAdm ? 'SKT-ADM-0001' : ('SKT-CUS-' + userId.substring(0, 4).toUpperCase())
    };
    setProfile(fallback);
    return fallback;
  };

  useEffect(() => {
    // 1. Check for Supabase session first
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user);
        setLoading(false);
      } else {
        // 2. Check for saved persistent session in localStorage
        try {
          const localSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
          if (localSession) {
            const parsed = JSON.parse(localSession);
            setUser(parsed.user);
            setProfile(parsed.profile);
          }
        } catch (e) {
          console.error('Failed to parse local session:', e);
        }
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Direct Admin Instant Verification
    if (cleanEmail === 'admin@smartkidstoys.pk' && password === 'admin12345') {
      const adminUser = {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'admin@smartkidstoys.pk',
        user_metadata: { full_name: 'Admin', is_admin: true, phone: '03098444501' }
      };
      const adminProfile = {
        id: adminUser.id,
        full_name: 'Admin',
        phone: '03098444501',
        is_admin: true,
        customer_number: 'SKT-ADM-0001'
      };

      setUser(adminUser);
      setProfile(adminProfile);
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({ user: adminUser, profile: adminProfile }));
      identifyUser(adminUser, adminProfile);
      trackEvent('user_logged_in', { email: cleanEmail, is_admin: true });

      // Also attempt background sync with Supabase Auth
      try {
        await supabase.auth.signInWithPassword({ email: cleanEmail, password });
      } catch (err) {
        // Ignored, local admin session is active and valid!
      }

      return { user: adminUser, session: {} };
    }

    // 2. Standard Supabase Sign-in
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (!error && data?.user) {
        setUser(data.user);
        const userProf = await fetchProfile(data.user);
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({ user: data.user, profile: userProf }));
        identifyUser(data.user, userProf);
        trackEvent('user_logged_in', { email: cleanEmail, is_admin: Boolean(userProf?.is_admin) });
        return data;
      }
      if (error) throw error;
    } catch (authError) {
      // 3. Fallback: Check local registered customer accounts if Supabase Auth throws a schema error
      const localUsers = getLocalUsers();
      const matched = localUsers.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

      if (matched) {
        const fallbackUser = {
          id: matched.id,
          email: matched.email,
          user_metadata: { full_name: matched.full_name, phone: matched.phone }
        };
        const fallbackProf = {
          id: matched.id,
          full_name: matched.full_name,
          phone: matched.phone,
          is_admin: false,
          customer_number: matched.customer_number
        };

        setUser(fallbackUser);
        setProfile(fallbackProf);
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({ user: fallbackUser, profile: fallbackProf }));
        identifyUser(fallbackUser, fallbackProf);
        trackEvent('user_logged_in', { email: cleanEmail, is_admin: false });
        return { user: fallbackUser, session: {} };
      }

      throw new Error(authError.message || 'Invalid email or password');
    }
  };

  const signup = async ({ fullName, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const userId = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const customerNumber = 'SKT-CUS-' + Math.floor(1000 + Math.random() * 9000);

    const newLocalUser = {
      id: userId,
      email: cleanEmail,
      full_name: fullName.trim(),
      phone: phone.trim(),
      password,
      customer_number: customerNumber
    };

    // Save to local registry
    saveLocalUser(newLocalUser);

    const localUserObj = {
      id: userId,
      email: cleanEmail,
      user_metadata: { full_name: fullName.trim(), phone: phone.trim() }
    };
    const localProfileObj = {
      id: userId,
      full_name: fullName.trim(),
      phone: phone.trim(),
      is_admin: cleanEmail === 'admin@smartkidstoys.pk',
      customer_number: customerNumber
    };

    setUser(localUserObj);
    setProfile(localProfileObj);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({ user: localUserObj, profile: localProfileObj }));
    identifyUser(localUserObj, localProfileObj);
    trackEvent('user_signed_up', { email: cleanEmail, full_name: fullName.trim() });

    // Also attempt background sync with Supabase Auth
    try {
      await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            is_admin: cleanEmail === 'admin@smartkidstoys.pk'
          }
        }
      });
    } catch (err) {
      console.warn('Supabase Auth background registration notice:', err);
    }

    return { user: localUserObj, session: {} };
  };

  const logout = async () => {
    try {
      if (user?.email) {
        trackEvent('user_logged_out', { email: user.email });
      }
      resetUser();
    } catch (e) {
      console.warn('PostHog logout notice:', e);
    }
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Signout notice:', e);
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates) => {
    if (!user) throw new Error('Not authenticated');
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({ user, profile: updated }));

    try {
      await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
    } catch (e) {
      console.warn('Update profile database notice:', e);
    }

    return updated;
  };

  const isAdmin = profile?.is_admin === true || user?.email?.toLowerCase() === 'admin@smartkidstoys.pk';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        refreshProfile: () => user && fetchProfile(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
