import React from 'react';
import { Resources } from '../../types/game';
import { Pickaxe, Gem, Zap, Battery, Recycle } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface ResourceDisplayProps {
  resources: Resources;
  showDebris?: boolean;
}

const resourceConfig = [
  { key: 'metal', icon: Pickaxe, color: 'text-gray-300', bgColor: 'bg-gray-500/20' },
  { key: 'crystal', icon: Gem, color: 'text-neon-blue', bgColor: 'bg-neon-blue/20' },
  { key: 'deuterium', icon: Zap, color: 'text-neon-green', bgColor: 'bg-neon-green/20' },
  { key: 'energy', icon: Battery, color: 'text-neon-orange', bgColor: 'bg-neon-orange/20' },
];

export default function ResourceDisplay({ resources, showDebris = false }: ResourceDisplayProps) {
  const { state } = useGame();
  const { selectedPlanet } = state;
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const hasDebris = selectedPlanet.debris.metal > 0 || selectedPlanet.debris.crystal > 0;
  return (
    <div className="flex items-center space-x-4 flex-wrap">
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
      
      {showDebris && hasDebris && (
        <div className="flex items-center space-x-3 px-3 py-2 bg-neon-green/10 border border-neon-green/30 rounded-lg">
          <Recycle className="w-4 h-4 text-neon-green" />
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-xs font-rajdhani text-white">
                {formatNumber(selectedPlanet.debris.metal)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
              <span className="text-xs font-rajdhani text-white">
                {formatNumber(selectedPlanet.debris.crystal)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}