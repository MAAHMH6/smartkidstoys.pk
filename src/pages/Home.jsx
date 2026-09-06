import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { settingsService, DEFAULT_SETTINGS } from '../services/settingsService';
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
  Headphones, 
  Palette, 
  Brain, 
  Rocket, 
  Gamepad2 
} from 'lucide-react';

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Flash Sale Countdown Timer — driven by settings.flash_sale_end_date
  const calcTimeLeft = (endDate) => {
    const diff = Math.max(0, new Date(endDate).getTime() - Date.now());
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    Promise.all([
      productService.getPopular(),
      productService.getBestSellers(),
      settingsService.getSettings()
    ]).then(([popData, bestData, setsData]) => {
      setPopularProducts(popData || []);
      setBestSellers(bestData || []);
      if (setsData) {
        setSettings(setsData);
        setTimeLeft(calcTimeLeft(setsData.flash_sale_end_date || DEFAULT_SETTINGS.flash_sale_end_date));
      }
      setLoading(false);
    }).catch(err => {
      console.warn('Error loading home data:', err);
      setLoading(false);
    });
  }, []);

  // Tick every second
  useEffect(() => {
    const endDate = settings.flash_sale_end_date || DEFAULT_SETTINGS.flash_sale_end_date;
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [settings.flash_sale_end_date]);


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
      age: settings.age_0_2_title || '0–2 Years',
      subtitle: settings.age_0_2_subtitle || 'Safe & sensory',
      img: settings.age_0_2_bg_image || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
      badge: '👶 Baby & Toddler',
      btnBg: 'linear-gradient(135deg, #EC4899, #DB2777)',
      link: '/shop?age=0-2'
    },
    {
      age: settings.age_3_5_title || '3–5 Years',
      subtitle: settings.age_3_5_subtitle || 'Creative play',
      img: settings.age_3_5_bg_image || 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
      badge: '🧒 Preschoolers',
      btnBg: 'linear-gradient(135deg, #0284C7, #0369A1)',
      link: '/shop?age=3-5'
    },
    {
      age: settings.age_6_8_title || '6–8 Years',
      subtitle: settings.age_6_8_subtitle || 'Learning & fun',
      img: settings.age_6_8_bg_image || 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600',
      badge: '🧠 Early Explorers',
      btnBg: 'linear-gradient(135deg, #10B981, #059669)',
      link: '/shop?age=6-8'
    },
    {
      age: settings.age_9_12_title || '9–12 Years',
      subtitle: settings.age_9_12_subtitle || 'STEM & adventure',
      img: settings.age_9_12_bg_image || 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600',
      badge: '🚀 Young Innovators',
      btnBg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      link: '/shop?age=9-12'
    }
  ];

  const learnCards = [
    {
      title: settings.learn_puzzles_title || 'Puzzles & Brain Games',
      icon: <Brain size={22} color="#FFFFFF" />,
      img: settings.learn_puzzles_bg_image || 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600',
      tag: 'Critical Thinking',
      btnBg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      link: '/shop?category=Puzzles'
    },
    {
      title: settings.learn_stem_title || 'STEM & Math Toys',
      icon: <Rocket size={22} color="#FFFFFF" />,
      img: settings.learn_stem_bg_image || 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
      tag: 'Science & Logic',
      btnBg: 'linear-gradient(135deg, #0284C7, #0369A1)',
      link: '/shop?category=STEM'
    },
    {
      title: settings.learn_art_title || 'Art & Creativity',
      icon: <Palette size={22} color="#FFFFFF" />,
      img: settings.learn_art_bg_image || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
      tag: 'Creative Expression',
      btnBg: 'linear-gradient(135deg, #EC4899, #DB2777)',
      link: '/shop?category=Educational'
    },
    {
      title: settings.learn_games_title || 'Educational Games',
      icon: <Gamepad2 size={22} color="#FFFFFF" />,
      img: settings.learn_games_bg_image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
      tag: 'Interactive Play',
      btnBg: 'linear-gradient(135deg, #10B981, #059669)',
      link: '/shop?category=Educational'
    }
  ];

  const giftCards = [
    {
      title: settings.gift_birthday_title || 'Birthday Gifts',
      subtitle: settings.gift_birthday_subtitle || "Fun picks they'll remember",
      btnText: 'Shop Now',
      btnBg: 'linear-gradient(135deg, #10B981, #059669)',
      img: settings.gift_birthday_bg_image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
      link: '/shop?filter=birthday'
    },
    {
      title: settings.gift_educational_title || 'Educational Gifts',
      subtitle: settings.gift_educational_subtitle || 'Play & learning together',
      btnText: 'Shop Now',
      btnBg: 'linear-gradient(135deg, #EC4899, #DB2777)',
      img: settings.gift_educational_bg_image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      link: '/shop?category=Educational'
    },
    {
      title: settings.gift_under2k_title || 'Gifts Under PKR 2,000',
      subtitle: settings.gift_under2k_subtitle || 'Great toys, great prices',
      btnText: 'Shop Now',
      btnBg: 'linear-gradient(135deg, #F59E0B, #D97706)',
      img: settings.gift_under2k_bg_image || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
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
    { id: 1, img: settings.instagram_img_1 || 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500', caption: 'Playtime joy' },
    { id: 2, img: settings.instagram_img_2 || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', caption: 'Cuddly bears' },
    { id: 3, img: settings.instagram_img_3 || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500', caption: 'Montessori stacker' },
    { id: 4, img: settings.instagram_img_4 || 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500', caption: 'Speed racers' },
    { id: 5, img: settings.instagram_img_5 || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500', caption: 'Gift boxes' },
    { id: 6, img: settings.instagram_img_6 || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500', caption: 'Happy Kids Happy Parents' }
  ];

  return (
    <div className="container woocommerce-page" style={{ paddingBottom: '40px' }}>
      <h1 className="sr-only">SmartKids Toys — Play, Learn, Grow Together | Quality Screen-Free Toys for Pakistani Kids</h1>

      {/* 1. HERO BANNER (Full Clickable Banner without duplicate buttons/text) */}
      <section className="demo-hero-section" style={{ margin: '16px 0 24px', borderRadius: '20px', overflow: 'hidden' }}>
        <Link to="/shop" className="demo-hero-banner-link" style={{ display: 'block', width: '100%', borderRadius: '20px', overflow: 'hidden' }} aria-label="Shop our complete toys collection">
          <img
            src={settings.hero_image_url || "/assets/hero-banner.png"}
            alt="Play, Learn & Grow Together - SmartKids Toys"
            className="demo-hero-banner-img"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px', objectFit: 'cover' }}
          />
        </Link>
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

      {/* 5. ⚡ FLASH SALE UP TO 40% OFF BANNER (Full BG Image Card) */}
      <section style={{
        margin: '36px 0 48px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(340px, 32vw, 460px)',
        backgroundColor: settings.flash_sale_bg_color || '#FFF9E6',
        backgroundImage: `url(${settings.flash_sale_image_url || '/assets/flash-sale-banner.png'})`,
        backgroundSize: settings.flash_sale_bg_size || 'cover',
        backgroundPosition: settings.flash_sale_bg_position || 'right center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        padding: '32px 36px'
      }}>
        {/* Transparent frosted text card: ensures text readability while keeping the user-uploaded background image 100% visible, bright and clear with no greyish tint */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px 28px',
          maxWidth: '520px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.6rem', color: '#F59E0B' }}>⚡</span>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)', fontWeight: 900, color: '#DB2777', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
              FLASH SALE <span style={{ color: '#0284C7' }}>UP TO 40% OFF</span>
            </h2>
          </div>

          <p style={{ color: '#475569', fontSize: '0.92rem', fontWeight: 600, margin: '0 0 16px' }}>
            Limited-time deals on kids' favourite toys
          </p>

          {/* Countdown Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '6px 12px', textAlign: 'center', minWidth: '54px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>{String(timeLeft.days).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Days</div>
            </div>
            <span style={{ fontWeight: 900, color: '#DB2777', fontSize: '1.1rem' }}>:</span>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '6px 12px', textAlign: 'center', minWidth: '54px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>{String(timeLeft.hours).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Hours</div>
            </div>
            <span style={{ fontWeight: 900, color: '#DB2777', fontSize: '1.1rem' }}>:</span>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '6px 12px', textAlign: 'center', minWidth: '54px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Minutes</div>
            </div>
            <span style={{ fontWeight: 900, color: '#DB2777', fontSize: '1.1rem' }}>:</span>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '6px 12px', textAlign: 'center', minWidth: '54px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#DB2777' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Seconds</div>
            </div>
          </div>

          <Link 
            to="/deals" 
            style={{
              background: 'linear-gradient(135deg, #EC4899, #DB2777)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.9rem',
              padding: '10px 22px',
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
                position: 'relative',
                height: '270px',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px'
              }}
              onClick={() => navigate(card.link)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
              }}
            >
              {/* Light gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.2) 40%, rgba(15, 23, 42, 0.55) 100%)',
                zIndex: 1
              }} />

              {/* Top Tag */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#0F172A',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                }}>
                  {card.badge}
                </span>
              </div>

              {/* Bottom Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 4px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  {card.age}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.95)', margin: '0 0 14px', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                  {card.subtitle}
                </p>
                <span style={{
                  background: card.btnBg,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                }}>
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>
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
                position: 'relative',
                height: '270px',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px'
              }}
              onClick={() => navigate(card.link)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
              }}
            >
              {/* Light gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.22) 40%, rgba(15, 23, 42, 0.58) 100%)',
                zIndex: 1
              }} />

              {/* Top: Icon + Tag */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  {card.icon}
                </div>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#0F172A',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '9999px'
                }}>
                  {card.tag}
                </span>
              </div>

              {/* Bottom: Title & CTA */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 12px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  {card.title}
                </h3>
                <span style={{
                  background: card.btnBg,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                }}>
                  Explore Collection <ArrowRight size={14} />
                </span>
              </div>
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
                position: 'relative',
                minHeight: '250px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
              }}
            >
              {/* Light gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.18) 40%, rgba(15, 23, 42, 0.52) 100%)',
                zIndex: 1
              }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 6px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.95)', margin: 0, fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                  {card.subtitle}
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 2, marginTop: '24px' }}>
                <Link
                  to={card.link}
                  style={{
                    background: card.btnBg,
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: 'fit-content',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                  }}
                >
                  {card.btnText} <ArrowRight size={14} />
                </Link>
              </div>
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
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <h2 className="section-title-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>Follow the Fun</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#DB2777', margin: '2px 0 0', fontWeight: 700 }}>
              @SmartKidsToys
            </p>
          </div>

          <a 
            href={settings.instagram_url || "https://instagram.com/smartkidstoys"} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.88rem',
              padding: '9px 20px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(220, 39, 67, 0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>Follow Us on Instagram</span>
            <ArrowRight size={14} />
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

      {/* 12. PROMOTIONAL BANNERS: NEW ARRIVALS & SPECIAL DEALS CARDS */}
      <section className="demo-banners-grid" style={{ margin: '36px 0 50px' }}>
        {/* Left: New Arrivals Train Banner */}
        <div
          onClick={() => navigate('/new-arrivals')}
          className="demo-banner-card"
          style={{ background: '#DCEFFA' }}
        >
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
            <button className="btn-banner-action" style={{
              background: 'linear-gradient(135deg, #0284C7, #0369A1)',
              color: 'white',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              Shop Now <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right: Special Deals Teddy Bear Banner */}
        <div
          onClick={() => navigate('/deals')}
          className="demo-banner-card"
          style={{ background: '#FEF6DF' }}
        >
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
            <button className="btn-banner-action" style={{
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: 'white',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              Shop Deals <ArrowRight size={14} />
            </button>
          </div>
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

    </div>
  );
}
