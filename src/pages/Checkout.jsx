import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { settingsService } from '../services/settingsService';
import confetti from 'canvas-confetti';
import { MessageCircle, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Mardan',
  'Gujrat'
];

export default function Checkout() {
  const { cartItems, totalCount, subtotal, clearCart } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lahore',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState('923098444501');

  useEffect(() => {
    settingsService.getSettings().then((s) => {
      if (s.whatsapp_number) setWhatsappNumber(s.whatsapp_number);
    });

    if (profile) {
      const parts = (profile.full_name || '').split(' ');
      setFormData((prev) => ({
        ...prev,
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || 'Lahore'
      }));
    }
  }, [profile]);

  if (cartItems.length === 0 && !orderCompleted) {
    navigate('/bag');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppCheckout = async (e) => {
    e.preventDefault();

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    if (!fullName) {
      alert('Please enter your full name');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your WhatsApp phone number');
      return;
    }
    if (!formData.address.trim()) {
      alert('Please enter your complete delivery address');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create order in Supabase
      const order = await orderService.createOrder({
        customerName: fullName,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city,
        items: cartItems,
        total: subtotal,
        customerId: profile?.id || null
      });

      // 2. Format WhatsApp message
      const productLines = cartItems
        .map((item, index) => `${index + 1}. ${item.name} × ${item.qty}\n   PKR ${Number(item.price).toLocaleString()} each`)
        .join('\n\n');

      const message = `Hello SmartKids Toys! 🧸\n\nI would like to place an order.\n\n*Order Number:* ${order.order_number}\n*Customer Name:* ${fullName}\n${profile?.customer_number ? `*Customer ID:* ${profile.customer_number}\n` : ''}*Phone:* ${formData.phone.trim()}\n\n*Products:*\n${productLines}\n\n*Estimated Total:* PKR ${subtotal.toLocaleString()}\n\n*Delivery Address:*\n${formData.address.trim()}\n\n*City:*\n${formData.city}${formData.notes ? `\n\n*Order Notes:*\n${formData.notes}` : ''}\n\nPlease confirm availability and total with shipping. Thank you!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;

      // 3. Fire celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore confetti errors
      }

      setOrderCompleted(order);
      clearCart();

      // 4. Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while creating your order record, but we will still redirect you to WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderCompleted) {
    return (
      <div className="container woocommerce-order" style={{ padding: '80px 20px', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ background: 'white', padding: '48px 32px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--gray-2)' }}>
          <CheckCircle2 size={60} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px' }}>Thank you. Your order has been received.</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Order number: <strong style={{ color: 'var(--dark-heading)' }}>#{orderCompleted.order_number}</strong>
          </p>
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp btn-full"
            style={{ padding: '14px', marginBottom: '14px', display: 'inline-flex', justifyContent: 'center' }}
          >
            <MessageCircle size={20} /> Open WhatsApp to Confirm
          </a>
          <Link to="/" className="view-all-btn" style={{ justifyContent: 'center', width: '100%' }}>
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container woocommerce-checkout woocommerce-page" style={{ padding: '32px 20px 80px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/bag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>
          <ArrowLeft size={14} /> Back to Shopping Bag
        </Link>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 900 }}>Checkout</h1>
      </div>

      <form onSubmit={handleWhatsAppCheckout} className="checkout woocommerce-checkout">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Left: WooCommerce Billing Fields */}
          <div className="woocommerce-billing-fields" style={{ background: 'white', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '20px' }}>
              Billing & Delivery Details
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>First name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ali"
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Last name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="e.g. Khan"
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Phone / WhatsApp *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="03XX XXXXXXX"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Town / City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)', background: 'white' }}
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Street address *</label>
              <textarea
                name="address"
                required
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House number and street name, sector / area..."
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
              />
            </div>

            <div style={{ marginBottom: '6px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Order notes (optional)</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Notes about your order, e.g. special delivery instructions."
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>

          {/* Right: WooCommerce Order Review */}
          <div id="order_review" className="woocommerce-checkout-review-order">
            <div style={{ background: 'white', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '16px' }}>Your order</h2>

              <div style={{ borderBottom: '1px solid var(--gray-2)', paddingBottom: '12px', marginBottom: '12px' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.88rem' }}>
                    <span>{item.name} <strong style={{ color: 'var(--text-muted)' }}>× {item.qty}</strong></span>
                    <span style={{ fontWeight: 800 }}>PKR {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: 800 }}>PKR {subtotal.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 800 }}>Free Delivery</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 20px', borderTop: '1px solid var(--gray-2)', marginTop: '8px', fontSize: '1.2rem', fontWeight: 900 }}>
                <span>Total</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-whatsapp btn-full"
                style={{ padding: '14px', fontSize: '0.98rem' }}
              >
                <MessageCircle size={20} />
                <span>{isSubmitting ? 'Submitting Order...' : 'Place Order via WhatsApp'}</span>
              </button>

              <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Your order is processed directly via WhatsApp without card requirements.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
