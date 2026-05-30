import { useState } from 'react';
import './FlavorShowcase.css';

const flavors = [
  { id: 'normal', name: 'Normal / Classic', color: 'var(--color-primary)', img: '/images/products/normal-front.png' },
  { id: 'peri', name: 'Peri Peri', color: 'var(--color-flavor-peri)', img: '/images/products/peri-front.png' },
  { id: 'mint', name: 'Mint', color: 'var(--color-flavor-mint)', img: '/images/products/mint-front.png' },
  { id: 'pudina', name: 'Pudina', color: 'var(--color-flavor-pudina)', img: '/images/products/pudina-front.png' },
  { id: 'choco', name: 'Chocolate', color: 'var(--color-flavor-choco)', img: '/images/products/choco-front.png' },
  { id: 'onion', name: 'Onion', color: 'var(--color-flavor-onion)', img: '/images/products/onion-front.png' },
];

export default function FlavorShowcase() {
  const [activeFlavor, setActiveFlavor] = useState(flavors[0]);

  return (
    <section className="flavor-showcase" style={{ 
      background: `linear-gradient(to bottom, var(--color-base) 0%, ${activeFlavor.color} 15%, ${activeFlavor.color} 85%, var(--color-base) 100%)`
    }}>
      <div className="container showcase-container">
        <div className="showcase-content">
          <h2 className="showcase-title" style={{ color: activeFlavor.id === 'normal' || activeFlavor.id === 'choco' ? '#fff' : 'var(--color-text)' }}>
            Find Your Flavor Mood
          </h2>
          
          <div className="flavor-list">
            {flavors.map(f => (
              <button 
                key={f.id}
                className={`flavor-btn ${activeFlavor.id === f.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveFlavor(f)}
                onClick={() => setActiveFlavor(f)}
                style={{
                  color: activeFlavor.id === 'normal' || activeFlavor.id === 'choco' ? '#fff' : 'var(--color-text)',
                  borderColor: activeFlavor.id === f.id ? (activeFlavor.id === 'normal' || activeFlavor.id === 'choco' ? '#fff' : 'var(--color-text)') : 'transparent'
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="showcase-visual">
          <div className="floating-element" style={{
             border: `10px solid ${activeFlavor.id === 'normal' || activeFlavor.id === 'choco' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}>
             <img src={activeFlavor.img} alt={activeFlavor.name} className="flavor-display-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
