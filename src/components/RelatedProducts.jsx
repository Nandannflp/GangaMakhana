import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './RelatedProducts.css';

export default function RelatedProducts({ currentProductId }) {
  const related = products.filter(p => p.id !== currentProductId).slice(0, 3); // show 3 related

  return (
    <div className="related-products">
      <h2>Explore Other Flavors</h2>
      <div className="related-grid">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
