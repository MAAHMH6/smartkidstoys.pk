import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';
import { CATEGORIES_DATA } from '../utils/slugify';

export default function Categories() {
  const categoryThemes = {
    'baby-toddler': { emoji: '🍼', bg: 'linear-gradient(135deg, #FFEBEF, #FFC4D0)', count: '25+ Toys' },
    'educational': { emoji: '🎓', bg: 'linear-gradient(135deg, #E6FFFB, #B5F5EC)', count: '30+ Toys' },
    'action-figures': { emoji: '🤖', bg: 'linear-gradient(135deg, #EFF6FF, #BFDBFE)', count: '20+ Toys' },
    'dolls-playsets': { emoji: '🎀', bg: 'linear-gradient(135deg, #FFF0F6, #FFADD2)', count: '22+ Toys' },
    'vehicles-track-sets': { emoji: '🏎️', bg: 'linear-gradient(135deg, #E6F4FF, #BAE0FF)', count: '24+ Toys' },
    'remote-control': { emoji: '🎮', bg: 'linear-gradient(135deg, #F3E8FF, #D3ADF7)', count: '18+ Toys' },
    'puzzles-games': { emoji: '🧩', bg: 'linear-gradient(135deg, #FFF7E6, #FFD591)', count: '28+ Toys' },
    'outdoor-sports': { emoji: '⚽', bg: 'linear-gradient(135deg, #F6FFED, #B7EB8F)', count: '16+ Toys' }
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Toy Categories | Smart Kids Toys Pakistan",
    "description": "Explore all toy categories at Smart Kids Toys Pakistan. STEM toys, educational games, baby toys, action figures, and remote control cars.",
    "url": "https://smartkidstoys.pk/categories"
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <SEO
        title="All Toy Categories Online Pakistan | Smart Kids Toys"
        description="Browse all toy categories at Smart Kids Toys Pakistan. Find educational STEM toys, remote control cars, baby rattles, puzzles, and playsets with fast delivery across Pakistan."
        canonical="https://smartkidstoys.pk/categories"
        schemaJson={schemaJson}
      />

      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFF1F2', padding: '6px 16px', borderRadius: '30px', marginBottom: '14px' }}>
          <Sparkles size={16} color="#FF4D8D" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#FF4D8D' }}>EXPLORE OUR COLLECTIONS</span>
        </div>
        <h1 className="section-title-text" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, marginBottom: '12px', color: '#0F172A' }}>
          Shop by Category
        </h1>
        <p style={{ color: '#64748B', fontSize: '16px', lineHeight: 1.6 }}>
          Find the perfect, age-appropriate toy designed to bring smiles, boost intelligence, and ignite young imaginations.
        </p>
      </div>

      <div className="all-categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {CATEGORIES_DATA.map((cat) => {
          const theme = categoryThemes[cat.slug] || { emoji: '🎁', bg: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)', count: '15+ Toys' };
          return (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                border: '1px solid #E2E8F0',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ height: '140px', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.2rem' }}>
                {theme.emoji}
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{cat.name}</h2>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF4D8D', background: '#FFF1F2', padding: '4px 10px', borderRadius: '20px' }}>
                    {theme.count}
                  </span>
                </div>
                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: '1.6', flex: 1, margin: '8px 0 0' }}>
                  {cat.description}
                </p>

                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#FF4D8D', fontSize: '0.9rem' }}>
                  <span>Explore {cat.name}</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
