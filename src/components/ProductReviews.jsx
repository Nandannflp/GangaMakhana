import React, { useState } from 'react';
import StarRating from './StarRating';
import { useReviews } from '../hooks/useReviews';
import './ProductReviews.css';

export default function ProductReviews({ productId, themeColor = "var(--color-primary)" }) {
  const { reviews, addReview, averageRating, totalReviews } = useReviews(productId);
  
  const [showMore, setShowMore] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const [formError, setFormError] = useState('');

  const visibleReviews = showMore ? reviews : reviews.slice(0, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || newReview.rating === 0 || !newReview.comment.trim()) {
      setFormError('Please fill out all fields and select a rating.');
      return;
    }
    
    addReview(newReview);
    setNewReview({ name: '', rating: 0, comment: '' });
    setFormError('');
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="product-reviews-container" id="reviews">
      <h3 style={{ color: themeColor }}>Customer Reviews</h3>
      
      <div className="reviews-summary">
        <div className="summary-stars">
          <StarRating rating={averageRating} size={28} />
          <span className="summary-average">{averageRating.toFixed(1)} out of 5</span>
        </div>
        <p className="summary-count">Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
      </div>

      <div className="write-review-section">
        <h4 style={{ color: themeColor }}>Write a Review</h4>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Rating</label>
            <StarRating 
              rating={newReview.rating} 
              size={24} 
              interactive={true}
              onRate={(val) => setNewReview(prev => ({ ...prev, rating: val }))}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="review-name">Name</label>
            <input 
              id="review-name"
              type="text" 
              placeholder="Your name"
              value={newReview.name}
              onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="review-comment">Comment</label>
            <textarea 
              id="review-comment"
              placeholder="What did you like about this product?"
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            />
          </div>

          {formError && <p className="form-error">{formError}</p>}
          
          <button 
            type="submit" 
            className="btn-submit-review"
            style={{ backgroundColor: themeColor }}
          >
            Submit Review
          </button>
        </form>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews-msg">No reviews yet. Be the first to review this product!</p>
        ) : (
          visibleReviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <span className="review-author">{review.name}</span>
                <span className="review-date">{formatDate(review.date)}</span>
              </div>
              <div className="review-rating">
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))
        )}
        
        {reviews.length > 3 && (
          <button 
            className="btn-show-more" 
            onClick={() => setShowMore(!showMore)}
            style={{ color: themeColor, borderColor: themeColor }}
          >
            {showMore ? 'Show Less' : `Read All ${totalReviews} Reviews`}
          </button>
        )}
      </div>
    </div>
  );
}
