import React, { ReactNode } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AdminCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'neon-blue' | 'neon-green' | 'neon-red' | 'neon-orange' | 'neon-purple';
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  onClick?: () => void;
  children?: ReactNode;
}

export default function AdminCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  subtitle, 
  trend,
  onClick,
  children 
}: AdminCardProps) {
  const colorClasses = {
    'neon-blue': 'text-neon-blue bg-neon-blue/20 border-neon-blue/30',
    'neon-green': 'text-neon-green bg-neon-green/20 border-neon-green/30',
    'neon-red': 'text-neon-red bg-neon-red/20 border-neon-red/30',
    'neon-orange': 'text-neon-orange bg-neon-orange/20 border-neon-orange/30',
    'neon-purple': 'text-neon-purple bg-neon-purple/20 border-neon-purple/30',
  };

  const trendColors = {
    up: 'text-neon-green',
    down: 'text-neon-red',
    stable: 'text-gray-400',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-card-gradient border border-space-600 rounded-lg p-6 transition-all duration-300 hover:border-neon-blue/30 ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`text-xs font-rajdhani font-medium ${trendColors[trend]}`}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-rajdhani font-medium text-gray-400 mb-1">
          {title}
        </h3>
        <p className="text-2xl font-orbitron font-bold text-white mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
      
      {children}
    </div>
  );
}