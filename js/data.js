// ============================================
// SMARTKIDS TOYS — Data & Cart Module
// ============================================

// ---- CART (localStorage) ----
const Cart = (() => {
  const KEY = 'skt_cart';

  function getItems() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  }
  function saveItems(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateCartBadge();
  }
  function addItem(product, qty = 1) {
    const items = getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 99);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        old_price: product.old_price,
        image_url: product.image_url,
        category: product.category,
        qty
      });
    }
    saveItems(items);
    showToast(`"${product.name}" added to bag! 🛒`, 'success');
  }
  function removeItem(id) {
    saveItems(getItems().filter(i => i.id !== id));
  }
  function updateQty(id, qty) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      if (qty <= 0) { removeItem(id); return; }
      item.qty = Math.min(qty, 99);
      saveItems(items);
    }
  }
  function clearCart() { saveItems([]); }
  function getTotal() { return getItems().reduce((s, i) => s + i.price * i.qty, 0); }
  function getCount() { return getItems().reduce((s, i) => s + i.qty, 0); }

  function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = getCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  return { getItems, addItem, removeItem, updateQty, clearCart, getTotal, getCount, updateCartBadge };
})();

// ---- PRODUCTS (Supabase) ----
const Products = (() => {
  let cache = null;

  async function getAll() {
    if (cache) return cache;
    try {
      const { data, error } = await supa.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      cache = data || [];
      return cache;
    } catch (e) {
      console.warn('Supabase not configured, using fallback data');
      return getFallback();
    }
  }

  async function getById(id) {
    const all = await getAll();
    return all.find(p => p.id === id);
  }

  async function getByCategory(cat) {
    const all = await getAll();
    return cat ? all.filter(p => p.category === cat) : all;
  }

  async function getNew() {
    const all = await getAll();
    return all.filter(p => p.is_new);
  }

  async function getDeals() {
    const all = await getAll();
    return all.filter(p => p.is_deal);
  }

  async function search(query) {
    if (!query) return [];
    const q = query.toLowerCase();
    const all = await getAll();
    return all.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  function invalidateCache() { cache = null; }

  // Fallback local data (when Supabase not configured)
  function getFallback() {
    return [
      { id: '1', name: 'Cute Teddy Bear', description: 'Super soft and cuddly plush teddy bear.', price: 1750, old_price: 2500, category: 'Soft Toys', stock: 45, rating: 4.8, rating_count: 128, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
      { id: '2', name: 'Colorful Building Blocks Set', description: 'Fun educational building set for kids ages 3+. 50 pieces.', price: 1499, old_price: 1999, category: 'Building Blocks', stock: 30, rating: 4.7, rating_count: 86, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400' },
      { id: '3', name: 'Remote Control Car', description: 'High-speed RC car with 2.4GHz remote. Rechargeable battery.', price: 2799, old_price: 3299, category: 'Vehicles', stock: 20, rating: 4.6, rating_count: 64, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400' },
      { id: '4', name: 'Puzzle Fun 100 Pieces', description: 'Colorful 100-piece jigsaw puzzle for children.', price: 899, old_price: null, category: 'Puzzles', stock: 60, rating: 4.5, rating_count: 95, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400' },
      { id: '5', name: 'Rainbow Stacker', description: 'Classic wooden rainbow stacker toy. Develops motor skills.', price: 1299, old_price: 1699, category: 'Educational', stock: 35, rating: 4.9, rating_count: 77, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400' },
      { id: '6', name: 'Blue Toy Train Set', description: 'Complete railway set with locomotive, carriages and track.', price: 2199, old_price: null, category: 'Vehicles', stock: 25, rating: 4.7, rating_count: 52, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400' },
      { id: '7', name: 'Alphabet Learning Board', description: 'Interactive alphabet board with sounds. Great for toddlers.', price: 1150, old_price: 1450, category: 'Educational', stock: 40, rating: 4.6, rating_count: 43, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
      { id: '8', name: 'Outdoor Cricket Set', description: 'Complete junior cricket set with bat, ball and stumps.', price: 1899, old_price: null, category: 'Outdoor', stock: 18, rating: 4.4, rating_count: 31, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400' },
      { id: '9', name: 'Baby Rattle Set', description: 'Colorful BPA-free baby rattle set. 4 pieces. 0+ months.', price: 650, old_price: null, category: 'Baby Toys', stock: 80, rating: 4.8, rating_count: 112, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' },
      { id: '10', name: 'Magnetic Drawing Board', description: 'Mess-free magnetic drawing board. Easy erase.', price: 1350, old_price: 1750, category: 'Educational', stock: 28, rating: 4.5, rating_count: 67, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400' },
      { id: '11', name: 'Plush Bunny Rabbit', description: 'Adorable soft plush bunny rabbit. Machine washable. 35cm.', price: 1200, old_price: 1599, category: 'Soft Toys', stock: 55, rating: 4.7, rating_count: 89, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=400' },
      { id: '12', name: 'Toy Kitchen Set', description: 'Complete toy kitchen playset with accessories. 32 pieces.', price: 3299, old_price: 3999, category: 'Educational', stock: 15, rating: 4.8, rating_count: 56, is_new: true, is_deal: true, image_url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400' },
      { id: '13', name: '3D Wooden Puzzle', description: 'Beautiful 3D wooden puzzle. Butterfly design. 45 pieces.', price: 1099, old_price: 1399, category: 'Puzzles', stock: 22, rating: 4.6, rating_count: 29, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400' },
      { id: '14', name: 'Dinosaur Action Figures', description: 'Set of 6 realistic dinosaur figures. Educational and fun.', price: 1450, old_price: null, category: 'Educational', stock: 38, rating: 4.5, rating_count: 73, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1548197047-3dcdb0fef0a4?w=400' },
      { id: '15', name: 'Stuffed Elephant', description: 'Large grey stuffed elephant with smiley face. 40cm tall.', price: 1850, old_price: 2299, category: 'Soft Toys', stock: 20, rating: 4.9, rating_count: 45, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400' },
      { id: '16', name: 'Musical Toy Piano', description: 'Mini 8-key piano with songs and recording. USB chargeable.', price: 1699, old_price: 2199, category: 'Educational', stock: 30, rating: 4.6, rating_count: 82, is_new: true, is_deal: true, image_url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400' },
      { id: '17', name: 'Water Squirt Guns', description: 'Set of 4 water squirt guns. Perfect for summer outdoor play.', price: 599, old_price: null, category: 'Outdoor', stock: 100, rating: 4.2, rating_count: 144, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1551737823-dfc8ebf9ce71?w=400' },
      { id: '18', name: 'Sand Play Set', description: 'Complete beach sand play set. Molds, shovels and rake.', price: 799, old_price: null, category: 'Outdoor', stock: 50, rating: 4.3, rating_count: 61, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
      { id: '19', name: 'Foam Building Set', description: 'Soft colorful foam building blocks. Safe for babies.', price: 850, old_price: null, category: 'Building Blocks', stock: 42, rating: 4.3, rating_count: 38, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400' },
      { id: '20', name: 'Toy Doctor Set', description: 'Fun pretend play doctor kit. 12 accessories in a carry case.', price: 1250, old_price: null, category: 'Educational', stock: 33, rating: 4.4, rating_count: 55, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400' }
    ];
  }

  return { getAll, getById, getByCategory, getNew, getDeals, search, invalidateCache };
})();

// ---- ORDERS ----
const Orders = (() => {
  async function createOrder({ customerName, phone, address, city, items, total }) {
    const customerId = Auth.getProfile()?.id || null;
    // Generate order number client-side (DB function backup)
    const orderNumber = await generateOrderNumber();

    const { data: order, error: orderError } = await supa.from('orders').insert({
      order_number: orderNumber,
      customer_id: customerId,
      customer_name: customerName,
      phone,
      address,
      city,
      subtotal: total,
      total,
      status: 'pending'
    }).select().single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      quantity: item.qty
    }));

    const { error: itemsError } = await supa.from('order_items').insert(orderItems);
    if (itemsError) throw itemsError;

    return order;
  }

  async function generateOrderNumber() {
    try {
      const { count } = await supa.from('orders').select('*', { count: 'exact', head: true });
      return 'SKT-ORD-' + String((count || 0) + 1).padStart(4, '0');
    } catch {
      return 'SKT-ORD-' + String(Date.now()).slice(-4);
    }
  }

  return { createOrder };
})();

// ---- SITE SETTINGS ----
const Settings = (() => {
  let cache = {};

  async function getAll() {
    try {
      const { data } = await supa.from('site_settings').select('*');
      if (data) {
        cache = {};
        data.forEach(s => { cache[s.key] = s.value; });
      }
    } catch { /* use defaults */ }
    return cache;
  }

  async function get(key, fallback = '') {
    if (!Object.keys(cache).length) await getAll();
    return cache[key] ?? fallback;
  }

  async function getWhatsAppNumber() { return await get('whatsapp_number', '923098444501'); }

  return { getAll, get, getWhatsAppNumber };
})();

// ---- HELPERS ----
function formatPrice(price) {
  return 'PKR ' + Number(price).toLocaleString('en-PK');
}

function getDiscount(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round((1 - price / oldPrice) * 100);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function showToast(msg, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

function getCategoryIcon(cat) {
  const icons = {
    'Soft Toys': '🧸', 'Building Blocks': '🧱', 'Vehicles': '🚂',
    'Educational': '🎨', 'Puzzles': '🧩', 'Outdoor': '⚽',
    'Baby Toys': '🍼', 'outdoor': '⚽'
  };
  return icons[cat] || '🎁';
}

function getCategoryColor(cat) {
  const colors = {
    'Soft Toys': 'background: #ffeef8; color: #c2185b;',
    'Building Blocks': 'background: #fff3e0; color: #e65100;',
    'Vehicles': 'background: #e3f2fd; color: #1565c0;',
    'Educational': 'background: #e8f5e9; color: #2e7d32;',
    'Puzzles': 'background: #f3e5f5; color: #6a1b9a;',
    'Outdoor': 'background: #e0f7fa; color: #006064;',
    'Baby Toys': 'background: #fce4ec; color: #880e4f;'
  };
  return colors[cat] || 'background: #f5f5f5; color: #424242;';
}
