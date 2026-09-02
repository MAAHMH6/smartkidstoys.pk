import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle
} from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const formattedMessage = `Hello SmartKids Toys! 👋\n\n*Subject:* ${formData.subject}\n*Name:* ${formData.name.trim()}\n*Phone:* ${formData.phone.trim() || 'N/A'}\n\n*Message:*\n${formData.message.trim()}`;

    const encoded = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/923098444501?text=${encoded}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container" style={{ padding: '36px 20px 80px' }}>
      {/* 1. Header */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 900, marginBottom: '12px', color: 'var(--dark-heading)' }}>
          Contact & Support
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          We are here to help! Reach out to us via WhatsApp, direct phone call, or send an inquiry below.
        </p>
      </div>

      {/* 2. Top Contact Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        {/* WhatsApp & Call */}
        <div style={{ background: 'white', padding: '28px 24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <MessageCircle size={28} />
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '6px' }}>WhatsApp & Call</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Fastest way to get in touch or order</p>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--dark-heading)', marginBottom: '18px', fontFamily: 'var(--font-heading)' }}>
            03098444501
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
            <a
              href="https://wa.me/923098444501?text=Hello%20SmartKids%20Toys!%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.88rem' }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <a
              href="tel:03098444501"
              className="btn"
              style={{ width: '100%', padding: '10px 16px', background: '#0284C7', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Phone size={16} /> Direct Call
            </a>
          </div>
        </div>

        {/* Email */}
        <div style={{ background: 'white', padding: '28px 24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EFF6FF', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Mail size={28} />
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '6px' }}>Email Support</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>For corporate or order inquiries</p>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--dark-heading)', marginBottom: '18px' }}>
            info@smartkidstoys.pk
          </div>
          <div style={{ marginTop: 'auto' }}>
            <a
              href="mailto:info@smartkidstoys.pk"
              className="btn"
              style={{ width: '100%', padding: '10px 16px', background: 'var(--gray-1)', color: 'var(--dark)', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Mail size={16} /> Send Email
            </a>
          </div>
        </div>

        {/* Nationwide Delivery */}
        <div style={{ background: 'white', padding: '28px 24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <MapPin size={28} />
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '6px' }}>Delivery Coverage</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Prompt courier delivery to:</p>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--dark-heading)', lineHeight: '1.5' }}>
            Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan & all cities.
          </div>
        </div>

        {/* Operating Hours */}
        <div style={{ background: 'white', padding: '28px 24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F3E8FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Clock size={28} />
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '6px' }}>Working Hours</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Customer service available:</p>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
            Monday – Sunday
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            9:00 AM – 10:00 PM
          </div>
        </div>
      </div>

      {/* 3. Interactive Contact Form & FAQ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', alignItems: 'start' }}>
        {/* Contact Form */}
        <div style={{ background: 'white', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px' }}>Send Us a Message</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Fill in the form below and we will automatically connect you on WhatsApp.
          </p>

          {submitted && (
            <div style={{ background: '#DCFCE7', color: '#16A34A', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700 }}>
              <CheckCircle2 size={18} />
              <span>Opening WhatsApp with your inquiry...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Usman Ali"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone / WhatsApp Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="03XX XXXXXXX"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)', background: 'white' }}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Tracking">Order Tracking</option>
                <option value="Toy Recommendation">Toy Recommendation</option>
                <option value="Bulk / School Orders">Bulk / School Orders</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Your Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you today?"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
              />
            </div>

            <button type="submit" className="btn btn-whatsapp btn-full" style={{ padding: '14px', fontSize: '0.98rem' }}>
              <Send size={18} /> Send Inquiry via WhatsApp
            </button>
          </form>
        </div>

        {/* FAQs */}
        <div style={{ background: '#F8FAFC', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={22} color="var(--primary-blue)" /> Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-2)' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '6px' }}>How do I place an order?</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Simply add toys to your bag, proceed to checkout, enter your delivery address, and click "Order via WhatsApp". Your complete order details will be sent directly to <strong>03098444501</strong> for confirmation.
              </p>
            </div>

            <div style={{ background: 'white', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-2)' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '6px' }}>How long does delivery take?</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Deliveries typically take 2 to 4 business days for major cities (Lahore, Karachi, Islamabad, etc.) and 3 to 5 business days for other towns across Pakistan.
              </p>
            </div>

            <div style={{ background: 'white', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-2)' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '6px' }}>Are the toys safe for small children?</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Yes! All SmartKids Toys are manufactured with 100% child-safe, non-toxic, and durable materials with smooth rounded edges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
