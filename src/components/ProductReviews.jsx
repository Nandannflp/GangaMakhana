import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';
import './ProductReviews.css';

export default function ProductReviews({ reviews }) {
  const [ratingHover, setRatingHover] = useState(0);
  const [ratingSelect, setRatingSelect] = useState(5);

  if (!reviews) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={18} fill="currentColor" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={18} fill="currentColor" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={18} color="#ccc" />);
    }
    return stars;
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <div className="reviews-summary">
          <div className="rating-big">{reviews.rating}</div>
          <div>
            <div className="rating-stars">{renderStars(reviews.rating)}</div>
            <div className="rating-count">Based on {reviews.count} reviews</div>
          </div>
        </div>
        <button className="btn-secondary" onClick={() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' })}>
          Write a Review
        </button>
      </div>

      <div className="review-breakdown">
        {Object.entries(reviews.breakdown).map(([key, value]) => (
          <div className="breakdown-item" key={key}>
            <span style={{ textTransform: 'capitalize', width: '80px' }}>{key}</span>
            <div className="breakdown-bar-container">
              <div className="breakdown-bar" style={{ width: `${(value / 5) * 100}%` }}></div>
            </div>
            <span>{value.toFixed(1)}</span>
          </div>
        ))}
      </div>

      <div className="reviews-list">
        {reviews.comments.map((comment, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-card-header">
              <div>
                <div className="reviewer-name">{comment.name}</div>
                <div className="review-date">{comment.date}</div>
              </div>
              <div className="rating-stars">{renderStars(comment.rating)}</div>
            </div>
            <p className="review-text">{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="comment-form-container" id="review-form">
        <h3>Leave a Review</h3>
        <div className="star-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={24} 
              className={`star ${star <= (ratingHover || ratingSelect) ? 'active' : ''}`}
              fill={star <= (ratingHover || ratingSelect) ? "currentColor" : "none"}
              onMouseEnter={() => setRatingHover(star)}
              onMouseLeave={() => setRatingHover(0)}
              onClick={() => setRatingSelect(star)}
            />
          ))}
        </div>
        <form className="comment-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email (Optional)" />
            </div>
          </div>
          <div className="form-group">
            <textarea placeholder="Write your review here..." rows="4" required></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Submit Review</button>
        </form>
      </div>
    </div>
  );
}
