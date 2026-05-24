import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import './LegalPage.css';

export default function TrackOrderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Track Your Order</h1>
          <p>Enter your tracking details below to see the status of your shipment.</p>
        </div>
        <div className="legal-content" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '400px', margin: '0 auto 30px auto' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Enter Tracking ID or Order Number" 
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  border: '1px solid rgba(0,0,0,0.1)', 
                  borderRadius: '8px',
                  fontFamily: 'var(--font-secondary)'
                }} 
              />
              <button className="btn-primary">
                <Search size={20} />
              </button>
            </div>
          </div>
          <p>If you have any issues tracking your order, please reach out to us on WhatsApp at <strong>9608669041</strong>.</p>
        </div>
      </div>
    </div>
  );
}
