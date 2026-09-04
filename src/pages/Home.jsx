import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService, SMARTKIDS_BUNDLES } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Banknote, 
  ArrowRight, 
  Brain, 
  Palette, 
  Heart, 
  Flame, 
  Sparkles, 
  Gift, 
  PackagePlus, 
  ShoppingBag, 
  MessageCircle 
} from 'lucide-react';

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      productService.getBestSellers(),
      productService.getBundles()
    ]).then(([bestsellersData, bundlesData]) => {
      setBestSellers(bestsellersData.slice(0, 8));
      setBundles(bundlesData);
      setLoading(false);
    });
  }, []);

  const circularCategories = [
    { name: 'Soft Toys', emoji: '🧸', bg: '#FEE2E2', link: '/shop?category=Soft%20Toys' },
    { name: 'Building Blocks', emoji: '🧱', bg: '#EFF6FF', link: '/shop?category=Building%20Blocks' },
    { name: 'Educational', emoji: '🎓', bg: '#DCFCE7', link: '/shop?category=Educational' },
    { name: 'Vehicles', emoji: '🚗', bg: '#FEF3C7', link: '/shop?category=Vehicles' },
    { name: 'Action Figures', emoji: '🤖', bg: '#F3E8FF', link: '/shop?category=Action%20Figures' },
    { name: 'Puzzles', emoji: '🧩', bg: '#FCE7F3', link: '/shop?category=Puzzles' },
    { name: 'Outdoor Toys', emoji: '🏐', bg: '#FEF9C3', link: '/shop?category=Outdoor%20Toys' },
    { name: 'All Toys', emoji: '🎪', bg: '#E0E7FF', link: '/shop' }
  ];

  const ageBrackets = [
    { label: '1–3 Years', icon: '👶', subtitle: 'Sensory & Toddler Play', bg: '#FFF1F2', border: '#FECDD3', color: '#E11D48', age: '1-3' },
    { label: '3–5 Years', icon: '🧒', subtitle: 'Blocks & Imagination', bg: '#EFF6FF', border: '#BFDBFE', color: '#1D4ED8', age: '3-5' },
    { label: '5–8 Years', icon: '🧠', subtitle: 'STEM & Logic Games', bg: '#F0FDF4', border: '#BBF7D0', color: '#15803D', age: '5-8' },
    { label: '8+ Years', icon: '🚀', subtitle: 'Robotics & Challenges', bg: '#FAF5FF', border: '#E9D5FF', color: '#7E22CE', age: '8+' }
  ];

  const budgetTiers = [
    { label: 'Under Rs 1,000', badge: 'Super Value', maxPrice: 1000, bg: '#ECFDF5', color: '#047857' },
    { label: 'Under Rs 1,500', badge: 'Most Popular', maxPrice: 1500, bg: '#EFF6FF', color: '#1D4ED8' },
    { label: 'Under Rs 2,000', badge: 'Great Deals', maxPrice: 2000, bg: '#FEF3C7', color: '#B45309' },
    { label: 'Under Rs 3,000', badge: 'Premium Sets', maxPrice: 3000, bg: '#FDF2F8', color: '#BE185D' }
  ];

  const whyChooseReasons = [
    {
      icon: <Brain size={28} color="#8B5CF6" />,
      title: 'Learning Through Play',
      desc: 'Carefully curated to enhance cognitive growth, fine motor dexterity, and problem-solving skills.',
      bg: '#F3E8FF'
    },
    {
      icon: <Palette size={28} color="#0284C7" />,
      title: 'Creative & Screen-Free',
      desc: 'Healthy hands-on entertainment that keeps kids engaged without mobile screens or tablets.',
      bg: '#E0F2FE'
    },
    {
      icon: <ShieldCheck size={28} color="#10B981" />,
      title: 'Quality Checked Toys',
      desc: '100% child-safe, non-toxic, and tested for durable everyday active play.',
      bg: '#DCFCE7'
    },
    {
      icon: <Heart size={28} color="#EF4444" />,
      title: 'Kids Love Them',
      desc: 'Over 10,000+ smiling children and delighted parents across every city in Pakistan.',
      bg: '#FEE2E2'
    }
  ];

  return (
    <div className="container woocommerce-page">
      <h1 className="sr-only">SmartKids Toys — Play, Learn, Grow Together | Quality Screen-Free Toys for Pakistani Kids</h1>

      {/* 1. Hero Section with Updated Headline, Subtitle, and Dual CTAs */}
      <section className="demo-hero-section" style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', marginBottom: '24px', background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' }}>
        <div style={{ padding: '40px 24px', color: '#FFFFFF', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: '#FFFFFF', 
            padding: '4px 14px', 
            borderRadius: '9999px', 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            marginBottom: '16px',
            backdropFilter: 'blur(4px)'
          }}>
            <Sparkles size={15} color="#FDE047" /> Pakistan's Favorite Educational Toy Store
          </span>

          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '14px', color: '#FFFFFF' }}>
            Play. Learn. Grow. Together.
          </h2>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#E0F2FE', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.5, fontWeight: 500 }}>
            Fun, educational &amp; screen-free toys carefully selected for Pakistani kids.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link 
              to="/shop?filter=bestseller" 
              className="btn" 
              style={{ 
                background: '#F59E0B', 
                color: '#0F172A', 
                fontWeight: 900, 
                fontSize: '1.05rem', 
                padding: '14px 28px', 
                borderRadius: '9999px', 
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Flame size={18} fill="#0F172A" /> Shop Best Sellers
            </Link>

            <Link 
              to="/shop?category=Educational" 
              className="btn" 
              style={{ 
                background: '#FFFFFF', 
                color: '#0284C7', 
                fontWeight: 800, 
                fontSize: '1.05rem', 
                padding: '14px 28px', 
                borderRadius: '9999px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
              }}
            >
              Shop Educational Toys
            </Link>
          </div>
        </div>

        {/* Hero Visual Banner Attachment */}
        <Link to="/shop" style={{ display: 'block', marginTop: '10px' }} aria-label="Explore SmartKids Toys Collection">
          <img
            src="/assets/hero-banner.png"
            alt="Play, Learn & Grow Together - SmartKids Toys Pakistan"
            className="demo-hero-banner-img"
            style={{ borderRadius: '0 0 16px 16px', display: 'block' }}
          />
        </Link>
      </section>

      {/* 2. Trust Section (4 Updated Benefits) */}
      <section className="demo-trust-bar">
        <div className="demo-trust-grid">
          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#EFF6FF', color: '#0284C7' }}>
              <Truck size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Fast Delivery Across Pakistan</div>
              <div className="demo-trust-desc">Free delivery on orders above Rs 3,000</div>
            </div>
          </div>

          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>
              <Banknote size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Cash on Delivery</div>
              <div className="demo-trust-desc">Safe payment at your doorstep</div>
            </div>
          </div>

          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <RotateCcw size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Easy Returns</div>
              <div className="demo-trust-desc">14-day hassle-free replacement</div>
            </div>
          </div>

          <div className="demo-trust-item">
            <div className="demo-trust-icon" style={{ background: '#F3E8FF', color: '#7C3AED' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="demo-trust-title">Quality Checked Toys</div>
              <div className="demo-trust-desc">100% child-safe non-toxic materials</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category (Circular Icons) */}
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
              onClick={() => navigate(cat.link)}
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

      {/* 4. 🔥 SmartKids Best Sellers */}
      <section style={{ marginBottom: '50px' }} aria-labelledby="best-sellers-heading">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-dots" aria-hidden="true">
              <span className="section-dot" style={{ background: '#EF4444' }}></span>
              <span className="section-dot" style={{ background: '#F59E0B' }}></span>
              <span className="section-dot" style={{ background: '#10B981' }}></span>
            </div>
            <h2 id="best-sellers-heading" className="section-title-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              🔥 SmartKids Best Sellers
            </h2>
          </div>

          <Link to="/shop?filter=bestseller" className="view-all-btn">
            <span>View All Best Sellers</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading best sellers...</div>
        ) : (
          <div className="demo-products-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Shop by Age Section */}
      <section style={{ marginBottom: '50px' }} aria-labelledby="shop-by-age-heading">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-dots" aria-hidden="true">
              <span className="section-dot" style={{ background: '#8B5CF6' }}></span>
              <span className="section-dot" style={{ background: '#0284C7' }}></span>
              <span className="section-dot" style={{ background: '#EC4899' }}></span>
            </div>
            <h2 id="shop-by-age-heading" className="section-title-text">Shop by Age</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {ageBrackets.map((bracket) => (
            <Link
              key={bracket.label}
              to={`/shop?age=${bracket.age}`}
              style={{
                background: bracket.bg,
                border: `2px solid ${bracket.border}`,
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{bracket.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: bracket.color, margin: '0 0 4px' }}>
                {bracket.label}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', margin: 0, fontWeight: 600 }}>
                {bracket.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. 🎁 Toys by Budget Section */}
      <section style={{ marginBottom: '50px' }} aria-labelledby="toys-budget-heading">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-dots" aria-hidden="true">
              <span className="section-dot" style={{ background: '#10B981' }}></span>
              <span className="section-dot" style={{ background: '#0284C7' }}></span>
              <span className="section-dot" style={{ background: '#F59E0B' }}></span>
            </div>
            <h2 id="toys-budget-heading" className="section-title-text">🎁 Toys by Budget</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {budgetTiers.map((tier) => (
            <Link
              key={tier.label}
              to={`/shop?maxPrice=${tier.maxPrice}`}
              style={{
                background: tier.bg,
                borderRadius: '14px',
                padding: '20px 16px',
                textAlign: 'center',
                textDecoration: 'none',
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ 
                background: tier.color, 
                color: '#FFFFFF', 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                padding: '2px 8px', 
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '8px'
              }}>
                {tier.badge}
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: tier.color, margin: '0 0 6px' }}>
                {tier.label}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Explore Toys <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. 🎁 SmartKids Bundles Section */}
      <section style={{ marginBottom: '50px' }} aria-labelledby="bundles-heading">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-dots" aria-hidden="true">
              <span className="section-dot" style={{ background: '#EC4899' }}></span>
              <span className="section-dot" style={{ background: '#8B5CF6' }}></span>
              <span className="section-dot" style={{ background: '#0284C7' }}></span>
            </div>
            <h2 id="bundles-heading" className="section-title-text">🎁 SmartKids Bundles</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {bundles.map((bundle) => (
            <div 
              key={bundle.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--gray-2)',
                padding: '18px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
                  <img 
                    src={bundle.image_url} 
                    alt={bundle.name} 
                    style={{ width: '100%', height: '170px', objectFit: 'cover' }} 
                  />
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#10B981',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    padding: '3px 9px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    {bundle.badge}
                  </span>
                </div>

                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase' }}>
                  {bundle.age_range} • {bundle.items_count} Toys Set
                </span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-heading)', margin: '4px 0 6px' }}>
                  {bundle.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {bundle.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0284C7' }}>
                    PKR {Number(bundle.price).toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    PKR {Number(bundle.original_price).toLocaleString()}
                  </span>
                </div>

                <a
                  href={`https://wa.me/923098444501?text=${encodeURIComponent(`Hello SmartKids Toys! 🎁 I want to order the *${bundle.name}* (Price: PKR ${bundle.price.toLocaleString()}, ${bundle.badge}). Please confirm my order!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    background: '#25D366',
                    color: '#FFFFFF',
                    borderRadius: '9999px',
                    padding: '10px 14px',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                  }}
                >
                  <MessageCircle size={16} /> Order Bundle via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Parents Choose SmartKids Section */}
      <section style={{ marginBottom: '50px', background: '#F8FAFC', borderRadius: '20px', padding: '36px 24px', border: '1px solid var(--gray-2)' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px' }}>
          <span style={{ color: '#0284C7', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Trusted by Pakistani Families
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--dark-heading)', margin: '6px 0 10px' }}>
            Why Parents Choose SmartKids
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            We believe childhood should be filled with discovery, joy, and meaningful screen-free moments.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {whyChooseReasons.map((reason) => (
            <div 
              key={reason.title}
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                padding: '24px 20px',
                border: '1px solid var(--gray-2)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: reason.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                {reason.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-heading)', margin: '0 0 8px' }}>
                {reason.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
