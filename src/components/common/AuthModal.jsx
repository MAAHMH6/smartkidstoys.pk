import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { X, Lock, Mail, User, Phone, Sparkles, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, pendingCartItem } = useCart();
  const { login, signup } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        if (!fullName.trim()) throw new Error('Please enter your full name');
        if (!phone.trim()) throw new Error('Please enter your WhatsApp phone number');
        if (password.length < 6) throw new Error('Password must be at least 6 characters');
        await signup({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password
        });
      }
      // CartContext effect handles adding pending item and closing modal
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: '440px', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', border: '1px solid var(--gray-2)' }}>
        
        {/* Close Button */}
        <button
          onClick={() => setShowAuthModal(false)}
          style={{ position: 'absolute', top: '18px', right: '18px', background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/assets/logo.png" alt="SmartKids Toys" style={{ height: '52px', margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '6px' }}>
            {mode === 'login' ? 'Sign in to Add to Bag' : 'Create Customer Account'}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {pendingCartItem ? `Sign in to add "${pendingCartItem.product?.name}" to your bag` : 'Please sign in to place WhatsApp orders'}
          </p>
        </div>

        {/* Login / Sign Up Tabs */}
        <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.85rem', background: mode === 'login' ? 'white' : 'transparent', color: mode === 'login' ? '#0284C7' : 'var(--text-muted)', boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none' }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.85rem', background: mode === 'signup' ? 'white' : 'transparent', color: mode === 'signup' ? '#EF4444' : 'var(--text-muted)', boxShadow: mode === 'signup' ? 'var(--shadow-sm)' : 'none' }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="03XX XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>Email Address *</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 'var(--radius-full)',
              background: mode === 'login' ? 'linear-gradient(135deg, #0284C7, #0369A1)' : 'linear-gradient(135deg, #EF4444, #F59E0B)',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.95rem'
            }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In & Add to Bag' : 'Create Account & Add to Bag'}
          </button>
        </form>
      </div>
    </div>
  );
}
