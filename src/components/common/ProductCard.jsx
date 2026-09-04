import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Star, Heart, Check, ShoppingCart, MessageCircle, Sparkles } from 'lucide-react';

const BUTTON_COLOR_THEMES = [
  { bg: 'linear-gradient(135deg, #0284C7, #0369A1)', hover: '#0369A1', shadow: 'rgba(2, 132, 199, 0.35)' },
  { bg: 'linear-gradient(135deg, #EF4444, #DC2626)', hover: '#DC2626', shadow: 'rgba(239, 68, 68, 0.35)' },
  { bg: 'linear-gradient(135deg, #10B981, #059669)', hover: '#059669', shadow: 'rgba(16, 185, 129, 0.35)' },
  { bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', hover: '#7C3AED', shadow: 'rgba(139, 92, 246, 0.35)' },
  { bg: 'linear-gradient(135deg, #EC4899, #DB2777)', hover: '#DB2777', shadow: 'rgba(236, 72, 153, 0.35)' },
  { bg: 'linear-gradient(135deg, #F59E0B, #D97706)', hover: '#D97706', shadow: 'rgba(245, 158, 11, 0.35)' }
];

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const themeIndex = Math.abs(
    (product.id ? String(product.id).charCodeAt(0) : 0) + (product.name ? product.name.length : 0)
  ) % BUTTON_COLOR_THEMES.length;
  const theme = BUTTON_COLOR_THEMES[themeIndex];

  const discountPercent = (product.old_price && Number(product.old_price) > Number(product.price))
    ? Math.round(((Number(product.old_price) - Number(product.price)) / Number(product.old_price)) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addToCart(product, 1);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hello SmartKids Toys! 🌟\nI want to order: *${product.name}*\nPrice: PKR ${Number(product.price).toLocaleString()}\nQuantity: 1\nPlease confirm my delivery details.`;
    window.open(`https://wa.me/923098444501?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <article className="demo-product-card product type-product">
      {/* Top Badges */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 3 }}>
        {product.badge && (
          <span style={{ 
            background: product.badge.includes('🔥') ? '#EF4444' : (product.badge.includes('🧠') ? '#8B5CF6' : (product.badge.includes('⭐') ? '#F59E0B' : '#10B981')), 
            color: '#FFFFFF', 
            fontSize: '0.7rem', 
            fontWeight: 800, 
            padding: '3px 8px', 
            borderRadius: '9999px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            {product.badge}
          </span>
        )}
        {discountPercent && (
          <span style={{ 
            background: '#0F172A', 
            color: '#FBBF24', 
            fontSize: '0.68rem', 
            fontWeight: 900, 
            padding: '2px 7px', 
            borderRadius: '9999px' 
          }}>
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="demo-product-img-box" tabIndex="-1">
        <img
          src={product.image_url || '/assets/logo.png'}
          alt={product.name}
          className="demo-product-img"
          loading="lazy"
        />
      </Link>

      {/* Category & Age Meta Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '4px' }}>
        {product.category && (
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {product.category}
          </span>
        )}
        <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#EFF6FF', color: '#0284C7', padding: '1px 6px', borderRadius: '6px' }}>
          {product.age_range || 'Age: 3–8 Yrs'}
        </span>
      </div>

      {/* Title */}
      <h3 className="demo-product-title">
        <Link to={`/product/${product.id}`} title={product.name}>
          {product.name}
        </Link>
      </h3>

      {/* Educational Skill Tag */}
      <div style={{ 
        fontSize: '0.72rem', 
        color: '#059669', 
        background: '#ECFDF5', 
        padding: '3px 8px', 
        borderRadius: '6px', 
        fontWeight: 700, 
        width: '100%', 
        marginBottom: '8px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '4px' 
      }}>
        <Sparkles size={12} color="#10B981" />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.educational_skill || 'Educational: STEM & Motor Skills'}
        </span>
      </div>

      {/* Rating & Sold count */}
      <div className="demo-product-rating">
        <div className="demo-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < Math.floor(product.rating || 5) ? '#F59E0B' : 'none'}
              color="#F59E0B"
              style={{ display: 'inline', marginRight: '1px' }}
            />
          ))}
        </div>
        <span className="demo-rating-count">
          {product.rating || '4.9'} ({product.rating_count || product.reviews_count || 12} sold/reviews)
        </span>
      </div>

      {/* Price */}
      <div className="demo-price-row">
        <span className="demo-current-price">
          PKR {Number(product.price).toLocaleString()}
        </span>
        {product.old_price && Number(product.old_price) > Number(product.price) && (
          <span className="demo-old-price">
            PKR {Number(product.old_price).toLocaleString()}
          </span>
        )}
      </div>

      {/* Actions: Add to Cart + Wishlist */}
      <div className="demo-card-actions" style={{ marginBottom: '8px' }}>
        <button
          onClick={handleAdd}
          className="btn-add-cart-colorful"
          style={{
            background: added ? '#10B981' : theme.bg,
            boxShadow: `0 4px 12px ${theme.shadow}`,
            flex: 1
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? (
            <>
              <Check size={16} /> Added to Bag!
            </>
          ) : (
            <>
              <ShoppingCart size={15} /> Add to Cart
            </>
          )}
        </button>

        <button
          onClick={toggleWishlist}
          className="btn-wishlist-outline"
          aria-label="Add to wishlist"
          style={{ color: isWishlist ? '#EF4444' : 'var(--text-muted)', borderColor: isWishlist ? '#EF4444' : 'var(--gray-2)' }}
        >
          <Heart size={16} fill={isWishlist ? '#EF4444' : 'none'} />
        </button>
      </div>

      {/* Prominent WhatsApp Order Button */}
      <button
        onClick={handleWhatsAppOrder}
        style={{
          width: '100%',
          background: '#25D366',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '9999px',
          padding: '8px 12px',
          fontSize: '0.82rem',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          boxShadow: '0 2px 8px rgba(37, 211, 102, 0.28)',
          transition: 'transform 0.15s ease, background 0.15s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        aria-label={`Order ${product.name} on WhatsApp`}
      >
        <MessageCircle size={15} fill="currentColor" color="none" />
        Order on WhatsApp
      </button>
    </article>
  );
}
