import { supabase } from '../lib/supabase';

// Fallback catalog in case of temporary offline/network delay
export const FALLBACK_PRODUCTS = [
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
    is_bestseller: true,
    age_range: '1–3 Years',
    educational_skill: 'Sensory & Emotional Comfort',
    badge: '🔥 Best Seller',
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
    is_bestseller: true,
    age_range: '3–5 Years',
    educational_skill: 'STEM / Motor Skills / Logic',
    badge: '⭐ Parent Favorite',
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
    is_bestseller: true,
    age_range: '5–8 Years',
    educational_skill: 'Hand-Eye Coordination & Spatial Skills',
    badge: '🔥 Best Seller',
    image_url: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600' 
  },
  { 
    id: '4', 
    name: 'Solar Robot 12-in-1 Kit', 
    description: 'Hands-on STEM solar powered robot kit that builds 12 different walking and crawling robots.', 
    price: 2200, 
    old_price: 2900, 
    category: 'Educational', 
    stock: 25, 
    rating: 4.9, 
    rating_count: 82, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: true,
    age_range: '8+ Years',
    educational_skill: 'STEM / Robotics / Problem Solving',
    badge: '🧠 Educational',
    image_url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600' 
  },
  { 
    id: '5', 
    name: 'Rainbow Stacker & Shape Sorter', 
    description: 'Montessori wooden stacking rings to foster hand-eye coordination and color identification.', 
    price: 1299, 
    old_price: 1699, 
    category: 'Educational', 
    stock: 35, 
    rating: 4.9, 
    rating_count: 77, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: true,
    age_range: '1–3 Years',
    educational_skill: 'Color Sorting & Fine Motor Dexterity',
    badge: '🎁 Great Gift',
    image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600' 
  },
  { 
    id: '6', 
    name: 'Classic Electric Train Set', 
    description: 'Complete railway train set with headlight locomotive, passenger cars, and loop tracks.', 
    price: 3200, 
    old_price: 4000, 
    category: 'Vehicles', 
    stock: 25, 
    rating: 4.8, 
    rating_count: 112, 
    is_new: true, 
    is_deal: false, 
    is_bestseller: true,
    age_range: '3–5 Years',
    educational_skill: 'Creative Play & Imagination',
    badge: '⭐ Parent Favorite',
    image_url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600' 
  },
  { 
    id: '7', 
    name: 'Animals 3D Wooden Jigsaw Puzzle', 
    description: 'Laser cut 3D jigsaw puzzle developing spatial reasoning and fine motor dexterity.', 
    price: 990, 
    old_price: 1350, 
    category: 'Puzzles', 
    stock: 45, 
    rating: 4.7, 
    rating_count: 65, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: false,
    age_range: '3–5 Years',
    educational_skill: 'Cognitive Logic & Pattern Recognition',
    badge: '🧠 Educational',
    image_url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600' 
  },
  { 
    id: '8', 
    name: 'Superhero Articulated Action Figure', 
    description: 'Poseable superhero action figure with 16 points of articulation and premium detailed sculpting.', 
    price: 1450, 
    old_price: 1950, 
    category: 'Action Figures', 
    stock: 40, 
    rating: 4.9, 
    rating_count: 98, 
    is_new: false, 
    is_deal: true, 
    is_bestseller: false,
    age_range: '5–8 Years',
    educational_skill: 'Storytelling & Imaginative Play',
    badge: '🎁 Great Gift',
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600' 
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
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return FALLBACK_PRODUCTS;
      }
      // Merge fallback metadata if DB fields are empty
      return data.map((item, idx) => {
        const fallback = FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length];
        return {
          ...fallback,
          ...item,
          age_range: item.age_range || fallback.age_range || '3–8 Years',
          educational_skill: item.educational_skill || fallback.educational_skill || 'STEM / Creativity',
          badge: item.badge || fallback.badge || '🔥 Best Seller'
        };
      });
    } catch (e) {
      return FALLBACK_PRODUCTS;
    }
  },

  async getById(id) {
    try {
      const bundle = SMARTKIDS_BUNDLES.find(b => b.id === id);
      if (bundle) return bundle;

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
    if (!category || category === 'All Toys') return products;
    return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  },

  async getByAge(ageKey) {
    const products = await this.getAll();
    if (!ageKey) return products;
    return products.filter(p => p.age_range?.toLowerCase().includes(ageKey.toLowerCase()));
  },

  async getByBudget(maxPrice) {
    const products = await this.getAll();
    if (!maxPrice) return products;
    return products.filter(p => Number(p.price) <= Number(maxPrice));
  },

  async getBestSellers() {
    const products = await this.getAll();
    return products.filter(p => p.is_bestseller || p.rating >= 4.8);
  },

  async getBundles() {
    return SMARTKIDS_BUNDLES;
  },

  async getNewArrivals() {
    const products = await this.getAll();
    return products.filter(p => p.is_new);
  },

  async getDeals() {
    const products = await this.getAll();
    return products.filter(p => p.is_deal || (p.old_price && Number(p.old_price) > Number(p.price)));
  },

  async search(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    const products = await this.getAll();
    return products.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.age_range?.toLowerCase().includes(q)
    );
  },

  // Admin CRUD operations
  async createProduct(productData) {
    const { data, error } = await supabase.from('products').insert([productData]).select().single();
    if (error) throw error;
    return data;
  },

  async updateProduct(id, productData) {
    const { data, error } = await supabase.from('products').update(productData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};
