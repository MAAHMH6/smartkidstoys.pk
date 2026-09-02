import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { User, Package, MapPin, LogOut, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';

export default function Account() {
  const { user, profile, isAdmin, logout, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        fullName: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || ''
      });

      orderService.getCustomerOrders(profile.id).then((data) => {
        setOrders(data);
        setLoadingOrders(false);
      });
    }
  }, [profile]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        full_name: profileForm.fullName,
        phone: profileForm.phone,
        address: profileForm.address,
        city: profileForm.city
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      alert('Error updating profile: ' + e.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (authLoading || !profile) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Loading your account...</p>
      </div>
    );
  }

  const isUserAdmin = isAdmin || profile.is_admin === true || user?.email?.toLowerCase() === 'admin@smartkidstoys.pk';

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      
      {/* Admin Quick Notification Banner */}
      {isUserAdmin && (
        <div style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '20px 28px', borderRadius: 'var(--radius-xl)', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={26} color="white" />
            </div>
            <div>
              <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 900, margin: 0 }}>Administrator Control Panel</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.88rem', margin: 0 }}>
                Manage store products, orders, WhatsApp customer inquiries, and settings.
              </p>
            </div>
          </div>
          <Link
            to="/admin"
            className="btn"
            style={{ background: '#F59E0B', color: 'white', padding: '10px 22px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Open Admin Dashboard</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      <div style={{ marginBottom: '32px' }}>
        <h1 className="section-title-text" style={{ fontSize: '2rem', marginBottom: '6px' }}>My Account</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Welcome, <strong>{profile.full_name || 'Admin'}</strong> ({profile.customer_number || 'SKT-ADM-0001'})
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Navigation Sidebar */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '28px 24px', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--gray-2)', marginBottom: '20px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: isUserAdmin ? '#FEF3C7' : '#EFF6FF', color: isUserAdmin ? '#D97706' : 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, margin: '0 auto 12px', border: '2px solid white', boxShadow: 'var(--shadow-sm)' }}>
              {(profile.full_name || 'A').charAt(0).toUpperCase()}
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--dark-heading)' }}>{profile.full_name || 'Admin'}</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{user.email}</div>
            <div style={{ marginTop: '10px' }}>
              <span style={{ background: isUserAdmin ? '#FEF3C7' : '#EFF6FF', color: isUserAdmin ? '#D97706' : '#0284C7', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
                {isUserAdmin ? '🛡️ Administrator' : (profile.customer_number || 'Customer')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Admin Direct Button */}
            {isUserAdmin && (
              <Link
                to="/admin"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #0284C7, #0369A1)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  marginBottom: '6px'
                }}
              >
                <ShieldAlert size={18} />
                <span>Admin Dashboard</span>
                <ExternalLink size={14} style={{ marginLeft: 'auto' }} />
              </Link>
            )}

            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'orders' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'orders' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 700,
                textAlign: 'left',
                width: '100%',
                fontSize: '0.92rem'
              }}
            >
              <Package size={18} /> My Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'profile' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'profile' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 700,
                textAlign: 'left',
                width: '100%',
                fontSize: '0.92rem'
              }}
            >
              <User size={18} /> Profile Details
            </button>

            <button
              onClick={() => setActiveTab('address')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'address' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'address' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 700,
                textAlign: 'left',
                width: '100%',
                fontSize: '0.92rem'
              }}
            >
              <MapPin size={18} /> Saved Address
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: 'var(--accent-red)',
                fontWeight: 700,
                textAlign: 'left',
                width: '100%',
                marginTop: '16px',
                borderTop: '1px solid var(--gray-2)',
                fontSize: '0.92rem'
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div>
          {/* Tab 1: Orders History */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>Your WhatsApp Orders</h2>
              {loadingOrders ? (
                <p style={{ color: 'var(--text-muted)' }}>Loading orders...</p>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', padding: '24px', marginBottom: '16px', boxShadow: 'var(--shadow-card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--gray-2)', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--dark-heading)' }}>
                          Order #{order.order_number}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Placed on: {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <span style={{ background: order.status === 'delivered' ? '#DCFCE7' : '#EFF6FF', color: order.status === 'delivered' ? '#16A34A' : '#0284C7', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'capitalize' }}>
                        {order.status || 'Pending Confirmation'}
                      </span>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      {order.order_items?.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.92rem' }}>
                          <span>{item.product_name} × {item.quantity}</span>
                          <span style={{ fontWeight: 700 }}>PKR {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--gray-2)' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Delivery to: {order.city}</span>
                      <div style={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--dark-heading)' }}>
                        Total: PKR {Number(order.total).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ background: 'white', padding: '60px 20px', textAlign: 'center', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📦</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>No Orders Found</h3>
                  <p style={{ color: 'var(--text-muted)', margin: '8px 0 24px', fontSize: '0.92rem' }}>You haven't placed any orders with this account yet.</p>
                  <Link to="/shop" className="btn-hero-shop" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                    Explore Toys
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Profile Form */}
          {activeTab === 'profile' && (
            <div style={{ background: 'white', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>Personal Profile</h2>

              {saveSuccess && (
                <div style={{ background: '#DCFCE7', color: '#16A34A', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700 }}>
                  <CheckCircle2 size={18} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>City</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Default Delivery Address</label>
                  <textarea
                    rows={3}
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '12px 28px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.95rem', alignSelf: 'flex-start' }}
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Saved Address */}
          {activeTab === 'address' && (
            <div style={{ background: 'white', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>Saved Delivery Address</h2>
              {profile.address ? (
                <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-2)' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', marginBottom: '6px' }}>{profile.full_name}</div>
                  <div style={{ color: 'var(--text)', marginBottom: '6px', fontSize: '0.95rem' }}>{profile.address}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>City: {profile.city || 'Not specified'} | Phone: {profile.phone || 'N/A'}</div>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No default address saved yet. Update your address in the Profile tab.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
