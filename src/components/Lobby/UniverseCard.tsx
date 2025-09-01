import React from 'react';
import { Universe } from '../../types/auth';
import Card from '../UI/Card';
import { 
  Users, 
  Zap, 
  Clock, 
  Trophy,
  CheckCircle,
  AlertTriangle,
  Star,
  Shield,
  Sword,
  Crown
} from 'lucide-react';

interface UniverseCardProps {
  universe: Universe;
  isSelected: boolean;
  onClick: () => void;
}

export default function UniverseCard({ universe, isSelected, onClick }: UniverseCardProps) {
  const getStatusColor = (status: Universe['status']) => {
    switch (status) {
      case 'active': return 'text-neon-green';
      case 'new': return 'text-neon-blue';
      case 'ending': return 'text-neon-orange';
      case 'maintenance': return 'text-neon-red';
    }
  };

  const getTypeColor = (type: Universe['type']) => {
    switch (type) {
      case 'standard': return 'text-gray-400';
      case 'speed': return 'text-neon-orange';
      case 'peaceful': return 'text-neon-green';
      case 'hardcore': return 'text-neon-red';
    }
  };

  const getPopulationPercentage = () => {
    return (universe.currentPlayers / universe.maxPlayers) * 100;
  };

  const getPopulationColor = () => {
    const percentage = getPopulationPercentage();
    if (percentage < 30) return 'bg-neon-green';
    if (percentage < 70) return 'bg-neon-orange';
    return 'bg-neon-red';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        isSelected ? 'ring-2 ring-neon-blue/50 bg-neon-blue/5' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-orbitron font-bold text-white">
              {universe.name}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{universe.description}</p>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getStatusColor(universe.status)} bg-current/10`}>
              {universe.status === 'active' ? 'Activo' : 
               universe.status === 'new' ? 'Nuevo' :
               universe.status === 'ending' ? 'Finalizando' : 'Mantenimiento'}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getTypeColor(universe.type)} bg-current/10`}>
              {universe.type === 'standard' ? 'Estándar' :
               universe.type === 'speed' ? 'Velocidad' :
               universe.type === 'peaceful' ? 'Pacífico' : 'Hardcore'}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-neon-blue" />
            </div>
            <p className="text-sm font-orbitron font-bold text-white">
              {universe.currentPlayers.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Jugadores</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-neon-orange" />
            </div>
            <p className="text-sm font-orbitron font-bold text-white">
              x{universe.speed}
            </p>
            <p className="text-xs text-gray-400">Velocidad</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-sm font-orbitron font-bold text-white">
              {formatDate(universe.startDate)}
            </p>
            <p className="text-xs text-gray-400">Inicio</p>
          </div>
        </div>

        {/* Population Bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Población</span>
            <span>{getPopulationPercentage().toFixed(0)}% lleno</span>
          </div>
          <div className="w-full bg-space-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getPopulationColor()}`}
              style={{ width: `${getPopulationPercentage()}%` }}
            />
          </div>
        </div>

        {/* Player Status */}
        {universe.playerData?.hasAccount && (
          <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-rajdhani font-medium text-white">
                Cuenta Existente
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-gray-400">Rango #{universe.playerData.rank}</span>
              <span className="text-neon-blue font-rajdhani font-medium">
                {universe.playerData.points?.toLocaleString()} pts
              </span>
            </div>
          </div>
        )}

        {/* Features Preview */}
        <div>
          <div className="flex flex-wrap gap-1">
            {universe.features.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                  feature.enabled 
                    ? 'bg-neon-green/20 text-neon-green' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {feature.name}
              </div>
            ))}
            {universe.features.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{universe.features.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}