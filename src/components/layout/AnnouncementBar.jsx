import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, HelpCircle, Package } from 'lucide-react';
import { settingsService, DEFAULT_SETTINGS } from '../../services/settingsService';

export default function AnnouncementBar() {
  const [messages, setMessages] = useState([
    '🚚 Free Shipping on orders above PKR 3,000 🚀',
    '⚡ Flash Sale — Up to 40% OFF selected toys!',
    '🎁 Fast Delivery across Pakistan in 2–4 days',
    '📞 Order via WhatsApp: 03098444501',
    '✨ New arrivals added every week — Shop now!'
  ]);

  useEffect(() => {
    settingsService.getSettings().then(s => {
      const raw = s?.announcement_messages || DEFAULT_SETTINGS.announcement_messages || '';
      if (raw) {
        const parsed = raw.split('|').map(m => m.trim()).filter(Boolean);
        if (parsed.length > 0) setMessages(parsed);
      }
    }).catch(() => {});
  }, []);

  // Duplicate messages so the loop is seamless
  const ticker = [...messages, ...messages];

  return (
    <aside
      className="announcement-bar-shopify"
      aria-label="Store announcements"
    >
      {/* ── Scrolling Ticker ── */}
      <div className="announcement-ticker-wrap">
        <div
          className="announcement-ticker-track"
          style={{ '--msg-count': messages.length }}
        >
          {ticker.map((msg, i) => (
            <span key={i} className="announcement-ticker-item">
              {msg}
              <span className="announcement-dot" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Right Utility Links (fixed, not scrolling) ── */}
      <div className="announcement-bar-links">
        <a href="tel:03098444501" className="ann-link">
          <PhoneCall size={13} />
          <span>03098444501</span>
        </a>
        <Link to="/contact" className="ann-link">
          <HelpCircle size={13} />
          <span>Help</span>
        </Link>
        <Link to="/account" className="ann-link">
          <Package size={13} />
          <span>Track Order</span>
        </Link>
      </div>
    </aside>
  );
}
