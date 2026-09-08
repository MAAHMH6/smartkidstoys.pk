import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { settingsService, DEFAULT_SETTINGS } from '../services/settingsService';
import ProductCard from '../components/common/ProductCard';
import SEO from '../components/common/SEO';
import { Sparkles, Filter, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'Action Figures',
  'Soft Toys',
  'Educational',
  'Vehicles',
  'Building Blocks',
  'Puzzles',
  'Outdoor Toys',
  'Baby Toys'
];

const PRICE_RANGES = [
  { label: 'Under PKR 1,000', min: 0, max: 1000 },
  { label: 'PKR 1,000–2,500', min: 1000, max: 2500 },
  { label: 'PKR 2,500–5,000', min: 2500, max: 5000 },
  { label: 'Above PKR 5,000', min: 5000, max: Infinity }
];

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productService.getNewArrivals().catch(() => []),
      settingsService.getSettings().catch(() => DEFAULT_SETTINGS)
    ]).then(([data, sets]) => {
      setProducts(Array.isArray(data) ? data : []);
      if (sets) setSettings(sets);
      setLoading(false);
    }).catch(err => {
      console.warn('Failed to load new arrivals:', err);
      setLoading(false);
    });
  }, []);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceToggle = (rangeIndex) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeIndex)
        ? prev.filter((i) => i !== rangeIndex)
        : [...prev, rangeIndex]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setAvailability({ inStock: false, outOfStock: false });
  };

  const filteredProducts = (products || []).filter((product) => {
    if (!product) return false;
    if (selectedCategories.length > 0) {
      if (!selectedCategories.some((cat) => cat.toLowerCase() === (product.category || '').toLowerCase())) {
        return false;
      }
    }

    if (selectedPriceRanges.length > 0) {
      const price = Number(product.price) || 0;
      const matchesPrice = selectedPriceRanges.some((rangeIdx) => {
        const range = PRICE_RANGES[rangeIdx];
        return price >= range.min && price <= range.max;
      });
      if (!matchesPrice) return false;
    }

    if (availability.inStock && !availability.outOfStock) {
      if ((product.stock ?? 0) <= 0) return false;
    }
    if (availability.outOfStock && !availability.inStock) {
      if ((product.stock ?? 0) > 0) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return (Number(a.price) || 0) - (Number(b.price) || 0);
    if (sortBy === 'price-high') return (Number(b.price) || 0) - (Number(a.price) || 0);
    if (sortBy === 'rating') return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    return 0; // newest default
  });

  return (
    <div className="container archive post-type-archive post-type-archive-product woocommerce-page" style={{ padding: '20px 20px 80px' }}>
      <SEO
        title="New Arrival Toys Pakistan | Latest Kids Toys & Games"
        description="Explore the newest toy arrivals in Pakistan at SmartKids Toys. Fresh stock of educational toys, STEM sets, baby toys, RC vehicles, and puzzles with fast home delivery."
        canonical="https://www.smartkidstoys.pk/new-arrivals"
        ogImage={settings.new_arrivals_banner_image || "/assets/train-banner.png"}
      />
      {/* 1. New Arrivals Header Banner (Full background with train) */}
      <section className="demo-hero-section" style={{ minHeight: '220px', background: '#DCEFFA', marginBottom: '32px' }}>
        <img
          src={settings.new_arrivals_banner_image || settings.train_banner_image || '/assets/train-banner.png'}
          alt="New Arrivals Banner"
          className="demo-banner-full-bg"
        />
        <div className="demo-banner-card-content" style={{ padding: '36px 40px', maxWidth: '440px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(2, 132, 199, 0.12)', color: '#0284C7', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.78rem', marginBottom: '8px' }}>
            <Sparkles size={14} /> Freshly Added
          </div>
          <h1 className="demo-banner-title" style={{ color: '#0369A1', fontSize: '2rem' }}>New Arrivals</h1>
          <p className="demo-banner-sub" style={{ marginBottom: 0 }}>
            Fresh toys just for your smart kids! Explore the newest arrivals below.
          </p>
        </div>
      </section>

      {/* 2. Standard Shop Layout with Filter Sidebar + Product Grid */}
      <div className="shop-layout">
        {/* Left Filter Sidebar */}
        <aside className="shop-sidebar widget-area" aria-label="Product Filters">
          <div className="filter-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 800 }}>
              <Filter size={18} color="var(--primary-blue)" /> Filters
            </h3>
            {(selectedCategories.length > 0 || selectedPriceRanges.length > 0 || availability.inStock || availability.outOfStock) && (
              <button onClick={handleClearFilters} className="filter-clear-btn" style={{ color: 'var(--primary-blue)' }}>
                Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="filter-group widget woocommerce widget_product_categories">
            <h4 className="filter-group-title">Categories</h4>
            {CATEGORIES.map((cat) => (
              <label key={cat} className="filter-option-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-group widget woocommerce widget_price_filter">
            <h4 className="filter-group-title">Price Range</h4>
            {PRICE_RANGES.map((range, index) => (
              <label key={range.label} className="filter-option-item">
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(index)}
                  onChange={() => handlePriceToggle(index)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>

          {/* Availability */}
          <div className="filter-group widget woocommerce widget_stock_filter">
            <h4 className="filter-group-title">Availability</h4>
            <label className="filter-option-item">
              <input
                type="checkbox"
                checked={availability.inStock}
                onChange={(e) => setAvailability((prev) => ({ ...prev, inStock: e.target.checked }))}
              />
              <span>In Stock</span>
            </label>
            <label className="filter-option-item">
              <input
                type="checkbox"
                checked={availability.outOfStock}
                onChange={(e) => setAvailability((prev) => ({ ...prev, outOfStock: e.target.checked }))}
              />
              <span>Out of Stock</span>
            </label>
          </div>
        </aside>

        {/* Right Main Product Area */}
        <main className="site-main">
          {/* Top Ordering & Result Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <p className="woocommerce-result-count" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
              Showing {sortedProducts.length} new {sortedProducts.length === 1 ? 'toy' : 'toys'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={16} color="var(--gray-4)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--gray-2)', fontSize: '0.86rem', fontWeight: 700, background: 'white' }}
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="products columns-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="woocommerce-info" style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🚂</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>No new arrival products match your filters.</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>Try clearing filters to see all new items.</p>
              <button onClick={handleClearFilters} className="btn-hero-shop" style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
