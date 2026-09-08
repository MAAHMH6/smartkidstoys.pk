import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { productService, FALLBACK_PRODUCTS } from '../services/productService';
import { CATEGORIES_DATA } from '../utils/slugify';
import { Sparkles, MapPin, Grid, Package, Info, ArrowRight } from 'lucide-react';

export default function Sitemap() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS || []);

  useEffect(() => {
    productService.getAll().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    }).catch(() => {});
  }, []);

  const corePages = [
    { title: 'Home', path: '/' },
    { title: 'Shop All Toys', path: '/shop' },
    { title: 'New Arrivals', path: '/new-arrivals' },
    { title: 'Special Deals', path: '/deals' },
    { title: 'All Categories', path: '/categories' },
    { title: 'About Us', path: '/about' },
    { title: 'Contact Us', path: '/contact' }
  ];

  const policyPages = [
    { title: 'Shipping & Delivery', path: '/shipping-delivery' },
    { title: 'Returns & Refunds Policy', path: '/returns-refunds' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
    { title: 'Terms & Conditions', path: '/terms' }
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <SEO
        title="HTML Sitemap | Smart Kids Toys Pakistan"
        description="Comprehensive index of all toy collections, categories, product pages and customer support information at Smart Kids Toys Pakistan."
        canonical="https://www.smartkidstoys.pk/sitemap"
      />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', padding: '6px 16px', borderRadius: '30px', marginBottom: '14px' }}>
          <Sparkles size={16} color="#0284C7" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0284C7' }}>SITE DIRECTORY</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--dark-heading)', marginBottom: '8px' }}>
          SmartKids Toys Sitemap
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Browse all toy categories, dedicated product pages, and helpful information across our website.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        {/* 1. Core Pages */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 800, color: '#0284C7', marginBottom: '16px' }}>
            <MapPin size={20} /> Store Navigation
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {corePages.map((page) => (
              <li key={page.path}>
                <Link to={page.path} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', fontWeight: 600, textDecoration: 'none', fontSize: '0.92rem' }}>
                  <ArrowRight size={14} color="#0284C7" /> {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Toy Categories */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 800, color: '#10B981', marginBottom: '16px' }}>
            <Grid size={20} /> Toy Categories
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CATEGORIES_DATA.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/category/${cat.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', fontWeight: 600, textDecoration: 'none', fontSize: '0.92rem' }}>
                  <ArrowRight size={14} color="#10B981" /> {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Customer Care & Policies */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 800, color: '#F59E0B', marginBottom: '16px' }}>
            <Info size={20} /> Help &amp; Policies
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {policyPages.map((policy) => (
              <li key={policy.path}>
                <Link to={policy.path} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', fontWeight: 600, textDecoration: 'none', fontSize: '0.92rem' }}>
                  <ArrowRight size={14} color="#F59E0B" /> {policy.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Complete Product Pages Index */}
      <div style={{ marginTop: '36px', background: '#FFFFFF', padding: '28px', borderRadius: '18px', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem', fontWeight: 800, color: '#8B5CF6', marginBottom: '18px' }}>
          <Package size={22} /> Individual Product Pages ({products.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {products.map((p) => {
            const productSlug = p.slug || (p.name ? p.name.toLowerCase().replace(/\s+/g, '-') : String(p.id));
            return (
              <Link
                key={p.id}
                to={`/product/${productSlug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid var(--gray-2)',
                  color: 'var(--dark-heading)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'background 0.2s ease, transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#EFF6FF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ArrowRight size={13} color="#8B5CF6" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
