import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Globe, 
  Users, 
  Target, 
  Eye, 
  Package, 
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sword,
  Shield
} from 'lucide-react';

interface GalaxyPosition {
  position: number;
  player?: {
    username: string;
    alliance?: string;
    rank: number;
    planets: number;
  };
  planet?: {
    name: string;
    size: number;
    activity: number;
  };
  moon?: {
    size: number;
  };
}

export default function Galaxy() {
  const [currentGalaxy, setCurrentGalaxy] = useState(1);
  const [currentSystem, setCurrentSystem] = useState(1);

  // Mock galaxy data
  const generateGalaxyData = (): GalaxyPosition[] => {
    const positions: GalaxyPosition[] = [];
    for (let i = 1; i <= 15; i++) {
      const hasPlayer = Math.random() > 0.6;
      positions.push({
        position: i,
        player: hasPlayer ? {
          username: `Player${i}`,
          alliance: Math.random() > 0.5 ? 'ALLIANCE' : undefined,
          rank: Math.floor(Math.random() * 1000) + 1,
          planets: Math.floor(Math.random() * 5) + 1,
        } : undefined,
        planet: hasPlayer ? {
          name: `Planet ${i}`,
          size: Math.floor(Math.random() * 200) + 50,
          activity: Math.floor(Math.random() * 60),
        } : undefined,
        moon: Math.random() > 0.8 ? {
          size: Math.floor(Math.random() * 100) + 20,
        } : undefined,
      });
    }
    return positions;
  };

  const [galaxyData] = useState(generateGalaxyData());

  const navigateGalaxy = (direction: 'prev' | 'next', type: 'galaxy' | 'system') => {
    if (type === 'galaxy') {
      setCurrentGalaxy(prev => 
        direction === 'prev' ? Math.max(1, prev - 1) : Math.min(9, prev + 1)
      );
    } else {
      setCurrentSystem(prev => 
        direction === 'prev' ? Math.max(1, prev - 1) : Math.min(499, prev + 1)
      );
    }
  };

  const getActivityIndicator = (activity: number) => {
    if (activity < 15) return { color: 'bg-neon-green', text: 'Activo' };
    if (activity < 30) return { color: 'bg-neon-orange', text: 'Moderado' };
    return { color: 'bg-gray-500', text: 'Inactivo' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Vista Galáctica
          </h1>
          <p className="text-gray-400 mt-1">
            Explora el universo y localiza objetivos
          </p>
        </div>
      </div>

      {/* Navigation */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-rajdhani font-medium text-gray-300">
                Galaxia:
              </label>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => navigateGalaxy('prev', 'galaxy')}
                  className="p-1 hover:bg-space-600 rounded transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <span className="text-lg font-orbitron font-bold text-neon-blue px-3">
                  {currentGalaxy}
                </span>
                <button
                  onClick={() => navigateGalaxy('next', 'galaxy')}
                  className="p-1 hover:bg-space-600 rounded transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-rajdhani font-medium text-gray-300">
                Sistema:
              </label>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => navigateGalaxy('prev', 'system')}
                  className="p-1 hover:bg-space-600 rounded transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <span className="text-lg font-orbitron font-bold text-neon-blue px-3">
                  {currentSystem}
                </span>
                <button
                  onClick={() => navigateGalaxy('next', 'system')}
                  className="p-1 hover:bg-space-600 rounded transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            {currentGalaxy}:{currentSystem}:1-15
          </div>
        </div>
      </Card>

      {/* Galaxy View */}
      <Card title={`Galaxy ${currentGalaxy} - Sistema ${currentSystem}`}>
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-rajdhani font-medium text-gray-400 border-b border-space-600 pb-2">
            <div>Pos</div>
            <div className="col-span-3">Planeta</div>
            <div className="col-span-2">Jugador</div>
            <div>Alianza</div>
            <div>Rango</div>
            <div>Luna</div>
            <div>Act</div>
            <div className="col-span-2">Acciones</div>
          </div>

          {/* Positions */}
          {galaxyData.map((position) => (
            <div
              key={position.position}
              className={`grid grid-cols-12 gap-2 py-2 rounded-lg transition-all duration-200 hover:bg-space-700/30 ${
                position.player ? 'border-l-2 border-neon-blue/30' : ''
              }`}
            >
              <div className="text-sm text-gray-300 font-rajdhani font-medium">
                {position.position}
              </div>

              <div className="col-span-3">
                {position.planet ? (
                  <div>
                    <p className="text-sm text-white">{position.planet.name}</p>
                    <p className="text-xs text-gray-400">
                      Tamaño: {position.planet.size} • {currentGalaxy}:{currentSystem}:{position.position}
                    </p>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">Vacío</div>
                )}
              </div>

              <div className="col-span-2">
                {position.player ? (
                  <div>
                    <p className="text-sm text-white">{position.player.username}</p>
                    <p className="text-xs text-gray-400">
                      {position.player.planets} planeta(s)
                    </p>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">-</div>
                )}
              </div>

              <div className="text-xs">
                {position.player?.alliance ? (
                  <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">
                    {position.player.alliance}
                  </span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>

              <div className="text-sm text-gray-300">
                {position.player ? `#${position.player.rank}` : '-'}
              </div>

              <div className="text-xs">
                {position.moon ? (
                  <div className="w-4 h-4 bg-gray-400 rounded-full" title={`Luna (${position.moon.size})`} />
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>

              <div className="text-xs">
                {position.planet ? (
                  <div 
                    className={`w-2 h-2 rounded-full ${getActivityIndicator(position.planet.activity).color}`}
                    title={getActivityIndicator(position.planet.activity).text}
                  />
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>

              <div className="col-span-2 flex space-x-1">
                {position.player && (
                  <>
                    <button 
                      className="p-1 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded transition-colors"
                      title="Espionar"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    <button 
                      className="p-1 bg-neon-red/20 hover:bg-neon-red/30 text-neon-red rounded transition-colors"
                      title="Atacar"
                    >
                      <Sword className="w-3 h-3" />
                    </button>
                    <button 
                      className="p-1 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded transition-colors"
                      title="Transportar"
                    >
                      <Package className="w-3 h-3" />
                    </button>
                  </>
                )}
                {!position.player && (
                  <button 
                    className="p-1 bg-neon-green/20 hover:bg-neon-green/30 text-neon-green rounded transition-colors"
                    title="Colonizar"
                  >
                    <MapPin className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Globe className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <p className="text-lg font-rajdhani font-semibold text-white">
                12
              </p>
              <p className="text-sm text-gray-400">Planetas habitados</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Users className="w-6 h-6 text-neon-purple" />
            </div>
            <div>
              <p className="text-lg font-rajdhani font-semibold text-white">
                8
              </p>
              <p className="text-sm text-gray-400">Jugadores activos</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-orange/20 rounded-lg">
              <Target className="w-6 h-6 text-neon-orange" />
            </div>
            <div>
              <p className="text-lg font-rajdhani font-semibold text-white">
                3
              </p>
              <p className="text-sm text-gray-400">Posiciones libres</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}