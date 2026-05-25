import { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | Ganga Makhana` : 'Ganga Makhana - Premium Roasted Fox Nuts';

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);

  return null; // This component doesn't render anything visually
}
