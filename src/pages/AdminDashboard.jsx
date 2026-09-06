import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { settingsService, DEFAULT_SETTINGS } from '../services/settingsService';
import { supabase } from '../lib/supabase';
import { slugify } from '../utils/slugify';
import { 
  Globe,
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  Save,
  MessageCircle,
  X,
  Clock,
  Truck,
  Layers,
  Sparkles,
  Search,
  Check,
  UserPlus,
  ShoppingCart,
  Phone,
  Upload,
  Image as ImageIcon,
  Tag
} from 'lucide-react';

const CATEGORIES = [
  'Baby & Toddler',
  'Educational',
  'Action Figures',
  'Dolls & Playsets',
  'Vehicles & Track Sets',
  'Remote Control',
  'Puzzles & Games',
  'Outdoor & Sports',
  'Building Blocks',
  'Soft Toys',
  'Other'
];

const AGE_RANGES = [
  '0–2 Years',
  '1–3 Years',
  '3–5 Years',
  '5–8 Years',
  '8+ Years',
  'All Ages'
];

const EDUCATIONAL_SKILLS = [
  'STEM & Logic',
  'Creativity & Arts',
  'Problem Solving',
  'Fine Motor Skills',
  'Sensory Exploration',
  'Language & Phonics',
  'Physical & Active Play',
  'General Fun'
];

const BADGE_PRESETS = [
  '🔥 Best Seller',
  '⚡ Flash Deal',
  '⭐ Customer Favourite',
  '✨ New Arrival',
  '🧠 Brain Booster',
  '🎁 Top Gift Pick'
];

const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur'
];

export default function AdminDashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Data states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [settings, setSettings] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  // Filters & Search
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [customerSearch, setCustomerSearch] = useState('');

  // 1. Product Modal
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'Educational',
    age_range: '3–5 Years',
    educational_skill: 'General Fun',
    badge: '🔥 Best Seller',
    price: '',
    old_price: '',
    stock: '25',
    image_url: '',
    is_new: true,
    is_deal: false
  });
  const [showProductModal, setShowProductModal] = useState(false);

  // 2. Manual Order Modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [manualOrderForm, setManualOrderForm] = useState({
    customerName: '',
    phone: '',
    city: 'Lahore',
    address: '',
    selectedProducts: [], // Array of { productId, name, price, qty }
    status: 'confirmed'
  });

  // 3. Customer Add Modal
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: ''
  });

  // 4. Site Settings
  const [settingsForm, setSettingsForm] = useState(DEFAULT_SETTINGS);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    setLoadingData(true);
    try {
      const [prods, ords, sets] = await Promise.all([
        productService.getAll(),
        orderService.getAllOrders(),
        settingsService.getSettings()
      ]);
      setProducts(prods || []);
      setOrders(ords || []);

      // Load registered customers from profiles table
      try {
        const { data: custs } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        setCustomers(custs || []);
      } catch (err) {
        console.warn('Customer list load notice:', err);
      }

      if (sets && Object.keys(sets).length > 0) {
        setSettings(sets);
        setSettingsForm(prev => ({ ...prev, ...sets }));
      }
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setLoadingData(false);
    }
  };

  // --- Product Handlers ---
  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      description: '',
      category: 'Educational',
      age_range: '3–5 Years',
      educational_skill: 'General Fun',
      badge: '🔥 Best Seller',
      price: '',
      old_price: '',
      stock: '25',
      image_url: '',
      is_new: true,
      is_deal: false
    });
    setShowProductModal(true);
  };

  const openEditProductModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || '',
      slug: product.slug || slugify(product.name || ''),
      description: product.description || '',
      category: product.category || 'Educational',
      age_range: product.age_range || '3–5 Years',
      educational_skill: product.educational_skill || 'General Fun',
      badge: product.badge || '🔥 Best Seller',
      price: product.price || '',
      old_price: product.old_price || '',
      stock: product.stock !== undefined ? String(product.stock) : '20',
      image_url: product.image_url || '',
      is_new: Boolean(product.is_new),
      is_deal: Boolean(product.is_deal)
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const generatedSlug = productForm.slug.trim() ? slugify(productForm.slug.trim()) : slugify(productForm.name.trim());
      const payload = {
        name: productForm.name.trim(),
        slug: generatedSlug,
        description: productForm.description.trim(),
        category: productForm.category,
        age_range: productForm.age_range,
        educational_skill: productForm.educational_skill,
        badge: productForm.badge,
        price: Number(productForm.price),
        old_price: productForm.old_price ? Number(productForm.old_price) : null,
        stock: Number(productForm.stock),
        image_url: productForm.image_url.trim(),
        is_new: productForm.is_new,
        is_deal: productForm.is_deal
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, payload);
      } else {
        await productService.createProduct(payload);
      }

      setShowProductModal(false);
      await loadAllAdminData();
    } catch (err) {
      alert('Error saving product: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productService.deleteProduct(id);
        await loadAllAdminData();
      } catch (err) {
        alert('Error deleting product: ' + err.message);
      }
    }
  };

  // --- Manual Order Creation by Admin ---
  const openNewOrderModal = () => {
    setManualOrderForm({
      customerName: '',
      phone: '',
      city: 'Lahore',
      address: '',
      selectedProducts: products.length > 0 ? [{ productId: products[0].id, name: products[0].name, price: Number(products[0].price), qty: 1 }] : [],
      status: 'confirmed'
    });
    setShowOrderModal(true);
  };

  const addProductToManualOrder = () => {
    if (products.length === 0) return;
    setManualOrderForm(prev => ({
      ...prev,
      selectedProducts: [
        ...prev.selectedProducts,
        { productId: products[0].id, name: products[0].name, price: Number(products[0].price), qty: 1 }
      ]
    }));
  };

  const updateManualOrderItem = (index, field, value) => {
    setManualOrderForm(prev => {
      const updated = [...prev.selectedProducts];
      if (field === 'productId') {
        const found = products.find(p => p.id === value);
        if (found) {
          updated[index] = { ...updated[index], productId: found.id, name: found.name, price: Number(found.price) };
        }
      } else if (field === 'qty') {
        updated[index] = { ...updated[index], qty: Math.max(1, Number(value)) };
      }
      return { ...prev, selectedProducts: updated };
    });
  };

  const removeManualOrderItem = (index) => {
    setManualOrderForm(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((_, i) => i !== index)
    }));
  };

  const handleCreateManualOrder = async (e) => {
    e.preventDefault();
    if (manualOrderForm.selectedProducts.length === 0) {
      alert('Please add at least one toy to the order.');
      return;
    }

    try {
      const totalAmount = manualOrderForm.selectedProducts.reduce((sum, item) => sum + item.price * item.qty, 0);

      const createdOrder = await orderService.createOrder({
        customerName: manualOrderForm.customerName.trim(),
        phone: manualOrderForm.phone.trim(),
        address: manualOrderForm.address.trim(),
        city: manualOrderForm.city,
        items: manualOrderForm.selectedProducts,
        total: totalAmount
      });

      if (manualOrderForm.status !== 'pending') {
        await orderService.updateOrderStatus(createdOrder.id, manualOrderForm.status);
      }

      setShowOrderModal(false);
      await loadAllAdminData();
    } catch (err) {
      alert('Error creating order: ' + err.message);
    }
  };

  // --- Manual Customer Creation by Admin ---
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      const custNumber = 'SKT-CUS-' + Math.floor(1000 + Math.random() * 9000);
      const newCust = {
        id: 'usr_' + Date.now().toString(36),
        full_name: customerForm.fullName.trim(),
        phone: customerForm.phone.trim(),
        city: customerForm.city,
        address: customerForm.address.trim(),
        customer_number: custNumber,
        is_admin: false,
        created_at: new Date().toISOString()
      };

      try {
        await supabase.from('profiles').insert(newCust);
      } catch (err) {
        console.warn('Direct database customer insert notice:', err);
      }

      setCustomers(prev => [newCust, ...prev]);
      setShowCustomerModal(false);
      setCustomerForm({ fullName: '', phone: '', email: '', city: 'Lahore', address: '' });
    } catch (err) {
      alert('Error creating customer: ' + err.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (e) {
      alert('Failed to update status: ' + e.message);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await settingsService.updateMultipleSettings(settingsForm);
      setSaveSettingsSuccess(true);
      setTimeout(() => setSaveSettingsSuccess(false), 3000);
    } catch (err) {
      alert('Error updating settings: ' + err.message);
    }
  };

  // Progressive Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const confirmedOrders = orders.filter(o => o.status === 'confirmed');
  const pendingOrders = orders.filter(o => !o.status || o.status === 'pending');

  const deliveryRate = orders.length > 0 ? Math.round((deliveredOrders.length / orders.length) * 100) : 100;
  const inStockProducts = products.filter(p => Number(p.stock) > 0);
  const stockHealthRate = products.length > 0 ? Math.round((inStockProducts.length / products.length) * 100) : 100;
  const monthlyTarget = 150000;
  const targetProgress = Math.min(Math.round((totalRevenue / monthlyTarget) * 100), 100);

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && (o.status || 'pending') !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.order_number?.toLowerCase().includes(q) ||
        o.customer_name?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.city?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Customers
  const filteredCustomers = customers.filter(c => {
    if (customerSearch.trim()) {
      const q = customerSearch.toLowerCase();
      return (
        c.full_name?.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.customer_number?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="container" style={{ padding: '36px 20px 80px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FEF3C7', color: '#D97706', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.78rem', marginBottom: '8px' }}>
            <ShieldCheck size={15} /> Store Administrator
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--dark-heading)' }}>Admin Dashboard</h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={openNewOrderModal}
            className="btn"
            style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', padding: '10px 18px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
          >
            <ShoppingCart size={16} /> + Create Order
          </button>

          <button
            onClick={openNewProductModal}
            className="btn"
            style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '10px 18px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}
          >
            <Plus size={16} /> + Add Toy
          </button>
          
          <Link
            to="/shop"
            className="btn"
            style={{ background: 'white', color: 'var(--dark)', border: '1.5px solid var(--gray-2)', padding: '10px 16px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ExternalLink size={15} /> Store View
          </Link>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs + Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Sidebar */}
        <div style={{ background: 'white', padding: '20px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'overview' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'overview' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 800,
                fontSize: '0.92rem',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <TrendingUp size={18} /> Progressive Overview
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'orders' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'orders' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 800,
                fontSize: '0.92rem',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={18} /> Orders Tracker
              </div>
              {pendingOrders.length > 0 && (
                <span style={{ background: '#EF4444', color: 'white', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 900 }}>
                  {pendingOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'products' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'products' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 800,
                fontSize: '0.92rem',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package size={18} /> Store Products
              </div>
              <span style={{ background: '#F1F5F9', color: 'var(--dark-heading)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'customers' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'customers' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 800,
                fontSize: '0.92rem',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={18} /> Customers
              </div>
              <span style={{ background: '#F1F5F9', color: 'var(--dark-heading)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
                {customers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'settings' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'settings' ? 'var(--primary-blue)' : 'var(--text)',
                fontWeight: 800,
                fontSize: '0.92rem',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <Settings size={18} /> Site & WhatsApp
            </button>

            <button
              onClick={() => setActiveTab('homepage_images')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'homepage_images' ? '#FEF3C7' : 'transparent',
                color: activeTab === 'homepage_images' ? '#D97706' : 'var(--text)',
                fontWeight: 800,
                fontSize: '0.92rem',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <Sparkles size={18} /> Homepage Images
            </button>

          </div>
        </div>

        {/* Right Content Area */}
        <div>
          
          {/* TAB 1: PROGRESSIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
                
                <div style={{ background: 'white', padding: '22px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Catalog</span>
                    <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EFF6FF', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Package size={18} />
                    </span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--dark-heading)', marginBottom: '4px' }}>
                    {products.length} Toys
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 700 }}>
                    ● {inStockProducts.length} In Stock Ready
                  </div>
                </div>

                <div style={{ background: 'white', padding: '22px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Orders Received</span>
                    <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShoppingBag size={18} />
                    </span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--dark-heading)', marginBottom: '4px' }}>
                    {orders.length}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: pendingOrders.length > 0 ? '#EF4444' : '#16A34A', fontWeight: 700 }}>
                    ● {pendingOrders.length} Pending Confirmation
                  </div>
                </div>

                <div style={{ background: 'white', padding: '22px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order Volume</span>
                    <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign size={18} />
                    </span>
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--dark-heading)', marginBottom: '4px' }}>
                    PKR {totalRevenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 700 }}>
                    ● WhatsApp Order Stream
                  </div>
                </div>

                <div style={{ background: 'white', padding: '22px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivery Success</span>
                    <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F3E8FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Truck size={18} />
                    </span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--dark-heading)', marginBottom: '4px' }}>
                    {deliveryRate}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    ● Nationwide Delivery
                  </div>
                </div>

              </div>

              {/* PROGRESSIVE METRICS */}
              <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={20} color="var(--primary-blue)" /> Progressive Store Metrics
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  
                  {/* Metric 1 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                      <span style={{ fontWeight: 800 }}>Monthly Revenue Target (PKR {monthlyTarget.toLocaleString()})</span>
                      <span style={{ fontWeight: 900, color: 'var(--primary-blue)' }}>{targetProgress}% Completed</span>
                    </div>
                    <div style={{ width: '100%', height: '12px', background: '#F1F5F9', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: `${targetProgress}%`, height: '100%', background: 'linear-gradient(90deg, #0284C7, #06B6D4)', borderRadius: 'var(--radius-full)', transition: 'width 0.6s ease' }}></div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                      <span style={{ fontWeight: 800 }}>Catalog In-Stock Availability</span>
                      <span style={{ fontWeight: 900, color: '#16A34A' }}>{stockHealthRate}% Healthy</span>
                    </div>
                    <div style={{ width: '100%', height: '12px', background: '#F1F5F9', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: `${stockHealthRate}%`, height: '100%', background: 'linear-gradient(90deg, #10B981, #059669)', borderRadius: 'var(--radius-full)', transition: 'width 0.6s ease' }}></div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                      <span style={{ fontWeight: 800 }}>Order Pipeline Status</span>
                      <span style={{ fontWeight: 900, color: '#D97706' }}>{orders.length} Total Orders</span>
                    </div>
                    <div style={{ width: '100%', height: '12px', background: '#F1F5F9', borderRadius: 'var(--radius-full)', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${orders.length > 0 ? (deliveredOrders.length / orders.length) * 100 : 0}%`, background: '#10B981' }} title="Delivered"></div>
                      <div style={{ width: `${orders.length > 0 ? (confirmedOrders.length / orders.length) * 100 : 0}%`, background: '#0284C7' }} title="Confirmed"></div>
                      <div style={{ width: `${orders.length > 0 ? (pendingOrders.length / orders.length) * 100 : 100}%`, background: '#F59E0B' }} title="Pending"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS TRACKER (LIVE SYNC & TRACKING STEPPER) */}
          {activeTab === 'orders' && (
            <div style={{ background: 'white', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900 }}>WhatsApp Orders Management ({orders.length})</h2>
                <button
                  onClick={openNewOrderModal}
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', padding: '8px 18px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> + Create Manual Order
                </button>
              </div>

              {/* Filters & Search */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search by Order #, Name, Phone or City..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px 10px 38px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-full)', fontSize: '0.88rem' }}
                  />
                  <Search size={16} color="var(--gray-4)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {['all', 'pending', 'confirmed', 'delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        textTransform: 'capitalize',
                        background: orderStatusFilter === status ? 'var(--primary-blue)' : '#F1F5F9',
                        color: orderStatusFilter === status ? 'white' : 'var(--text)'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List with Status Progress Stepper */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(o => {
                    const st = o.status || 'pending';
                    const isPending = st === 'pending';
                    const isConfirmed = st === 'confirmed';
                    const isDelivered = st === 'delivered';

                    return (
                      <div key={o.id} style={{ background: '#F8FAFC', padding: '22px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-2)' }}>
                        
                        {/* Order Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                          <div>
                            <strong style={{ fontSize: '1.15rem', color: 'var(--dark-heading)' }}>Order #{o.order_number}</strong>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                              Placed on: {new Date(o.created_at).toLocaleString()}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <select
                              value={st}
                              onChange={(e) => handleStatusChange(o.id, e.target.value)}
                              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--gray-3)', fontWeight: 800, fontSize: '0.86rem', background: 'white' }}
                            >
                              <option value="pending">🟡 Pending Confirmation</option>
                              <option value="confirmed">🔵 Confirmed & Dispatched</option>
                              <option value="delivered">🟢 Delivered Successfully</option>
                            </select>

                            <a
                              href={`https://wa.me/${o.phone?.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(o.customer_name)}!%20Update%20regarding%20your%20SmartKids%20Toys%20order%20%23${o.order_number}%20(Status:%20${st.toUpperCase()}):`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-whatsapp"
                              style={{ padding: '8px 14px', fontSize: '0.84rem' }}
                            >
                              <MessageCircle size={15} /> WhatsApp
                            </a>
                          </div>
                        </div>

                        {/* Visual Status Progress Stepper */}
                        <div style={{ background: 'white', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-2)', marginBottom: '16px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', position: 'relative' }}>
                            <div style={{ color: isPending || isConfirmed || isDelivered ? '#0284C7' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.85rem' }}>
                              ✓ 1. Order Received
                            </div>
                            <div style={{ color: isConfirmed || isDelivered ? '#0284C7' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.85rem' }}>
                              {isConfirmed || isDelivered ? '✓ 2. Dispatched & In Transit' : '○ 2. Dispatch Pending'}
                            </div>
                            <div style={{ color: isDelivered ? '#10B981' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.85rem' }}>
                              {isDelivered ? '✓ 3. Delivered' : '○ 3. Delivery Pending'}
                            </div>
                          </div>
                        </div>

                        {/* Customer & Address Details */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '0.88rem', background: 'white', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                          <div><strong>Customer:</strong> {o.customer_name}</div>
                          <div><strong>Phone:</strong> {o.phone}</div>
                          <div><strong>City:</strong> {o.city}</div>
                          <div><strong>Total Amount:</strong> <span style={{ color: 'var(--dark-heading)', fontWeight: 900 }}>PKR {Number(o.total).toLocaleString()}</span></div>
                          <div style={{ gridColumn: '1 / -1' }}><strong>Delivery Address:</strong> {o.address}</div>
                        </div>

                      </div>
                    );
                  })
                ) : (
                  <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No orders match your filter.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: STORE PRODUCTS */}
          {activeTab === 'products' && (
            <div style={{ background: 'white', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900 }}>Store Products ({products.length})</h2>
                <button
                  onClick={openNewProductModal}
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '8px 18px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> + Add New Toy
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--gray-2)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 14px' }}>Product</th>
                      <th style={{ padding: '12px 14px' }}>Category</th>
                      <th style={{ padding: '12px 14px' }}>Price</th>
                      <th style={{ padding: '12px 14px' }}>Stock</th>
                      <th style={{ padding: '12px 14px' }}>Badges</th>
                      <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--gray-2)' }}>
                        <td style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.image_url || '/assets/logo.png'}
                            alt={p.name}
                            style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', background: '#F8FAFC' }}
                          />
                          <div>
                            <strong style={{ display: 'block', color: 'var(--dark-heading)' }}>{p.name}</strong>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.description?.substring(0, 40)}...</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>{p.category}</td>
                        <td style={{ padding: '12px 14px', fontWeight: 800 }}>PKR {Number(p.price).toLocaleString()}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ color: p.stock > 0 ? '#16A34A' : '#EF4444', fontWeight: 700 }}>
                            {p.stock} units
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {p.is_new && <span style={{ background: '#EFF6FF', color: '#0284C7', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 800, marginRight: '4px' }}>New</span>}
                          {p.is_deal && <span style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 800 }}>Deal</span>}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => openEditProductModal(p)}
                              style={{ padding: '6px 10px', background: '#EFF6FF', color: 'var(--primary-blue)', borderRadius: 'var(--radius-md)', fontWeight: 800 }}
                              title="Edit Toy"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              style={{ padding: '6px 10px', background: '#FEE2E2', color: '#EF4444', borderRadius: 'var(--radius-md)', fontWeight: 800 }}
                              title="Delete Toy"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS MANAGEMENT */}
          {activeTab === 'customers' && (
            <div style={{ background: 'white', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900 }}>Registered Customers ({customers.length})</h2>
                <button
                  onClick={() => setShowCustomerModal(true)}
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '8px 18px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <UserPlus size={16} /> + Add Customer
                </button>
              </div>

              {/* Search Customers */}
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Search customers by name, phone, city, or ID..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px 10px 38px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-full)', fontSize: '0.88rem' }}
                />
                <Search size={16} color="var(--gray-4)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--gray-2)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 14px' }}>Customer ID</th>
                      <th style={{ padding: '12px 14px' }}>Name</th>
                      <th style={{ padding: '12px 14px' }}>Phone / WhatsApp</th>
                      <th style={{ padding: '12px 14px' }}>City</th>
                      <th style={{ padding: '12px 14px' }}>Address</th>
                      <th style={{ padding: '12px 14px', textAlign: 'right' }}>Direct Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid var(--gray-2)' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ background: '#EFF6FF', color: '#0284C7', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.8rem' }}>
                            {c.customer_number || 'SKT-CUS'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: 800 }}>{c.full_name}</td>
                        <td style={{ padding: '12px 14px' }}>{c.phone || 'N/A'}</td>
                        <td style={{ padding: '12px 14px' }}>{c.city || 'Lahore'}</td>
                        <td style={{ padding: '12px 14px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>{c.address || 'Not specified'}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          {c.phone && (
                            <a
                              href={`https://wa.me/${c.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(c.full_name)}!%20Greeting%20from%20SmartKids%20Toys:`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-whatsapp"
                              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            >
                              <MessageCircle size={14} /> WhatsApp
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 5b: HOMEPAGE IMAGES */}
          {activeTab === 'homepage_images' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              <div style={{ background: 'white', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="#D97706" /> Homepage Images Manager
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '0' }}>
                  Paste an image URL below — it becomes the full-cover background of that card/section. All changes save instantly.
                </p>
              </div>

              {/* HELPER: reusable image card editor */}
              {[
                {
                  section: 'Hero Section',
                  icon: '🏠',
                  bg: '#EFF6FF',
                  cards: [
                    { label: 'Hero Banner Image', key: 'hero_image_url' }
                  ]
                },
                {
                  section: 'Flash Sale Banner',
                  icon: '⚡',
                  bg: '#FEF3C7',
                  cards: [
                    { label: 'Flash Sale Image', key: 'flash_sale_image_url' }
                  ]
                },
                {
                  section: 'Shop by Age (4 Cards)',
                  icon: '🎂',
                  bg: '#F0FDF4',
                  cards: [
                    { label: '0–2 Years Background', key: 'age_0_2_bg_image' },
                    { label: '3–5 Years Background', key: 'age_3_5_bg_image' },
                    { label: '6–8 Years Background', key: 'age_6_8_bg_image' },
                    { label: '9–12 Years Background', key: 'age_9_12_bg_image' }
                  ]
                },
                {
                  section: 'Learn While You Play (4 Cards)',
                  icon: '🧠',
                  bg: '#EDE9FE',
                  cards: [
                    { label: 'Puzzles & Brain Games BG', key: 'learn_puzzles_bg_image' },
                    { label: 'STEM & Math Toys BG', key: 'learn_stem_bg_image' },
                    { label: 'Art & Creativity BG', key: 'learn_art_bg_image' },
                    { label: 'Educational Games BG', key: 'learn_games_bg_image' }
                  ]
                },
                {
                  section: 'Find the Perfect Gift (3 Cards)',
                  icon: '🎁',
                  bg: '#FDF2F8',
                  cards: [
                    { label: 'Birthday Gifts Background', key: 'gift_birthday_bg_image' },
                    { label: 'Educational Gifts Background', key: 'gift_educational_bg_image' },
                    { label: 'Gifts Under PKR 2,000 BG', key: 'gift_under2k_bg_image' }
                  ]
                },
                {
                  section: 'Instagram Gallery (6 Photos)',
                  icon: '📸',
                  bg: '#FCE7F3',
                  cards: [
                    { label: 'Instagram Photo 1', key: 'instagram_img_1' },
                    { label: 'Instagram Photo 2', key: 'instagram_img_2' },
                    { label: 'Instagram Photo 3', key: 'instagram_img_3' },
                    { label: 'Instagram Photo 4', key: 'instagram_img_4' },
                    { label: 'Instagram Photo 5', key: 'instagram_img_5' },
                    { label: 'Instagram Photo 6', key: 'instagram_img_6' }
                  ]
                }
              ].map((group) => (
                <div key={group.section} style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--dark-heading)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{group.icon}</span> {group.section}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {group.cards.map((card) => {
                      const currentUrl = settingsForm[card.key] || '';
                      return (
                        <div key={card.key}>
                          <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-heading)' }}>
                            {card.label}
                          </label>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                            <input
                              type="url"
                              placeholder="https://images.unsplash.com/photo-..."
                              value={currentUrl}
                              onChange={(e) => setSettingsForm(prev => ({ ...prev, [card.key]: e.target.value }))}
                              style={{ flex: 1, padding: '9px 12px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}
                            />
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await settingsService.updateSetting(card.key, settingsForm[card.key] || '');
                                  setSaveSettingsSuccess(true);
                                  setTimeout(() => setSaveSettingsSuccess(false), 2500);
                                } catch(err) {
                                  alert('Error saving image: ' + err.message);
                                }
                              }}
                              style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '9px 16px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '0.82rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                              <Save size={14} /> Save
                            </button>
                          </div>

                          {/* Live preview as full-cover background */}
                          {currentUrl ? (
                            <div style={{
                              width: '100%',
                              height: '160px',
                              borderRadius: 'var(--radius-md)',
                              overflow: 'hidden',
                              border: '2px solid #0284C7',
                              background: '#F8FAFC',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img
                                src={currentUrl}
                                alt="preview"
                                onError={(e) => { e.target.style.display='none'; }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                              />
                            </div>
                          ) : (
                            <div style={{ width: '100%', height: '130px', borderRadius: 'var(--radius-md)', background: group.bg, border: '2px dashed var(--gray-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>
                              No image set — paste a URL above
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {saveSettingsSuccess && (
                <div style={{ background: '#DCFCE7', color: '#16A34A', padding: '12px 16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                  <CheckCircle2 size={18} /> Image saved! Refresh homepage to see changes.
                </div>
              )}

              {/* Save All Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await settingsService.updateMultipleSettings(settingsForm);
                      setSaveSettingsSuccess(true);
                      setTimeout(() => setSaveSettingsSuccess(false), 3000);
                    } catch(err) {
                      alert('Error saving: ' + err.message);
                    }
                  }}
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #D97706, #B45309)', color: 'white', padding: '12px 28px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Save size={18} /> Save All Images
                </button>
              </div>

            </div>
          )}

          {/* TAB 5: SITE CONFIGURATION */}
          {activeTab === 'settings' && (
            <div style={{ background: 'white', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '6px' }}>Site Configuration & Contact</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                Update WhatsApp ordering number, contact details, and social channels.
              </p>

              {saveSettingsSuccess && (
                <div style={{ background: '#DCFCE7', color: '#16A34A', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                  <CheckCircle2 size={18} />
                  <span>Settings saved and updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>WhatsApp Number (Receiving Orders) *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsapp_number || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                    />
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>With country code, e.g. 923098444501</span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>WhatsApp Display Text</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp_display || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_display: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                    />
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>e.g. 03098444501</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Contact Email</label>
                    <input
                      type="email"
                      value={settingsForm.contact_email || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contact_email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Free Delivery Threshold (PKR)</label>
                    <input
                      type="number"
                      value={settingsForm.free_delivery_threshold || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, free_delivery_threshold: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={settingsForm.site_announcement || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, site_announcement: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Legacy fallback text (not shown in scrolling ticker)</span>
                </div>

                {/* Scrolling Announcement Messages */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>📢 Scrolling Announcement Messages</label>
                  <textarea
                    rows={4}
                    value={settingsForm.announcement_messages || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcement_messages: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', resize: 'vertical' }}
                    placeholder="🚚 Free Shipping on orders above PKR 3,000|⚡ Flash Sale — Up to 40% OFF!"
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Separate messages with a pipe <strong>|</strong> — each one scrolls across the dark top bar.</span>
                </div>

                {/* ⚡ Flash Sale Countdown Timer Control */}
                <div style={{ background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)', borderRadius: 'var(--radius-lg)', padding: '22px', border: '1.5px solid #FDE68A' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>⚡</span> Flash Sale Countdown Timer
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#92400E', marginBottom: '16px', fontWeight: 600 }}>
                    Set the exact end date & time for the flash sale. The homepage countdown will sync automatically.
                  </p>

                  {/* Current target display */}
                  {settingsForm.flash_sale_end_date && (
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: '14px', border: '1px solid #FDE68A', fontSize: '0.85rem', fontWeight: 700, color: '#92400E' }}>
                      ⏰ Current end: {new Date(settingsForm.flash_sale_end_date).toLocaleString('en-PK', { dateStyle: 'full', timeStyle: 'short' })}
                    </div>
                  )}

                  {/* Exact datetime input */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: 700, marginBottom: '6px' }}>Set Exact End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={settingsForm.flash_sale_end_date ? settingsForm.flash_sale_end_date.slice(0, 16) : ''}
                      onChange={(e) => {
                        const iso = e.target.value ? new Date(e.target.value).toISOString() : '';
                        setSettingsForm({ ...settingsForm, flash_sale_end_date: iso });
                      }}
                      style={{ padding: '10px 14px', border: '1.5px solid #FDE68A', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white', width: '100%', maxWidth: '340px' }}
                    />
                  </div>

                  {/* Quick-adjust buttons */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: 700, marginBottom: '8px' }}>Quick Adjust</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { label: '+1 Hour', delta: 60 * 60 * 1000, color: '#059669' },
                        { label: '+1 Day',  delta: 24 * 60 * 60 * 1000, color: '#0284C7' },
                        { label: '+3 Days', delta: 3 * 24 * 60 * 60 * 1000, color: '#7C3AED' },
                        { label: '+7 Days', delta: 7 * 24 * 60 * 60 * 1000, color: '#DB2777' },
                        { label: '−1 Day',  delta: -24 * 60 * 60 * 1000, color: '#EF4444' },
                        { label: '−1 Hour', delta: -60 * 60 * 1000, color: '#F59E0B' }
                      ].map(({ label, delta, color }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => {
                            const current = settingsForm.flash_sale_end_date
                              ? new Date(settingsForm.flash_sale_end_date).getTime()
                              : Date.now() + 24 * 60 * 60 * 1000;
                            const next = new Date(Math.max(Date.now(), current + delta));
                            setSettingsForm({ ...settingsForm, flash_sale_end_date: next.toISOString() });
                          }}
                          style={{ padding: '7px 14px', borderRadius: 'var(--radius-full)', background: color, color: 'white', fontWeight: 800, fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Links */}

                <div style={{ borderTop: '1px solid var(--gray-2)', paddingTop: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>Social Media Links</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Facebook Page URL</label>
                      <input
                        type="url"
                        value={settingsForm.facebook_url || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, facebook_url: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Instagram Profile URL</label>
                      <input
                        type="url"
                        value={settingsForm.instagram_url || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, instagram_url: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>TikTok Profile URL</label>
                      <input
                        type="url"
                        value={settingsForm.tiktok_url || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, tiktok_url: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>YouTube Channel URL</label>
                      <input
                        type="url"
                        value={settingsForm.youtube_url || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, youtube_url: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '12px 32px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start' }}
                >
                  <Save size={18} /> Save Settings
                </button>

              </form>
            </div>
          )}

        </div>
      </div>

      {/* 1. MANUAL ORDER CREATION MODAL */}
      {showOrderModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '620px', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <button
              onClick={() => setShowOrderModal(false)}
              style={{ position: 'absolute', top: '18px', right: '18px', background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>
              Create Customer Order
            </h2>

            <form onSubmit={handleCreateManualOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bilal Ahmed"
                    value={manualOrderForm.customerName}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, customerName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="03XX XXXXXXX"
                    value={manualOrderForm.phone}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>City *</label>
                  <select
                    value={manualOrderForm.city}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, city: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', background: 'white' }}
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Initial Order Status</label>
                  <select
                    value={manualOrderForm.status}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', background: 'white' }}
                  >
                    <option value="confirmed">🔵 Confirmed & Dispatched</option>
                    <option value="pending">🟡 Pending Confirmation</option>
                    <option value="delivered">🟢 Delivered Successfully</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Delivery Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Street address, house number, area..."
                  value={manualOrderForm.address}
                  onChange={(e) => setManualOrderForm({ ...manualOrderForm, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              {/* Order Items Selector */}
              <div style={{ borderTop: '1px solid var(--gray-2)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 800 }}>Ordered Toys</label>
                  <button
                    type="button"
                    onClick={addProductToManualOrder}
                    style={{ background: '#EFF6FF', color: 'var(--primary-blue)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.8rem' }}
                  >
                    + Add Another Toy
                  </button>
                </div>

                {manualOrderForm.selectedProducts.map((item, index) => (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 80px auto', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <select
                      value={item.productId}
                      onChange={(e) => updateManualOrderItem(index, 'productId', e.target.value)}
                      style={{ padding: '8px 12px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', background: 'white' }}
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} (PKR {Number(p.price).toLocaleString()})
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateManualOrderItem(index, 'qty', e.target.value)}
                      style={{ padding: '8px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '0.88rem' }}
                    />

                    <button
                      type="button"
                      onClick={() => removeManualOrderItem(index)}
                      style={{ color: '#EF4444', background: 'none', padding: '6px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                <div style={{ marginTop: '14px', padding: '12px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize: '1.05rem' }}>
                  <span>Calculated Order Total:</span>
                  <span style={{ color: 'var(--dark-heading)' }}>
                    PKR {manualOrderForm.selectedProducts.reduce((sum, item) => sum + item.price * item.qty, 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', background: '#F1F5F9', color: 'var(--text)', fontWeight: 700 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-full)', fontWeight: 800 }}
                >
                  Save & Place Order
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 2. CUSTOMER ADD MODAL */}
      {showCustomerModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '500px', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
            
            <button
              onClick={() => setShowCustomerModal(false)}
              style={{ position: 'absolute', top: '18px', right: '18px', background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>
              Add New Customer
            </h2>

            <form onSubmit={handleCreateCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={customerForm.fullName}
                  onChange={(e) => setCustomerForm({ ...customerForm, fullName: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="03XX XXXXXXX"
                  value={customerForm.phone}
                  onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>City *</label>
                <select
                  value={customerForm.city}
                  onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', background: 'white' }}
                >
                  {PAKISTAN_CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Address</label>
                <textarea
                  rows={2}
                  placeholder="House number, street address..."
                  value={customerForm.address}
                  onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowCustomerModal(false)}
                  style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', background: '#F1F5F9', color: 'var(--text)', fontWeight: 700 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-full)', fontWeight: 800 }}
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. PRODUCT ADD / EDIT MODAL */}
      {showProductModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '560px', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <button
              onClick={() => setShowProductModal(false)}
              style={{ position: 'absolute', top: '18px', right: '18px', background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>
              {editingProduct ? 'Edit Toy Details' : 'Add New Toy'}
            </h2>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Product Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cute Teddy Bear Plush"
                  value={productForm.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    const autoSlug = (!editingProduct || !productForm.slug) ? slugify(newName) : productForm.slug;
                    setProductForm({ ...productForm, name: newName, slug: autoSlug });
                  }}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                />
              </div>

              {/* SEO URL Slug */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Globe size={14} color="#0284C7" /> SEO URL Slug (Permalink) *
                  </span>
                  <button
                    type="button"
                    onClick={() => setProductForm({ ...productForm, slug: slugify(productForm.name) })}
                    style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Auto-Generate
                  </button>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. cute-teddy-bear-plush"
                  value={productForm.slug}
                  onChange={(e) => setProductForm({ ...productForm, slug: slugify(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', fontFamily: 'monospace' }}
                />
                <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                  <span>Live Product URL:</span>
                  <span style={{ color: '#0284C7', fontWeight: 700, background: '#F0F9FF', padding: '2px 8px', borderRadius: '4px', wordBreak: 'break-all' }}>
                    smartkidstoys.pk/product/{productForm.slug || slugify(productForm.name) || 'toy-slug'}
                  </span>
                </div>
              </div>

              {/* Category + Age Range */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>🏷️ Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>👶 Age Range *</label>
                  <select
                    value={productForm.age_range}
                    onChange={(e) => setProductForm({ ...productForm, age_range: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
                  >
                    {AGE_RANGES.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Educational Skill + Badge */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>🧠 Educational Skill</label>
                  <select
                    value={productForm.educational_skill}
                    onChange={(e) => setProductForm({ ...productForm, educational_skill: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
                  >
                    {EDUCATIONAL_SKILLS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>🎖️ Product Badge</label>
                  <select
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', background: 'white' }}
                  >
                    {BADGE_PRESETS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock + Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Inventory Stock *</label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Sale Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1750"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              {/* Original Price */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Original Price (PKR) <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optional — shows strikethrough discount)</span></label>
                <input
                  type="number"
                  placeholder="2500"
                  value={productForm.old_price}
                  onChange={(e) => setProductForm({ ...productForm, old_price: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
                />
              </div>

              {/* Image URL + Live Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>🖼️ Product Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-... or any direct image link"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', marginBottom: '10px' }}
                />
                {/* Live image preview — object-fit contain so you see the full product, no cropping */}
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  border: productForm.image_url ? '2px solid #0284C7' : '2px dashed #CBD5E1',
                  borderRadius: 'var(--radius-md)',
                  background: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {productForm.image_url ? (
                    <img
                      src={productForm.image_url}
                      alt="Product preview"
                      onError={(e) => { e.target.style.display='none'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      <ImageIcon size={32} style={{ marginBottom: '8px', opacity: 0.4 }} />
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Paste a URL above to see a live preview</div>
                      <div style={{ fontSize: '0.72rem', marginTop: '4px', opacity: 0.7 }}>Recommended: square or 4:3 product photo on white/light bg</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Super soft and cuddly plush teddy bear. Perfect companion for kids."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', resize: 'vertical' }}
                />
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', gap: '20px', margin: '4px 0 10px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={productForm.is_new}
                    onChange={(e) => setProductForm({ ...productForm, is_new: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary-blue)' }}
                  />
                  <span>✨ New Arrival</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={productForm.is_deal}
                    onChange={(e) => setProductForm({ ...productForm, is_deal: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#F59E0B' }}
                  />
                  <span>⚡ Special Deal</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', background: '#F1F5F9', color: 'var(--text)', fontWeight: 700 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-full)', fontWeight: 800 }}
                >
                  {editingProduct ? 'Save Changes' : '+ Add Toy'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
