import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './ShopPage.css';

export default function ShopPage() {
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
        <div className="shop-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="empty-state">
            <h3>No products found.</h3>
            <p>Check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
