import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { currency, setCurrency, supportedCurrencies } = useCurrency();
  const { currentUser, logout } = useAuth();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img src="/images/logo.png" alt="Ganga Makhana Logo" className="brand-logo" />
          </Link>
        </div>
        
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/story">Our Story</Link></li>
          <li><Link to="/wholesale">Wholesale</Link></li>
        </ul>

        <div className="navbar-actions">
          {currentUser ? (
            <button onClick={logout} className="text-btn">Logout</button>
          ) : (
            <Link to="/login" className="text-btn" style={{ fontWeight: 500 }}>Login</Link>
          )}

          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-selector"
          >
            {supportedCurrencies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          
          <Link to="/cart" className="btn-primary cart-btn-elongated">
            <ShoppingBag size={18} color="#ffffff" />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge-inline">{cartCount}</span>}
          </Link>

          <button className="nav-icon-btn mobile-menu-trigger" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} color="var(--color-primary)" />
          </button>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <Link to="/" className="logo-link" onClick={() => setMobileMenuOpen(false)}>
              <img src="/images/logo.png" alt="Ganga Makhana Logo" className="brand-logo" />
            </Link>
            <button className="nav-icon-btn close-menu-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={28} color="var(--color-primary)" />
            </button>
          </div>
          <ul className="mobile-nav-links">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link></li>
            <li><Link to="/story" onClick={() => setMobileMenuOpen(false)}>Our Story</Link></li>
            <li><Link to="/wholesale" onClick={() => setMobileMenuOpen(false)}>Wholesale</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
