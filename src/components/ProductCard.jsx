import React from 'react';
import { ShoppingBag } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ flavor, price, weight, colorVar, colorAltVar, tags, tastingNote, imgFront, imgBack }) {
  return (
    <div className="product-card card" style={{ '--card-accent': `var(${colorVar})`, '--card-accent-alt': `var(${colorAltVar})` }}>
      <div className="product-image-container">
        <div className="product-bg"></div>
        <div className="pack-images">
          <img src={imgFront} alt={`${flavor} front`} className="pack-img-front" />
          <img src={imgBack} alt={`${flavor} back`} className="pack-img-back" />
        </div>
        <div className="product-tags">
          {tags.map((tag, i) => (
            <span key={i} className="product-tag">{tag}</span>
          ))}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{flavor}</h3>
        <p className="product-note">{tastingNote}</p>
        
        <div className="product-meta flex justify-between items-center">
          <div className="product-price">
            <span className="price-val">₹{price}</span>
            <span className="weight-val">/ {weight}</span>
          </div>
        </div>

        <button className="btn-add-cart">
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
