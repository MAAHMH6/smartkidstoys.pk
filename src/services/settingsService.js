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
  // Multi-message ticker — pipe-separated, each shown in the scrolling marquee
  announcement_messages: '🚚 Free Shipping on orders above PKR 3,000 🚀|⚡ Flash Sale — Up to 40% OFF selected toys!|🎁 Fast Delivery across Pakistan in 2–4 days|📞 Order via WhatsApp: 03098444501|✨ New arrivals added every week — Shop now!',

  // 1. Hero Section Banner & Visuals
  hero_image_url: '/assets/hero-banner.png',
  hero_title_prefix: 'Play, Learn &',
  hero_title_highlight: 'Grow Together',
  hero_subtitle: 'Safe, fun and educational toys for every age...',

  // 2. Flash Sale Banner
  flash_sale_image_url: '/assets/flash-sale-bg-image.png',
  flash_sale_title: 'FLASH SALE UP TO 40% OFF',
  flash_sale_subtitle: "Limited-time deals on kids' favourite toys",
  flash_sale_bg_color: '#FFF9E6',
  flash_sale_bg_position: 'right center',
  flash_sale_bg_size: 'cover',
  // ISO date string — admin can push this forward/back to extend or shorten the countdown
  flash_sale_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),

  // 3. Shop Toys by Age (4 Full Background Images)
  age_0_2_bg_image: '/assets/age-section-0-2.png',
  age_0_2_title: '0–2 Years',
  age_0_2_subtitle: 'Safe & sensory',

  age_3_5_bg_image: '/assets/age-section-3-5.png',
  age_3_5_title: '3–5 Years',
  age_3_5_subtitle: 'Creative play',

  age_6_8_bg_image: '/assets/age-section-6-8.png',
  age_6_8_title: '6–8 Years',
  age_6_8_subtitle: 'Learning & fun',

  age_9_12_bg_image: '/assets/age-section-9-12.png',
  age_9_12_title: '9–12 Years',
  age_9_12_subtitle: 'STEM & adventure',

  // 4. Learn While You Play (4 Full Background Images)
  learn_puzzles_bg_image: '/assets/learn-play-puzzles.png',
  learn_puzzles_title: 'Puzzles & Brain Games',

  learn_stem_bg_image: '/assets/learn-play-stem-math.png',
  learn_stem_title: 'STEM & Math Toys',

  learn_art_bg_image: '/assets/learn-play-art-creativity.png',
  learn_art_title: 'Art & Creativity',

  learn_games_bg_image: '/assets/learn-play-edu-games.png',
  learn_games_title: 'Educational Games',

  // 5. Find the Perfect Gift (3 Full Background Images)
  gift_birthday_bg_image: '/assets/gift-section-birthday.png',
  gift_birthday_title: 'Birthday Gifts',
  gift_birthday_subtitle: "Fun picks they'll remember",

  gift_educational_bg_image: '/assets/gift-section-edu.png',
  gift_educational_title: 'Educational Gifts',
  gift_educational_subtitle: 'Play & learning together',

  gift_under2k_bg_image: '/assets/gift-section-under-2000.png',
  gift_under2k_title: 'Gifts Under PKR 2,000',
  gift_under2k_subtitle: 'Great toys, great prices',

  // 6. Follow the Fun (Instagram 6 Images)
  instagram_img_1: '/assets/insta-1.png',
  instagram_img_2: '/assets/insta-2.png',
  instagram_img_3: '/assets/insta-3.png',
  instagram_img_4: '/assets/insta-4.png',
  instagram_img_5: '/assets/insta-5.png',
  instagram_img_6: '/assets/insta-6.png',

  // 7. Promotional Cards & Page Banners (Separate for card vs wide banner)
  new_arrivals_card_image: '/assets/new-arrivals-card-image.png',
  new_arrivals_banner_image: '/assets/new-arrivals-banner-image.png',
  deals_card_image: '/assets/teddy-banner.png',
  deals_banner_image: '/assets/teddy-banner.png'
};

const STORAGE_KEY = 'smartkids_site_settings';

export const settingsService = {
  async getSettings() {
    let localMap = { ...DEFAULT_SETTINGS };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean out legacy unsplash URLs so real uploaded images show across all devices/accounts
        Object.keys(parsed).forEach(k => {
          if (typeof parsed[k] === 'string' && parsed[k].includes('images.unsplash.com') && DEFAULT_SETTINGS[k]) {
            parsed[k] = DEFAULT_SETTINGS[k];
          }
        });
        localMap = { ...localMap, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read local settings:', e);
    }

    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (!error && data && data.length > 0) {
        const dbMap = {};
        data.forEach(item => {
          if (item.key) {
            // Replace any old unsplash placeholder with the actual uploaded store asset
            if (typeof item.value === 'string' && item.value.includes('images.unsplash.com') && DEFAULT_SETTINGS[item.key]) {
              dbMap[item.key] = DEFAULT_SETTINGS[item.key];
            } else {
              dbMap[item.key] = item.value;
            }
          }
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
