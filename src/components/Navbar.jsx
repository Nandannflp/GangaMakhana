import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { currency, setCurrency, supportedCurrencies } = useCurrency();
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
          <img src="/images/logo.png" alt="Ganga Makhana Logo" className="brand-logo" />
        </div>
        
        <ul className="navbar-links">
          <li><a href="/#shop">Shop</a></li>
          <li><Link to="/story">Our Story</Link></li>
          <li><a href="/#wholesale">Wholesale</a></li>
        </ul>

        <div className="navbar-actions">
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
        </div>
      </div>
    </nav>
  );
}
