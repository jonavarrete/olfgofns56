import React from 'react';
import { Rocket, Star } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Cargando Imperio Galáctico...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-space-gradient flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <div className="w-24 h-24 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
          <Rocket className="w-12 h-12 text-neon-blue animate-float" />
        </div>
        
        <h1 className="text-4xl font-orbitron font-bold text-white mb-4 animate-pulse-neon">
          Galactic Empire
        </h1>
        
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <p className="text-gray-400 font-rajdhani text-lg">
          {message}
        </p>
        
        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span>Inicializando sistemas</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span>Conectando a la galaxia</span>
          </div>
        </div>
      </div>
    </div>
  );
}