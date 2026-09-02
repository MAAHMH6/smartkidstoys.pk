import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="header-nav-bar">
      <div className="container">
        <div className="nav-bar-row">
          {/* All Categories Pill Button */}
          <Link to="/categories" className="all-categories-btn">
            <Menu size={18} />
            <span>All Categories</span>
            <ArrowRight size={16} />
          </Link>

          {/* Navigation Links */}
          <nav className="main-nav-links">
            <NavLink to="/" className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`} end>
              Home ▾
            </NavLink>

            <NavLink to="/shop" className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`}>
              Shop
            </NavLink>

            <NavLink to="/new-arrivals" className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`}>
              New Arrivals
            </NavLink>

            <NavLink to="/shop?sort=bestseller" className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`}>
              Best Sellers
            </NavLink>

            <NavLink to="/deals" className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`}>
              Deals
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`}>
              About Us
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`}>
              Contact Us
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
