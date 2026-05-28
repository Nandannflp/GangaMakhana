import { ArrowRight, ShieldCheck, Leaf, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            Premium Indian Superfood
          </div>
          <h1 className="hero-title">
            Premium Ganga Makhana <br/>
            <span className="text-accent">from Bihar</span>
          </h1>
          <p className="hero-subtitle">
            Indulge in our exquisite collection of export-quality, naturally sourced fox nuts. Hand-harvested in the heart of Bihar for a truly premium, healthy snacking experience.
          </p>
          
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary btn-lg">
              Shop Flavoured Makhana <ArrowRight size={20} />
            </Link>
            <Link to="/shop?tab=raw" className="btn-secondary btn-lg">
              Buy Raw Makhana
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <Leaf size={20} color="var(--color-primary)" />
              <span>100% Natural</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={20} color="var(--color-primary)" />
              <span>Export Quality</span>
            </div>
            <div className="trust-item">
              <Globe size={20} color="var(--color-primary)" />
              <span>Ships Globally</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-blob"></div>
          <div className="hero-product-image">
            <img src="/images/products/normal-front.png" alt="Ganga Makhana Premium Pouch" className="hero-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
