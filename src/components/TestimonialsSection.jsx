import React from 'react';
import { Star } from 'lucide-react';
import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    name: "Aarti Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The best makhana I've ever tasted. You can really feel the quality and freshness. The Peri Peri flavor is my absolute favorite for evening snacking!"
  },
  {
    id: 2,
    name: "Rahul Desai",
    location: "Delhi",
    rating: 5,
    text: "I love that these are naturally sourced and don't have that artificial oily taste. Perfect guilt-free snack for my kids. The Chocolate flavor is a huge hit."
  },
  {
    id: 3,
    name: "Priya Menon",
    location: "Bangalore",
    rating: 5,
    text: "Export quality indeed! The crunch is unbelievable. I appreciate the transparent sourcing from Bihar farms. Highly recommend the Classic flavor for diet-conscious folks."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here is what makhana lovers across the country think about our premium quality.
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card card">
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--color-accent)" color="var(--color-accent)" />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <h4>{t.name}</h4>
                <span>{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
