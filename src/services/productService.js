import { supabase } from '../lib/supabase';

// Fallback catalog in case of temporary offline/network delay
export const FALLBACK_PRODUCTS = [
  { id: '1', name: 'Cute Teddy Bear', description: 'Super soft and cuddly plush teddy bear. Perfect companion for kids.', price: 1750, old_price: 2500, category: 'Soft Toys', stock: 45, rating: 4.8, rating_count: 128, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { id: '2', name: 'Colorful Building Blocks Set', description: 'Fun educational building set for kids ages 3+. 50 pieces.', price: 1499, old_price: 1999, category: 'Building Blocks', stock: 30, rating: 4.7, rating_count: 86, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600' },
  { id: '3', name: 'Remote Control Car', description: 'High-speed RC car with 2.4GHz remote. Rechargeable battery.', price: 2799, old_price: 3299, category: 'Vehicles', stock: 20, rating: 4.6, rating_count: 64, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600' },
  { id: '4', name: 'Puzzle Fun 100 Pieces', description: 'Colorful 100-piece jigsaw puzzle for children. Beautiful animal theme.', price: 899, old_price: null, category: 'Puzzles', stock: 60, rating: 4.5, rating_count: 95, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600' },
  { id: '5', name: 'Rainbow Stacker', description: 'Classic wooden rainbow stacker toy. Develops motor skills.', price: 1299, old_price: 1699, category: 'Educational', stock: 35, rating: 4.9, rating_count: 77, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600' },
  { id: '6', name: 'Blue Toy Train Set', description: 'Complete railway set with locomotive, carriages and track pieces.', price: 2199, old_price: null, category: 'Vehicles', stock: 25, rating: 4.7, rating_count: 52, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600' },
  { id: '7', name: 'Alphabet Learning Board', description: 'Interactive alphabet board with sounds. Great for toddlers.', price: 1150, old_price: 1450, category: 'Educational', stock: 40, rating: 4.6, rating_count: 43, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600' },
  { id: '8', name: 'Outdoor Cricket Set', description: 'Complete junior cricket set with bat, ball, stumps and bails.', price: 1899, old_price: null, category: 'Outdoor Toys', stock: 18, rating: 4.4, rating_count: 31, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600' },
  { id: '9', name: 'Baby Rattle Set', description: 'Colorful BPA-free baby rattle set. 4 pieces. 0+ months.', price: 650, old_price: null, category: 'Baby Toys', stock: 80, rating: 4.8, rating_count: 112, is_new: false, is_deal: false, image_url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600' },
  { id: '10', name: 'Magnetic Drawing Board', description: 'Mess-free magnetic drawing board. Easy erase. Great for travel.', price: 1350, old_price: 1750, category: 'Educational', stock: 28, rating: 4.5, rating_count: 67, is_new: false, is_deal: true, image_url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600' },
  { id: '11', name: 'Plush Bunny Rabbit', description: 'Adorable soft plush bunny rabbit. Machine washable. 35cm.', price: 1200, old_price: 1599, category: 'Soft Toys', stock: 55, rating: 4.7, rating_count: 89, is_new: true, is_deal: false, image_url: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=600' },
  { id: '12', name: 'Toy Kitchen Set', description: 'Complete toy kitchen playset with accessories. 32 pieces.', price: 3299, old_price: 3999, category: 'Educational', stock: 15, rating: 4.8, rating_count: 56, is_new: true, is_deal: true, image_url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600' }
];

export const productService = {
  async getAll() {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return FALLBACK_PRODUCTS;
      }
      return data;
    } catch (e) {
      console.warn('Using fallback products data:', e);
      return FALLBACK_PRODUCTS;
    }
  },

  async getById(id) {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error || !data) {
        return FALLBACK_PRODUCTS.find(p => p.id === id) || null;
      }
      return data;
    } catch (e) {
      return FALLBACK_PRODUCTS.find(p => p.id === id) || null;
    }
  },

  async getByCategory(category) {
    const products = await this.getAll();
    if (!category) return products;
    return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  },

  async getNewArrivals() {
    const products = await this.getAll();
    return products.filter(p => p.is_new);
  },

  async getDeals() {
    const products = await this.getAll();
    return products.filter(p => p.is_deal || (p.old_price && p.old_price > p.price));
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
