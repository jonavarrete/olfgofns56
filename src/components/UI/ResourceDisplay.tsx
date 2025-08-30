import React from 'react';
import { Resources } from '../../types/game';
import { Pickaxe, Gem, Zap, Battery } from 'lucide-react';

interface ResourceDisplayProps {
  resources: Resources;
}

const resourceConfig = [
  { key: 'metal', icon: Pickaxe, color: 'text-gray-300', bgColor: 'bg-gray-500/20' },
  { key: 'crystal', icon: Gem, color: 'text-neon-blue', bgColor: 'bg-neon-blue/20' },
  { key: 'deuterium', icon: Zap, color: 'text-neon-green', bgColor: 'bg-neon-green/20' },
  { key: 'energy', icon: Battery, color: 'text-neon-orange', bgColor: 'bg-neon-orange/20' },
];

export default function ResourceDisplay({ resources }: ResourceDisplayProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="flex items-center space-x-4">
      {resourceConfig.map(({ key, icon: Icon, color, bgColor }) => (
        <div
          key={key}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${bgColor} backdrop-blur-sm transition-all duration-200 hover:scale-105`}
        >
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm font-rajdhani font-medium text-white">
            {formatNumber(resources[key as keyof Resources])}
          </span>
        </div>
      ))}
    </div>
  );
}