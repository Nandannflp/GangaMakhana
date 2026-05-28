import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductGallery.css';

export default function ProductGallery({ images, altText }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX > 50) nextImage();
    if (touchStartX.current - touchEndX < -50) prevImage();
  };

  return (
    <div className="product-gallery">
      <div 
        className="gallery-main"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="gallery-arrow prev" onClick={prevImage} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        <img src={images[currentIndex]} alt={`${altText} - View ${currentIndex + 1}`} />
        <button className="gallery-arrow next" onClick={nextImage} aria-label="Next image">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="gallery-thumbnails">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`thumbnail ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
