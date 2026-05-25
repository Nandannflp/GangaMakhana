import React, { useEffect, useState } from 'react';
import { Search, Package, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import './LegalPage.css';

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTrack = () => {
    if (!trackingId.trim()) {
      setStatus({ type: 'error', message: 'Please enter a valid tracking ID.' });
      return;
    }
    setLoading(true);
    setStatus(null);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      if (trackingId.length > 5) {
        setStatus({ type: 'success', message: `Order ${trackingId} is in transit and will arrive in 2-3 business days.` });
      } else {
        setStatus({ type: 'error', message: 'Tracking ID not found. Please verify the number or contact support.' });
      }
    }, 1000);
  };

  return (
    <div className="legal-page">
      <SEO 
        title="Track Your Order" 
        description="Track your Ganga Makhana order delivery status easily by entering your tracking ID." 
      />
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
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  border: '1px solid rgba(0,0,0,0.1)', 
                  borderRadius: '8px',
                  fontFamily: 'var(--font-secondary)'
                }} 
              />
              <button className="btn-primary" onClick={handleTrack} disabled={loading}>
                {loading ? <span className="spinner" style={{ width: 20, height: 20, border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span> : <Search size={20} />}
              </button>
            </div>
            
            {status && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'left',
                backgroundColor: status.type === 'success' ? '#edf7ed' : '#fdeded',
                color: status.type === 'success' ? '#1e4620' : '#5f2120'
              }}>
                {status.type === 'success' ? <Package size={24} /> : <AlertCircle size={24} />}
                <p style={{ margin: 0 }}>{status.message}</p>
              </div>
            )}
          </div>
          <p>If you have any issues tracking your order, please reach out to us on WhatsApp at <strong>9608669041</strong>.</p>
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}</style>
        </div>
      </div>
    </div>
  );
}
