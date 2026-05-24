import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <img src="/images/logo.png" alt="Ganga Makhana Logo" className="brand-logo" />
        </div>
        
        <ul className="navbar-links">
          <li><a href="/#shop">Shop</a></li>
          <li><a href="/#about">Our Story</a></li>
          <li><a href="/#wholesale">Wholesale</a></li>
        </ul>

        <div className="navbar-actions">
          <button className="nav-icon-btn">
            <ShoppingBag size={22} color="var(--color-primary)" />
            <span className="cart-badge">0</span>
          </button>
          <a href="https://wa.me/919608669041" target="_blank" rel="noreferrer" className="btn-primary whatsapp-btn">
            <MessageCircle size={18} />
            <span>Chat</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
