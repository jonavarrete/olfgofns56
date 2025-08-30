import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  glowing?: boolean;
}

export default function Card({ children, className = '', title, glowing = false }: CardProps) {
  return (
    <div
      className={`relative bg-card-gradient border border-space-600 rounded-lg backdrop-blur-sm transition-all duration-300 hover:border-neon-blue/30 z-10 ${
        glowing ? 'shadow-[0_0_20px_rgba(0,212,255,0.3)]' : ''
      } ${className}`}
    >
      {title && (
        <div className="relative p-4 border-b border-space-600">
          <h3 className="text-lg font-orbitron font-semibold text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="relative p-4">{children}</div>
    </div>
  );
}