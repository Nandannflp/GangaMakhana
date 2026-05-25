import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import './StoryPage.css';

export default function StoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story-page">
      <SEO 
        title="Our Story" 
        description="Discover the heritage of Ganga Makhana. Sourced sustainably from Bihar's farms, we bring you 100% natural, premium makhana crafted for modern healthy lifestyles." 
      />
      <div className="story-hero">
        <div className="container">
          <h1 className="story-title">Rooted in Bihar Heritage</h1>
        </div>
      </div>
      
      <div className="container story-container">
        <div className="story-content">
          <p className="lead-text">
            For centuries, the fertile wetlands of Bihar have nurtured one of India's most treasured superfoods — makhana. Grown in the calm waters of the Ganges basin and carefully harvested by skilled local farmers, makhana is more than just a snack. It is a symbol of purity, tradition, and India's rich agricultural heritage.
          </p>
          
          <p>
            At <strong>Ganga Makhana</strong>, we proudly bring this legacy to the modern world.
          </p>
          
          <p>
            Our journey began with a simple belief — that authentic Indian goodness deserves a global stage. Every makhana we source comes directly from trusted farming communities in Bihar, where generations of families have perfected the art of cultivating and handpicking the finest lotus seeds with patience, care, and dedication.
          </p>
          
          <p>
            Unlike mass-produced snacks, our makhana is carefully selected, hygienically cleaned, gently roasted, and crafted into premium flavors without compromising its natural goodness. We combine traditional Indian sourcing methods with modern export-quality processing standards to create a snack that feels both wholesome and luxurious.
          </p>
          
          <div className="story-highlight">
            <p>But Ganga Makhana is not only about taste.</p>
            <p>It is about supporting Indian farmers.<br/>
            It is about preserving heritage.<br/>
            It is about bringing honest nutrition back into everyday snacking.</p>
          </div>
          
          <h3>Every pack represents:</h3>
          <ul className="custom-list">
            <li>authentic Indian craftsmanship</li>
            <li>naturally healthy ingredients</li>
            <li>clean and mindful snacking</li>
            <li>pride in Bihar's farming culture</li>
            <li>premium quality trusted worldwide</li>
          </ul>
          
          <p>
            From the farms of Bihar to homes across India and around the world, our mission is to share the richness of Indian tradition through a snack that is light, nourishing, and genuinely satisfying.
          </p>
          
          <p className="bold-text">
            When you choose <strong>Ganga Makhana</strong>, you are not just buying a product — you become part of a story rooted in heritage, purity, and pride.
          </p>
          
          <div className="story-checks">
            <div className="check-item">✓ Sustainably sourced from local Bihar farms</div>
            <div className="check-item">✓ Hygienically cleaned & roasted with export-quality standards</div>
            <div className="check-item">✓ No artificial preservatives or harmful additives</div>
            <div className="check-item">✓ Crafted for modern healthy lifestyles</div>
            <div className="check-item">✓ Proudly Indian, globally loved</div>
          </div>
          
          <div className="story-footer">
            <h2>Ganga Makhana — Bringing India's timeless goodness to the world.</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
