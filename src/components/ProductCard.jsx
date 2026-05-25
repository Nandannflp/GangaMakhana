import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import './ProductCard.css';

export default function ProductCard({ flavor, price, weight, colorVar, colorAltVar, tags, tastingNote, imgFront, imgBack, nutrition }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const [showNutrition, setShowNutrition] = useState(false);
  
  const id = flavor.toLowerCase().replace(/\s+/g, '-');
  const cartItem = cart.find(item => item.id === id);

  const handleAdd = () => {
    addToCart({
      id,
      flavor,
      price,
      weight,
      imgFront
    });
  };
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
        
        {nutrition && (
          <div className={`nutrition-overlay ${showNutrition ? 'active' : ''}`}>
            <button className="btn-close-nutrition" onClick={() => setShowNutrition(false)}><X size={16}/></button>
            <h4>Nutrition Facts</h4>
            <p style={{fontSize: '0.75rem', textAlign: 'center', marginBottom: '10px'}}>Per 100g (Approx.)</p>
            <table className="nutrition-table">
              <tbody>
                <tr><th>Calories</th><td>{nutrition.calories}</td></tr>
                <tr><th>Protein</th><td>{nutrition.protein}</td></tr>
                <tr><th>Total Fat</th><td>{nutrition.fat}</td></tr>
                <tr><th>Carbs</th><td>{nutrition.carbs}</td></tr>
                <tr><th>Fiber</th><td>{nutrition.fiber}</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="product-title">{flavor}</h3>
          {nutrition && (
            <button className="btn-nutrition" onClick={() => setShowNutrition(true)}>
              <Info size={14} /> Nutrition
            </button>
          )}
        </div>
        <p className="product-note">{tastingNote}</p>
        
        <div className="product-meta flex justify-between items-center">
          <div className="product-price">
            <span className="price-val">{formatPrice(price)}</span>
            <span className="weight-val">/ {weight}</span>
          </div>
        </div>

        {cartItem ? (
          <div className="product-qty-control">
            <button onClick={() => updateQuantity(id, cartItem.quantity - 1)}><Minus size={18}/></button>
            <span>{cartItem.quantity}</span>
            <button onClick={() => updateQuantity(id, cartItem.quantity + 1)}><Plus size={18}/></button>
          </div>
        ) : (
          <button className="btn-add-cart" onClick={handleAdd}>
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
