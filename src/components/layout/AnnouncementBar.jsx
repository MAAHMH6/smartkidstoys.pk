import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, HelpCircle, Package, PhoneCall } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside className="top-utilities-bar" aria-label="Announcement & Utilities" style={{ padding: '10px 0', borderBottom: '1px solid #E0F2FE' }}>
      <div className="container">
        <div className="top-utilities-content" style={{ minHeight: '26px' }}>
          {/* Left Free Shipping message */}
          <div className="top-utilities-left" style={{ fontSize: '0.88rem', gap: '8px' }}>
            <Truck size={17} color="var(--primary-blue)" />
            <span>
              <strong>Free Shipping</strong> on orders above PKR 3,000 🚀 | Fast Delivery Across Pakistan
            </span>
          </div>

          {/* Right Help & Track Links */}
          <div className="top-utilities-right" style={{ gap: '22px', fontSize: '0.85rem' }}>
            <a href="tel:03098444501" className="top-util-link" style={{ color: 'var(--dark)', fontWeight: 700 }}>
              <PhoneCall size={15} color="var(--primary-blue)" />
              <span>03098444501</span>
            </a>

            <Link to="/contact" className="top-util-link">
              <HelpCircle size={15} />
              <span>Help & Support</span>
            </Link>

            <Link to="/account" className="top-util-link">
              <Package size={15} />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
