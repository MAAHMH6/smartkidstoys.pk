import { supabase } from '../lib/supabase';

// Complete product catalog matching the exact design and categories
export const FALLBACK_PRODUCTS = [
  // --- POPULAR TOYS ---
  { 
    id: '1', 
    name: 'Cute Teddy Bear', 
    description: 'Super soft and cuddly plush teddy bear made with hypoallergenic non-toxic fabric.', 
    price: 1750, 
    old_price: 2500, 
    category: 'Soft Toys', 
    stock: 45, 
    rating: 4.9, 
    rating_count: 128, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: false,
    age_range: '0–2 Years',
    educational_skill: 'Sensory & Comfort',
    badge: '🔥 Popular',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' 
  },
  { 
    id: '2', 
    name: 'Colorful Building Blocks Set', 
    description: '100 pieces natural solid wood building blocks with vibrant non-toxic water-based paint.', 
    price: 1499, 
    old_price: 1999, 
    category: 'Building Blocks', 
    stock: 30, 
    rating: 4.8, 
    rating_count: 94, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: false,
    age_range: '3–5 Years',
    educational_skill: 'STEM / Motor Skills',
    badge: '⭐ Favorite',
    image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600' 
  },
  { 
    id: '3', 
    name: 'Remote Control Monster Truck', 
    description: 'High speed 4WD off-road RC monster truck with rechargeable battery and shockproof chassis.', 
    price: 2799, 
    old_price: 3500, 
    category: 'Vehicles', 
    stock: 20, 
    rating: 4.9, 
    rating_count: 156, 
    is_new: true, 
    is_deal: true, 
    is_bestseller: false,
    age_range: '6–8 Years',
    educational_skill: 'Hand-Eye Coordination',
    badge: '🔥 Hot Deal',
    image_url: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600' 
  },
  { 
    id: '4', 
    name: 'Puzzle Fun 100 Pieces', 
    description: 'Colorful 100-piece jigsaw puzzle developing spatial reasoning and logic.', 
    price: 899, 
    old_price: 1299, 
    category: 'Puzzles', 
    stock: 60, 
    rating: 4.7, 
    rating_count: 65, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: false,
    age_range: '3–5 Years',
    educational_skill: 'Logic & Problem Solving',
    badge: '🧠 Puzzle',
    image_url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600' 
  },
  { 
    id: '5', 
    name: 'Rainbow Stacker', 
    description: 'Montessori wooden stacking rings to foster hand-eye coordination and color identification.', 
    price: 1299, 
    old_price: 1699, 
    category: 'Educational', 
    stock: 35, 
    rating: 4.9, 
    rating_count: 77, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: false,
    age_range: '0–2 Years',
    educational_skill: 'Color & Motor Skills',
    badge: '🎁 Best Gift',
    image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600' 
  },

  // --- BEST SELLERS ---
  { 
    id: '101', 
    name: 'Magnetic Building Tiles', 
    description: '3D magnetic tiles building set for creative construction, geometry and architectural play.', 
    price: 2499, 
    old_price: 3499, 
    category: 'STEM', 
    stock: 50, 
    rating: 4.9, 
    rating_count: 145, 
    is_new: true, 
    is_deal: true, 
    is_bestseller: true,
    age_range: '3–5 Years',
    educational_skill: 'STEM / 3D Geometry',
    badge: '🔥 Best Seller',
    image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600' 
  },
  { 
    id: '102', 
    name: 'Wooden Alphabet Puzzle', 
    description: 'Chunky wooden alphabet and numbers board for early toddler literacy and spelling fun.', 
    price: 1799, 
    old_price: 2499, 
    category: 'Educational', 
    stock: 40, 
    rating: 4.8, 
    rating_count: 112, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: true,
    age_range: '0–2 Years',
    educational_skill: 'Early Literacy & Phonics',
    badge: '⭐ Parent Choice',
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600' 
  },
  { 
    id: '103', 
    name: 'Die-Cast Car Set (Pack of 5)', 
    description: 'Premium alloy metal die-cast racing cars with smooth rolling wheels and vibrant designs.', 
    price: 2199, 
    old_price: 2899, 
    category: 'Cars & Vehicles', 
    stock: 35, 
    rating: 4.9, 
    rating_count: 165, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: true,
    age_range: '3–5 Years',
    educational_skill: 'Hand-Eye Coordination',
    badge: '🔥 Top Seller',
    image_url: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600' 
  },
  { 
    id: '104', 
    name: '1000-Piece Castle Puzzle', 
    description: 'Intricate 1000-piece fantasy landscape puzzle promoting patience and focus for older kids.', 
    price: 1399, 
    old_price: 1749, 
    category: 'Puzzles', 
    stock: 25, 
    rating: 4.7, 
    rating_count: 75, 
    is_new: true, 
    is_deal: true, 
    is_bestseller: true,
    age_range: '9–12 Years',
    educational_skill: 'Focus & Logic',
    badge: '🧠 Brain Game',
    image_url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600' 
  },
  { 
    id: '105', 
    name: 'Panda Plush Toy (40cm)', 
    description: 'Ultra-cuddly huggable black and white panda made with ultra-soft baby-safe plush.', 
    price: 1499, 
    old_price: 1999, 
    category: 'Soft Toys', 
    stock: 45, 
    rating: 4.9, 
    rating_count: 134, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: true,
    age_range: '0–2 Years',
    educational_skill: 'Sensory & Comfort',
    badge: '🎁 Top Gift',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' 
  }
];

export const SMARTKIDS_BUNDLES = [
  {
    id: 'bundle-1',
    name: 'Little Builder Bundle',
    description: 'Wooden Building Blocks (100 pcs) + 3D Animal Puzzle + Montessori Stacker.',
    price: 3290,
    original_price: 4390,
    savings: 1100,
    age_range: '1–5 Years',
    items_count: 3,
    badge: 'Save Rs 1,100',
    image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600'
  },
  {
    id: 'bundle-2',
    name: 'Creative Kids Bundle',
    description: 'Rainbow Stacker + Magnetic Drawing Board + Animal Jigsaw Set.',
    price: 2850,
    original_price: 3800,
    savings: 950,
    age_range: '3–8 Years',
    items_count: 3,
    badge: 'Save Rs 950',
    image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'
  },
  {
    id: 'bundle-3',
    name: 'STEM Learning Bundle',
    description: '12-in-1 Solar Robot Kit + Science Logic Puzzle + Electric Train Set.',
    price: 5490,
    original_price: 6890,
    savings: 1400,
    age_range: '5–8+ Years',
    items_count: 3,
    badge: 'Save Rs 1,400',
    image_url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600'
  },
  {
    id: 'bundle-4',
    name: 'Birthday Mega Gift Bundle',
    description: 'Cute Plush Bear + 4WD Monster Truck + Superhero Action Figure.',
    price: 4950,
    original_price: 6200,
    savings: 1250,
    age_range: '3–8+ Years',
    items_count: 3,
    badge: 'Save Rs 1,250',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'
  }
];

export const productService = {
  async getAll() {
    let prods = [...FALLBACK_PRODUCTS];
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        prods = data.map((item, idx) => {
          const fallback = FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length];
          return {
            ...fallback,
            ...item,
            age_range: item.age_range || fallback.age_range || '3–5 Years',
            educational_skill: item.educational_skill || fallback.educational_skill || 'STEM & Motor Skills',
            badge: item.badge || fallback.badge || '🔥 Best Seller'
          };
        });
      }
    } catch (e) {
      console.warn('Supabase fetch products error, using fallback:', e);
    }

    // Merge custom products created by admin from localStorage
    try {
      const localCustom = JSON.parse(localStorage.getItem('smartkids_custom_products') || '[]');
      if (Array.isArray(localCustom) && localCustom.length > 0) {
        const existingIds = new Set(prods.map(p => String(p.id)));
        const filteredLocal = localCustom.filter(p => !existingIds.has(String(p.id)));
        prods = [...filteredLocal, ...prods];
      }
    } catch (e) {
      console.warn('Could not read custom local products:', e);
    }

    return prods;
  },

  async getById(id) {
    try {
      const bundle = SMARTKIDS_BUNDLES.find(b => b.id === id);
      if (bundle) return bundle;

      // Check local custom products first
      try {
        const localCustom = JSON.parse(localStorage.getItem('smartkids_custom_products') || '[]');
        const foundLocal = localCustom.find(p => String(p.id) === String(id));
        if (foundLocal) return foundLocal;
      } catch (e) {}

      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error || !data) {
        return FALLBACK_PRODUCTS.find(p => String(p.id) === String(id)) || FALLBACK_PRODUCTS[0];
      }
      return data;
    } catch (e) {
      return FALLBACK_PRODUCTS.find(p => String(p.id) === String(id)) || FALLBACK_PRODUCTS[0];
    }
  },

  async getByCategory(category) {
    const products = await this.getAll();
    if (!category || category === 'All Categories' || category === 'All Toys') return products;
    return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  },

  async getPopular() {
    const products = await this.getAll();
    return products.filter(p => !p.is_bestseller).slice(0, 5);
  },

  async getBestSellers() {
    const products = await this.getAll();
    return products.filter(p => p.is_bestseller || Number(p.id) >= 100).slice(0, 5);
  },

  async getBundles() {
    return SMARTKIDS_BUNDLES;
  },

  async search(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    const products = await this.getAll();
    return products.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  },

  async createProduct(productData) {
    const newId = 'prod-' + Date.now();
    const newProduct = {
      id: newId,
      created_at: new Date().toISOString(),
      rating: 5.0,
      rating_count: 1,
      ...productData
    };

    // 1. Try Supabase insert
    try {
      const { data, error } = await supabase.from('products').insert([productData]).select().single();
      if (!error && data) {
        newProduct.id = data.id;
      } else if (error) {
        // Fallback for schema variance: insert only baseline columns
        const basePayload = {
          name: productData.name,
          description: productData.description || '',
          price: Number(productData.price),
          old_price: productData.old_price ? Number(productData.old_price) : null,
          category: productData.category,
          stock: Number(productData.stock || 0),
          is_new: Boolean(productData.is_new),
          is_deal: Boolean(productData.is_deal),
          image_url: productData.image_url || ''
        };
        const { data: bData } = await supabase.from('products').insert([basePayload]).select().single();
        if (bData) newProduct.id = bData.id;
      }
    } catch (err) {
      console.warn('Supabase product creation notice:', err);
    }

    // 2. Always persist locally for instant availability
    try {
      const local = JSON.parse(localStorage.getItem('smartkids_custom_products') || '[]');
      localStorage.setItem('smartkids_custom_products', JSON.stringify([newProduct, ...local]));
    } catch (err) {
      console.warn('Local storage save error:', err);
    }

    return newProduct;
  },

  async updateProduct(id, productData) {
    // 1. Try Supabase update
    try {
      const { error } = await supabase.from('products').update(productData).eq('id', id);
      if (error) {
        const basePayload = {
          name: productData.name,
          description: productData.description || '',
          price: Number(productData.price),
          old_price: productData.old_price ? Number(productData.old_price) : null,
          category: productData.category,
          stock: Number(productData.stock || 0),
          is_new: Boolean(productData.is_new),
          is_deal: Boolean(productData.is_deal),
          image_url: productData.image_url || ''
        };
        await supabase.from('products').update(basePayload).eq('id', id);
      }
    } catch (err) {
      console.warn('Supabase product update notice:', err);
    }

    // 2. Update localStorage cache
    try {
      const local = JSON.parse(localStorage.getItem('smartkids_custom_products') || '[]');
      const idx = local.findIndex(p => String(p.id) === String(id));
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...productData };
        localStorage.setItem('smartkids_custom_products', JSON.stringify(local));
      } else {
        localStorage.setItem('smartkids_custom_products', JSON.stringify([{ id, ...productData }, ...local]));
      }
    } catch (err) {
      console.warn('Local storage update error:', err);
    }

    return { id, ...productData };
  },

  async deleteProduct(id) {
    // 1. Try Supabase delete
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete product notice:', err);
    }

    // 2. Remove from localStorage cache
    try {
      const local = JSON.parse(localStorage.getItem('smartkids_custom_products') || '[]');
      const filtered = local.filter(p => String(p.id) !== String(id));
      localStorage.setItem('smartkids_custom_products', JSON.stringify(filtered));
    } catch (err) {
      console.warn('Local storage delete error:', err);
    }

    return true;
  }
};

