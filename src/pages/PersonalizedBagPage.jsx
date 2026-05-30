import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './PersonalizedBagPage.css';

const QUANTITIES = ['250g', '500g', '750g', '1kg', '2kg'];

export default function PersonalizedBagPage() {
  const [step, setStep] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('Big');
  const [quantityGrams, setQuantityGrams] = useState(250);
  const [location, setLocation] = useState(null);
  const [isFalling, setIsFalling] = useState(false);
  const [isClipped, setIsClipped] = useState(false);
  
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const makhanaContainerRef = useRef(null);

  // Auto-advance after filling animation
  useEffect(() => {
    if (step === 3 && isFalling) {
      const timer = setTimeout(() => {
        setIsFalling(false);
        setStep(4);
      }, 3000); // 3 seconds falling animation
      return () => clearTimeout(timer);
    }
  }, [step, isFalling]);

  const handleSelectFlavor = (product) => {
    setSelectedFlavor(product);
    setTimeout(() => {
      setStep(2);
    }, 800); // Wait for the transition to finish
  };
  
  const handleBackToFlavors = () => {
    setStep(1);
    setSelectedFlavor(null);
    setSelectedSize('Big');
    setQuantityGrams(250);
    setIsFalling(false);
    setIsClipped(false);
  };

  const handleFillBag = () => {
    setStep(3);
    setIsFalling(true);
    createFallingMakhana(quantityGrams);
  };

  const formattedQuantity = quantityGrams >= 1000 ? `${quantityGrams / 1000}kg` : `${quantityGrams}g`;

  const createFallingMakhana = (qty) => {
    if (!makhanaContainerRef.current || !selectedFlavor) return;
    
    makhanaContainerRef.current.innerHTML = '';
    
    let count = Math.min(20 * (qtyGrams / 250), 150); // scale by weight, max 150 particles

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'makhana-particle';
      particle.style.backgroundColor = selectedFlavor.colorTheme.primary;
      
      // Randomize position, delay, and size
      // Constrain horizontal position to the center (25% to 75%) so they don't fall outside the bag
      particle.style.left = `${Math.random() * 50 + 25}%`; 
      particle.style.animationDelay = `${Math.random() * 2}s`;
      const size = Math.random() * 15 + 15; // 15px to 30px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      makhanaContainerRef.current.appendChild(particle);
    }
  };

  const handleClipIt = () => {
    setIsClipped(true);
    setTimeout(() => {
      setStep(5);
    }, 1000);
  };

  const handleOrderNow = () => {
    setStep(6);
  };

  const handleCheckout = () => {
    if (selectedFlavor) {
      const basePrice = selectedSize === 'Big' ? 550 : 350;
      const multiplier = quantityGrams / 250;
      const customPrice = Math.round(basePrice * multiplier);
      
      const customItem = {
        ...selectedFlavor,
        id: `${selectedFlavor.id}-custom-${selectedSize.toLowerCase()}-${quantityGrams}g`,
        name: `Custom ${selectedFlavor.flavor} Bag (${selectedSize} Size, ${formattedQuantity})`,
        price: customPrice,
        weight: formattedQuantity,
        size: selectedSize,
        variant: `${selectedSize} size / ${formattedQuantity}`,
        imgFront: selectedFlavor.images[0]
      };
      
      addToCart(customItem, 1);
    }

    if (!currentUser) {
      navigate('/login?redirect=/cart');
    } else {
      navigate('/cart');
    }
  };

  const handleAddAnother = () => {
    if (selectedFlavor) {
      const basePrice = selectedSize === 'Big' ? 550 : 350;
      const multiplier = quantityGrams / 250;
      const customPrice = Math.round(basePrice * multiplier);
      
      const customItem = {
        ...selectedFlavor,
        id: `${selectedFlavor.id}-custom-${selectedSize.toLowerCase()}-${quantityGrams}g`,
        name: `Custom ${selectedFlavor.flavor} Bag (${selectedSize} Size, ${formattedQuantity})`,
        price: customPrice,
        weight: formattedQuantity,
        size: selectedSize,
        variant: `${selectedSize} size / ${formattedQuantity}`,
        imgFront: selectedFlavor.images[0]
      };
      addToCart(customItem, 1);
    }
    
    // Reset state
    setStep(1);
    setSelectedFlavor(null);
    setSelectedSize('Big');
    setQuantityGrams(250);
    setLocation(null);
    setIsFalling(false);
    setIsClipped(false);
  };

  const renderStepIndicator = () => {
    const steps = [
      'Choose Flavor',
      'Customize & Size',
      'Fill the Bag',
      'Clip It',
      'Order Now',
      'Select Location',
      'Checkout'
    ];
    return (
      <div className="pb-step-indicator">
        {steps.map((s, index) => (
          <div 
            key={index} 
            className={`pb-step ${step > index + 1 ? 'completed' : ''} ${step === index + 1 ? 'active' : ''}`}
          >
            <div className="pb-step-dot"></div>
            <span>{s}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="personalized-bag-page">
      {renderStepIndicator()}

      <div className="pb-content">
        {/* Step 1: Choose Flavor */}
        <div className={`pb-flavor-section ${step >= 1 ? 'visible' : 'hidden'}`}>
          {step === 1 && <h2 className="pb-instruction">Choose your flavor</h2>}
          
          <div className={`pb-product-showcase ${selectedFlavor ? 'flavor-selected' : ''}`}>
            {products.map((product) => {
              const isSelected = selectedFlavor?.id === product.id;
              return (
                <div 
                  key={product.id} 
                  className={`pb-packet-wrapper ${isSelected ? 'selected' : ''} ${selectedFlavor && !isSelected ? 'stacked' : ''}`}
                  onClick={() => step === 1 && handleSelectFlavor(product)}
                >
                  <img src={product.images[0]} alt={product.name} className="pb-packet-img" />
                  {step === 1 && <div className="pb-packet-name">{product.flavor}</div>}
                </div>
              );
            })}
          </div>
          
          {step >= 2 && (
            <button className="pb-secondary-btn fade-in" onClick={handleBackToFlavors} style={{ marginTop: '20px' }}>
              ← Change Flavor
            </button>
          )}
        </div>

        {/* Dynamic Open Bag area */}
        {step >= 2 && selectedFlavor && (
          <div className="pb-bag-area">
            <div className={`pb-image-bag-wrapper ${isClipped ? 'clipped' : 'opened'}`}>
              
              {/* Back inside lip of the open bag */}
              {!isClipped && (
                <div 
                  className="pb-bag-inside-lip" 
                  style={{ backgroundColor: selectedFlavor.colorTheme.primary }}
                ></div>
              )}
              
              {/* Falling Animation Container (goes between back lip and front image) */}
              <div className="pb-makhana-container" ref={makhanaContainerRef}></div>
              
              {/* The actual product image, clipped when open */}
              <img 
                src={selectedFlavor.images[0]} 
                alt={selectedFlavor.flavor} 
                className="pb-real-bag-image" 
              />
              
              <div className="pb-bag-front-design">
                <h3>{selectedFlavor.flavor}</h3>
                <p>{formattedQuantity}</p>
              </div>
              
            </div>
          </div>
        )}

        {/* Step 2: Select Quantity */}
        {step === 2 && (
          <div className="pb-action-section fade-in pb-customization-step">
            
            <div className="pb-config-group">
              <h3 className="pb-config-title">Makhana Size</h3>
              <div className="pb-size-options">
                <button 
                  className={`pb-size-btn ${selectedSize === 'Big' ? 'active' : ''}`}
                  onClick={() => setSelectedSize('Big')}
                  style={{ borderColor: selectedFlavor?.colorTheme.primary, backgroundColor: selectedSize === 'Big' ? selectedFlavor?.colorTheme.primary : 'transparent', color: selectedSize === 'Big' ? '#fff' : 'inherit' }}
                >
                  Big (Premium)
                </button>
                <button 
                  className={`pb-size-btn ${selectedSize === 'Small' ? 'active' : ''}`}
                  onClick={() => setSelectedSize('Small')}
                  style={{ borderColor: selectedFlavor?.colorTheme.primary, backgroundColor: selectedSize === 'Small' ? selectedFlavor?.colorTheme.primary : 'transparent', color: selectedSize === 'Small' ? '#fff' : 'inherit' }}
                >
                  Small (Regular)
                </button>
              </div>
            </div>

            <div className="pb-config-group">
              <h3 className="pb-config-title">Quantity (Weight)</h3>
              <div className="pb-weight-adjuster">
                <button 
                  className="pb-weight-btn minus" 
                  onClick={() => setQuantityGrams(prev => Math.max(prev - 250, 250))}
                  style={{ backgroundColor: selectedFlavor?.colorTheme.secondary }}
                >
                  -
                </button>
                <div className="pb-weight-display">
                  {formattedQuantity}
                </div>
                <button 
                  className="pb-weight-btn plus" 
                  onClick={() => setQuantityGrams(prev => Math.min(prev + 250, 5000))}
                  style={{ backgroundColor: selectedFlavor?.colorTheme.secondary }}
                >
                  +
                </button>
              </div>
              <p style={{fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '8px'}}>Adjust by 250g increments</p>
            </div>

            <button 
              className="pb-action-btn order-btn" 
              onClick={handleFillBag}
              style={{ marginTop: '20px' }}
            >
              Fill Bag & Continue
            </button>
          </div>
        )}

        {/* Step 3: Filling Animation */}
        {step === 3 && (
          <div className="pb-action-section fade-in">
            <h2 className="pb-instruction">Filling your bag...</h2>
          </div>
        )}

        {/* Step 4: Clip It */}
        {step === 4 && (
          <div className="pb-action-section fade-in">
            <button className="pb-action-btn clip-btn" onClick={handleClipIt}>
              Clip It
            </button>
          </div>
        )}

        {/* Step 5: Order Now */}
        {step === 5 && (
          <div className="pb-action-section fade-in">
            <button className="pb-action-btn order-btn" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        )}

        {/* Step 6 & 7: Location and Checkout */}
        {step >= 6 && (
          <div className="pb-action-section fade-in pb-checkout-flow">
            {step === 6 && (
              <>
                <h2 className="pb-instruction">Select Delivery Location</h2>
                <div className="pb-location-options">
                  <button className={`pb-loc-btn ${location === 'India' ? 'active' : ''}`} onClick={() => setLocation('India')}>
                    India
                  </button>
                  <button className={`pb-loc-btn ${location === 'International' ? 'active' : ''}`} onClick={() => setLocation('International')}>
                    International
                  </button>
                </div>
                
                {location && (
                  <div className="pb-shipping-info fade-in">
                    <p>Estimated Shipping: {location === 'India' ? '₹50 - ₹100' : '₹1500 - ₹2500'}</p>
                    <button className="pb-action-btn checkout-btn" onClick={handleCheckout}>
                      Proceed to Checkout
                    </button>
                    <button className="pb-secondary-btn" onClick={handleAddAnother}>
                      Add Another Packet
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
