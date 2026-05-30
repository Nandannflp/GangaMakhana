import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <img src={theme === 'dark' ? "/images/logo.webp" : "/images/logo.jpg"} alt="Ganga Makhana Logo" className="footer-brand-logo" />
            <p className="footer-desc">
              Authentic Bihar Heritage, Export Quality Makhana. 100% natural, handpicked, and perfectly roasted.
            </p>
            <div className="trust-badges">
              <span className="badge">100% Natural</span>
              <span className="badge">Export Quality</span>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#shop">Shop All Flavors</a></li>
              <li><Link to="/story">Our Story</Link></li>
              <li><Link to="/health">Health Benefits</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support & Legal</h4>
            <ul>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/track">Track Order</Link></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4>Contact Us</h4>
            <address>
              <strong>Manufactured by:</strong><br/>
              Ganga Makhana<br/>
              Jurabganj Gerabadi, Ps/po - Korha<br/>
              District - Katihar, Pincode - 854108<br/>
              Bihar, India
            </address>
            <div className="fssai-section">
              <span className="fssai-label">FSSAI Registration No:</span>
              <p className="reg-num">20426351000323</p>
            </div>
            <a href="https://wa.me/919608669041" className="whatsapp-link">
              WhatsApp: 9608669041
            </a>
          </div>
        </div>

        <div className="footer-bottom flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Ganga Makhana. All rights reserved.</p>
          <div className="shipping-flags flex gap-2 items-center">
            <span className="text-sm">Shipping to:</span>
            <span title="India">🇮🇳</span>
            <span title="UAE">🇦🇪</span>
            <span title="USA">🇺🇸</span>
            <span title="UK">🇬🇧</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
