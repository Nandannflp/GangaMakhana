import React from 'react';
import ProductCard from './ProductCard';
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
    colorVar: "--color-flavor-peri",
    colorAltVar: "--color-flavor-peri-alt",
    tags: ["Spicy"],
    tastingNote: "Bold, vibrant, and fiery red. A spicy kick in every bite.",
    imgFront: "/images/products/peri-front.png",
    imgBack: "/images/products/peri-back.png",
    nutrition: { ...baseNutrition, calories: "355 kcal", fat: "2.1g" }
  },
  {
    id: 3,
    flavor: "Mint",
    price: 350,
    weight: "250g",
    colorVar: "--color-flavor-mint",
    colorAltVar: "--color-flavor-mint-alt",
    tags: ["Refreshing"],
    tastingNote: "Fresh, cool, and zesty. Perfect for a light snack.",
    imgFront: "/images/products/mint-front.png",
    imgBack: "/images/products/mint-back.png",
    nutrition: { ...baseNutrition, calories: "350 kcal", fat: "1.5g" }
  },
  {
    id: 4,
    flavor: "Pudina",
    price: 350,
    weight: "250g",
    colorVar: "--color-flavor-pudina",
    colorAltVar: "--color-flavor-pudina-alt",
    tags: ["Traditional"],
    tastingNote: "Earthy and tangy. A traditional favorite with a twist.",
    imgFront: "/images/products/pudina-front.png",
    imgBack: "/images/products/pudina-back.png",
    nutrition: { ...baseNutrition, calories: "350 kcal", fat: "1.6g" }
  },
  {
    id: 5,
    flavor: "Chocolate",
    price: 350,
    weight: "250g",
    colorVar: "--color-flavor-choco",
    colorAltVar: "--color-flavor-choco-alt",
    tags: ["Sweet", "Kids Love It"],
    tastingNote: "Indulgent, rich, and dessert-like. A sweet treat.",
    imgFront: "/images/products/choco-front.png",
    imgBack: "/images/products/choco-back.png",
    nutrition: { ...baseNutrition, calories: "385 kcal", fat: "4.5g", carbs: "80.2g" }
  },
  {
    id: 6,
    flavor: "Onion",
    price: 350,
    weight: "250g",
    colorVar: "--color-flavor-onion",
    colorAltVar: "--color-flavor-onion-alt",
    tags: ["Savory"],
    tastingNote: "Savory, deep, and aromatic. Great with tea.",
    imgFront: "/images/products/onion-front.png",
    imgBack: "/images/products/onion-back.png",
    nutrition: { ...baseNutrition, calories: "352 kcal", fat: "1.8g" }
  }
];

export default function ShopSection() {
  return (
    <section id="shop" className="shop-section section-padding">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Explore Our Flavors</h2>
          <p className="section-subtitle">
            From the classic pure taste to bold, modern seasonings. We have a flavor for every mood and every occasion.
          </p>
        </div>

        <div className="products-grid">
          {flavors.map(f => (
            <ProductCard key={f.id} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
