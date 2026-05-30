import { useState, useEffect } from 'react';
import './ConsentBanner.css';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('gangaConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gangaConsent', 'accepted');
    setIsVisible(false);
    // Trigger an event so ThemeContext knows consent was just granted
    window.dispatchEvent(new Event('consentChanged'));
  };

  const handleDecline = () => {
    localStorage.setItem('gangaConsent', 'declined');
    setIsVisible(false);
    window.dispatchEvent(new Event('consentChanged'));
  };

  if (!isVisible) return null;

  return (
    <div className="consent-banner-overlay">
      <div className="consent-banner">
        <div className="consent-content">
          <h3>Cookie & Location Preferences</h3>
          <p>
            We use cookies to improve your browsing experience, analyze site traffic, and personalize content. 
            By accepting, you also allow us to use your IP address to automatically switch to Dark Mode based on your local time.
          </p>
        </div>
        <div className="consent-actions">
          <button className="btn-secondary btn-sm consent-btn" onClick={handleDecline}>
            Decline
          </button>
          <button className="btn-primary btn-sm consent-btn" onClick={handleAccept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
