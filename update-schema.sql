-- =======================================================
-- SmartKids Toys - Supabase Schema Migration v2.0
-- Run this in Supabase SQL Editor to support new features:
-- 1. Product Categorization (Age Range, Educational Skill, Badge)
-- 2. Scrolling Announcement Bar Messages
-- 3. Dynamic Flash Sale Countdown Timer
-- =======================================================

-- 1. Add categorization columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS age_range TEXT DEFAULT '3–5 Years';
ALTER TABLE products ADD COLUMN IF NOT EXISTS educational_skill TEXT DEFAULT 'General Fun';
ALTER TABLE products ADD COLUMN IF NOT EXISTS badge TEXT DEFAULT '🔥 Best Seller';

-- 2. Insert new site settings if not already present
INSERT INTO site_settings (key, value, label, group_name) VALUES
  ('announcement_messages', '🚚 Free Shipping on orders above PKR 3,000 🚀 | ⚡ Flash Sale — Up to 40% OFF selected toys! | 🎁 Fast Delivery across Pakistan in 2–4 days | 📞 Order via WhatsApp: 03098444501 | ✨ New arrivals added every week — Shop now!', 'Scrolling Announcement Bar Messages (separated by |)', 'general'),
  ('flash_sale_end_date', (NOW() + INTERVAL '3 days')::TEXT, 'Flash Sale End Date (ISO string)', 'promotions')
ON CONFLICT (key) DO NOTHING;
