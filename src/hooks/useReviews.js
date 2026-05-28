import { useState, useEffect } from 'react';

export function useReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const storageKey = `makhana_reviews_${productId}`;

  useEffect(() => {
    const loadReviews = () => {
      const storedReviews = localStorage.getItem(storageKey);
      if (storedReviews) {
        try {
          setReviews(JSON.parse(storedReviews));
        } catch (e) {
          console.error("Failed to parse reviews", e);
        }
      }
    };
    loadReviews();
    
    // Listen for cross-tab or cross-component updates
    window.addEventListener('storage', (e) => {
      if (e.key === storageKey) {
        loadReviews();
      }
    });
  }, [productId, storageKey]);

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(storageKey, JSON.stringify(updatedReviews));
    
    // Trigger storage event manually for same-tab updates across components
    window.dispatchEvent(new Event('storage'));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  return {
    reviews,
    addReview,
    averageRating: getAverageRating(),
    totalReviews: reviews.length
  };
}
