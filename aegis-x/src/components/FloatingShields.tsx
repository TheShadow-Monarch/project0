import React from 'react';
import { Shield } from 'lucide-react';

// renders a set of semi-transparent floating shield icons for decoration
const FloatingShields: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <Shield
        key={i}
        className="absolute w-6 h-6 text-neon-green/20 animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${5 + Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

export default FloatingShields;
