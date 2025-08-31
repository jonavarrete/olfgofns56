import React from 'react';
import { TechnologyNode, TechnologyTreeUtils } from '../../data/technologyTree';
import { Buildings, Research } from '../../types/game';
import { CheckCircle, Lock, Clock, Zap } from 'lucide-react';

interface TechnologyTooltipProps {
  technology: TechnologyNode;
  buildings: Buildings;
  research: Research;
  resources: { metal: number; crystal: number; deuterium: number; energy: number };
  position: { x: number; y: number };
  visible: boolean;
}

export default function TechnologyTooltip({ 
  technology, 
  buildings, 
  research, 
  resources, 
  position, 
  visible 
}: TechnologyTooltipProps) {
  if (!visible) return null;

  const { canBuild, missingRequirements } = TechnologyTreeUtils.checkRequirements(
    technology.id,
    buildings,
    research
  );

  const currentLevel = technology.category === 'building' 
    ? buildings[technology.id as keyof Buildings] || 0
    : technology.category === 'research'
    ? research[technology.id as keyof Research] || 0
    : 0;

  const cost = TechnologyTreeUtils.calculateCost(technology.id, currentLevel + 1);
  const canAfford = resources.metal >= cost.metal &&
                   resources.crystal >= cost.crystal &&
                   resources.deuterium >= cost.deuterium &&
                   resources.energy >= cost.energy;

  const formatNumber = (num: number) => num.toLocaleString();
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="bg-card-gradient border border-space-600 rounded-lg p-4 shadow-xl backdrop-blur-sm max-w-xs">
        <div className="space-y-3">
          <div>
            <h3 className="font-orbitron font-bold text-white text-sm">
              {technology.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{technology.description}</p>
            {(technology.category === 'building' || technology.category === 'research') && (
              <p className="text-xs text-gray-500 mt-1">
                Nivel actual: {currentLevel}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            {canBuild && canAfford ? (
              <>
                <CheckCircle className="w-4 h-4 text-neon-green" />
                <span className="text-xs text-neon-green font-rajdhani font-medium">Disponible</span>
              </>
            ) : canBuild ? (
              <>
                <Zap className="w-4 h-4 text-neon-orange" />
                <span className="text-xs text-neon-orange font-rajdhani font-medium">Sin recursos</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-neon-red" />
                <span className="text-xs text-neon-red font-rajdhani font-medium">Bloqueado</span>
              </>
            )}
          </div>

          {/* Requirements */}
          {missingRequirements.length > 0 && (
            <div>
              <h4 className="text-xs font-rajdhani font-medium text-gray-400 mb-1">
                Requisitos faltantes:
              </h4>
              <div className="space-y-1">
                {missingRequirements.map((req, index) => (
                  <div key={index} className="text-xs text-neon-red">
                    • {TechnologyTreeUtils.getRequirementText(req)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost */}
          <div>
            <h4 className="text-xs font-rajdhani font-medium text-gray-400 mb-1">Costo:</h4>
            <div className="space-y-1">
              {cost.metal > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Metal:</span>
                  <span className={resources.metal >= cost.metal ? 'text-gray-300' : 'text-neon-red'}>
                    {formatNumber(cost.metal)}
                  </span>
                </div>
              )}
              {cost.crystal > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Cristal:</span>
                  <span className={resources.crystal >= cost.crystal ? 'text-neon-blue' : 'text-neon-red'}>
                    {formatNumber(cost.crystal)}
                  </span>
                </div>
              )}
              {cost.deuterium > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Deuterio:</span>
                  <span className={resources.deuterium >= cost.deuterium ? 'text-neon-green' : 'text-neon-red'}>
                    {formatNumber(cost.deuterium)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Tiempo:</span>
                <span className="text-gray-300">{formatTime(cost.time)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}