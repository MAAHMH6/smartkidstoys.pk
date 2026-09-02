import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/common/QuantitySelector';
import { Trash2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Bag() {
  const { cartItems, updateQuantity, removeFromCart, totalCount, subtotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container woocommerce-page" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Your Shopping Cart is currently empty.</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '0.95rem' }}>
          Explore our collection and discover wonderful toys for your kids!
        </p>
        <Link to="/shop" className="btn-hero-shop">
          Return to Shop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container woocommerce woocommerce-cart woocommerce-page" style={{ padding: '32px 20px 80px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 className="entry-title" style={{ fontSize: '1.9rem', fontWeight: 900, marginBottom: '4px' }}>
          Shopping Bag
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          You have {totalCount} item{totalCount > 1 ? 's' : ''} in your bag.
        </p>
      </div>

      <div className="bag-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
        {/* Left: WooCommerce Cart Table Form */}
        <div className="woocommerce-cart-form">
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', padding: '24px' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="cart_item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--gray-2)'
                }}
              >
                {/* Product Thumbnail */}
                <Link to={`/product/${item.id}`} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#F8FAFC', border: '1px solid var(--gray-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Link>

                {/* Product Name, Category & Price */}
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '2px 0 6px' }}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--dark-heading)', fontWeight: 800 }}>
                    PKR {Number(item.price).toLocaleString()}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
                    <QuantitySelector
                      quantity={item.qty}
                      onChange={(newQty) => updateQuantity(item.id, newQty)}
                    />

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', color: 'var(--accent-red)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700 }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subtotal</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.15rem', color: 'var(--dark-heading)' }}>
                    PKR {(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Right: WooCommerce Cart Collaterals / Totals */}
        <div className="cart-collaterals">
          <div className="cart_totals" style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '16px' }}>Cart Totals</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-2)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontWeight: 800 }}>PKR {subtotal.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-2)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: 800 }}>Free over PKR 3,000</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 20px', fontSize: '1.15rem', fontWeight: 900 }}>
              <span>Total</span>
              <span style={{ color: 'var(--dark-heading)' }}>PKR {subtotal.toLocaleString()}</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="btn-hero-shop"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
              <ShieldCheck size={16} color="var(--accent-green)" />
              <span>Safe & direct WhatsApp checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
