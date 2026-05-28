import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './StoryTeaser.css';

export default function StoryTeaser() {
  return (
    <section className="story-teaser">
      <div className="container">
        <div className="story-teaser-grid">
          <div className="story-teaser-image-wrapper">
            <div className="story-teaser-image-placeholder">
              <div className="placeholder-pattern"></div>
              <img 
                src="/images/about/bihar-farm.jpg" 
                alt="Makhana farming in Bihar" 
                className="story-teaser-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('no-image');
                }}
              />
            </div>
          </div>
          <div className="story-teaser-content">
            <span className="story-teaser-badge">Our Roots</span>
            <h2 className="story-teaser-title">
              Deeply Rooted in the Heart of <span className="text-accent">Bihar</span>
            </h2>
            <p className="story-teaser-text">
              Ganga Makhana is born from the pristine wetlands of Bihar, where the finest fox nuts have been cultivated for centuries. We work directly with local farmers to harvest the highest quality seeds.
            </p>
            <p className="story-teaser-text">
              Every batch is carefully handpicked, sun-dried, and roasted to perfection, ensuring that our export-quality makhana reaches you with its nutritional integrity and natural crunch intact.
            </p>
            <Link to="/story" className="btn-secondary story-teaser-btn">
              Read Our Full Story <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
