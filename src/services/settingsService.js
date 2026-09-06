import { supabase } from '../lib/supabase';

export const DEFAULT_SETTINGS = {
  // General Store Info
  whatsapp_number: '923098444501',
  whatsapp_display: '03098444501',
  contact_email: 'info@smartkidstoys.pk',
  facebook_url: 'https://facebook.com/smartkidstoys',
  instagram_url: 'https://instagram.com/smartkidstoys',
  tiktok_url: 'https://tiktok.com/@smartkidstoys',
  youtube_url: '',
  delivery_note: 'Calculated on WhatsApp',
  free_delivery_threshold: '3000',
  site_announcement: 'Free Shipping on orders above PKR 3,000 🚀 | Fast Delivery Across Pakistan',

  // 1. Hero Section Banner & Visuals
  hero_image_url: '/assets/hero-banner.png',
  hero_title_prefix: 'Play, Learn &',
  hero_title_highlight: 'Grow Together',
  hero_subtitle: 'Safe, fun and educational toys for every age...',

  // 2. Flash Sale Banner
  flash_sale_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  flash_sale_title: 'FLASH SALE UP TO 40% OFF',
  flash_sale_subtitle: "Limited-time deals on kids' favourite toys",

  // 3. Shop Toys by Age (4 Full Background Images)
  age_0_2_bg_image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
  age_0_2_title: '0–2 Years',
  age_0_2_subtitle: 'Safe & sensory',

  age_3_5_bg_image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
  age_3_5_title: '3–5 Years',
  age_3_5_subtitle: 'Creative play',

  age_6_8_bg_image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600',
  age_6_8_title: '6–8 Years',
  age_6_8_subtitle: 'Learning & fun',

  age_9_12_bg_image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600',
  age_9_12_title: '9–12 Years',
  age_9_12_subtitle: 'STEM & adventure',

  // 4. Learn While You Play (4 Full Background Images)
  learn_puzzles_bg_image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600',
  learn_puzzles_title: 'Puzzles & Brain Games',

  learn_stem_bg_image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
  learn_stem_title: 'STEM & Math Toys',

  learn_art_bg_image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
  learn_art_title: 'Art & Creativity',

  learn_games_bg_image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
  learn_games_title: 'Educational Games',

  // 5. Find the Perfect Gift (3 Full Background Images)
  gift_birthday_bg_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
  gift_birthday_title: 'Birthday Gifts',
  gift_birthday_subtitle: "Fun picks they'll remember",

  gift_educational_bg_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  gift_educational_title: 'Educational Gifts',
  gift_educational_subtitle: 'Play & learning together',

  gift_under2k_bg_image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
  gift_under2k_title: 'Gifts Under PKR 2,000',
  gift_under2k_subtitle: 'Great toys, great prices',

  // 6. Follow the Fun (Instagram 6 Images)
  instagram_img_1: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
  instagram_img_2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
  instagram_img_3: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
  instagram_img_4: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500',
  instagram_img_5: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
  instagram_img_6: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500'
};

const STORAGE_KEY = 'smartkids_site_settings';

export const settingsService = {
  async getSettings() {
    let localMap = { ...DEFAULT_SETTINGS };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        localMap = { ...localMap, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read local settings:', e);
    }

    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (!error && data && data.length > 0) {
        const dbMap = {};
        data.forEach(item => {
          if (item.key) dbMap[item.key] = item.value;
        });
        const merged = { ...localMap, ...dbMap };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch (e) {}
        return merged;
      }
    } catch (e) {
      console.warn('Supabase fetch settings failed, using cached/defaults:', e);
    }

    return localMap;
  },

  async updateSetting(key, value) {
    // 1. Update localStorage immediately
    try {
      const current = await this.getSettings();
      current[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {}

    // 2. Sync to Supabase
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
        .select();
      if (error) console.warn('Supabase updateSetting error:', error);
      return data;
    } catch (e) {
      console.warn('Supabase updateSetting exception:', e);
      return [{ key, value }];
    }
  },

  async updateMultipleSettings(settingsObj) {
    // 1. Update localStorage immediately
    try {
      const current = await this.getSettings();
      const updated = { ...current, ...settingsObj };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    // 2. Sync to Supabase
    try {
      const upsertData = Object.entries(settingsObj).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString()
      }));
      const { data, error } = await supabase
        .from('site_settings')
        .upsert(upsertData, { onConflict: 'key' });
      if (error) console.warn('Supabase updateMultipleSettings error:', error);
      return true;
    } catch (e) {
      console.warn('Supabase updateMultipleSettings exception:', e);
      return true;
    }
  }
};
