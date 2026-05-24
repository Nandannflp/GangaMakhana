import React from 'react';
import { Send, Building2 } from 'lucide-react';
import './DistributorSection.css';

export default function DistributorSection() {
  return (
    <section id="wholesale" className="distributor-section section-padding">
      <div className="container distributor-container">
        <div className="distributor-info">
          <h2 className="section-title text-white">Partner with Us</h2>
          <p className="distributor-text">
            Join the Ganga Makhana family. We are actively looking for distributors, wholesalers, and retail partners globally.
          </p>
          
          <div className="features-grid">
            <div className="feature-item">
              <h4>Export Ready</h4>
              <p>Fully compliant with international quality and packaging standards.</p>
            </div>
            <div className="feature-item">
              <h4>Premium Margins</h4>
              <p>Competitive pricing structures for bulk channel partners.</p>
            </div>
            <div className="feature-item">
              <h4>Reliable Supply</h4>
              <p>Direct sourcing ensures consistent quality and availability.</p>
            </div>
            <div className="feature-item">
              <h4>Brand Support</h4>
              <p>Marketing materials and brand guidelines provided.</p>
            </div>
          </div>
        </div>
        
        <div className="distributor-form-wrapper">
          <div className="form-card card">
            <div className="form-header">
              <Building2 size={24} color="var(--color-primary)" />
              <h3>Wholesale Inquiry</h3>
            </div>
            
            <form className="inquiry-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Company Name" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Contact Person" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" required />
                </div>
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone / WhatsApp" required />
              </div>
              <div className="form-group">
                <select required>
                  <option value="">Interested In...</option>
                  <option value="distributorship">Distributorship</option>
                  <option value="retail">Retail Store</option>
                  <option value="export">Export / Import</option>
                  <option value="corporate">Corporate Gifting</option>
                </select>
              </div>
              <div className="form-group">
                <textarea placeholder="Message or Expected Volume" rows="3"></textarea>
              </div>
              <button type="submit" className="btn-primary w-100">
                Send Inquiry <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
