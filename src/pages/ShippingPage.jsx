import React, { useEffect } from 'react';
import './LegalPage.css';

export default function ShippingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Shipping & Returns</h1>
          <p>Everything you need to know about getting your Ganga Makhana.</p>
        </div>
        <div className="legal-content">
          <h2>Shipping Policy</h2>
          <p>We offer fast and reliable shipping across India and select international destinations (UAE, USA, UK). Orders are typically processed and dispatched within 1-2 business days.</p>
          <ul>
            <li><strong>Domestic (India):</strong> Delivery within 3-5 business days. Free shipping on orders over ₹999.</li>
            <li><strong>International:</strong> Delivery within 7-14 business days depending on customs. Shipping calculated at checkout.</li>
          </ul>
          
          <h2>Returns & Refunds</h2>
          <p>Due to the perishable nature of our food products, we do not accept returns on opened items. If you receive a damaged or incorrect product, please contact our support team within 48 hours of delivery.</p>
          <p>Refunds for valid claims will be processed to the original payment method within 5-7 business days.</p>
        </div>
      </div>
    </div>
  );
}
