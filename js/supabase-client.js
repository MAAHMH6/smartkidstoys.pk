// ============================================
// SMARTKIDS TOYS — Supabase Client
// ============================================
// Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project credentials from:
// https://supabase.com → Project Settings → API

const SUPABASE_URL = 'https://vbhtsoqhaymguhetxnmo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiaHRzb3FoYXltZ3VoZXR4bm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTAzNDQsImV4cCI6MjEwMzQ4NjM0NH0.XHOhrL6AEErHJlWeIxkJUSSBUA9-1zyf2ekc2fbs3hA';

// Initialize Supabase client
const { createClient } = supabase;
const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// SUPABASE SETUP SQL (run once in SQL Editor)
// ============================================
/*

-- 1. Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  customer_number TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-create profile on signup + assign customer number
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  cust_count INT;
  cust_num TEXT;
BEGIN
  SELECT COUNT(*) + 1 INTO cust_count FROM profiles WHERE is_admin = FALSE;
  cust_num := 'SKT-CUS-' || LPAD(cust_count::TEXT, 4, '0');
  INSERT INTO profiles (id, full_name, customer_number, is_admin)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    cust_num,
    COALESCE((NEW.raw_user_meta_data->>'is_admin')::BOOLEAN, FALSE)
  );
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. Products
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  old_price NUMERIC(10,2),
  category TEXT NOT NULL,
  stock INT DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 4.5,
  rating_count INT DEFAULT 0,
  is_new BOOLEAN DEFAULT FALSE,
  is_deal BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES profiles(id),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  subtotal NUMERIC(10,2),
  total NUMERIC(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto order number function
CREATE SEQUENCE order_seq START 1;
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  seq_val INT;
BEGIN
  seq_val := nextval('order_seq');
  RETURN 'SKT-ORD-' || LPAD(seq_val::TEXT, 4, '0');
END;
$$;

-- 4. Order Items
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Site Settings
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  label TEXT,
  group_name TEXT DEFAULT 'general',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default settings
INSERT INTO site_settings (key, value, label, group_name) VALUES
  ('whatsapp_number', '923098444501', 'WhatsApp Number (with country code)', 'contact'),
  ('whatsapp_display', '03098444501', 'WhatsApp Display Number', 'contact'),
  ('contact_email', 'info@smartkidstoys.pk', 'Contact Email', 'contact'),
  ('facebook_url', 'https://facebook.com/smartkidstoys', 'Facebook URL', 'social'),
  ('instagram_url', 'https://instagram.com/smartkidstoys', 'Instagram URL', 'social'),
  ('tiktok_url', 'https://tiktok.com/@smartkidstoys', 'TikTok URL', 'social'),
  ('youtube_url', '', 'YouTube URL', 'social'),
  ('delivery_note', 'Calculated on WhatsApp', 'Delivery Note', 'shipping'),
  ('free_delivery_threshold', '3000', 'Free Delivery Above (PKR)', 'shipping'),
  ('site_announcement', 'Free Shipping on orders above PKR 3,000 🚀', 'Announcement Bar Text', 'general');

-- RLS Policies (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Products: public read
CREATE POLICY "products_public_read" ON products FOR SELECT USING (true);
CREATE POLICY "products_admin_write" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Profiles: own read, admin all
CREATE POLICY "profiles_own" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "profiles_admin" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Orders: own + admin
CREATE POLICY "orders_own" ON orders FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "orders_insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_admin" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Order Items: admin all
CREATE POLICY "order_items_admin" ON order_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "order_items_insert" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "order_items_select" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND customer_id = auth.uid())
);

-- Settings: public read, admin write
CREATE POLICY "settings_public_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_write" ON site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 6. Seed products
INSERT INTO products (name, description, price, old_price, category, stock, rating, rating_count, is_new, is_deal, image_url) VALUES
('Cute Teddy Bear', 'Super soft and cuddly plush teddy bear. Perfect companion for kids.', 1750, 2500, 'Soft Toys', 45, 4.8, 128, false, true, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'),
('Colorful Building Blocks Set', 'Fun educational building set for kids ages 3+. 50 pieces.', 1499, 1999, 'Building Blocks', 30, 4.7, 86, false, true, 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400'),
('Remote Control Car', 'High-speed RC car with 2.4GHz remote. Rechargeable battery.', 2799, 3299, 'Vehicles', 20, 4.6, 64, true, false, 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400'),
('Puzzle Fun 100 Pieces', 'Colorful 100-piece jigsaw puzzle for children. Beautiful animal theme.', 899, null, 'Puzzles', 60, 4.5, 95, false, false, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400'),
('Rainbow Stacker', 'Classic wooden rainbow stacker toy. Develops motor skills.', 1299, 1699, 'Educational', 35, 4.9, 77, false, true, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400'),
('Blue Toy Train Set', 'Complete railway set with locomotive, carriages and track pieces.', 2199, null, 'Vehicles', 25, 4.7, 52, true, false, 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400'),
('Alphabet Learning Board', 'Interactive alphabet board with sounds. Great for toddlers.', 1150, 1450, 'Educational', 40, 4.6, 43, true, false, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'),
('Outdoor Cricket Set', 'Complete junior cricket set with bat, ball, stumps and bails.', 1899, null, 'Outdoor', 18, 4.4, 31, false, false, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400'),
('Baby Rattle Set', 'Colorful BPA-free baby rattle set. 4 pieces. 0+ months.', 650, null, 'Baby Toys', 80, 4.8, 112, false, false, 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400'),
('Magnetic Drawing Board', 'Mess-free magnetic drawing board. Easy erase. Great for travel.', 1350, 1750, 'Educational', 28, 4.5, 67, false, true, 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400'),
('Plush Bunny Rabbit', 'Adorable soft plush bunny rabbit. Machine washable. 35cm.', 1200, 1599, 'Soft Toys', 55, 4.7, 89, true, false, 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=400'),
('Foam Building Set', 'Soft colorful foam building blocks. Safe for babies and toddlers.', 850, null, 'Building Blocks', 42, 4.3, 38, false, false, 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400'),
('Toy Kitchen Set', 'Complete toy kitchen playset with accessories. 32 pieces.', 3299, 3999, 'Educational', 15, 4.8, 56, true, true, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400'),
('Water Squirt Guns', 'Set of 4 water squirt guns. Perfect for summer outdoor play.', 599, null, 'Outdoor', 100, 4.2, 144, false, false, 'https://images.unsplash.com/photo-1551737823-dfc8ebf9ce71?w=400'),
('3D Wooden Puzzle', 'Beautiful 3D wooden puzzle. Butterfly design. 45 pieces.', 1099, 1399, 'Puzzles', 22, 4.6, 29, true, false, 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400'),
('Dinosaur Action Figures', 'Set of 6 realistic dinosaur figures. Educational and fun.', 1450, null, 'Educational', 38, 4.5, 73, false, false, 'https://images.unsplash.com/photo-1548197047-3dcdb0fef0a4?w=400'),
('Stuffed Elephant', 'Large grey stuffed elephant with smiley face. 40cm tall.', 1850, 2299, 'Soft Toys', 20, 4.9, 45, false, true, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400'),
('Sand Play Set', 'Complete beach sand play set. Molds, shovels and rake. 8 pieces.', 799, null, 'Outdoor', 50, 4.3, 61, false, false, 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'),
('Musical Toy Piano', 'Mini 8-key piano with songs and recording. USB chargeable.', 1699, 2199, 'Educational', 30, 4.6, 82, true, true, 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400'),
('Toy Doctor Set', 'Fun pretend play doctor kit. 12 accessories in a carry case.', 1250, null, 'Educational', 33, 4.4, 55, true, false, 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400');

-- Create admin user (run after creating admin@smartkidstoys.pk in Auth)
-- UPDATE profiles SET is_admin = true WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'admin@smartkidstoys.pk'
-- );

*/

// Export helpers
window.supa = supa;
