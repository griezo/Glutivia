import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10" }) => (
  <div className={`flex items-center gap-2 select-none ${className}`}>
    <svg 
      viewBox="0 0 100 100" 
      className="h-full w-auto" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Glutivia Logo Icon"
    >
      {/* Stem */}
      <path d="M50 90 Q 55 60 65 30" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
      
      {/* Left Leaf */}
      <path d="M50 80 Q 15 75 15 40 Q 35 50 50 65" fill="#15803D" />
      
      {/* Right Leaf */}
      <path d="M55 75 Q 90 70 85 35 Q 70 50 55 60" fill="#15803D" />
      
      {/* Grains/Top */}
      <ellipse cx="65" cy="30" rx="6" ry="12" fill="#EAB308" transform="rotate(20 65 30)" />
      <ellipse cx="52" cy="40" rx="5" ry="10" fill="#EAB308" transform="rotate(-20 52 40)" />
      <ellipse cx="72" cy="45" rx="5" ry="10" fill="#EAB308" transform="rotate(45 72 45)" />
    </svg>
    <span className="font-bold text-2xl tracking-tight text-[#14532d]">Glutivia</span>
  </div>
);
