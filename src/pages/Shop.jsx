import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

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

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat]);
    }
  }, [searchParams]);

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
    setSearchParams({});
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0) {
      if (!selectedCategories.some((cat) => cat.toLowerCase() === product.category?.toLowerCase())) {
        return false;
      }
    }

    if (selectedPriceRanges.length > 0) {
      const price = Number(product.price);
      const matchesPrice = selectedPriceRanges.some((rangeIdx) => {
        const range = PRICE_RANGES[rangeIdx];
        return price >= range.min && price <= range.max;
      });
      if (!matchesPrice) return false;
    }

    if (availability.inStock && !availability.outOfStock) {
      if (product.stock <= 0) return false;
    }
    if (availability.outOfStock && !availability.inStock) {
      if (product.stock > 0) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="container archive post-type-archive post-type-archive-product woocommerce-page" style={{ padding: '32px 20px 80px' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h1 className="woocommerce-products-header__title page-title" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '6px' }}>
          Shop All Toys
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Discover fun, creative, and educational toys for every little explorer.
        </p>
      </div>

      <div className="shop-layout">
        {/* WooCommerce Sidebar Layered Navigation */}
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

        {/* WooCommerce Main Products Area */}
        <main className="site-main">
          {/* Top Ordering & Result Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <p className="woocommerce-result-count" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'result' : 'results'}
            </p>

            <form className="woocommerce-ordering" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={16} color="var(--gray-4)" />
              <select
                name="orderby"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="orderby"
                style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--gray-2)', fontSize: '0.86rem', fontWeight: 700, background: 'white' }}
              >
                <option value="featured">Sort by popularity</option>
                <option value="rating">Sort by average rating</option>
                <option value="newest">Sort by latest</option>
                <option value="price-low">Sort by price: low to high</option>
                <option value="price-high">Sort by price: high to low</option>
              </select>
            </form>
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
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧸</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>No products were found matching your selection.</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>Try clearing filters to see all available toys.</p>
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
