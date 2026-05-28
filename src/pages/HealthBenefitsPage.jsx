import { useEffect } from 'react';
import { Coffee, GraduationCap, Dumbbell, ShieldCheck, Heart, Leaf } from 'lucide-react';
import SEO from '../components/SEO';
import './HealthBenefitsPage.css';

export default function HealthBenefitsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="health-page">
      <SEO 
        title="Health Benefits" 
        description="Discover the incredible health benefits of Makhana (fox nuts). Rich in protein, antioxidants, and gluten-free, it's the perfect guilt-free snack." 
      />
      <div className="health-hero">
        <div className="container">
          <h1 className="health-title">Why Makhana?</h1>
          <p className="health-subtitle">Discover the science behind India's favorite superfood.</p>
        </div>
      </div>
      
      <div className="container">
        <div className="benefits-grid">
          <div className="benefit-card">
            <ShieldCheck className="benefit-icon" size={40} />
            <h2>Rich in Nutrients</h2>
            <p>Makhana is packed with essential nutrients, including protein, fiber, calcium, magnesium, iron, and phosphorus. It makes for an excellent guilt-free snack.</p>
          </div>
          <div className="benefit-card">
            <Leaf className="benefit-icon" size={40} />
            <h2>High in Antioxidants</h2>
            <p>These roasted lotus seeds are rich in antioxidants like gallic acid, chlorogenic acid, and epicatechin, which play a key role in neutralizing harmful free radicals.</p>
          </div>
          <div className="benefit-card">
            <Heart className="benefit-icon" size={40} />
            <h2>Promotes Heart Health</h2>
            <p>Makhana contains phytonutrients and low sodium levels, making it beneficial for maintaining healthy blood pressure and cardiovascular health.</p>
          </div>
        </div>

        <div className="comparison-section">
          <h2 className="section-heading">Makhana vs Regular Namkeen</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="highlight-col">Ganga Makhana</th>
                  <th>Regular Fried Snacks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Preparation</td>
                  <td className="highlight-col">Slow Roasted</td>
                  <td>Deep Fried</td>
                </tr>
                <tr>
                  <td>Fat Content</td>
                  <td className="highlight-col">Very Low</td>
                  <td>High (Trans Fats)</td>
                </tr>
                <tr>
                  <td>Protein</td>
                  <td className="highlight-col">High Protein</td>
                  <td>Low Protein</td>
                </tr>
                <tr>
                  <td>Preservatives</td>
                  <td className="highlight-col">100% Natural, None</td>
                  <td>Artificial Additives</td>
                </tr>
                <tr>
                  <td>Calorie Density</td>
                  <td className="highlight-col">Low (Guilt-free)</td>
                  <td>High (Empty Calories)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="usage-ideas-section">
          <h2 className="section-heading">Perfect For Every Occasion</h2>
          <div className="usage-grid">
            <div className="usage-card">
              <Coffee className="usage-icon" size={48} />
              <h3>Evening Tea Companion</h3>
              <p>Swap out oily biscuits for a crunchy, flavorful bowl of makhana that pairs perfectly with your daily chai.</p>
            </div>
            <div className="usage-card">
              <GraduationCap className="usage-icon" size={48} />
              <h3>Kids' Tiffin Box</h3>
              <p>A fun, crunchy, and nutritious snack that kids love, without the sugar crash or unhealthy fats of chips.</p>
            </div>
            <div className="usage-card">
              <Dumbbell className="usage-icon" size={48} />
              <h3>Gym & Post-Workout</h3>
              <p>Light on the stomach but packed with protein and complex carbs to fuel recovery after a tough session.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
