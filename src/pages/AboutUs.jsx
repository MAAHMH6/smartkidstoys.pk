import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  Smile, 
  Truck, 
  Sparkles, 
  Award, 
  Phone, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="container" style={{ padding: '36px 20px 80px' }}>
      {/* 1. Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--primary-blue)', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.84rem', marginBottom: '16px' }}>
          <Sparkles size={16} /> Our Story & Mission
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '16px', color: 'var(--dark-heading)' }}>
          Bringing Joy, Learning & Creativity to Kids Across Pakistan
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          At <strong>SmartKids Toys</strong>, we believe playtime is more than just fun — it is how young minds discover, imagine, create, and grow into confident individuals.
        </p>
      </div>

      {/* 2. Visual Brand Story Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '60px' }}>
        <div style={{ background: 'white', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#EFF6FF', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Award size={26} />
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '12px' }}>Our Mission</h2>
          <p style={{ color: 'var(--text)', lineHeight: '1.7', fontSize: '0.94rem' }}>
            To make high-quality, safe, and brain-stimulating educational toys accessible to every family in Pakistan at affordable prices, paired with seamless WhatsApp ordering.
          </p>
        </div>

        <div style={{ background: 'white', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <ShieldCheck size={26} />
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '12px' }}>100% Child-Safe Quality</h2>
          <p style={{ color: 'var(--text)', lineHeight: '1.7', fontSize: '0.94rem' }}>
            Your child’s safety is our top priority. Every plush toy, building block set, and puzzle is inspected for non-toxic materials, smooth rounded edges, and durable craftsmanship.
          </p>
        </div>

        <div style={{ background: 'white', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Smile size={26} />
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '12px' }}>Personal Customer Care</h2>
          <p style={{ color: 'var(--text)', lineHeight: '1.7', fontSize: '0.94rem' }}>
            We provide direct, 1-on-1 human support over WhatsApp and phone. From age recommendations to tracking your parcel, we are just a message away.
          </p>
        </div>
      </div>

      {/* 3. Why Choose Us Grid */}
      <div style={{ background: '#F8FAFC', padding: '48px 36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px' }}>What Sets SmartKids Toys Apart?</h2>
          <p style={{ color: 'var(--text-muted)' }}>Here is why thousands of parents trust us for their children's toys.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚚</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Fast Pakistan Delivery</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Prompt courier dispatch to Lahore, Karachi, Islamabad, Rawalpindi, and every city.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🧸</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Curated Collection</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>From cuddly plush teddy bears to STEM educational sets and RC vehicles.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💬</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Direct WhatsApp Ordering</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Easy order confirmation on 03098444501 without complex card forms.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏷️</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Honest Prices</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Affordable pricing with frequent deals and free shipping on orders above PKR 3,000.</p>
          </div>
        </div>
      </div>

      {/* 4. Contact & Support Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '48px 40px', borderRadius: 'var(--radius-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '28px' }}>
        <div>
          <h2 style={{ color: 'white', fontSize: '1.7rem', fontWeight: 900, marginBottom: '8px' }}>
            Have a question or need toy recommendations?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', maxWidth: '520px' }}>
            Give us a call or chat with us on WhatsApp at <strong>03098444501</strong>. Our friendly team is ready to assist you!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/923098444501?text=Hello%20SmartKids%20Toys!%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>

          <a
            href="tel:03098444501"
            className="btn"
            style={{ background: 'white', color: '#0369A1', padding: '12px 24px', fontSize: '0.95rem', fontWeight: 800, borderRadius: 'var(--radius-md)' }}
          >
            <Phone size={18} /> Call 03098444501
          </a>
        </div>
      </div>
    </div>
  );
}
