import ProductCard from './ProductCard';
import { products } from '../data/products';
import './ShopSection.css';


export default function ShopSection() {
  return (
    <section id="shop" className="section-padding shop-section">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Shop Our Flavors</h2>
          <p className="section-subtitle">
            Discover the perfect blend of health and taste. Our premium makhanas are 
            roasted to perfection and seasoned with the finest ingredients.
          </p>
        </div>

        <div className="shop-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
