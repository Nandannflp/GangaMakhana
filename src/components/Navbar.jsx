import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { currency, setCurrency, supportedCurrencies } = useCurrency();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getCartCount();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img src={theme === 'dark' ? "/images/logo.webp" : "/images/logo.jpg"} alt="Ganga Makhana Logo" className="brand-logo" />
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
            <Link to="/profile" className="nav-icon-btn profile-link">
              <User size={22} color="var(--color-text)" />
            </Link>
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
          
          <Link 
            to="/cart" 
            onClick={handleCartClick}
            className={`btn-primary cart-btn-elongated ${!currentUser ? 'disabled-cart' : ''}`}
            title={!currentUser ? "Login to access cart" : ""}
          >
            <ShoppingBag size={18} color="#ffffff" />
            <span>Cart</span>
            {currentUser && cartCount > 0 && <span className="cart-badge-inline">{cartCount}</span>}
          </Link>

          <button className="nav-icon-btn mobile-menu-trigger" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} color="var(--color-primary)" />
          </button>
          
          <button className="nav-icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme" style={{ marginLeft: '10px' }}>
            {theme === 'dark' ? <Sun size={20} color="var(--color-text)" /> : <Moon size={20} color="var(--color-text)" />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <Link to="/" className="logo-link" onClick={() => setMobileMenuOpen(false)}>
              <img src={theme === 'dark' ? "/images/logo.webp" : "/images/logo.jpg"} alt="Ganga Makhana Logo" className="brand-logo" />
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
            {currentUser ? (
              <li><Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link></li>
            ) : (
              <li><Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
