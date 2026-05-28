import { Link } from 'react-router-dom';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container about-container">
        <div className="about-visual">
          <img src="/images/Bihar-farms.png" alt="Bihar Farms" className="about-img main-img" />
          <img src="/images/Harvesting.png" alt="Harvesting" className="about-img sub-img" />
        </div>
        
        <div className="about-content">
          <h2 className="section-title">Rooted in Bihar Heritage</h2>
          <p className="about-text">
            For generations, the fertile lands of Bihar have yielded the world's finest makhana. At Ganga Makhana, we honor this legacy by sourcing directly from local farmers, ensuring that every batch is pure, authentic, and bursting with natural goodness.
          </p>
          <p className="about-text">
            Our traditional handpicking methods combined with state-of-the-art export-quality processing guarantee a snack that isn't just delicious—it's a testament to true Indian craftsmanship.
          </p>
          <ul className="about-points">
            <li>✔ Sustainably sourced from local farms</li>
            <li>✔ Cleaned & roasted with pristine hygiene</li>
            <li>✔ No artificial preservatives or colors</li>
          </ul>
          <Link to="/story" className="btn-secondary" style={{ marginTop: '20px' }}>Read Our Full Story</Link>
        </div>
      </div>
    </section>
  );
}
