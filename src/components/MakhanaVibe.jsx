import { useState, useEffect } from 'react';
import './MakhanaVibe.css';

export default function MakhanaVibe() {
  const [makhanas, setMakhanas] = useState([]);

  useEffect(() => {
    // Generate scattered makhanas for a minimal premium background vibe
    const newMakhanas = Array.from({ length: 7 }).map((_, i) => {
      // Favor the edges so it doesn't block central content as much
      const isLeft = Math.random() > 0.5;
      const leftPos = isLeft ? Math.random() * 25 : 75 + Math.random() * 25; // 0-25% or 75-100%
      
      return {
        id: i,
        top: Math.random() * 100, // 0 to 100% of viewport height
        left: Math.random() < 0.3 ? Math.random() * 100 : leftPos, // 30% anywhere, 70% on edges
        size: Math.random() * 55 + 35, // 35px to 90px (slightly larger since they are fewer)
        rotate: Math.random() * 360,
        opacity: Math.random() * 0.4 + 0.6, // 0.6 to 1.0 opacity to make them clearly visible
        blur: Math.random() > 0.7 ? 'blur(2px)' : 'none',
        duration: Math.random() * 10 + 15, // 15-25s animation
        delay: Math.random() * -20 // random start point in animation
      };
    });
    setMakhanas(newMakhanas);
  }, []);

  return (
    <div className="makhana-vibe-container">
      {makhanas.map(m => (
        <div 
          key={m.id}
          className="makhana-flake-wrapper"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `rotate(${m.rotate}deg)`,
            opacity: m.opacity,
            filter: m.blur
          }}
        >
          <img 
            src="/images/chocolate.png" 
            className="makhana-flake light-mode-img" 
            alt="" 
            style={{ 
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`
            }}
          />
          <img 
            src="/images/makhana.png" 
            className="makhana-flake dark-mode-img" 
            alt="" 
            style={{ 
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`
            }}
          />
        </div>
      ))}
    </div>
  );
}
