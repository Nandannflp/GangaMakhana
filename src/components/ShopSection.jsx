import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './ShopSection.css';

const baseNutrition = { calories: "347 kcal", protein: "9.7g", fat: "0.1g", carbs: "76.9g", fiber: "14.5g" };

const flavors = [
  {
    id: 1,
    flavor: "Normal / Classic",
    price: 350,
    weight: "250g",
    colorVar: "--color-primary",
    colorAltVar: "--color-flavor-normal-alt",
    tags: ["Best Seller", "100% Natural"],
    tastingNote: "Pure, wholesome, and authentic. The classic roasted taste.",
    imgFront: "/images/products/normal-front.png",
    imgBack: "/images/products/normal-back.png",
    nutrition: baseNutrition
  },
  {
    id: 2,
    flavor: "Peri Peri",
    price: 350,
    weight: "250g",
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
