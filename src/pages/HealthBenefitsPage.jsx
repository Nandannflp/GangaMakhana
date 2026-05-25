import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import './LegalPage.css';

export default function HealthBenefitsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <SEO 
        title="Health Benefits" 
        description="Discover the incredible health benefits of Makhana (fox nuts). Rich in protein, antioxidants, and gluten-free, it's the perfect guilt-free snack." 
      />
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Health Benefits of Makhana</h1>
          <p>Discover why Makhana is considered an ancient Indian superfood.</p>
        </div>
        <div className="legal-content">
          <h2>1. Rich in Nutrients</h2>
          <p>Makhana is packed with essential nutrients, including protein, fiber, calcium, magnesium, iron, and phosphorus. It makes for an excellent guilt-free snack.</p>
          
          <h2>2. High in Antioxidants</h2>
          <p>These roasted lotus seeds are rich in antioxidants like gallic acid, chlorogenic acid, and epicatechin, which play a key role in neutralizing harmful free radicals.</p>

          <h2>3. Supports Weight Management</h2>
          <p>Being low in calories but high in protein and fiber, makhana helps you feel full for longer, preventing overeating and supporting healthy weight loss.</p>

          <h2>4. Promotes Heart Health</h2>
          <p>Makhana contains phytonutrients and low sodium levels, making it beneficial for maintaining healthy blood pressure and cardiovascular health.</p>

          <h2>5. Gluten-Free & Vegan</h2>
          <p>It is naturally gluten-free and vegan, making it an ideal snack for individuals with dietary restrictions or celiac disease.</p>
        </div>
      </div>
    </div>
  );
}
