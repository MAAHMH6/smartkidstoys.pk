import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';

const CATEGORIES = [
  'All Categories',
  'Soft Toys',
  'Educational',
  'Vehicles',
  'Building Blocks',
  'Puzzles',
  'Outdoor Toys',
  'Baby Toys',
  'Arts & Crafts'
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const { totalCount, subtotal } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      const results = await productService.search(searchQuery);
      setSearchResults(results.slice(0, 6));
      setIsDropdownOpen(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsDropdownOpen(false);
      const catParam = selectedCat !== 'All Categories' ? `&category=${encodeURIComponent(selectedCat)}` : '';
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}${catParam}`);
    }
  };

  return (
    <div className="main-header">
      <div className="container">
        {/* 3-Column Centered Header Layout: [Left Search] [Center Big Logo] [Right Account & Cart] */}
        <div className="main-header-centered-grid">
          
          {/* 1. LEFT: Search Bar */}
          <div className="demo-search-bar" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search for toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setIsDropdownOpen(true)}
                className="demo-search-input"
              />

              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="demo-search-select"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button type="submit" className="demo-search-btn" aria-label="Search">
                <Search size={16} />
              </button>
            </form>

            {/* Live Search Dropdown */}
            {isDropdownOpen && (
              <div className="search-dropdown">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="search-dropdown-item"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <img
                        src={product.image_url || '/assets/logo.png'}
                        alt={product.name}
                        className="search-item-thumb"
                      />
                      <div>
                        <div className="search-item-title">{product.name}</div>
                        <div className="search-item-price">PKR {Number(product.price).toLocaleString()}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="search-empty">
                    No toys found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. CENTER: Large Prominent Logo */}
          <div className="header-logo-center-wrap">
            <Link to="/" className="header-logo-wrap" aria-label="SmartKids Toys Home">
              <img 
                src="/assets/logo.png" 
                alt="SmartKids Toys" 
                className="header-logo-big-img" 
              />
            </Link>
          </div>

          {/* 3. RIGHT: Account & Cart Action Badges */}
          <div className="header-right-actions">
            {/* Admin Dashboard Quick Shortcut */}
            {(user?.email?.toLowerCase() === 'admin@smartkidstoys.pk' || profile?.is_admin) && (
              <Link
                to="/admin"
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  color: 'white',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🛡️ Admin Panel</span>
              </Link>
            )}

            {/* Account Link */}
            <Link to={user ? "/account" : "/login"} className="header-meta-item">
              <div className="header-icon-circle" style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={22} color="var(--primary-blue)" />
              </div>
              <div className="header-meta-text">
                <div className="header-meta-label">Account</div>
                <div className="header-meta-value">
                  {user ? (profile?.full_name?.split(' ')[0] || 'Admin') : 'Login / Sign up'}
                </div>
              </div>
            </Link>

            {/* Cart Link */}
            <Link to="/bag" className="header-meta-item">
              <div className="cart-icon-wrapper header-icon-circle" style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShoppingBag size={22} color="#D97706" />
                <span className="cart-yellow-badge">{totalCount}</span>
              </div>
              <div className="header-meta-text">
                <div className="header-meta-label">Bag</div>
                <div className="header-meta-value">
                  PKR {subtotal.toLocaleString()}
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
