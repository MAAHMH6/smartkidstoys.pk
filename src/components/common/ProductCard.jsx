import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Star, Heart, Check, ShoppingCart } from 'lucide-react';

// Multi-color palette mapped from the logo colors for dynamic product cards
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

  // Pick a distinct color theme based on product ID or name hash
  const themeIndex = Math.abs(
    (product.id ? String(product.id).charCodeAt(0) : 0) + (product.name ? product.name.length : 0)
  ) % BUTTON_COLOR_THEMES.length;
  const theme = BUTTON_COLOR_THEMES[themeIndex];

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

  return (
    <article className="demo-product-card product type-product">
      {/* Sale Tag */}
      {product.old_price && Number(product.old_price) > Number(product.price) && (
        <div className="demo-sale-tag">
          Sale
        </div>
      )}

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="demo-product-img-box" tabIndex="-1">
        <img
          src={product.image_url || '/assets/logo.png'}
          alt={product.name}
          className="demo-product-img"
          loading="lazy"
        />
      </Link>

      {/* Category */}
      {product.category && (
        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          {product.category}
        </span>
      )}

      {/* Title */}
      <h3 className="demo-product-title">
        <Link to={`/product/${product.id}`} title={product.name}>
          {product.name}
        </Link>
      </h3>

      {/* Rating */}
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
        <span className="demo-rating-count">({product.reviews_count || 12})</span>
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

      {/* Actions: Multi-color Add to Cart + Wishlist */}
      <div className="demo-card-actions">
        <button
          onClick={handleAdd}
          className="btn-add-cart-colorful"
          style={{
            background: added ? '#10B981' : theme.bg,
            boxShadow: `0 4px 12px ${theme.shadow}`
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? (
            <>
              <Check size={16} /> Added!
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
    </article>
  );
}
