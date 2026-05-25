import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import './LegalPage.css';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <SEO 
        title="Terms & Conditions" 
        description="Read the Terms and Conditions for using the Ganga Makhana website and purchasing our premium fox nut products." 
      />
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Terms & Conditions</h1>
          <p>Please read these terms carefully before using our website.</p>
        </div>
        <div className="legal-content">
          <h2>1. Introduction</h2>
          <p>Welcome to Ganga Makhana. By accessing our website and purchasing our products, you agree to be bound by these terms and conditions.</p>
          
          <h2>2. Products and Pricing</h2>
          <p>All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice.</p>

          <h2>3. User Account</h2>
          <p>If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
        </div>
      </div>
    </div>
  );
}
