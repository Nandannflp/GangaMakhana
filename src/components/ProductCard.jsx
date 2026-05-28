import { useState } from 'react';
import { ShoppingBag, Plus, Minus, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const [showNutrition, setShowNutrition] = useState(false);
  
  const cartItem = cart.find(item => item.id === product.id);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      flavor: product.flavor,
      price: product.price,
      weight: product.weight,
      imgFront: product.images[0]
    });
  };

  // Extract numeric price and format manually to split symbol from value
  const priceFormatted = formatPrice(product.price);
  // Separate rupee symbol from digits (handles ₹ and other currency symbols)
  const priceMatch = priceFormatted.match(/^([^\d]+)([\d,.]+)$/);
  const currencySymbol = priceMatch ? priceMatch[1].trim() : '';
  const priceNumber = priceMatch ? priceMatch[2] : priceFormatted;

  return (
    <div className="product-card card" style={{ '--card-accent': product.colorTheme.primary, '--card-accent-alt': product.colorTheme.secondary }}>
      <Link to={`/product/${product.id}`} style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}>
        <div className="product-image-container">
          <div className="product-bg"></div>
          <div className="pack-images">
            <img src={product.images[0]} alt={`${product.flavor} front`} className="pack-img-front" />
            <img src={product.images[1]} alt={`${product.flavor} back`} className="pack-img-back" />
          </div>
          <div className="product-tags">
            {product.badges.map((tag, i) => (
              <span key={i} className="product-tag">{tag}</span>
            ))}
          </div>

          {product.nutrition && (
            <div className={`nutrition-overlay ${showNutrition ? 'active' : ''}`} onClick={e => e.preventDefault()}>
              <button className="btn-close-nutrition" onClick={(e) => { e.preventDefault(); setShowNutrition(false); }}><X size={16}/></button>
              <h4>Nutrition Facts</h4>
              <p style={{fontSize: '0.75rem', textAlign: 'center', marginBottom: '10px'}}>Per 100g (Approx.)</p>
              <table className="nutrition-table">
                <tbody>
                  <tr><th>Calories</th><td>{product.nutrition.calories}</td></tr>
                  <tr><th>Protein</th><td>{product.nutrition.protein}</td></tr>
                  <tr><th>Total Fat</th><td>{product.nutrition.fat}</td></tr>
                  <tr><th>Carbs</th><td>{product.nutrition.carbs}</td></tr>
                  <tr><th>Fiber</th><td>{product.nutrition.fiber}</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="product-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="product-title">{product.flavor}</h3>
            {product.nutrition && (
              <button className="btn-nutrition" onClick={(e) => { e.preventDefault(); setShowNutrition(true); }}>
                <Info size={14} /> Nutrition
              </button>
            )}
          </div>
          <p className="product-note">{product.tagline}</p>

          <div className="product-meta flex justify-between items-center">
            <div className="product-price">
              <span className="price-currency">{currencySymbol} </span><span className="price-val">{priceNumber}</span>
            </div>
          </div>

          {cartItem ? (
            <div className="product-qty-control" onClick={e => e.preventDefault()}>
              <button onClick={(e) => { e.preventDefault(); updateQuantity(product.id, cartItem.quantity - 1); }}><Minus size={18}/></button>
              <span>{cartItem.quantity}</span>
              <button onClick={(e) => { e.preventDefault(); updateQuantity(product.id, cartItem.quantity + 1); }}><Plus size={18}/></button>
            </div>
          ) : (
            <button className="btn-add-cart" onClick={(e) => { e.preventDefault(); handleAdd(); }}>
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}
