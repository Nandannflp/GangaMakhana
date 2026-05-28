import React, { useState } from 'react';
import './StarRating.css';

export default function StarRating({ 
  rating = 0, 
  size = 16, 
  interactive = false, 
  onRate = null 
}) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  const handleMouseMove = (e, index) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // For interactive mode, we only allow full star selections for simplicity
    // But if we want half stars on hover, we could check x < rect.width / 2
    // Let's stick to full stars for user ratings to keep it simple, as the user said "rating should come in 5 stars only" for the person rating
    setHoverRating(index + 1);
  };

  const handleClick = (index) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const renderStar = (index) => {
    const starValue = index + 1;
    
    let fillClass = "star-empty";
    if (displayRating >= starValue) {
      fillClass = "star-full";
    } else if (displayRating >= starValue - 0.5) {
      fillClass = "star-half";
    }

    return (
      <svg
        key={index}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`star ${interactive ? 'interactive' : ''} ${fillClass}`}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onClick={() => handleClick(index)}
      >
        <defs>
          <linearGradient id={`half-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ fill: fillClass === 'star-half' ? `url(#half-${size})` : '' }}
        />
      </svg>
    );
  };

  return (
    <div 
      className="star-rating" 
      onMouseLeave={handleMouseLeave}
      style={{ gap: `${size * 0.15}px` }}
    >
      {[...Array(5)].map((_, i) => renderStar(i))}
    </div>
  );
}
