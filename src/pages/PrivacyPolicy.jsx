import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <ShieldCheck size={32} color="var(--primary-blue)" />
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Privacy Policy</h1>
        </div>

        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.92rem' }}>
          Last updated: September 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text)', lineHeight: '1.7', fontSize: '0.95rem' }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>1. Introduction</h2>
            <p>SmartKids Toys values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you browse our toy store, create an account, or order through WhatsApp.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>2. Information We Collect</h2>
            <p>We only collect information necessary to fulfill your orders and offer customer support:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
              <li>Full Name and Delivery Address in Pakistan</li>
              <li>Phone Number / WhatsApp Contact Number</li>
              <li>Email address for account authentication</li>
              <li>Order history and toy preferences</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>3. Direct WhatsApp Orders</h2>
            <p>Orders placed via WhatsApp are processed directly between you and our verified team at <strong>03098444501</strong>. We do not store sensitive credit card or bank credentials.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>4. Contact Us</h2>
            <p>If you have questions regarding your personal data, please contact us at <a href="mailto:info@smartkidstoys.pk" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>info@smartkidstoys.pk</a> or WhatsApp <strong>03098444501</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
