import React from 'react';

interface PlanetBackgroundProps {
  planetType: 'desert' | 'jungle' | 'ocean' | 'ice' | 'volcanic' | 'gas';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function PlanetBackground({ planetType, size = 'medium', className = '' }: PlanetBackgroundProps) {
  const planetImages = {
    desert: '/images/planets/desert.jpg',
    jungle: '/images/planets/jungle.jpg',
    ocean: '/images/planets/ocean.jpg',
    ice: '/images/planets/ice.jpg',
    volcanic: '/images/planets/volcanic.jpg',
    gas: '/images/planets/gas.jpg',
  };

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div 
        className="w-full h-full rounded-full bg-gradient-to-br from-space-600 to-space-800 shadow-lg"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/30" />
        <div className="absolute inset-0 rounded-full shadow-inner" />
      </div>
      
      {/* Atmospheric glow */}
      <div className="absolute inset-0 rounded-full animate-pulse">
        <div className={`absolute inset-0 rounded-full ${
          planetType === 'desert' ? 'shadow-[0_0_20px_rgba(245,158,11,0.3)]' :
          planetType === 'jungle' ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
          planetType === 'ocean' ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' :
          planetType === 'ice' ? 'shadow-[0_0_20px_rgba(219,234,254,0.3)]' :
          planetType === 'volcanic' ? 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
          'shadow-[0_0_20px_rgba(139,92,246,0.3)]'
        }`} />
      </div>
    </div>
  );
}