import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Action Figures',
      emoji: '🤖',
      desc: 'Superheroes, robot warriors, and adventure figures for imaginative play battles and creative storytelling.',
      bg: 'linear-gradient(135deg, #EFF6FF, #BFDBFE)',
      count: '14+ Toys'
    },
    {
      name: 'Soft Toys',
      emoji: '🧸',
      desc: 'Teddy bears, plush animals, and cuddly companions designed for maximum comfort and gentle hugs.',
      bg: 'linear-gradient(135deg, #FFEBEF, #FFC4D0)',
      count: '18+ Toys'
    },
    {
      name: 'Educational',
      emoji: '🎓',
      desc: 'Interactive boards, phonics games, and STEM learning kits that stimulate brain development and curiosity.',
      bg: 'linear-gradient(135deg, #E6FFFB, #B5F5EC)',
      count: '24+ Toys'
    },
    {
      name: 'Vehicles',
      emoji: '🚗',
      desc: 'Remote control race cars, colorful toy trains, diecast trucks, and emergency service vehicles.',
      bg: 'linear-gradient(135deg, #E6F4FF, #BAE0FF)',
      count: '20+ Toys'
    },
    {
      name: 'Puzzles',
      emoji: '🧩',
      desc: 'Fun jigsaw puzzles, 3D wooden brain teasers, and pattern match games to sharpen problem-solving skills.',
      bg: 'linear-gradient(135deg, #F3E8FF, #D3ADF7)',
      count: '16+ Toys'
    },
    {
      name: 'Building Blocks',
      emoji: '🧱',
      desc: 'Stacking bricks, magnetic blocks, and structural building sets to inspire future builders and creators.',
      bg: 'linear-gradient(135deg, #FFF7E6, #FFD591)',
      count: '22+ Toys'
    },
    {
      name: 'Outdoor Toys',
      emoji: '⚽',
      desc: 'Junior cricket sets, water blaster guns, sandbox playsets, and sports gear for sunny day outdoor fun.',
      bg: 'linear-gradient(135deg, #F6FFED, #B7EB8F)',
      count: '15+ Toys'
    },
    {
      name: 'Baby Toys',
      emoji: '🍼',
      desc: 'BPA-free rattles, soft teething rings, sensory balls, and gentle developmental toys for babies & toddlers.',
      bg: 'linear-gradient(135deg, #FFF0F6, #FFADD2)',
      count: '16+ Toys'
    },
    {
      name: 'Arts & Crafts',
      emoji: '🎨',
      desc: 'Drawing boards, modeling clay, painting kits, and craft sets to express vibrant artistic creativity.',
      bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
      count: '19+ Toys'
    }
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
        <h1 className="section-title-text" style={{ fontSize: '2.4rem', marginBottom: '8px' }}>
          Explore by Category
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Find the perfect, age-appropriate toy designed to bring smiles and ignite young imaginations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
            style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--gray-2)',
              cursor: 'pointer',
              transition: 'var(--transition)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          >
            <div style={{ height: '140px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.2rem' }}>
              {cat.emoji}
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900 }}>{cat.name}</h2>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary-blue)', background: '#EFF6FF', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                  {cat.count}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>
                {cat.desc}
              </p>

              <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: 'var(--primary-blue)', fontSize: '0.9rem' }}>
                <span>Browse {cat.name}</span>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
