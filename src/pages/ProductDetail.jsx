import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService, FALLBACK_PRODUCTS } from '../services/productService';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/common/QuantitySelector';
import ProductCard from '../components/common/ProductCard';
import SEO from '../components/common/SEO';
import { slugify } from '../utils/slugify';
import { 
  ShoppingCart, 
  Zap, 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart,
  Share2,
  MessageCircle,
  Star
} from 'lucide-react';

export default function ProductDetail() {
  const { id, slug } = useParams();
  const identifier = slug || id;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Ayesha Khan',
      date: 'August 14, 2026',
      rating: 5,
      comment: 'Super soft and exactly as pictured! My 4-year-old daughter loves it.'
    },
    {
      name: 'Bilal Ahmed',
      date: 'July 28, 2026',
      rating: 5,
      comment: 'High quality child-safe materials and super fast delivery to Karachi.'
    }
  ]);

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    setIsAdded(false);

    productService.getBySlugOrId(identifier).then((prod) => {
      const activeProd = prod || (FALLBACK_PRODUCTS && FALLBACK_PRODUCTS[0]) || null;
      setProduct(activeProd);
      if (activeProd) {
        setSelectedImage(activeProd.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600');
        productService.getByCategory(activeProd.category).then((rel) => {
          setRelatedProducts(rel.filter((p) => String(p.id) !== String(activeProd.id) && p.slug !== activeProd.slug).slice(0, 4));
        }).catch(() => {});
      }
      setLoading(false);
    }).catch((err) => {
      console.warn('Product load exception:', err);
      const fallback = FALLBACK_PRODUCTS && FALLBACK_PRODUCTS[0] ? FALLBACK_PRODUCTS[0] : null;
      setProduct(fallback);
      setLoading(false);
    });
  }, [identifier]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', animation: 'spin 1s infinite' }}>🧸</div>
        <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--text-muted)' }}>The product you requested is currently unavailable.</p>
        <Link to="/shop" className="btn-hero-shop">
          Return to Shop
        </Link>
      </div>
    );
  }

  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;
  const inStock = product.stock > 0;
  const rating = Number(product.rating || 4.8);
  const sku = `SKT-${product.category?.substring(0, 3).toUpperCase() || 'TOY'}-${String(product.id).padStart(4, '0')}`;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/bag');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;
    setReviewsList([
      {
        name: reviewerName.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        rating: reviewRating,
        comment: reviewComment.trim()
      },
      ...reviewsList
    ]);
    setReviewerName('');
    setReviewComment('');
  };

  // Image gallery items (simulate WooCommerce multi-angles)
  const galleryImages = [
    product.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600'
  ];

  const productSlug = product.slug || slugify(product.name);
  const categorySlug = slugify(product.category || 'educational');
  const canonicalUrl = `https://smartkidstoys.pk/product/${productSlug}`;

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
            "name": product.category || "Categories",
            "item": `https://smartkidstoys.pk/category/${categorySlug}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Product",
        "@id": `${canonicalUrl}/#product`,
        "name": product.name,
        "image": [product.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
        "description": product.description || `Buy ${product.name} online in Pakistan. High quality educational toys for kids with cash on delivery.`,
        "sku": sku,
        "brand": {
          "@type": "Brand",
          "name": "Smart Kids Toys"
        },
        "offers": {
          "@type": "Offer",
          "url": canonicalUrl,
          "priceCurrency": "PKR",
          "price": price,
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "Smart Kids Toys Pakistan"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": String(rating),
          "reviewCount": String(product.rating_count || 45),
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  };

  return (
    <div className="container single-product woocommerce-page" style={{ padding: '24px 20px 80px' }}>
      {/* Dynamic Native SEO & Schema.org Rich Snippets */}
      <SEO
        title={`${product.name} | Buy Online Pakistan`}
        description={`${product.name}: ${product.description}. Buy authentic toys in Pakistan at Smart Kids Toys with Cash on Delivery.`}
        canonical={canonicalUrl}
        ogImage={product.image_url}
        ogType="product"
        schemaJson={schemaJson}
      />

      {/* 1. WooCommerce Standard Breadcrumbs (SEO friendly) */}
      <nav className="woocommerce-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '28px' }} aria-label="Breadcrumb">
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/categories" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Categories</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${categorySlug}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{product.category}</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#FF4D8D', fontWeight: 700 }}>{product.name}</span>
      </nav>

      {/* 2. Main Single Product Content */}
      <div className="product type-product status-publish has-post-thumbnail entry" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start' }}>
        
        {/* Left: WooCommerce Product Gallery */}
        <div className="woocommerce-product-gallery">
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', overflow: 'hidden', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1', boxShadow: 'var(--shadow-card)', position: 'relative' }}>
            {oldPrice && oldPrice > price && (
              <span className="demo-sale-tag" style={{ top: '20px', left: '20px', padding: '4px 14px', fontSize: '0.8rem' }}>
                Sale!
              </span>
            )}
            <img
              src={selectedImage}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Thumbnail Strip */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            {galleryImages.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedImage === img ? '2px solid var(--primary-yellow)' : '1px solid var(--gray-2)',
                  background: 'white',
                  padding: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <img src={img} alt={`${product.name} angle ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: WooCommerce Summary & Buy Section */}
        <div className="summary entry-summary">
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
            {product.category}
          </div>

          <h1 className="product_title entry-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 900, marginBottom: '12px', lineHeight: '1.25' }}>
            {product.name}
          </h1>

          {/* Star Ratings */}
          <div className="woocommerce-product-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ color: 'var(--primary-yellow)', display: 'flex', alignItems: 'center' }}>
              {'★'.repeat(Math.floor(rating))}
              {rating % 1 !== 0 && '½'}
              {'☆'.repeat(5 - Math.ceil(rating))}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ({reviewsList.length} customer reviews)
            </span>
          </div>

          {/* Age & Educational Skill Badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span style={{ background: '#EFF6FF', color: '#0284C7', fontWeight: 800, fontSize: '0.82rem', padding: '4px 12px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              👶 Age: {product.age_range || '3–8 Years'}
            </span>
            <span style={{ background: '#ECFDF5', color: '#059669', fontWeight: 800, fontSize: '0.82rem', padding: '4px 12px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              🧠 Educational: {product.educational_skill || 'STEM & Motor Skills'}
            </span>
          </div>

          {/* Price */}
          <div className="price" style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: 'var(--dark-heading)' }}>
              PKR {price.toLocaleString()}
            </span>
            {oldPrice && (
              <span style={{ fontSize: '1.2rem', color: 'var(--gray-4)', textDecoration: 'line-through' }}>
                PKR {oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* In Stock Badge */}
          <div className="stock-status" style={{ marginBottom: '20px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: inStock ? 'var(--accent-green)' : 'var(--accent-red)', background: inStock ? '#DCFCE7' : '#FEE2E2', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>
              {inStock ? `● In Stock (${product.stock} units left)` : '● Out of Stock'}
            </span>
          </div>

          {/* Short Description */}
          <div className="woocommerce-product-details__short-description" style={{ color: 'var(--text)', fontSize: '0.96rem', lineHeight: '1.65', marginBottom: '24px' }}>
            <p>{product.description}</p>
          </div>

          {/* Add to Cart & Buy Now Form */}
          <div className="cart-form-wrapper" style={{ background: '#F8FAFC', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-2)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Quantity:</span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} min={1} max={product.stock || 99} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Total: <strong>PKR {(price * quantity).toLocaleString()}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className="btn-add-cart-yellow"
                style={{ padding: '14px 24px', fontSize: '1rem', flex: 1, minWidth: '160px', fontWeight: 800 }}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!inStock}
                className="btn-hero-shop"
                style={{ flex: 1, minWidth: '160px', justifyContent: 'center', fontWeight: 800 }}
              >
                <Zap size={18} />
                <span>Buy Now</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="btn-wishlist-outline"
                style={{ width: '48px', height: '48px', color: isWishlisted ? 'var(--accent-red)' : 'var(--text-muted)' }}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? 'var(--accent-red)' : 'none'} />
              </button>
            </div>

            {/* Prominent WhatsApp Order Button underneath Add to Cart */}
            <a
              href={`https://wa.me/923098444501?text=${encodeURIComponent(`Hello SmartKids Toys! 💬\nI want to order: *${product.name}*\nPrice: PKR ${price.toLocaleString()}\nQuantity: ${quantity}\nTotal: PKR ${(price * quantity).toLocaleString()}\nSKU: ${sku}\nPlease confirm my delivery details!`)}`}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '100%',
                background: '#25D366',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '14px 20px',
                fontWeight: 900,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.35)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MessageCircle size={20} fill="currentColor" color="none" />
              <span>💬 Order on WhatsApp</span>
            </a>
          </div>

          {/* WooCommerce Product Meta (SKU, Categories, Tags) */}
          <div className="product_meta" style={{ borderTop: '1px solid var(--gray-2)', paddingTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--dark-heading)' }}>SKU: </span>
              <span className="sku">{sku}</span>
            </div>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--dark-heading)' }}>Category: </span>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`} style={{ color: 'var(--primary-blue)' }}>
                {product.category}
              </Link>
            </div>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--dark-heading)' }}>Tags: </span>
              <span>Child-Safe, Non-Toxic, Educational Toys, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WooCommerce Product Tabs (Description, Additional Info, Reviews) */}
      <div className="woocommerce-tabs wc-tabs-wrapper" style={{ marginTop: '64px', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        {/* Tab Headers */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-2)', background: '#F8FAFC' }}>
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            style={{
              padding: '16px 28px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: activeTab === 'description' ? 'var(--primary-blue)' : 'var(--text-muted)',
              borderBottom: activeTab === 'description' ? '3px solid var(--primary-blue)' : '3px solid transparent',
              background: 'transparent'
            }}
          >
            Description
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('additional')}
            style={{
              padding: '16px 28px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: activeTab === 'additional' ? 'var(--primary-blue)' : 'var(--text-muted)',
              borderBottom: activeTab === 'additional' ? '3px solid var(--primary-blue)' : '3px solid transparent',
              background: 'transparent'
            }}
          >
            Additional Information
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '16px 28px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: activeTab === 'reviews' ? 'var(--primary-blue)' : 'var(--text-muted)',
              borderBottom: activeTab === 'reviews' ? '3px solid var(--primary-blue)' : '3px solid transparent',
              background: 'transparent'
            }}
          >
            Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Tab Body */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'description' && (
            <div className="woocommerce-Tabs-panel woocommerce-Tabs-panel--description">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Product Description</h3>
              <p style={{ color: 'var(--text)', lineHeight: '1.7', marginBottom: '16px' }}>{product.description}</p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                All SmartKids Toys products undergo rigorous safety assessments to verify they meet high international child protection standards. No harmful chemicals, BPA-free, lead-free and smooth rounded edges for safe, worry-free playtime.
              </p>
            </div>
          )}

          {activeTab === 'additional' && (
            <div className="woocommerce-Tabs-panel woocommerce-Tabs-panel--additional_information">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Specifications</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--gray-2)' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 700, width: '30%', background: '#F8FAFC' }}>Brand</td>
                    <td style={{ padding: '10px 16px' }}>SmartKids Toys Pakistan</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--gray-2)' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 700, background: '#F8FAFC' }}>Category</td>
                    <td style={{ padding: '10px 16px' }}>{product.category}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--gray-2)' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 700, background: '#F8FAFC' }}>Safety Standard</td>
                    <td style={{ padding: '10px 16px' }}>100% Non-Toxic & Child-Safe</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--gray-2)' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 700, background: '#F8FAFC' }}>Age Group</td>
                    <td style={{ padding: '10px 16px' }}>3 to 12 Years</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 16px', fontWeight: 700, background: '#F8FAFC' }}>Delivery Coverage</td>
                    <td style={{ padding: '10px 16px' }}>All Pakistan Cities (Karachi, Lahore, Islamabad, etc.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Customer Reviews</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {reviewsList.map((rev, i) => (
                  <div key={i} style={{ padding: '16px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '0.95rem' }}>{rev.name}</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{rev.date}</span>
                    </div>
                    <div style={{ color: 'var(--primary-yellow)', fontSize: '0.9rem', marginBottom: '6px' }}>
                      {'★'.repeat(rev.rating)}
                    </div>
                    <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: '1.5' }}>{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div style={{ borderTop: '1px solid var(--gray-2)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Add a Review</h4>
                <form onSubmit={handleAddReview}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Your Name *</label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Fatima Ali"
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Rating *</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                      >
                        <option value="5">★★★★★ (5 out of 5)</option>
                        <option value="4">★★★★☆ (4 out of 5)</option>
                        <option value="3">★★★☆☆ (3 out of 5)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Your Review *</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Write your review here..."
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--gray-2)', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <button type="submit" className="btn-hero-shop" style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. WooCommerce Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related products" style={{ marginTop: '64px' }} aria-labelledby="related-products-heading">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="section-dots" aria-hidden="true">
                <span className="section-dot" style={{ background: '#EF4444' }}></span>
                <span className="section-dot" style={{ background: '#F59E0B' }}></span>
                <span className="section-dot" style={{ background: '#0284C7' }}></span>
              </div>
              <h2 id="related-products-heading" className="section-title-text">Related Toys</h2>
            </div>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="view-all-btn">
              <span>View All in {product.category}</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
