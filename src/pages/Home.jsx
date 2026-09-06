import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Banknote, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Gift, 
  MessageCircle, 
  Clock, 
  Zap, 
  ShoppingBag, 
  Award, 
  Camera, 
  Mail, 
  CheckCircle2, 
  Headphones, 
  Palette, 
  Brain, 
  Rocket, 
  Gamepad2 
} from 'lucide-react';

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const navigate = useNavigate();

  // Flash Sale Countdown Timer (Live ticking)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Promise.all([
      productService.getPopular(),
      productService.getBestSellers()
    ]).then(([popData, bestData]) => {
      setPopularProducts(popData);
      setBestSellers(bestData);
      setLoading(false);
    });
  }, []);

  const circularCategories = [
    { name: 'Action Figures', icon: '🤖', bg: '#F3E8FF', link: '/shop?category=Action%20Figures' },
    { name: 'Building Blocks', icon: '🧱', bg: '#FFEDD5', link: '/shop?category=Building%20Blocks' },
    { name: 'Soft Toys', icon: '🧸', bg: '#FCE7F3', link: '/shop?category=Soft%20Toys' },
    { name: 'Cars & Vehicles', icon: '🚗', bg: '#DCFCE7', link: '/shop?category=Cars%20%26%20Vehicles' },
    { name: 'Puzzles', icon: '🧩', bg: '#EDE9FE', link: '/shop?category=Puzzles' },
    { name: 'Learning Toys', icon: '🎓', bg: '#DBEAFE', link: '/shop?category=Learning%20Toys' },
    { name: 'Outdoor Toys', icon: '⚽', bg: '#FEF9C3', link: '/shop?category=Outdoor%20Toys' },
    { name: 'All Toys', icon: '🎪', bg: '#F1F5F9', link: '/shop' }
  ];

  const ageCards = [
    {
      age: '0–2 Years',
      subtitle: 'Safe & sensory',
      img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
      bg: '#FEF9C3',
      borderColor: '#FDE047',
      link: '/shop?age=0-2'
    },
    {
      age: '3–5 Years',
      subtitle: 'Creative play',
      img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
      bg: '#FFEDD5',
      borderColor: '#FDBA74',
      link: '/shop?age=3-5'
    },
    {
      age: '6–8 Years',
      subtitle: 'Learning & fun',
      img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500',
      bg: '#E0F2FE',
      borderColor: '#BAE6FD',
      link: '/shop?age=6-8'
    },
    {
      age: '9–12 Years',
      subtitle: 'STEM & adventure',
      img: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500',
      bg: '#EDE9FE',
      borderColor: '#DDD6FE',
      link: '/shop?age=9-12'
    }
  ];

  const learnCards = [
    {
      title: 'Puzzles & Brain Games',
      icon: <Brain size={24} color="#0284C7" />,
      img: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
      bg: '#EFF6FF',
      link: '/shop?category=Puzzles'
    },
    {
      title: 'STEM & Math Toys',
      icon: <Rocket size={24} color="#0284C7" />,
      img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',
      bg: '#F0FDFA',
      link: '/shop?category=STEM'
    },
    {
      title: 'Art & Creativity',
      icon: <Palette size={24} color="#EC4899" />,
      img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
      bg: '#FDF2F8',
      link: '/shop?category=Educational'
    },
    {
      title: 'Educational Games',
      icon: <Gamepad2 size={24} color="#8B5CF6" />,
      img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      bg: '#FEF3C7',
      link: '/shop?category=Educational'
    }
  ];

  const giftCards = [
    {
      title: 'Birthday Gifts',
      subtitle: 'Fun picks they\'ll remember',
      btnText: 'Shop Birthday Gifts',
      btnBg: '#84CC16',
      bg: '#FEF9C3',
      img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
      link: '/shop?filter=birthday'
    },
    {
      title: 'Educational Gifts',
      subtitle: 'Play & learning together',
      btnText: 'Shop Educational',
      btnBg: '#EC4899',
      bg: '#FDF2F8',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      link: '/shop?category=Educational'
    },
    {
      title: 'Gifts Under PKR 2,000',
      subtitle: 'Great toys, great prices',
      btnText: 'Shop Under 2,000',
      btnBg: '#F59E0B',
      bg: '#FEF3C7',
      img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
      link: '/shop?maxPrice=2000'
    }
  ];

  const testimonials = [
    {
      quote: "The quality was much better than I expected. My son absolutely loved it!",
      author: "Ayesha K.",
      city: "Karachi",
      avatarBg: "#FEE2E2",
      toyIcon: "🚂"
    },
    {
      quote: "Great variety and fast delivery. Will definitely shop again!",
      author: "Ali R.",
      city: "Lahore",
      avatarBg: "#EFF6FF",
      toyIcon: "🚗"
    },
    {
      quote: "Perfect for my daughter. She hasn't stopped playing with it!",
      author: "Sana M.",
      city: "Islamabad",
      avatarBg: "#FDF2F8",
      toyIcon: "🧸"
    },
    {
      quote: "Excellent customer service and top quality toys!",
      author: "Imran T.",
      city: "Faisalabad",
      avatarBg: "#DCFCE7",
      toyIcon: "🏎️"
    }
  ];

  const instagramPhotos = [
    { id: 1, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', caption: 'Playtime joy' },
    { id: 2, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', caption: 'Cuddly bears' },
    { id: 3, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', caption: 'Montessori stacker' },
    { id: 4, img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400', caption: 'Speed racers' },
    { id: 5, img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400', caption: 'Gift boxes' },
    { id: 6, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', caption: 'Happy Kids Happy Parents' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="container woocommerce-page" style={{ paddingBottom: '40px' }}>
      <h1 className="sr-only">SmartKids Toys — Play, Learn, Grow Together | Quality Screen-Free Toys for Pakistani Kids</h1>

      {/* 1. HERO SECTION */}
      <section className="demo-hero-section" style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', margin: '16px 0 24px', background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', border: '1px solid #BAE6FD' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '36px 40px', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <img src="/assets/logo.png" alt="SmartKids Toys" style={{ height: '36px', width: 'auto' }} />
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '14px', color: '#0F172A' }}>
              <span style={{ color: '#EF4444' }}>Play</span>, <span style={{ color: '#0284C7' }}>Learn</span> &amp; <br />
              <span style={{ color: '#8B5CF6' }}>Grow</span> <span style={{ color: '#10B981' }}>Together</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#334155', marginBottom: '24px', fontWeight: 500, lineHeight: 1.4 }}>
              Safe, fun and educational toys <br />for every age...
            </p>

            <Link 
              to="/shop" 
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #0284C7, #0369A1)', 
                color: '#FFFFFF', 
                fontWeight: 800, 
                fontSize: '1rem', 
                padding: '12px 28px', 
                borderRadius: '9999px', 
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <img 
              src="/assets/hero-banner.png" 
              alt="Kids Playing - SmartKids Toys" 
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', borderRadius: '12px' }} 
            />
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR (4 Items) */}
      <section className="demo-trust-bar" style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--gray-2)', padding: '16px 24px', marginBottom: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div className="demo-trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--dark-heading)' }}>Free Shipping</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>On orders above PKR 3,000</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <RotateCcw size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--dark-heading)' }}>Easy Returns</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>14 days return policy</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--dark-heading)' }}>Secure Payment</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>100% secure checkout</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FEF9C3', color: '#CA8A04', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--dark-heading)' }}>Top Quality Toys</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Safe &amp; child-friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (8 Circular Icons) */}
      <section style={{ marginBottom: '44px' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="section-dots" style={{ display: 'inline-flex', gap: '3px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284C7' }}></span>
            </div>
            <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Shop by Category</h2>
          </div>
          <Link to="/categories" className="view-all-btn" style={{ color: '#0284C7', fontWeight: 800, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>View All Categories</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '14px' }}>
          {circularCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.link)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: cat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.9rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                {cat.icon}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dark-heading)', textAlign: 'center' }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR TOYS (5 Column Grid) */}
      <section style={{ marginBottom: '44px' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="section-dots" style={{ display: 'inline-flex', gap: '3px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }}></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
            </div>
            <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Popular Toys</h2>
          </div>
          <Link to="/shop" className="view-all-btn" style={{ color: '#0284C7', fontWeight: 800, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>View All Products</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading popular toys...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. ⚡ FLASH SALE UP TO 40% OFF BANNER (Pink/Yellow Gradient with Countdown) */}
      <section style={{
        margin: '36px 0 48px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #FEF3C7 0%, #FCE7F3 100%)',
        border: '1px solid #FDE68A',
        padding: '28px 36px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.8rem', color: '#F59E0B' }}>⚡</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#DB2777', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                FLASH SALE <span style={{ color: '#0284C7' }}>UP TO 40% OFF</span>
              </h2>
            </div>

            <p style={{ color: '#64748B', fontSize: '0.95rem', fontWeight: 600, margin: '0 0 18px' }}>
              Limited-time deals on kids' favourite toys
            </p>

            {/* Countdown Box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px 14px', textAlign: 'center', minWidth: '60px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>{String(timeLeft.days).padStart(2, '0')}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Days</div>
              </div>
              <span style={{ fontWeight: 900, color: '#DB2777', fontSize: '1.2rem' }}>:</span>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px 14px', textAlign: 'center', minWidth: '60px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>{String(timeLeft.hours).padStart(2, '0')}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Hours</div>
              </div>
              <span style={{ fontWeight: 900, color: '#DB2777', fontSize: '1.2rem' }}>:</span>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px 14px', textAlign: 'center', minWidth: '60px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Minutes</div>
              </div>
              <span style={{ fontWeight: 900, color: '#DB2777', fontSize: '1.2rem' }}>:</span>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px 14px', textAlign: 'center', minWidth: '60px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#DB2777' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Seconds</div>
              </div>
            </div>

            <Link 
              to="/deals" 
              style={{
                background: 'linear-gradient(135deg, #EC4899, #DB2777)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '10px 24px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.35)',
                textDecoration: 'none'
              }}
            >
              Shop Flash Sale <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=450" 
              alt="Flash Sale Toys" 
              style={{ maxHeight: '180px', width: 'auto', borderRadius: '16px', objectFit: 'contain', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.1))' }} 
            />
          </div>
        </div>
      </section>

      {/* 6. ⭐ BEST SELLERS (5 Column Grid) */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem', color: '#F59E0B' }}>⭐</span>
              <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Best Sellers</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 500 }}>
              Loved by kids. Trusted by parents.
            </p>
          </div>
          <Link to="/shop?filter=bestseller" className="view-all-btn" style={{ color: '#0284C7', fontWeight: 800, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>View All Best Sellers</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading best sellers...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 7. ••• SHOP TOYS BY AGE (4 Cards) */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="section-dots" style={{ display: 'inline-flex', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B5CF6' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284C7' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EC4899' }}></span>
              </div>
              <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Shop Toys by Age</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 500 }}>
              Find the perfect toy for every stage of childhood.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {ageCards.map((card) => (
            <div
              key={card.age}
              style={{
                background: card.bg,
                border: `1px solid ${card.borderColor}`,
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => navigate(card.link)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--dark-heading)', margin: '0 0 2px' }}>
                  {card.age}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 12px', fontWeight: 600 }}>
                  {card.subtitle}
                </p>
                <div style={{ height: '140px', borderRadius: '12px', overflow: 'hidden', marginBottom: '14px', background: 'rgba(255,255,255,0.6)' }}>
                  <img src={card.img} alt={card.age} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <span style={{
                background: 'rgba(255,255,255,0.9)',
                color: '#0284C7',
                fontWeight: 800,
                fontSize: '0.85rem',
                padding: '8px 16px',
                borderRadius: '9999px',
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}>
                Shop Now <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 🧠 LEARN WHILE YOU PLAY (4 Educational Categories) */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem', color: '#0284C7' }}>🧠</span>
              <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Learn While You Play</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 500 }}>
              Discover toys that make learning fun.
            </p>
          </div>
          <Link to="/shop?category=Educational" className="view-all-btn" style={{ color: '#0284C7', fontWeight: 800, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Explore Educational Toys</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {learnCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: card.bg,
                borderRadius: '16px',
                border: '1px solid var(--gray-2)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => navigate(card.link)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  {card.icon}
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--dark-heading)', margin: 0 }}>
                    {card.title}
                  </h3>
                </div>
                <div style={{ height: '130px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', background: '#FFFFFF' }}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <span style={{
                color: '#0284C7',
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                Shop Now <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 🎁 FIND THE PERFECT GIFT (3 Cards) */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem', color: '#EC4899' }}>🎁</span>
              <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Find the Perfect Gift</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 500 }}>
              Thoughtful toys for every occasion.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {giftCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: card.bg,
                borderRadius: '18px',
                border: '1px solid rgba(0,0,0,0.06)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--dark-heading)', margin: '0 0 4px' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                    {card.subtitle}
                  </p>
                </div>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#FFFFFF', padding: '4px' }}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              </div>

              <Link
                to={card.link}
                style={{
                  background: card.btnBg,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: 'fit-content',
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
                }}
              >
                {card.btnText} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10. 👍 WHAT PARENTS ARE SAYING (Testimonials with Rating Header) */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem', color: '#F59E0B' }}>👍</span>
              <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>What Parents Are Saying</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 500 }}>
              Discover toys that make learning fun.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FEF3C7', padding: '6px 14px', borderRadius: '9999px', color: '#B45309', fontWeight: 800, fontSize: '0.85rem' }}>
            <Star size={16} fill="#F59E0B" color="#F59E0B" />
            <span>4.9/5 from 500+ happy parents</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--gray-2)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text)', fontStyle: 'italic', margin: '0 0 16px', lineHeight: 1.5 }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-heading)' }}>{t.author}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.city}</div>
                  </div>
                </div>
                <span style={{ fontSize: '1.4rem' }}>{t.toyIcon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. 📸 FOLLOW THE FUN (@SmartKidsToys Instagram Strip) */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={20} color="#EC4899" />
              <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Follow the Fun</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#0284C7', margin: '2px 0 0', fontWeight: 700 }}>
              @SmartKidsToys
            </p>
          </div>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              background: '#0284C7',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '8px 18px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            Follow Us on Instagram <ArrowRight size={14} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          {instagramPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '1',
                position: 'relative',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              <img src={photo.img} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* 12. 🛍️ SHOPPING MADE EASY (5 Trust Badges) */}
      <section style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        border: '1px solid var(--gray-2)',
        padding: '20px 24px',
        marginBottom: '28px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <ShoppingBag size={18} color="#0284C7" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--dark-heading)', margin: 0 }}>Shopping Made Easy</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-heading)' }}>Fast Delivery</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across Pakistan</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Banknote size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-heading)' }}>Cash on Delivery</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available nationwide</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RotateCcw size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-heading)' }}>14-Day Returns</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Shop with confidence</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#DCFCE7', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-heading)' }}>WhatsApp Support</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>We're here to help</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F3E8FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-heading)' }}>Secure Checkout</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Your payment is protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. 💬 NEED HELP CHOOSING A TOY? (WhatsApp Mint Green Banner) */}
      <section style={{
        borderRadius: '16px',
        background: '#DCFCE7',
        border: '1px solid #BBF7D0',
        padding: '20px 28px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MessageCircle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#065F46', margin: '0 0 2px' }}>
              Need Help Choosing a Toy?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#047857', margin: 0 }}>
              Talk to our team on WhatsApp. We'll help you find the right toy for your child.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/923098444501?text=Hello%20SmartKids%20Toys!%20%F0%9F%91%8B%20I%20need%20help%20choosing%20the%20right%20toy%20for%20my%20child."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#059669',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.88rem',
            padding: '10px 22px',
            borderRadius: '9999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            boxShadow: '0 3px 10px rgba(5, 150, 105, 0.3)'
          }}
        >
          Chat on WhatsApp <ArrowRight size={15} />
        </a>
      </section>

      {/* 14. ✉️ GET 10% OFF YOUR FIRST ORDER (Newsletter Banner) */}
      <section style={{
        borderRadius: '16px',
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '520px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#0284C7', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Mail size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1E3A8A', margin: '0 0 2px' }}>
              Get 10% Off Your First Order
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#1D4ED8', margin: 0 }}>
              Sign up for new arrivals, special deals, birthday gift ideas and exclusive discounts.
            </p>
          </div>
        </div>

        <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '420px', minWidth: '260px' }}>
          {newsletterSuccess ? (
            <div style={{ background: '#DCFCE7', color: '#15803D', padding: '10px 18px', borderRadius: '9999px', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
              <CheckCircle2 size={16} /> Thank you for subscribing!
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '9999px',
                  border: '1px solid #93C5FD',
                  background: '#FFFFFF',
                  fontSize: '0.85rem'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#0284C7',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  boxShadow: '0 3px 10px rgba(2, 132, 199, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Subscribe
              </button>
            </>
          )}
        </form>
      </section>

    </div>
  );
}
