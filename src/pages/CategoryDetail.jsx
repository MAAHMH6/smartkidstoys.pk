import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { getCategoryBySlug, CATEGORIES_DATA, slugify } from '../utils/slugify';
import ProductCard from '../components/common/ProductCard';
import SEO from '../components/common/SEO';
import { 
  ChevronRight, 
  Home, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Award, 
  RotateCcw,
  ArrowUpDown,
  CheckCircle2,
  PackageSearch
} from 'lucide-react';

export default function CategoryDetail() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [ageFilter, setAgeFilter] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);

  const cleanSlug = (slug || 'educational').toLowerCase().trim();

  // Category metadata lookup
  const categoryMeta = getCategoryBySlug(cleanSlug) || {
    id: cleanSlug,
    name: cleanSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: cleanSlug,
    description: `Explore our premium collection of toys in Pakistan. Safe, educational, and fun.`,
    seoTitle: `${cleanSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Toys Online Pakistan | Smart Kids Toys`,
    seoDescription: `Shop authentic, high-quality toys in Pakistan at Smart Kids Toys. Fast cash-on-delivery in Karachi, Lahore, Islamabad, and nationwide.`,
    keywords: `${cleanSlug.replace(/-/g, ' ')} toys pakistan, smart kids toys, kids toys online`,
    content: `Discover Pakistan's favorite selection of children toys with verified safety standards and premium build quality.`
  };

  useEffect(() => {
    let isMounted = true;
    async function loadCategoryProducts() {
      setLoading(true);
      try {
        const data = await productService.getByCategorySlug(slug);
        if (isMounted) {
          // If no direct matches, check if category name matches fallback
          if (data.length === 0) {
            const all = await productService.getAll();
            const matched = all.filter(p => 
              slugify(p.category || '') === slug ||
              (p.category && p.category.toLowerCase().includes(slug.replace(/-/g, ' ')))
            );
            setProducts(matched.length > 0 ? matched : all.slice(0, 8));
          } else {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error('Failed to load category products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCategoryProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { isMounted = false; };
  }, [slug]);

  // Filtering & Sorting
  let displayedProducts = [...products];

  if (ageFilter !== 'all') {
    displayedProducts = displayedProducts.filter(p => p.age_range && p.age_range.includes(ageFilter));
  }

  if (inStockOnly) {
    displayedProducts = displayedProducts.filter(p => (p.stock || 0) > 0);
  }

  if (sortBy === 'price-low') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    displayedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    displayedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'newest') {
    displayedProducts.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
  }

  // Schema.org CollectionPage & Breadcrumbs
  const canonicalUrl = `https://smartkidstoys.pk/category/${categoryMeta.slug}`;
  
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://smartkidstoys.pk"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Categories",
            "item": "https://smartkidstoys.pk/categories"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": categoryMeta.name,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}/#webpage`,
        "url": canonicalUrl,
        "name": categoryMeta.seoTitle,
        "description": categoryMeta.seoDescription,
        "mainEntity": {
          "@type": "ItemList",
          "name": `${categoryMeta.name} Toys Collection`,
          "numberOfItems": displayedProducts.length,
          "itemListElement": displayedProducts.map((p, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://smartkidstoys.pk/product/${p.slug || slugify(p.name)}`,
            "name": p.name,
            "image": p.image_url
          }))
        }
      }
    ]
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Dynamic Native SEO Tags */}
      <SEO
        title={categoryMeta.seoTitle}
        description={categoryMeta.seoDescription}
        canonical={canonicalUrl}
        keywords={categoryMeta.keywords}
        schemaJson={schemaJson}
      />

      {/* Breadcrumb Navigation Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '14px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', flexWrap: 'wrap' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}>
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} />
            <Link to="/categories" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}>
              Categories
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: '#FF4D8D', fontWeight: 600 }}>{categoryMeta.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF1F2 0%, #EFF6FF 50%, #FAF5FF 100%)',
        borderBottom: '1px solid #F1F5F9',
        padding: '48px 20px 40px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '6px 14px', borderRadius: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '14px' }}>
            <Sparkles size={16} color="#FF4D8D" />
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#FF4D8D' }}>
              Premium Toy Collection
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 900,
            color: '#0F172A',
            letterSpacing: '-0.5px',
            lineHeight: 1.15,
            marginBottom: '12px'
          }}>
            {categoryMeta.name} <span style={{ color: '#FF4D8D' }}>Toys</span>
          </h1>

          <p style={{
            maxWidth: '780px',
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#475569',
            marginBottom: '20px'
          }}>
            {categoryMeta.description}
          </p>

          {/* Key Trust Signals */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#10B981" /> 100% Child Safe Materials
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={16} color="#3B82F6" /> Express Delivery Across Pakistan
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={16} color="#8B5CF6" /> 7-Day Easy Return
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 20px 0' }}>
        {/* Filter & Sort Controls Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          marginBottom: '28px'
        }}>
          {/* Left: Total Results & Age Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
              Showing {displayedProducts.length} Toys
            </span>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} color="#64748B" />
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Age:</span>
              {['all', '0–2', '3–5', '6–8', '9–12'].map((age) => (
                <button
                  key={age}
                  onClick={() => setAgeFilter(age)}
                  style={{
                    border: 'none',
                    background: ageFilter === age ? '#FF4D8D' : '#F1F5F9',
                    color: ageFilter === age ? '#FFFFFF' : '#475569',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {age === 'all' ? 'All Ages' : `${age} Yrs`}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sort & In-Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#334155', cursor: 'pointer', fontWeight: 500 }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ accentColor: '#FF4D8D', width: '15px', height: '15px', cursor: 'pointer' }}
              />
              In-Stock Only
            </label>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={14} color="#64748B" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1E293B',
                  background: '#F8FAFC',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid or Loading State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{
              display: 'inline-block',
              width: '44px',
              height: '44px',
              border: '4px solid #F1F5F9',
              borderTopColor: '#FF4D8D',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <p style={{ marginTop: '16px', fontSize: '15px', color: '#64748B', fontWeight: 600 }}>Loading toys collection...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '60px 20px',
            textAlign: 'center',
            maxWidth: '540px',
            margin: '40px auto'
          }}>
            <PackageSearch size={48} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              No products found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
              We couldn't find any toys matching your active filters. Try resetting your age filter or view all categories.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => { setAgeFilter('all'); setInStockOnly(false); }}
                style={{
                  background: '#FF4D8D',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Clear Filters
              </button>
              <Link
                to="/categories"
                style={{
                  background: '#F1F5F9',
                  color: '#334155',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'inline-block'
                }}
              >
                All Categories
              </Link>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}>
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Other Categories Quick Bar */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '28px 24px',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
            Explore More Categories
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {CATEGORIES_DATA.map(c => {
              const isActive = c.slug === slug;
              return (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  style={{
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '30px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: isActive ? '1px solid #FF4D8D' : '1px solid #E2E8F0',
                    background: isActive ? '#FFF1F2' : '#FFFFFF',
                    color: isActive ? '#FF4D8D' : '#334155',
                    transition: 'all 0.2s'
                  }}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Rich SEO Content / Buyer's Guide Block */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '40px 32px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#0F172A',
            marginBottom: '16px'
          }}>
            About Our {categoryMeta.name} Collection in Pakistan
          </h2>

          <div style={{
            fontSize: '14px',
            lineHeight: 1.8,
            color: '#475569',
            marginBottom: '32px'
          }}>
            <p>{categoryMeta.content}</p>
          </div>

          {/* Quick FAQ / Value Props for SEO */}
          <div style={{
            borderTop: '1px solid #F1F5F9',
            paddingTop: '28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <CheckCircle2 size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>
                  Safety Certified & Tested
                </h4>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Every item meets rigorous international safety benchmarks with certified non-toxic coatings and smooth child-friendly edges.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Truck size={20} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>
                  Express Cash on Delivery
                </h4>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Order anywhere across Pakistan including Karachi, Lahore, Islamabad, and Rawalpindi with reliable tracking and COD.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Award size={20} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>
                  Parent-Approved Value
                </h4>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Chosen by thousands of happy families for lasting durability, educational value, and endless fun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
