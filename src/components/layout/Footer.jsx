import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  return (
    <div>
      {/* Scalloped Decorative Divider */}
      <div className="scalloped-divider"></div>

      <footer className="demo-footer">
        <div className="container">
          <div className="demo-footer-grid">
            {/* 1. Brand Info */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <img
                  src="/assets/logo.png"
                  alt="SmartKids Toys"
                  style={{ height: '62px', objectFit: 'contain' }}
                />
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '280px' }}>
                SmartKids Toys brings joy, learning and creativity to your kids with our wide range of safe, non-toxic and fun toys.
              </p>
            </div>

            {/* 2. Shop Links */}
            <div>
              <h4 className="footer-column-title">Shop</h4>
              <ul className="footer-links-list">
                <li><Link to="/shop">All Toys</Link></li>
                <li><Link to="/new-arrivals">New Arrivals</Link></li>
                <li><Link to="/best-sellers">Best Sellers</Link></li>
                <li><Link to="/deals">Special Deals</Link></li>
                <li><Link to="/categories">Categories</Link></li>
              </ul>
            </div>

            {/* 3. Help Links */}
            <div>
              <h4 className="footer-column-title">Help & Support</h4>
              <ul className="footer-links-list">
                <li><Link to="/contact">FAQs</Link></li>
                <li><Link to="/shipping-delivery">Shipping & Delivery</Link></li>
                <li><Link to="/returns-refunds">Returns & Refunds</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/sitemap">Site Map</Link></li>
              </ul>
            </div>

            {/* 4. About Us */}
            <div>
              <h4 className="footer-column-title">About Us</h4>
              <ul className="footer-links-list">
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/about">Careers</Link></li>
              </ul>
            </div>

            {/* 5. Stay Connected & Newsletter */}
            <div>
              <h4 className="footer-column-title">Stay Connected</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>

              <form onSubmit={handleSubscribe} className="demo-subscribe-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="demo-subscribe-input"
                />
                <button type="submit" className="btn-subscribe" style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)' }}>
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>

              {/* Real SVG Social Icons */}
              <div className="footer-social-icons" style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>

                {/* YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>

                {/* TikTok */}
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" title="TikTok" style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/923098444501" target="_blank" rel="noreferrer" title="WhatsApp" style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom: WhatsApp Checkout Trust Guarantee */}
          <div className="demo-footer-bottom">
            <div>
              © {new Date().getFullYear()} SmartKids Toys. All rights reserved.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: 800, fontSize: '0.84rem' }}>
              <ShieldCheck size={18} />
              <span>100% Verified WhatsApp Orders & Cash on Delivery across Pakistan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
