import React, { useEffect } from 'react';
import { Leaf, Droplets, Flame, Package, Heart, Users } from 'lucide-react';
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
          
          <div className="story-process">
            <h3>How It Reaches You</h3>
            <div className="process-steps">
              <div className="process-step">
                <div className="process-icon"><Leaf size={32} /></div>
                <h4>Harvest</h4>
                <p>Carefully hand-picked from the ponds of Bihar</p>
              </div>
              <div className="process-step">
                <div className="process-icon"><Droplets size={32} /></div>
                <h4>Cleaning</h4>
                <p>Washed and sun-dried for pristine purity</p>
              </div>
              <div className="process-step">
                <div className="process-icon"><Flame size={32} /></div>
                <h4>Roasting</h4>
                <p>Slow-roasted to perfection, never fried</p>
              </div>
              <div className="process-step">
                <div className="process-icon"><Package size={32} /></div>
                <h4>Packing</h4>
                <p>Sealed with love and freshness in every pack</p>
              </div>
            </div>
          </div>
          
          <div className="mission-values-section">
            <div className="mission-card">
              <Users size={40} className="mission-icon" />
              <h3>Supporting Farmers</h3>
              <p>By sourcing directly from local communities in Bihar, we empower farmers, ensuring fair trade practices and sustainable livelihoods for generations to come.</p>
            </div>
            <div className="mission-card">
              <Heart size={40} className="mission-icon" />
              <h3>Healthy Snacking</h3>
              <p>We believe in bringing honest nutrition back into everyday snacking. No harmful preservatives, no artificial flavors—just 100% natural goodness.</p>
            </div>
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
