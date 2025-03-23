import React from 'react';

interface IconProps {
  icon: React.ReactNode;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, color, className = '' }) => (
  <span 
    className={`text-2xl mb-2.5 text-[#FF4081] ${className}`} 
    style={color ? { color } : {}}
  >
    {icon}
  </span>
);

export default Icon;