// ============================================
// SMARTKIDS TOYS — Auth Module
// ============================================

const Auth = (() => {
  let currentUser = null;
  let currentProfile = null;

  // ---- State ----
  const getUser = () => currentUser;
  const getProfile = () => currentProfile;
  const isLoggedIn = () => !!currentUser;
  const isAdmin = () => currentProfile?.is_admin === true;

  // ---- Init: restore session ----
  async function init() {
    const { data: { session } } = await supa.auth.getSession();
    if (session?.user) {
      currentUser = session.user;
      await loadProfile(session.user.id);
    }
    supa.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        currentUser = session.user;
        await loadProfile(session.user.id);
      } else {
        currentUser = null;
        currentProfile = null;
      }
      updateHeaderUI();
      if (typeof window.onAuthChange === 'function') window.onAuthChange(event, session);
    });
    updateHeaderUI();
  }

  async function loadProfile(userId) {
    const { data } = await supa.from('profiles').select('*').eq('id', userId).single();
    currentProfile = data;
    return data;
  }

  // ---- Sign Up ----
  async function signUp({ fullName, email, phone, password }) {
    const { data, error } = await supa.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone }
      }
    });
    if (error) throw error;

    // Update phone in profile
    if (data.user) {
      await supa.from('profiles').update({ phone, full_name: fullName }).eq('id', data.user.id);
    }
    return data;
  }

  // ---- Login ----
  async function login({ email, password }) {
    const { data, error } = await supa.auth.signInWithPassword({ email, password });
    if (error) throw error;
    currentUser = data.user;
    await loadProfile(data.user.id);
    return data;
  }

  // ---- Logout ----
  async function logout() {
    await supa.auth.signOut();
    currentUser = null;
    currentProfile = null;
    updateHeaderUI();
  }

  // ---- Update Profile ----
  async function updateProfile({ fullName, phone, address, city }) {
    if (!currentUser) throw new Error('Not logged in');
    const { error } = await supa.from('profiles').update({
      full_name: fullName,
      phone,
      address,
      city
    }).eq('id', currentUser.id);
    if (error) throw error;
    await loadProfile(currentUser.id);
  }

  // ---- Fetch own orders ----
  async function getMyOrders() {
    if (!currentUser) return [];
    const { data, error } = await supa
      .from('orders')
      .select(`*, order_items(*)`)
      .eq('customer_id', currentUser.id)
      .order('created_at', { ascending: false });
    if (error) return [];
    return data;
  }

  // ---- Update header UI based on auth state ----
  function updateHeaderUI() {
    const accountBtn = document.getElementById('header-account-btn');
    const accountLabel = document.getElementById('header-account-label');
    if (!accountBtn) return;
    if (currentUser && currentProfile) {
      const initials = (currentProfile.full_name || 'U').charAt(0).toUpperCase();
      accountLabel.textContent = initials;
      accountBtn.setAttribute('title', currentProfile.full_name || currentUser.email);
      accountBtn.onclick = () => window.navigate('#account');
    } else {
      accountLabel.textContent = '';
      accountBtn.onclick = () => window.navigate('#login');
    }
  }

  return { init, signUp, login, logout, updateProfile, getMyOrders, getUser, getProfile, isLoggedIn, isAdmin, loadProfile };
})();
