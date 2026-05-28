import { useEffect } from 'react';
import SEO from '../components/SEO';
import './LegalPage.css';

export default function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <SEO 
        title="FAQ" 
        description="Frequently asked questions about Ganga Makhana, our sourcing, shipping, and wholesale processes." 
      />
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Frequently Asked Questions</h1>
          <p>Find answers to common questions about Ganga Makhana.</p>
        </div>
        <div className="legal-content">
          <h2>What is Makhana?</h2>
          <p>Makhana, also known as fox nuts or lotus seeds, is an ancient Indian superfood harvested from the Euryale ferox plant, typically grown in the stagnant waters of wetlands in Bihar.</p>

          <h2>Are your products organic?</h2>
          <p>Our makhana is 100% natural and grown using traditional, sustainable farming practices in Bihar. We do not use any artificial fertilizers or pesticides.</p>

          <h2>Do you ship internationally?</h2>
          <p>Yes, we ship globally! We currently have export operations to the USA, UK, UAE, and several other countries. Shipping costs are calculated at checkout.</p>

          <h2>How should I store Ganga Makhana?</h2>
          <p>To maintain maximum crispness and flavor, store your makhana in an airtight container in a cool, dry place away from direct sunlight.</p>

          <h2>Do you offer wholesale or bulk purchasing?</h2>
          <p>Yes, we cater to bulk buyers and distributors. Please check our Wholesale section or contact us directly on WhatsApp at 9608669041 for bulk pricing.</p>
        </div>
      </div>
    </div>
  );
}
