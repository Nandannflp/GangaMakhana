import React, { useState } from 'react';
import { Send, Building2, CheckCircle2 } from 'lucide-react';
import './DistributorSection.css';

export default function DistributorSection() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    _honeypot: '' // Hidden field for bot protection
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData._honeypot) {
      console.warn("Bot detected");
      return;
    }

    // Client-side validation
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone || !formData.interest) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Mock submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
        _honeypot: ''
      });
    }, 1200);
  };
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
            
            {status === 'success' ? (
              <div className="form-success text-center p-4">
                <CheckCircle2 size={48} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
                <h3>Inquiry Received!</h3>
                <p>Thank you for your interest in Ganga Makhana. Our wholesale team will get back to you within 24 hours.</p>
                <button className="btn-secondary mt-4" onClick={() => setStatus('idle')}>Send Another Inquiry</button>
              </div>
            ) : (
              <form className="inquiry-form" onSubmit={handleSubmit}>
                {/* Honeypot Field */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input type="text" name="_honeypot" tabIndex="-1" autoComplete="off" value={formData._honeypot} onChange={handleChange} />
                </div>

                {errorMessage && <div className="form-error" style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 'bold' }}>{errorMessage}</div>}

                <div className="form-group">
                  <input type="text" name="companyName" placeholder="Company Name *" value={formData.companyName} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="contactPerson" placeholder="Contact Person *" value={formData.contactPerson} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Phone / WhatsApp *" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <select name="interest" value={formData.interest} onChange={handleChange} required>
                    <option value="">Interested In... *</option>
                    <option value="distributorship">Distributorship</option>
                    <option value="retail">Retail Store</option>
                    <option value="export">Export / Import</option>
                    <option value="corporate">Corporate Gifting</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Message or Expected Volume" rows="3" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn-primary w-100" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : <>Send Inquiry <Send size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
