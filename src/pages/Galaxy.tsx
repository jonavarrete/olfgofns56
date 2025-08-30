import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
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
  Shield,
  ZoomIn,
  ZoomOut,
  Home,
  Star,
  Moon,
  Orbit,
  Navigation
} from 'lucide-react';

type ViewLevel = 'universe' | 'galaxy' | 'system';

interface UniverseGalaxy {
  id: number;
  name: string;
  systems: number;
  players: number;
  type: 'spiral' | 'elliptical' | 'irregular';
  discovered: boolean;
}

interface GalaxySystem {
  id: number;
  name: string;
  coordinates: string;
  planets: number;
  players: number;
  activity: 'high' | 'medium' | 'low' | 'none';
  type: 'main' | 'binary' | 'neutron' | 'blackhole';
}

interface SystemPlanet {
  position: number;
  name?: string;
  player?: {
    username: string;
    alliance?: string;
    rank: number;
    isOwn: boolean;
  };
  planet?: {
    name: string;
    size: number;
    type: 'desert' | 'jungle' | 'ocean' | 'ice' | 'volcanic' | 'gas' | 'rocky';
    temperature: number;
    activity: number;
  };
  moon?: {
    size: number;
    type: 'rocky' | 'ice' | 'metal';
  };
}

export default function Galaxy() {
  const { state } = useGame();
  const { player } = state;
  const [viewLevel, setViewLevel] = useState<ViewLevel>('system');
  const [currentGalaxy, setCurrentGalaxy] = useState(1);
  const [currentSystem, setCurrentSystem] = useState(1);
  const [currentUniverse, setCurrentUniverse] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get player's current location
  const playerPlanet = player.planets[0]; // Main planet
  const [playerGalaxy, playerSystem, playerPosition] = playerPlanet.coordinates.split(':').map(Number);

  // Initialize to player's location
  useEffect(() => {
    setCurrentGalaxy(playerGalaxy);
    setCurrentSystem(playerSystem);
  }, [playerGalaxy, playerSystem]);

  // Generate universe data
  const generateUniverseData = (): UniverseGalaxy[] => {
    const galaxies: UniverseGalaxy[] = [];
    for (let i = 1; i <= 9; i++) {
      galaxies.push({
        id: i,
        name: `Galaxia ${i}`,
        systems: Math.floor(Math.random() * 400) + 100,
        players: Math.floor(Math.random() * 10000) + 1000,
        type: ['spiral', 'elliptical', 'irregular'][Math.floor(Math.random() * 3)] as any,
        discovered: i <= 3 || Math.random() > 0.7,
      });
    }
    return galaxies;
  };

  // Generate galaxy systems
  const generateGalaxyData = (): GalaxySystem[] => {
    const systems: GalaxySystem[] = [];
    for (let i = 1; i <= 499; i++) {
      systems.push({
        id: i,
        name: `Sistema ${i}`,
        coordinates: `${currentGalaxy}:${i}`,
        planets: Math.floor(Math.random() * 15) + 1,
        players: Math.floor(Math.random() * 50),
        activity: ['high', 'medium', 'low', 'none'][Math.floor(Math.random() * 4)] as any,
        type: ['main', 'binary', 'neutron', 'blackhole'][Math.floor(Math.random() * 4)] as any,
      });
    }
    return systems;
  };

  // Generate system planets
  const generateSystemData = (): SystemPlanet[] => {
    const planets: SystemPlanet[] = [];
    for (let i = 1; i <= 15; i++) {
      const hasPlayer = Math.random() > 0.6;
      const isOwnPlanet = hasPlayer && i === playerPosition && currentGalaxy === playerGalaxy && currentSystem === playerSystem;
      
      planets.push({
        position: i,
        player: hasPlayer ? {
          username: isOwnPlanet ? player.username : `Player${i}`,
          alliance: isOwnPlanet ? player.alliance : (Math.random() > 0.5 ? 'ALLIANCE' : undefined),
          rank: isOwnPlanet ? player.rank : Math.floor(Math.random() * 1000) + 1,
          isOwn: isOwnPlanet,
        } : undefined,
        planet: hasPlayer ? {
          name: isOwnPlanet ? playerPlanet.name : `Planet ${i}`,
          size: Math.floor(Math.random() * 200) + 50,
          type: ['desert', 'jungle', 'ocean', 'ice', 'volcanic', 'gas', 'rocky'][Math.floor(Math.random() * 7)] as any,
          temperature: Math.floor(Math.random() * 200) - 100,
          activity: Math.floor(Math.random() * 60),
        } : undefined,
        moon: Math.random() > 0.8 ? {
          size: Math.floor(Math.random() * 100) + 20,
          type: ['rocky', 'ice', 'metal'][Math.floor(Math.random() * 3)] as any,
        } : undefined,
      });
    }
    return planets;
  };

  const [universeData] = useState(generateUniverseData());
  const [galaxyData, setGalaxyData] = useState(generateGalaxyData());
  const [systemData, setSystemData] = useState(generateSystemData());

  // Update data when navigation changes
  useEffect(() => {
    if (viewLevel === 'galaxy') {
      setGalaxyData(generateGalaxyData());
    } else if (viewLevel === 'system') {
      setSystemData(generateSystemData());
    }
  }, [currentGalaxy, currentSystem, viewLevel]);

  const navigateToLevel = (level: ViewLevel) => {
    setViewLevel(level);
    setZoomLevel(1);
  };

  const navigateGalaxy = (direction: 'prev' | 'next') => {
    setCurrentGalaxy(prev => 
      direction === 'prev' ? Math.max(1, prev - 1) : Math.min(9, prev + 1)
    );
  };

  const navigateSystem = (direction: 'prev' | 'next') => {
    setCurrentSystem(prev => 
      direction === 'prev' ? Math.max(1, prev - 1) : Math.min(499, prev + 1)
    );
  };

  const goToPlayerLocation = () => {
    setCurrentGalaxy(playerGalaxy);
    setCurrentSystem(playerSystem);
    setViewLevel('system');
  };

  const getPlanetImage = (planet: SystemPlanet) => {
    if (!planet.planet || !planet.player) return null;
    
    const planetImages = {
      desert: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      jungle: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      ocean: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      ice: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      volcanic: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      gas: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      rocky: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
    };

    return planetImages[planet.planet.type];
  };

  const getActivityIndicator = (activity: number) => {
    if (activity < 15) return { color: 'bg-neon-green', text: 'Activo' };
    if (activity < 30) return { color: 'bg-neon-orange', text: 'Moderado' };
    return { color: 'bg-gray-500', text: 'Inactivo' };
  };

  const getSystemActivityColor = (activity: GalaxySystem['activity']) => {
    switch (activity) {
      case 'high': return 'bg-neon-green';
      case 'medium': return 'bg-neon-orange';
      case 'low': return 'bg-neon-red';
      case 'none': return 'bg-gray-500';
    }
  };

  const getGalaxyTypeIcon = (type: UniverseGalaxy['type']) => {
    switch (type) {
      case 'spiral': return '🌌';
      case 'elliptical': return '⭕';
      case 'irregular': return '💫';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            {viewLevel === 'universe' ? 'Vista Universal' :
             viewLevel === 'galaxy' ? `Galaxia ${currentGalaxy}` :
             `Sistema ${currentGalaxy}:${currentSystem}`}
          </h1>
          <p className="text-gray-400 mt-1">
            {viewLevel === 'universe' ? 'Explora el multiverso infinito' :
             viewLevel === 'galaxy' ? 'Navega por los sistemas estelares' :
             'Vista detallada del sistema planetario'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" onClick={goToPlayerLocation}>
            <Home className="w-4 h-4 mr-2" />
            Mi Ubicación
          </Button>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateToLevel('universe')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  viewLevel === 'universe' 
                    ? 'bg-neon-purple/20 text-neon-purple' 
                    : 'text-gray-400 hover:text-white hover:bg-space-600'
                }`}
              >
                <Globe className="w-4 h-4 mr-1" />
                Universo {currentUniverse}
              </button>
              
              {(viewLevel === 'galaxy' || viewLevel === 'system') && (
                <>
                  <span className="text-gray-500">→</span>
                  <button
                    onClick={() => navigateToLevel('galaxy')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      viewLevel === 'galaxy' 
                        ? 'bg-neon-blue/20 text-neon-blue' 
                        : 'text-gray-400 hover:text-white hover:bg-space-600'
                    }`}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Galaxia {currentGalaxy}
                  </button>
                </>
              )}
              
              {viewLevel === 'system' && (
                <>
                  <span className="text-gray-500">→</span>
                  <div className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-lg">
                    <Orbit className="w-4 h-4 mr-1 inline" />
                    Sistema {currentSystem}
                  </div>
                </>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 border-l border-space-600 pl-4">
              <button
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                className="p-2 bg-space-700 hover:bg-space-600 rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4 text-gray-400" />
              </button>
              <span className="text-sm font-rajdhani font-medium text-white px-2">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
                className="p-2 bg-space-700 hover:bg-space-600 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          {viewLevel !== 'universe' && (
            <div className="flex items-center space-x-4">
              {viewLevel === 'galaxy' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateGalaxy('prev')}
                    className="p-2 hover:bg-space-600 rounded transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                  </button>
                  <span className="text-lg font-orbitron font-bold text-neon-blue px-3">
                    Galaxia {currentGalaxy}
                  </span>
                  <button
                    onClick={() => navigateGalaxy('next')}
                    className="p-2 hover:bg-space-600 rounded transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              )}

              {viewLevel === 'system' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateSystem('prev')}
                    className="p-2 hover:bg-space-600 rounded transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                  </button>
                  <span className="text-lg font-orbitron font-bold text-neon-green px-3">
                    Sistema {currentSystem}
                  </span>
                  <button
                    onClick={() => navigateSystem('next')}
                    className="p-2 hover:bg-space-600 rounded transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Universe View */}
      {viewLevel === 'universe' && (
        <Card title="Vista Universal - Selecciona una Galaxia" glowing>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {universeData.map((galaxy) => (
              <div
                key={galaxy.id}
                onClick={() => {
                  setCurrentGalaxy(galaxy.id);
                  setViewLevel('galaxy');
                }}
                className={`relative p-6 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                  galaxy.discovered 
                    ? 'bg-space-700/50 border-space-500 hover:border-neon-purple/50' 
                    : 'bg-space-800/30 border-space-700 hover:border-neon-orange/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {galaxy.discovered ? getGalaxyTypeIcon(galaxy.type) : '❓'}
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                    {galaxy.discovered ? galaxy.name : `Galaxia ${galaxy.id}`}
                  </h3>
                  {galaxy.discovered ? (
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>Tipo: {galaxy.type === 'spiral' ? 'Espiral' : galaxy.type === 'elliptical' ? 'Elíptica' : 'Irregular'}</p>
                      <p>{galaxy.systems} sistemas</p>
                      <p>{galaxy.players.toLocaleString()} jugadores</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>Galaxia no explorada</p>
                      <p>Requiere exploración</p>
                    </div>
                  )}
                  {galaxy.id === playerGalaxy && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Galaxy View */}
      {viewLevel === 'galaxy' && (
        <Card title={`Galaxia ${currentGalaxy} - Selecciona un Sistema`} glowing>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galaxyData.slice(0, 20).map((system) => (
              <div
                key={system.id}
                onClick={() => {
                  setCurrentSystem(system.id);
                  setViewLevel('system');
                }}
                className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                  system.activity !== 'none'
                    ? 'bg-space-700/50 border-space-500 hover:border-neon-blue/50'
                    : 'bg-space-800/30 border-space-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-rajdhani font-semibold text-white">
                    Sistema {system.id}
                  </h4>
                  <div className={`w-3 h-3 rounded-full ${getSystemActivityColor(system.activity)}`} />
                </div>
                
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Planetas:</span>
                    <span className="text-white">{system.planets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jugadores:</span>
                    <span className="text-white">{system.players}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <span className="text-white capitalize">
                      {system.type === 'main' ? 'Principal' :
                       system.type === 'binary' ? 'Binario' :
                       system.type === 'neutron' ? 'Neutrón' :
                       'Agujero Negro'}
                    </span>
                  </div>
                </div>

                {system.id === playerSystem && currentGalaxy === playerGalaxy && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* System View */}
      {viewLevel === 'system' && (
        <>
          <Card title={`Sistema ${currentGalaxy}:${currentSystem} - Vista Planetaria`} glowing>
            <div 
              className="relative bg-space-900/50 rounded-lg p-8 min-h-96 overflow-hidden"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
            >
              {/* Central Star */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300/50 to-transparent" />
                </div>
              </div>

              {/* Orbital Paths */}
              {systemData.filter(p => p.planet).map((planet) => {
                const radius = 60 + (planet.position * 25);
                return (
                  <div
                    key={planet.position}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-space-600/30 rounded-full opacity-30"
                    style={{
                      width: `${radius * 2}px`,
                      height: `${radius * 2}px`,
                    }}
                  />
                );
              })}

              {/* Planets */}
              {systemData.map((planet) => {
                if (!planet.planet) return null;
                
                const radius = 60 + (planet.position * 25);
                const angle = (planet.position * 24) % 360; // Distribute planets around orbits
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={planet.position}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{
                      transform: `translate(${x - 50}%, ${y - 50}%)`,
                    }}
                  >
                    {/* Planet */}
                    <div className="relative">
                      <div 
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${
                          planet.player?.isOwn 
                            ? 'border-neon-green shadow-[0_0_15px_rgba(16,185,129,0.6)]' 
                            : planet.player 
                              ? 'border-neon-blue shadow-[0_0_10px_rgba(0,212,255,0.4)]'
                              : 'border-gray-500'
                        }`}
                        style={{
                          backgroundImage: `url(${getPlanetImage(planet)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        {!getPlanetImage(planet) && (
                          <div className={`w-full h-full rounded-full ${
                            planet.planet.type === 'desert' ? 'bg-gradient-to-br from-yellow-600 to-orange-700' :
                            planet.planet.type === 'jungle' ? 'bg-gradient-to-br from-green-600 to-green-800' :
                            planet.planet.type === 'ocean' ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                            planet.planet.type === 'ice' ? 'bg-gradient-to-br from-cyan-300 to-blue-400' :
                            planet.planet.type === 'volcanic' ? 'bg-gradient-to-br from-red-600 to-orange-800' :
                            planet.planet.type === 'gas' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                            'bg-gradient-to-br from-gray-600 to-gray-800'
                          }`} />
                        )}
                      </div>

                      {/* Moon */}
                      {planet.moon && (
                        <div 
                          className="absolute w-3 h-3 bg-gray-400 rounded-full border border-gray-300"
                          style={{
                            top: '-6px',
                            right: '-6px',
                          }}
                        />
                      )}

                      {/* Planet Label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-space-900/90 px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-space-600">
                          <p className="font-rajdhani font-medium">{planet.planet.name}</p>
                          <p className="text-gray-400">{currentGalaxy}:{currentSystem}:{planet.position}</p>
                          {planet.player && (
                            <p className="text-neon-blue">{planet.player.username}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* System Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Planetas del Sistema">
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-rajdhani font-medium text-gray-400 border-b border-space-600 pb-2">
                  <div>Pos</div>
                  <div className="col-span-3">Planeta</div>
                  <div className="col-span-2">Jugador</div>
                  <div>Alianza</div>
                  <div>Tamaño</div>
                  <div>Luna</div>
                  <div>Act</div>
                  <div className="col-span-2">Acciones</div>
                </div>

                {/* Planets */}
                {systemData.map((planet) => (
                  <div
                    key={planet.position}
                    className={`grid grid-cols-12 gap-2 py-2 rounded-lg transition-all duration-200 hover:bg-space-700/30 ${
                      planet.player?.isOwn ? 'border-l-2 border-neon-green/50 bg-neon-green/5' :
                      planet.player ? 'border-l-2 border-neon-blue/30' : ''
                    }`}
                  >
                    <div className="text-sm text-gray-300 font-rajdhani font-medium">
                      {planet.position}
                    </div>

                    <div className="col-span-3">
                      {planet.planet ? (
                        <div className="flex items-center space-x-2">
                          <div 
                            className={`w-6 h-6 rounded-full border ${
                              planet.player?.isOwn ? 'border-neon-green' : 'border-neon-blue'
                            }`}
                            style={{
                              backgroundImage: `url(${getPlanetImage(planet)})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          >
                            {!getPlanetImage(planet) && (
                              <div className={`w-full h-full rounded-full ${
                                planet.planet.type === 'desert' ? 'bg-gradient-to-br from-yellow-600 to-orange-700' :
                                planet.planet.type === 'jungle' ? 'bg-gradient-to-br from-green-600 to-green-800' :
                                planet.planet.type === 'ocean' ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                                planet.planet.type === 'ice' ? 'bg-gradient-to-br from-cyan-300 to-blue-400' :
                                planet.planet.type === 'volcanic' ? 'bg-gradient-to-br from-red-600 to-orange-800' :
                                planet.planet.type === 'gas' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                                'bg-gradient-to-br from-gray-600 to-gray-800'
                              }`} />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-white">{planet.planet.name}</p>
                            <p className="text-xs text-gray-400">
                              {planet.planet.type} • {planet.planet.temperature}°C
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">Vacío</div>
                      )}
                    </div>

                    <div className="col-span-2">
                      {planet.player ? (
                        <div>
                          <p className={`text-sm ${planet.player.isOwn ? 'text-neon-green font-semibold' : 'text-white'}`}>
                            {planet.player.username}
                          </p>
                          <p className="text-xs text-gray-400">
                            Rango #{planet.player.rank}
                          </p>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">-</div>
                      )}
                    </div>

                    <div className="text-xs">
                      {planet.player?.alliance ? (
                        <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">
                          {planet.player.alliance}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>

                    <div className="text-sm text-gray-300">
                      {planet.planet ? planet.planet.size : '-'}
                    </div>

                    <div className="text-xs">
                      {planet.moon ? (
                        <div className="flex items-center space-x-1">
                          <Moon className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">{planet.moon.size}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>

                    <div className="text-xs">
                      {planet.planet ? (
                        <div 
                          className={`w-2 h-2 rounded-full ${getActivityIndicator(planet.planet.activity).color}`}
                          title={getActivityIndicator(planet.planet.activity).text}
                        />
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>

                    <div className="col-span-2 flex space-x-1">
                      {planet.player && !planet.player.isOwn && (
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
                      {!planet.player && (
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

            <Card title="Información del Sistema">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-space-700/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-4 h-4 text-neon-blue" />
                      <span className="text-sm font-rajdhani font-medium text-white">Planetas</span>
                    </div>
                    <p className="text-lg font-orbitron font-bold text-white">
                      {systemData.filter(p => p.planet).length}
                    </p>
                  </div>

                  <div className="p-3 bg-space-700/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-neon-purple" />
                      <span className="text-sm font-rajdhani font-medium text-white">Jugadores</span>
                    </div>
                    <p className="text-lg font-orbitron font-bold text-white">
                      {systemData.filter(p => p.player).length}
                    </p>
                  </div>

                  <div className="p-3 bg-space-700/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Moon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-rajdhani font-medium text-white">Lunas</span>
                    </div>
                    <p className="text-lg font-orbitron font-bold text-white">
                      {systemData.filter(p => p.moon).length}
                    </p>
                  </div>

                  <div className="p-3 bg-space-700/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-neon-orange" />
                      <span className="text-sm font-rajdhani font-medium text-white">Libres</span>
                    </div>
                    <p className="text-lg font-orbitron font-bold text-white">
                      {15 - systemData.filter(p => p.player).length}
                    </p>
                  </div>
                </div>

                {/* Player's planets in this system */}
                {systemData.some(p => p.player?.isOwn) && (
                  <div className="border-t border-space-600 pt-4">
                    <h4 className="text-sm font-rajdhani font-semibold text-neon-green mb-2">
                      Tus Planetas en este Sistema
                    </h4>
                    {systemData.filter(p => p.player?.isOwn).map((planet) => (
                      <div key={planet.position} className="p-2 bg-neon-green/10 rounded border border-neon-green/30">
                        <p className="text-sm text-white font-rajdhani font-medium">
                          {planet.planet?.name} (Posición {planet.position})
                        </p>
                        <p className="text-xs text-gray-400">
                          {planet.planet?.type} • Tamaño {planet.planet?.size}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <button
            onClick={() => navigateToLevel('universe')}
            className="w-full flex items-center space-x-3 p-2 hover:bg-space-600/30 rounded-lg transition-colors"
          >
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Globe className="w-6 h-6 text-neon-purple" />
            </div>
            <div className="text-left">
              <p className="text-lg font-rajdhani font-semibold text-white">
                Vista Universal
              </p>
              <p className="text-sm text-gray-400">Explorar otras galaxias</p>
            </div>
          </button>
        </Card>
        </div>

        <Card>
          <button
            onClick={() => navigateToLevel('galaxy')}
            className="w-full flex items-center space-x-3 p-2 hover:bg-space-600/30 rounded-lg transition-colors"
          >
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Star className="w-6 h-6 text-neon-blue" />
            </div>
            <div className="text-left">
              <p className="text-lg font-rajdhani font-semibold text-white">
                Vista Galáctica
              </p>
              <p className="text-sm text-gray-400">Navegar sistemas estelares</p>
            </div>
          </button>
        </Card>

        <Card>
          <button
            onClick={() => navigateToLevel('system')}
            className="w-full flex items-center space-x-3 p-2 hover:bg-space-600/30 rounded-lg transition-colors"
          >
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Orbit className="w-6 h-6 text-neon-green" />
            </div>
            <div className="text-left">
              <p className="text-lg font-rajdhani font-semibold text-white">
                Vista del Sistema
              </p>
              <p className="text-sm text-gray-400">Explorar planetas detalladamente</p>
            </div>
          </button>
        </Card>
      </div>
  );
}