import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import SEO from '../components/SEO';
import ProductGallery from '../components/ProductGallery';
import ProductReviews from '../components/ProductReviews';
import RelatedProducts from '../components/RelatedProducts';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { currency, formatPrice } = useCurrency();
  const [qty, setQty] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('ingredients');

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [id, product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    }, qty);
    // Optional: show a toast or feedback
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="product-page-container" style={{ backgroundColor: product.colorTheme.bg }}>
      <SEO title={product.name} description={product.description} />
      
      <div className="container">
        <div className="product-hero">
          <div className="product-gallery-section">
            <ProductGallery images={product.images} altText={product.name} />
          </div>

          <div className="product-info">
            <div className="product-badges">
              {product.badges.map((badge, idx) => (
                <span key={idx} className="badge">{badge}</span>
              ))}
            </div>

            <h1 style={{ color: product.colorTheme.primary }}>{product.name}</h1>
            <p className="product-tagline">{product.tagline}</p>

            <div className="product-price-weight">
              <span className="product-price">{formatPrice(product.price)}</span>
              <span className="product-weight">/ {product.weight}</span>
            </div>

            <p className="product-desc">{product.description}</p>

            <div className="add-to-cart-container">
              <div className="qty-selector">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <input className="qty-input" type="number" value={qty} readOnly />
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button 
                className="btn-primary add-to-cart-btn" 
                style={{ backgroundColor: product.colorTheme.primary, borderColor: product.colorTheme.primary }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
            </div>

            <div className="product-details-accordion">
              {/* Ingredients */}
              <div className={`accordion-item ${activeAccordion === 'ingredients' ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('ingredients')}>
                  Ingredients
                  {activeAccordion === 'ingredients' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="accordion-content">
                  <ul>
                    {product.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
                  </ul>
                </div>
              </div>

              {/* Nutrition */}
              <div className={`accordion-item ${activeAccordion === 'nutrition' ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('nutrition')}>
                  Nutritional Facts (Per 100g)
                  {activeAccordion === 'nutrition' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="accordion-content">
                  <div className="nutrition-grid">
                    {Object.entries(product.nutrition).map(([key, value]) => (
                      <div className="nutrition-item" key={key}>
                        <strong style={{textTransform: 'capitalize'}}>{key}</strong>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* How to Eat */}
              <div className={`accordion-item ${activeAccordion === 'howToEat' ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('howToEat')}>
                  How to Eat
                  {activeAccordion === 'howToEat' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="accordion-content">
                  <ul>
                    {product.howToEat.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>

              {/* Recipe */}
              <div className={`accordion-item ${activeAccordion === 'recipe' ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('recipe')}>
                  Recipe Idea
                  {activeAccordion === 'recipe' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="accordion-content">
                  <div className="recipe-box">
                    <h4>{product.recipe.title}</h4>
                    <p style={{fontSize: '0.9rem', marginBottom: '10px'}}>⏱ {product.recipe.time} • 🍽 Serves {product.recipe.serves}</p>
                    <p><strong>Ingredients:</strong> {product.recipe.ingredients.join(', ')}</p>
                    <p style={{marginTop: '10px'}}>{product.recipe.instructions}</p>
                  </div>
                </div>
              </div>

              {/* Quality */}
              <div className={`accordion-item ${activeAccordion === 'quality' ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('quality')}>
                  Quality Assurance
                  {activeAccordion === 'quality' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="accordion-content">
                  <ul>
                    {product.qualityAssurance.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        <ProductReviews reviews={product.reviews} />
        
        <RelatedProducts currentProductId={product.id} />

      </div>
    </div>
  );
}
