import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './ShopPage.css';

export default function ShopPage() {
  const [filter, setFilter] = useState('Flavoured');

  const filteredProducts = products.filter(product => {
    const isFlavored = product.flavor !== 'Normal / Classic';
    if (filter === 'Flavoured') return isFlavored;
    if (filter === 'Raw/Bulk') return !isFlavored;
    return true;
  });

  return (
    <div className="shop-page page-enter">
      <div className="shop-hero">
        <div className="container">
          <h1 className="shop-title text-display">Shop Premium Ganga Makhana</h1>
          <p className="shop-subtitle text-body">
            Discover our carefully curated selection of export-quality fox nuts. 
            Perfectly roasted, minimally processed, and intensely flavorful.
          </p>
        </div>
      </div>

      <div className="promo-strip">
        <div className="container">
          <p>🎁 <strong>Free Shipping</strong> on orders above ₹999! 🚀</p>
        </div>
      </div>

      <div className="shop-content container section-padding">
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'Flavoured' ? 'active' : ''}`}
            onClick={() => setFilter('Flavoured')}
          >
            Flavoured
          </button>
          <button 
            className={`filter-btn ${filter === 'Raw/Bulk' ? 'active' : ''}`}
            onClick={() => setFilter('Raw/Bulk')}
          >
            Raw / Bulk
          </button>
        </div>

        <div className="shop-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <h3>No products found in this category.</h3>
            <p>Check back later or try a different filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
