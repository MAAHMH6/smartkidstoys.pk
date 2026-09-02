import { supabase } from '../lib/supabase';

const DEFAULT_SETTINGS = {
  whatsapp_number: '923098444501',
  whatsapp_display: '03098444501',
  contact_email: 'info@smartkidstoys.pk',
  facebook_url: 'https://facebook.com/smartkidstoys',
  instagram_url: 'https://instagram.com/smartkidstoys',
  tiktok_url: 'https://tiktok.com/@smartkidstoys',
  youtube_url: '',
  delivery_note: 'Calculated on WhatsApp',
  free_delivery_threshold: '3000',
  site_announcement: 'Free Shipping on orders above PKR 3,000 🚀 | Fast Delivery Across Pakistan'
};

export const settingsService = {
  async getSettings() {
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error || !data || data.length === 0) {
        return DEFAULT_SETTINGS;
      }
      const settingsMap = { ...DEFAULT_SETTINGS };
      data.forEach(item => {
        if (item.key) settingsMap[item.key] = item.value;
      });
      return settingsMap;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },

  async updateSetting(key, value) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
      .select();
    if (error) throw error;
    return data;
  },

  async updateMultipleSettings(settingsObj) {
    const promises = Object.entries(settingsObj).map(([key, value]) =>
      supabase
        .from('site_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key)
    );
    await Promise.all(promises);
    return true;
  }
};
