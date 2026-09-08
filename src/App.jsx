import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthModal from './components/common/AuthModal';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import NewArrivals from './pages/NewArrivals';
import SpecialDeals from './pages/SpecialDeals';
import CategoryDetail from './pages/CategoryDetail';
import ProductDetail from './pages/ProductDetail';
import Bag from './pages/Bag';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Terms, ShippingPolicy, ReturnsPolicy } from './pages/PolicyPages';
import Sitemap from './pages/Sitemap';
import { trackPageView } from './lib/posthog';

function RouteTracker() {
  const { pathname, search } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackPageView(window.location.href);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <RouteTracker />
          <AuthModal />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AnnouncementBar />
            <header className="site-header">
              <Header />
              <Navbar />
            </header>

            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/best-sellers" element={<Shop />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:slug" element={<CategoryDetail />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/deals" element={<SpecialDeals />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/bag" element={<Bag />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/shipping-delivery" element={<ShippingPolicy />} />
                <Route path="/returns-refunds" element={<ReturnsPolicy />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
