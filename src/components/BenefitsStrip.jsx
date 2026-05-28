import React from 'react';
import { Leaf, Dumbbell, Flame, MapPin } from 'lucide-react';
import './BenefitsStrip.css';

export default function BenefitsStrip() {
  const benefits = [
    {
      icon: <Leaf size={28} className="benefit-icon" />,
      title: "Gluten-Free",
      description: "100% natural and safe"
    },
    {
      icon: <Dumbbell size={28} className="benefit-icon" />,
      title: "High Protein",
      description: "Energy boosting snack"
    },
    {
      icon: <Flame size={28} className="benefit-icon" />,
      title: "Roasted, Not Fried",
      description: "Guilt-free indulgence"
    },
    {
      icon: <MapPin size={28} className="benefit-icon" />,
      title: "From Bihar Farms",
      description: "Authentic & handpicked"
    }
  ];

  return (
    <section className="benefits-strip">
      <div className="container">
        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <div className="benefit-item" key={index}>
              <div className="benefit-icon-wrapper">
                {item.icon}
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title">{item.title}</h3>
                <span className="benefit-desc">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
