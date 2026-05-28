import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShoppingBag, MessageCircle, CheckCircle2, MapPin, Truck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import SEO from '../components/SEO';
import ProductGallery from '../components/ProductGallery';
import RelatedProducts from '../components/RelatedProducts';
import StarRating from '../components/StarRating';
import ProductReviews from '../components/ProductReviews';
import { useReviews } from '../hooks/useReviews';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [qty, setQty] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('ingredients');
  const [selectedSize, setSelectedSize] = useState('Small');
  const [selectedQuantity, setSelectedQuantity] = useState('250g');
  const [pincode, setPincode] = useState('');
  const [destinationType, setDestinationType] = useState('india');
  const [imageError, setImageError] = useState(false);

  const product = products.find(p => p.id === id);
  const { averageRating, totalReviews } = useReviews(id);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
    window.scrollTo(0, 0);
    setImageError(false);
  }, [id, product, navigate]);

  if (!product) return null;

  const displayName = product.name;
  const sizePrices = {
    Big: 550,
    Small: 350
  };
  const quantityMultipliers = {
    '250g': 1,
    '500g': 2,
    '750g': 3,
    '1kg': 4
  };
  const currentPrice = sizePrices[selectedSize] * quantityMultipliers[selectedQuantity];
  const selectedVariantLabel = `${selectedSize} size / ${selectedQuantity}`;

  const getDeliveryEstimate = () => {
    const cleanedPincode = pincode.trim();

    if (!cleanedPincode) {
      return null;
    }

    const now = new Date();
    let range = [10, 15];
    let label = 'International delivery';
    let detail = 'Estimated courier time for international shipments.';

    if (destinationType === 'india' && /^\d{6}$/.test(cleanedPincode)) {
      const zone = Number(cleanedPincode[0]);

      if ([8].includes(zone)) {
        range = [2, 3];
        label = 'Bihar and nearby states';
        detail = 'Fastest courier route from Bihar.';
      } else if ([7, 9].includes(zone)) {
        range = [3, 5];
        label = 'Eastern and northern India';
        detail = 'Regional courier route from Bihar.';
      } else {
        range = [6, 8];
        label = 'Long-distance domestic delivery';
        detail = 'Estimated courier time from Bihar to this PIN code.';
      }
    }

    const formatDate = (offsetDays) => {
      const date = new Date(now);
      date.setDate(date.getDate() + offsetDays);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      });
    };

    return {
      days: `${range[0]}-${range[1]} days`,
      dates: `${formatDate(range[0])} - ${formatDate(range[1])}`,
      label,
      detail
    };
  };

  const deliveryEstimate = getDeliveryEstimate();

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize.toLowerCase()}-${selectedQuantity}`,
      productId: product.id,
      flavor: displayName,
      name: displayName,
      price: currentPrice,
      weight: selectedQuantity,
      size: selectedSize,
      variant: selectedVariantLabel,
      imgFront: product.images[0],
      image: product.images[0]
    }, qty);
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="product-page-container" style={{ backgroundColor: product.colorTheme.bg }}>
      <SEO title={displayName} description={product.description} />
      
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

            <h1 style={{ color: product.colorTheme.primary }}>{displayName}</h1>
            
            <div className="product-page-rating" style={{ marginBottom: '15px' }}>
              {averageRating > 0 ? (
                <a href="#reviews" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StarRating rating={averageRating} size={18} />
                  <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>
                    {averageRating.toFixed(1)} <span style={{ color: 'var(--color-text-light)', fontWeight: 'normal' }}>({totalReviews} reviews)</span>
                  </span>
                </a>
              ) : (
                <a href="#reviews" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StarRating rating={0} size={18} />
                  <span style={{ color: 'var(--color-text-light)' }}>Write a review</span>
                </a>
              )}
            </div>

            <p className="product-tagline">{product.tagline}</p>

            <div className="product-price-weight">
              <span className="product-price">{formatPrice(currentPrice)}</span>
              <span className="product-weight">/ {selectedVariantLabel}</span>
            </div>

            <div className="product-options">
              <div className="option-group">
                <span className="option-label">Size</span>
                <div className="option-buttons" role="group" aria-label="Select size">
                  {Object.keys(sizePrices).map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`option-button ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <span className="option-label">Quantity</span>
                <div className="option-buttons" role="group" aria-label="Select quantity">
                  {Object.keys(quantityMultipliers).map((quantity) => (
                    <button
                      key={quantity}
                      type="button"
                      className={`option-button ${selectedQuantity === quantity ? 'active' : ''}`}
                      onClick={() => setSelectedQuantity(quantity)}
                    >
                      {quantity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ul className="product-quick-facts">
              <li><CheckCircle2 size={16} /> <strong>Taste:</strong> Authentic & bold flavor profile</li>
              <li><CheckCircle2 size={16} /> <strong>Spice level:</strong> Perfectly balanced</li>
              <li><CheckCircle2 size={16} /> <strong>Best for:</strong> Evening snack, kids' tiffin, post-workout</li>
              <li><CheckCircle2 size={16} /> <strong>Value:</strong> 100% natural, no junk, premium grade</li>
            </ul>

            <p className="product-desc">
              {product.description}
              <br/><br/>
              <strong style={{color: product.colorTheme.primary}}>Provenance Story:</strong> Sustainably hand-harvested and <strong>directly sourced from the fertile wetlands of Bihar</strong>, bringing you the most authentic and premium quality makhana straight from the origin.
            </p>

            <div className="trust-badges-block">
              <span className="trust-badge">Gluten-free</span>
              <span className="trust-badge">No MSG</span>
              <span className="trust-badge">Roasted, not fried</span>
              <span className="trust-badge">Clean ingredients</span>
            </div>

            <div className="delivery-estimator">
              <div className="delivery-heading">
                <Truck size={18} />
                <span>Check delivery date</span>
              </div>
              <div className="delivery-controls">
                <select
                  className="delivery-select"
                  value={destinationType}
                  onChange={(event) => setDestinationType(event.target.value)}
                  aria-label="Destination type"
                >
                  <option value="india">India</option>
                  <option value="international">International</option>
                </select>
                <div className="pincode-field">
                  <MapPin size={18} />
                  <input
                    type="text"
                    value={pincode}
                    onChange={(event) => setPincode(event.target.value)}
                    placeholder={destinationType === 'india' ? 'Enter PIN code' : 'Enter postal code'}
                    inputMode={destinationType === 'india' ? 'numeric' : 'text'}
                    maxLength={destinationType === 'india' ? 6 : 12}
                  />
                </div>
              </div>
              {deliveryEstimate && (
                <div className="delivery-result">
                  <strong>{deliveryEstimate.dates}</strong>
                  <span>{deliveryEstimate.days} - {deliveryEstimate.label}</span>
                  <small>{deliveryEstimate.detail}</small>
                </div>
              )}
            </div>

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

            <div className="bulk-inquiry-whatsapp">
              <a href="https://wa.me/919876543210?text=Hi! I am interested in bulk orders for Ganga Makhana." target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} /> For Bulk Inquiries, WhatsApp Us
              </a>
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


        {!imageError && (
          <div className="product-infographic" style={{ marginTop: '40px', marginBottom: '10px', textAlign: 'center' }}>
            <img 
              src={`/images/products/${product.id}-infographic.jpg`} 
              alt={`${product.name} Features`} 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} 
              onError={() => setImageError(true)}
            />
          </div>
        )}

        <ProductReviews productId={product.id} themeColor={product.colorTheme.primary} />

        <RelatedProducts currentProductId={product.id} />

      </div>
    </div>
  );
}
