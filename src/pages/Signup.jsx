import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      await signup({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password
      });
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '50px 20px', maxWidth: '500px' }}>
      <div style={{ background: 'white', padding: '40px 32px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--gray-2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="/assets/logo.png"
            alt="SmartKids Toys"
            style={{ height: '64px', margin: '0 auto 14px', objectFit: 'contain' }}
          />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px', color: 'var(--dark-heading)' }}>
            Create Your Account 🎉
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Get your unique Customer ID and easily track your orders.
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Full Name *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Mohammed Ali"
                style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
              />
              <User size={18} color="var(--gray-4)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>WhatsApp Phone Number *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03XX XXXXXXX"
                style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
              />
              <Phone size={18} color="var(--gray-4)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Email Address *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
              />
              <Mail size={18} color="var(--gray-4)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 chars"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Confirm *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0 8px' }}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--primary-blue)' }}
            />
            <label htmlFor="terms" style={{ fontSize: '0.85rem', color: 'var(--text)', cursor: 'pointer' }}>
              I agree to the <Link to="/terms" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>Terms & Conditions</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, #EF4444, #F59E0B)', color: 'white', fontWeight: 800, fontSize: '0.98rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: 800 }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
