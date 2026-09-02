import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '460px' }}>
      <div style={{ background: 'white', padding: '40px 32px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--gray-2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="/assets/logo.png"
            alt="SmartKids Toys"
            style={{ height: '64px', margin: '0 auto 14px', objectFit: 'contain' }}
          />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px', color: 'var(--dark-heading)' }}>
            Welcome Back! 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Login to manage your account and track your orders.
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-heading)' }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white', outline: 'none' }}
              />
              <Mail size={18} color="var(--gray-4)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark-heading)' }}>Password *</label>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 700 }}>Min 6 characters</span>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white', outline: 'none' }}
              />
              <Lock size={18} color="var(--gray-4)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn"
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', fontWeight: 800, fontSize: '0.98rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Don't have an account yet?{' '}
          <Link to="/signup" style={{ color: '#EF4444', fontWeight: 800 }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
