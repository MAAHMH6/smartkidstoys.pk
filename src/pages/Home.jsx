import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Lightbulb, 
  CheckCircle, 
  Heart 
} from 'lucide-react';

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    productService.getAll().then((data) => {
      setPopularProducts(data.slice(0, 5));
      setLoading(false);
    });
  }, []);

  const circularCategories = [
    { name: 'Action Figures', emoji: '🤖', bg: '#EFF6FF' },
    { name: 'Building Blocks', emoji: '🧱', bg: '#FEF3C7' },
    { name: 'Soft Toys', emoji: '🧸', bg: '#FCE7F3' },
    { name: 'Cars & Vehicles', emoji: '🚗', bg: '#DCFCE7' },
    { name: 'Puzzles', emoji: '🧩', bg: '#F3E8FF' },
    { name: 'Learning Toys', emoji: '🎓', bg: '#E0F2FE' },
    { name: 'Outdoor Toys', emoji: '🏐', bg: '#FEF9C3' },
    { name: 'All Toys', emoji: '🎪', bg: '#E0E7FF' }
  ];

  return (
    <div className="container woocommerce-page">
      {/* Hidden SEO H1 for indexing */}
      <h1 className="sr-only">SmartKids Toys — Play, Learn & Grow Together | Quality Toys for Kids in Pakistan</h1>

      {/* 1. Hero Banner: Clean responsive banner without duplicate overlapping text */}
      <section className="demo-hero-section">
        <Link to="/shop" className="demo-hero-banner-link" aria-label="Shop our complete toys collection">
          <img
            src="/assets/hero-banner.png"
            alt="Play, Learn & Grow Together - SmartKids Toys"
            className="demo-hero-banner-img"
          />
        </Link>
      </section>

      {/* 2. Floating Trust Cards Bar */}
      <section className="demo-trust-bar">
        <div className="demo-trust-grid">
          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <Truck size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Free Shipping</div>
              <div className="demo-trust-desc">On orders above PKR 3,000</div>
            </div>
          </div>

          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
              <RotateCcw size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Easy Returns</div>
              <div className="demo-trust-desc">14 days return policy</div>
            </div>
          </div>

          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Secure Payment</div>
              <div className="demo-trust-desc">100% secure checkout</div>
            </div>
          </div>

          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#FEF9C3', color: '#CA8A04' }}>
              <Award size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Top Quality Toys</div>
              <div className="demo-trust-desc">Safe & child-friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category (Circular Icons matching Demo) */}
      <section style={{ marginBottom: '44px' }} aria-labelledby="shop-by-cat-heading">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-dots" aria-hidden="true">
              <span className="section-dot" style={{ background: '#EF4444' }}></span>
              <span className="section-dot" style={{ background: '#F59E0B' }}></span>
              <span className="section-dot" style={{ background: '#0284C7' }}></span>
            </div>
            <h2 id="shop-by-cat-heading" className="section-title-text">Shop by Category</h2>
          </div>

          <Link to="/categories" className="view-all-btn">
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="circular-categories-grid">
          {circularCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.name === 'All Toys' ? '/shop' : `/shop?category=${encodeURIComponent(cat.name)}`)}
              className="circular-cat-card"
            >
              <div className="circular-cat-circle" style={{ background: cat.bg }}>
                {cat.emoji}
              </div>
              <span className="circular-cat-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Popular Toys (Product Cards Grid) */}
      <section style={{ marginBottom: '50px' }} aria-labelledby="popular-toys-heading">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-dots" aria-hidden="true">
              <span className="section-dot" style={{ background: '#EF4444' }}></span>
              <span className="section-dot" style={{ background: '#10B981' }}></span>
              <span className="section-dot" style={{ background: '#F59E0B' }}></span>
            </div>
            <h2 id="popular-toys-heading" className="section-title-text">Popular Toys</h2>
          </div>

          <Link to="/shop" className="view-all-btn">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products columns-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Banners (Full Image Backgrounds with Left Text Overlay) */}
      <section className="demo-banners-grid">
        {/* Left: New Arrivals Train Banner */}
        <div
          onClick={() => navigate('/new-arrivals')}
          className="demo-banner-card"
          style={{ background: '#DCEFFA' }}
        >
          {/* Full Card Background Image */}
          <img
            src="/assets/train-banner.png"
            alt="New Arrivals Banner"
            className="demo-banner-full-bg"
          />
          <div className="demo-banner-card-content">
            <h3 className="demo-banner-title" style={{ color: '#0369A1' }}>New Arrivals</h3>
            <p className="demo-banner-sub">
              Fresh toys<br />
              just for your kids!
            </p>
            <button className="btn-banner-action" style={{ background: '#0284C7', color: 'white' }}>
              Shop Now
            </button>
          </div>
        </div>

        {/* Right: Special Deals Teddy Bear Banner */}
        <div
          onClick={() => navigate('/deals')}
          className="demo-banner-card"
          style={{ background: '#FEF6DF' }}
        >
          {/* Full Card Background Image */}
          <img
            src="/assets/teddy-banner.png"
            alt="Special Deals Banner"
            className="demo-banner-full-bg"
          />
          <div className="demo-banner-card-content">
            <h3 className="demo-banner-title" style={{ color: '#B45309' }}>Special Deals</h3>
            <p className="demo-banner-sub">
              Up to 30% OFF<br />
              on selected toys
            </p>
            <button className="btn-banner-action" style={{ background: '#F59E0B', color: 'white' }}>
              Shop Deals
            </button>
          </div>
        </div>
      </section>

      {/* 6. Why Parents Love SmartKids Toys */}
      <section id="why-us" style={{ padding: '30px 0 60px' }} aria-labelledby="why-parents-heading">
        <div className="section-title-wrapper" style={{ marginBottom: '16px' }}>
          <div className="section-dots" aria-hidden="true">
            <span className="section-dot" style={{ background: '#EF4444' }}></span>
            <span className="section-dot" style={{ background: '#F59E0B' }}></span>
            <span className="section-dot" style={{ background: '#6366F1' }}></span>
          </div>
          <h2 id="why-parents-heading" className="section-title-text">Why Parents Love SmartKids Toys</h2>
        </div>

        <div className="why-parents-grid">
          <div className="why-parent-item">
            <div className="why-parent-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="why-parent-title">Safe & Non-Toxic</div>
              <div className="why-parent-desc">100% child safe</div>
            </div>
          </div>

          <div className="why-parent-item">
            <div className="why-parent-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
              <Lightbulb size={22} />
            </div>
            <div>
              <div className="why-parent-title">Educational Value</div>
              <div className="why-parent-desc">Toys that teach & inspire</div>
            </div>
          </div>

          <div className="why-parent-item">
            <div className="why-parent-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <div className="why-parent-title">Durable Quality</div>
              <div className="why-parent-desc">Made to last longer</div>
            </div>
          </div>

          <div className="why-parent-item">
            <div className="why-parent-icon" style={{ background: '#F3E8FF', color: '#7C3AED' }}>
              <Heart size={22} />
            </div>
            <div>
              <div className="why-parent-title">Loved by Kids</div>
              <div className="why-parent-desc">Fun guaranteed!</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
