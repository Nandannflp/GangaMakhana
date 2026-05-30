import { useState } from 'react';
import { Send, Building2, CheckCircle2, MessageCircle, Phone, MapPin, Clock, FileText } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './WholesalePage.css';

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: '',
    message: '',
    _honeypot: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData._honeypot) {
      console.warn("Bot detected");
      return;
    }

    // Client-side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.requirements) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const webhookUrl = import.meta.env.VITE_WHOLESALE_WEBHOOK_URL;
      
      if (webhookUrl) {
        // Send data directly to Google Sheet Webhook
        // We use mode: 'no-cors' because Google Apps Script redirects responses, which standard CORS fetch blocks.
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            requirements: formData.requirements,
            message: formData.message,
            timestamp: new Date().toISOString()
          })
        });
      } else {
        // Fallback: Submit to Firebase if Webhook is not configured
        await addDoc(collection(db, 'inquiries'), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          requirements: formData.requirements,
          message: formData.message,
          createdAt: serverTimestamp(),
          source: 'wholesale_page'
        });
      }
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        requirements: '',
        message: '',
        _honeypot: ''
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setErrorMessage("There was an error submitting your inquiry. Please try again or contact us directly.");
      setStatus('error');
    }
  };

  return (
    <div className="wholesale-page page-enter">
      <div className="wholesale-hero">
        <div className="container">
          <h1 className="wholesale-title text-display">Partner with Us</h1>
          <p className="wholesale-subtitle text-body">
            Retail, Wholesale & Export Enquiries
          </p>
        </div>
      </div>

      <div className="wholesale-content container section-padding">
        <div className="wholesale-grid">
          
          <div className="wholesale-info">
            <h2>Join the Ganga Makhana Family</h2>
            <p>
              We are actively looking for distributors, wholesalers, and retail partners globally.
              Partner with us to bring premium, authentic fox nuts to your customers.
            </p>

            <div className="contact-ctas">
              <a href="https://wa.me/919608669041" target="_blank" rel="noopener noreferrer" className="cta-btn whatsapp-btn">
                <MessageCircle size={20} />
                Contact via WhatsApp
              </a>
              <a href="tel:+919608669041" className="cta-btn call-btn">
                <Phone size={20} />
                Call Us: 96086 69041
              </a>
            </div>

            <div className="business-details card">
              <h3>Business Information</h3>
              <ul className="details-list">
                <li>
                  <MapPin className="detail-icon" size={18} />
                  <div>
                    <strong>Head Office:</strong>
                    <p>Jurabganj Gerabadi, Ps/po - Korha</p>
                    <p>District - Katihar, Pincode - 854108</p>
                    <p>Bihar, India</p>
                  </div>
                </li>
                <li>
                  <FileText className="detail-icon" size={18} />
                  <div>
                    <strong>Registrations:</strong>
                    <p>FSSAI: 20426351000323</p>
                  </div>
                </li>
                <li>
                  <Clock className="detail-icon" size={18} />
                  <div>
                    <strong>Operating Hours:</strong>
                    <p>Mon - Sat: 9:00 AM - 6:00 PM (IST)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="wholesale-form-wrapper">
            <div className="form-card card">
              <div className="form-header">
                <Building2 size={24} color="var(--color-primary)" />
                <h3>Wholesale Inquiry</h3>
              </div>
              
              {status === 'success' ? (
                <div className="form-success text-center p-4">
                  <CheckCircle2 size={48} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
                  <h3>Inquiry Received!</h3>
                  <p>Thank you for your interest in Ganga Makhana. Our team will get back to you shortly.</p>
                  <button className="btn-secondary mt-4" onClick={() => setStatus('idle')}>Send Another Inquiry</button>
                </div>
              ) : (
                <form className="inquiry-form" onSubmit={handleSubmit}>
                  {/* Honeypot Field */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input type="text" name="_honeypot" tabIndex="-1" autoComplete="off" value={formData._honeypot} onChange={handleChange} />
                  </div>

                  {errorMessage && <div className="form-error">{errorMessage}</div>}

                  <div className="form-group">
                    <input type="text" name="name" placeholder="Name / Company Name *" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <input type="tel" name="phone" placeholder="Phone / WhatsApp *" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <select name="requirements" value={formData.requirements} onChange={handleChange} required>
                      <option value="">Interested In... *</option>
                      <option value="distributorship">Distributorship</option>
                      <option value="retail">Retail Store</option>
                      <option value="export">Export / Import</option>
                      <option value="corporate">Corporate Gifting</option>
                      <option value="bulk_raw">Bulk Raw Makhana</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Message or Expected Volume" rows="4" value={formData.message} onChange={handleChange}></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-100" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : <>Send Inquiry <Send size={18} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
