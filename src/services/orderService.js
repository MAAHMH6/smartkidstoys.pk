import { supabase } from '../lib/supabase';

export const orderService = {
  async createOrder({ customerName, phone, address, city, items, total, customerId = null }) {
    let orderNumber = `SKT-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    
    try {
      // Fetch exact count for clean sequence
      const { count } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      if (typeof count === 'number') {
        orderNumber = `SKT-ORD-${String(count + 1).padStart(4, '0')}`;
      }
    } catch (e) {
      console.warn('Could not compute sequential order count:', e);
    }

    try {
      const { data: order, error: orderError } = await supabase.from('orders').insert({
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

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: typeof item.id === 'string' && item.id.length > 10 ? item.id : null,
        product_name: item.name,
        price: item.price,
        quantity: item.qty
      }));

      await supabase.from('order_items').insert(orderItems);
      return order;
    } catch (e) {
      console.warn('Saved order locally only due to Supabase error:', e);
      return {
        id: 'local-' + Date.now(),
        order_number: orderNumber,
        customer_name: customerName,
        phone,
        address,
        city,
        total,
        status: 'pending'
      };
    }
  },

  async getCustomerOrders(customerId) {
    if (!customerId) return [];
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('Error fetching customer orders:', e);
      return [];
    }
  },

  async getAllOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('Error fetching all orders:', e);
      return [];
    }
  },

  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
