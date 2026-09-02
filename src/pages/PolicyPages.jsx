import React from 'react';
import { Truck, RotateCcw, FileText } from 'lucide-react';

export function Terms() {
  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <FileText size={32} color="var(--primary-blue)" />
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Terms & Conditions</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text)', lineHeight: '1.7', fontSize: '0.95rem' }}>
          <p>Welcome to SmartKids Toys. By accessing our platform or placing an order, you agree to these terms.</p>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Ordering & Payment</h2>
            <p>All orders are confirmed via WhatsApp (<strong>03098444501</strong>) with Cash on Delivery or Advance Bank/Easypaisa transfer as mutually agreed upon.</p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Toy Safety</h2>
            <p>Our toys adhere to non-toxic and child-safe standards. Please review the age recommendation specified on each product page before giving the toy to toddlers.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function ShippingPolicy() {
  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Truck size={32} color="var(--primary-blue)" />
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Shipping & Delivery</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text)', lineHeight: '1.7', fontSize: '0.95rem' }}>
          <p>We deliver toys promptly across Pakistan via leading courier services.</p>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Delivery Timelines</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Major Cities (Karachi, Lahore, Islamabad, Rawalpindi):</strong> 2 to 4 working days.</li>
              <li><strong>Other Cities & Towns:</strong> 3 to 5 working days.</li>
            </ul>
          </section>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Free Shipping</h2>
            <p>Enjoy <strong>Free Delivery</strong> on all orders exceeding <strong>PKR 3,000</strong>!</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function ReturnsPolicy() {
  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <RotateCcw size={32} color="var(--primary-blue)" />
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Returns & Refunds</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text)', lineHeight: '1.7', fontSize: '0.95rem' }}>
          <p>We want you and your child to be 100% happy with every toy.</p>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>14-Day Return & Exchange</h2>
            <p>If a product arrives damaged or defective, notify us on WhatsApp at <strong>03098444501</strong> within 14 days of delivery for a prompt replacement or full refund.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
