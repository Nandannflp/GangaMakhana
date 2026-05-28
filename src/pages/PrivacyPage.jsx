import { useEffect } from 'react';
import SEO from '../components/SEO';
import './LegalPage.css';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <SEO 
        title="Privacy Policy" 
        description="Read the Ganga Makhana Privacy Policy to understand how we protect and manage your data." 
      />
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p>How we handle and protect your data.</p>
        </div>
        <div className="legal-content">
          <h2>Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, or when you participate in activities on the website.</p>
          
          <h2>How We Use Your Information</h2>
          <p>We use personal information collected via our website for a variety of business purposes, including processing your orders, sending you marketing and promotional communications, and responding to your inquiries.</p>

          <h2>Data Security</h2>
          <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the internet can be guaranteed to be 100% secure.</p>
        </div>
      </div>
    </div>
  );
}
