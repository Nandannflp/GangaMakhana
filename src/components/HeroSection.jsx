import React from 'react';
import { ArrowRight, ShieldCheck, Leaf, Globe } from 'lucide-react';
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
            Authentic Bihar Heritage, <br/>
            <span className="text-accent">Export Quality</span> Makhana
          </h1>
          <p className="hero-subtitle">
            Experience the purest, 100% natural, handpicked and perfectly roasted fox nuts. A luxury snacking experience rooted in tradition.
          </p>
          
          <div className="hero-actions">
            <a href="#shop" className="btn-primary btn-lg">
              Shop Now <ArrowRight size={20} />
            </a>
            <a href="#wholesale" className="btn-secondary btn-lg">
              Wholesale Inquiry
            </a>
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
