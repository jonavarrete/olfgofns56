import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Globe, Users, Target, Building as Buildings, Building, Eye, Package, MapPin, ChevronLeft, ChevronRight, Sword, Shield, ZoomIn, ZoomOut, Home, Star, Moon, Orbit, Navigation, Info, Rocket } from 'lucide-react';

type ViewLevel = 'universe' | 'galaxy' | 'system';

interface UniverseGalaxy {
  id: number;
  name: string;
  systems: number;
  players: number;
  type: 'spiral' | 'elliptical' | 'irregular';
  discovered: boolean;
  x: number;
  y: number;
  rotation: number;
}

interface GalaxySystem {
  id: number;
  name: string;
  coordinates: string;
  planets: number;
  players: number;
  activity: 'high' | 'medium' | 'low' | 'none';
  type: 'main' | 'binary' | 'neutron' | 'blackhole';
  x: number;
  y: number;
  brightness: number;
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
  orbitRadius: number;
  orbitSpeed: number;
  currentAngle: number;
}

export default function Galaxy() {
  const { state, selectPlanet } = useGame();
  const { player } = state;
  const [viewLevel, setViewLevel] = useState<ViewLevel>('system');
  const [currentGalaxy, setCurrentGalaxy] = useState(1);
  const [currentSystem, setCurrentSystem] = useState(1);
  const [currentUniverse, setCurrentUniverse] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPlanetPos, setSelectedPlanetPos] = useState<number | null>(null);
  const [selectedMoonPos, setSelectedMoonPos] = useState<number | null>(null);
  const [animationTime, setAnimationTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const systemViewRef = useRef<HTMLDivElement>(null);

  // Get player's current location
  const playerPlanet = player.planets[0];
  const [playerGalaxy, playerSystem, playerPosition] = playerPlanet.coordinates.split(':').map(Number);

  // Initialize to player's location
  useEffect(() => {
    setCurrentGalaxy(playerGalaxy);
    setCurrentSystem(playerSystem);
  }, [playerGalaxy, playerSystem]);

  // Animation loop for orbital mechanics
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 0.01);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Zoom and pan controls
  useEffect(() => {
    const container = containerRef.current;
    if (!container || viewLevel !== 'system') return;

    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoomLevel(prev => Math.max(0.3, Math.min(3, prev + delta)));
    };

    const handleMouseDown = (e: MouseEvent) => {
      isPanning = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      if (systemViewRef.current) {
        systemViewRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
      }
    };

    const handleMouseUp = () => {
      isPanning = false;
      container.style.cursor = 'grab';
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isPanning = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && isPanning) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        if (systemViewRef.current) {
          systemViewRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
        }
      } else if (e.touches.length === 2) {
        // Pinch to zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        if (!container.dataset.lastDistance) {
          container.dataset.lastDistance = distance.toString();
          return;
        }
        
        const lastDistance = parseFloat(container.dataset.lastDistance);
        const scale = distance / lastDistance;
        setZoomLevel(prev => Math.max(0.3, Math.min(3, prev * scale)));
        container.dataset.lastDistance = distance.toString();
      }
    };

    const handleTouchEnd = () => {
      isPanning = false;
      delete container.dataset.lastDistance;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [viewLevel, zoomLevel]);

  // Generate universe data with realistic positioning
  const generateUniverseData = (): UniverseGalaxy[] => {
    const galaxies: UniverseGalaxy[] = [];
    for (let i = 1; i <= 9; i++) {
      const angle = (i - 1) * (Math.PI * 2 / 9);
      const radius = 150 + Math.random() * 100;
      galaxies.push({
        id: i,
        name: `Galaxia ${i}`,
        systems: Math.floor(Math.random() * 400) + 100,
        players: Math.floor(Math.random() * 10000) + 1000,
        type: ['spiral', 'elliptical', 'irregular'][Math.floor(Math.random() * 3)] as any,
        discovered: i <= 3 || Math.random() > 0.7,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotation: Math.random() * 360,
      });
    }
    return galaxies;
  };

  // Generate galaxy systems with spiral arm distribution
  const generateGalaxyData = (): GalaxySystem[] => {
    const systems: GalaxySystem[] = [];
    const armCount = 4;
    const systemsPerArm = 125;
    
    for (let arm = 0; arm < armCount; arm++) {
      for (let i = 0; i < systemsPerArm; i++) {
        const systemId = arm * systemsPerArm + i + 1;
        const armAngle = (arm * Math.PI * 2) / armCount;
        const distanceFromCenter = 50 + (i / systemsPerArm) * 200;
        const spiralOffset = (i / systemsPerArm) * Math.PI * 1.5;
        
        const angle = armAngle + spiralOffset + (Math.random() - 0.5) * 0.5;
        const radius = distanceFromCenter + (Math.random() - 0.5) * 30;
        
        systems.push({
          id: systemId,
          name: `Sistema ${systemId}`,
          coordinates: `${currentGalaxy}:${systemId}`,
          planets: Math.floor(Math.random() * 15) + 1,
          players: Math.floor(Math.random() * 50),
          activity: ['high', 'medium', 'low', 'none'][Math.floor(Math.random() * 4)] as any,
          type: ['main', 'binary', 'neutron', 'blackhole'][Math.floor(Math.random() * 4)] as any,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          brightness: Math.random() * 0.8 + 0.2,
        });
      }
    }
    return systems;
  };

  // Generate system planets with proper orbital mechanics
  const generateSystemData = (): SystemPlanet[] => {
    const planets: SystemPlanet[] = [];
    for (let i = 1; i <= 15; i++) {
      const hasPlayer = Math.random() > 0.7; // Reduced chance for inhabited planets
      const isOwnPlanet = hasPlayer && i === playerPosition && currentGalaxy === playerGalaxy && currentSystem === playerSystem;
      
      const orbitRadius = 80 + (i * 35);
      const orbitSpeed = 0.5 / Math.sqrt(orbitRadius); // Kepler's laws approximation
      
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
        orbitRadius,
        orbitSpeed,
        currentAngle: Math.random() * Math.PI * 2,
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
    setSelectedPlanetPos(null);
    setSelectedMoonPos(null);
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
    setSelectedPlanetPos(playerPosition);
  };

  const handlePlanetClick = (planet: SystemPlanet) => {
    setSelectedPlanetPos(planet.position);
    setSelectedMoonPos(null);
    
    if (planet.player?.isOwn && planet.planet) {
      // Switch to this planet if it's owned by the player
      const playerPlanetData = player.planets.find(p => 
        p.coordinates === `${currentGalaxy}:${currentSystem}:${planet.position}`
      );
      if (playerPlanetData) {
        selectPlanet(playerPlanetData);
      }
    }
  };

  const handleMoonClick = (planet: SystemPlanet, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPlanetPos(planet.position);
    setSelectedMoonPos(planet.position);
  };

  const getPlanetColor = (planet: SystemPlanet) => {
    if (!planet.planet) return 'bg-gray-600';
    
    const colors = {
      desert: 'bg-gradient-to-br from-yellow-600 to-orange-700',
      jungle: 'bg-gradient-to-br from-green-600 to-green-800',
      ocean: 'bg-gradient-to-br from-blue-500 to-blue-700',
      ice: 'bg-gradient-to-br from-cyan-300 to-blue-400',
      volcanic: 'bg-gradient-to-br from-red-600 to-orange-800',
      gas: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      rocky: 'bg-gradient-to-br from-gray-600 to-gray-800',
    };
    
    return colors[planet.planet.type];
  };

  const getPlanetSize = (planet: SystemPlanet) => {
    if (!planet.planet) return 'w-3 h-3';
    const size = planet.planet.size;
    if (size < 100) return 'w-4 h-4';
    if (size < 150) return 'w-5 h-5';
    if (size < 200) return 'w-6 h-6';
    return 'w-7 h-7';
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
            {viewLevel === 'system' && (
              <div className="flex items-center space-x-2 border-l border-space-600 pl-4">
                <button
                  onClick={() => setZoomLevel(Math.max(0.3, zoomLevel - 0.2))}
                  className="p-2 bg-space-700 hover:bg-space-600 rounded-lg transition-colors"
                >
                  <ZoomOut className="w-4 h-4 text-gray-400" />
                </button>
                <span className="text-sm font-rajdhani font-medium text-white px-2 min-w-[60px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.2))}
                  className="p-2 bg-space-700 hover:bg-space-600 rounded-lg transition-colors"
                >
                  <ZoomIn className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
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
          <div className="relative bg-space-900/50 rounded-lg p-8 min-h-96 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96">
                {universeData.map((galaxy) => (
                  <div
                    key={galaxy.id}
                    onClick={() => {
                      setCurrentGalaxy(galaxy.id);
                      setViewLevel('galaxy');
                    }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `calc(50% + ${galaxy.x}px)`,
                      top: `calc(50% + ${galaxy.y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div 
                      className={`w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-125 ${
                        galaxy.discovered 
                          ? 'bg-gradient-to-br from-neon-purple/40 to-neon-blue/40 shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
                          : 'bg-gradient-to-br from-gray-600/40 to-gray-800/40 shadow-[0_0_10px_rgba(107,114,128,0.3)]'
                      }`}
                      style={{ transform: `rotate(${galaxy.rotation + animationTime * 10}deg)` }}
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                      {galaxy.type === 'spiral' && (
                        <div className="absolute inset-2 rounded-full border border-white/20" 
                             style={{ transform: `rotate(${animationTime * 20}deg)` }} />
                      )}
                    </div>
                    
                    {galaxy.id === playerGalaxy && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-pulse border-2 border-white" />
                    )}
                    
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-space-900/90 px-3 py-2 rounded text-xs text-white whitespace-nowrap border border-space-600">
                        <p className="font-rajdhani font-medium">{galaxy.name}</p>
                        {galaxy.discovered && (
                          <>
                            <p className="text-gray-400">{galaxy.systems} sistemas</p>
                            <p className="text-gray-400">{galaxy.players.toLocaleString()} jugadores</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Galaxy View */}
      {viewLevel === 'galaxy' && (
        <Card title={`Galaxia ${currentGalaxy} - Vista Espiral`} glowing>
          <div className="relative bg-space-900/50 rounded-lg p-8 min-h-96 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-2xl max-h-2xl">
                {/* Galactic center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.8)]" />
                </div>
                
                {/* Spiral arms */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  {[0, 1, 2, 3].map(arm => (
                    <path
                      key={arm}
                      d={`M 50% 50% Q ${50 + Math.cos(arm * Math.PI / 2) * 30}% ${50 + Math.sin(arm * Math.PI / 2) * 30}% ${50 + Math.cos(arm * Math.PI / 2 + Math.PI) * 40}% ${50 + Math.sin(arm * Math.PI / 2 + Math.PI) * 40}%`}
                      stroke="rgba(139,92,246,0.3)"
                      strokeWidth="2"
                      fill="none"
                    />
                  ))}
                </svg>

                {/* Systems */}
                {galaxyData.slice(0, 100).map((system) => (
                  <div
                    key={system.id}
                    onClick={() => {
                      setCurrentSystem(system.id);
                      setViewLevel('system');
                    }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `calc(50% + ${system.x}px)`,
                      top: `calc(50% + ${system.y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div 
                      className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 ${
                        system.activity === 'high' ? 'bg-neon-green shadow-[0_0_8px_rgba(16,185,129,0.6)]' :
                        system.activity === 'medium' ? 'bg-neon-blue shadow-[0_0_6px_rgba(0,212,255,0.4)]' :
                        system.activity === 'low' ? 'bg-neon-orange shadow-[0_0_4px_rgba(245,158,11,0.3)]' :
                        'bg-gray-500'
                      }`}
                      style={{ opacity: system.brightness }}
                    />
                    
                    {system.id === playerSystem && currentGalaxy === playerGalaxy && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse border border-white" />
                    )}
                    
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-space-900/90 px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-space-600">
                        <p className="font-rajdhani font-medium">Sistema {system.id}</p>
                        <p className="text-gray-400">{system.planets} planetas</p>
                        <p className="text-gray-400">{system.players} jugadores</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* System View */}
      {viewLevel === 'system' && (
        <>
          <Card title={`Sistema ${currentGalaxy}:${currentSystem} - Vista Orbital`} glowing>
            <div 
              ref={containerRef}
              className="relative bg-space-900/50 rounded-lg min-h-96 overflow-hidden cursor-grab select-none"
              style={{ height: '600px' }}
            >
              <div 
                ref={systemViewRef}
                className="absolute inset-0 transition-transform duration-200"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center'
                }}
              >
                {/* Central Star */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-[0_0_40px_rgba(251,191,36,0.8)]">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300/50 to-transparent" />
                  </div>
                </div>

                {/* Orbital Paths */}
                {systemData.map((planet) => (
                  <div
                    key={`orbit-${planet.position}`}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-space-600/20 rounded-full"
                    style={{
                      width: `${planet.orbitRadius * 2}px`,
                      height: `${planet.orbitRadius * 2}px`,
                    }}
                  />
                ))}

                {/* Planets with realistic orbital motion */}
                {systemData.map((planet) => {
                  // Calculate orbital position for all planets
                  
                  const currentAngle = planet.currentAngle + (animationTime * planet.orbitSpeed);
                  const x = Math.cos(currentAngle) * planet.orbitRadius;
                  const y = Math.sin(currentAngle) * planet.orbitRadius;
                  
                  const isSelected = selectedPlanetPos === planet.position;
                  const isPlayerPlanet = planet.player?.isOwn;
                  const isInhabited = !!planet.planet;
                  
                  return (
                    <div
                      key={planet.position}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onClick={() => handlePlanetClick(planet)}
                    >
                      {/* Planet */}
                      <div className="relative">
                        {isInhabited ? (
                          /* Inhabited Planet - Show PNG image */
                          <div 
                            className={`${getPlanetSize(planet)} rounded-full border-2 transition-all duration-300 group-hover:scale-125 overflow-hidden ${
                              isPlayerPlanet 
                                ? 'border-neon-green shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse' 
                                : isSelected
                                  ? 'border-neon-blue shadow-[0_0_15px_rgba(0,212,255,0.6)]'
                                  : planet.player 
                                    ? 'border-neon-purple shadow-[0_0_10px_rgba(139,92,246,0.4)]'
                                    : 'border-gray-500'
                            }`}
                          >
                            <img 
                              src={`/images/planets/${planet.planet?.type}.png`}
                              alt={planet.planet?.type}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to gradient if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.className += ` ${getPlanetColor(planet)}`;
                                  const overlay = document.createElement('div');
                                  overlay.className = 'w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent';
                                  parent.appendChild(overlay);
                                }
                              }}
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
                          </div>
                        ) : (
                          /* Uninhabited Planet - Show dashed circle with question mark */
                          <div 
                            className={`w-5 h-5 rounded-full border-2 border-dashed border-gray-500 transition-all duration-300 group-hover:scale-125 flex items-center justify-center ${
                              isSelected
                                ? 'border-neon-blue shadow-[0_0_15px_rgba(0,212,255,0.6)]'
                                : 'hover:border-gray-400'
                            }`}
                          >
                            <span className="text-gray-400 text-xs font-bold">?</span>
                          </div>
                        )}

                        {/* Moon */}
                        {planet.moon && (
                          <div 
                            className={`absolute w-2 h-2 rounded-full border cursor-pointer transition-all duration-300 hover:scale-150 overflow-hidden ${
                              selectedMoonPos === planet.position
                                ? 'border-neon-blue shadow-[0_0_8px_rgba(0,212,255,0.6)]'
                                : 'border-gray-300'
                            }`}
                            style={{
                              top: '-8px',
                              right: '-8px',
                              transform: `rotate(${animationTime * 50}deg) translateX(12px)`,
                              transformOrigin: '6px 6px',
                            }}
                            onClick={(e) => handleMoonClick(planet, e)}
                          >
                            <img 
                              src={`/images/moons/${planet.moon.type}.png`}
                              alt={planet.moon.type}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to solid color if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.className += ' bg-gray-400';
                                }
                              }}
                            />
                          </div>
                        )}

                        {/* Planet info tooltip */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          <div className="bg-space-900/95 px-3 py-2 rounded-lg text-xs text-white whitespace-nowrap border border-space-600 shadow-xl">
                            <p className="font-rajdhani font-medium text-neon-blue">
                              {planet.planet?.name || `Posición ${planet.position}`}
                            </p>
                            <p className="text-gray-400">{currentGalaxy}:{currentSystem}:{planet.position}</p>
                            {!isInhabited && (
                              <p className="text-gray-500">Posición libre para colonizar</p>
                            )}
                            {planet.player && (
                              <p className={`${isPlayerPlanet ? 'text-neon-green' : 'text-neon-purple'}`}>
                                {planet.player.username}
                              </p>
                            )}
                            {planet.planet && (
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-gray-400">Tamaño: {planet.planet.size}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{planet.planet.temperature}°C</span>
                              </div>
                            )}
                            {planet.moon && (
                              <p className="text-gray-400">Luna: {planet.moon.size} ({planet.moon.type})</p>
                            )}
                          </div>
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-full border-2 border-neon-blue animate-ping" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls overlay */}
              <div className="absolute bottom-4 left-4 text-xs text-gray-400 bg-space-900/80 px-3 py-2 rounded-lg">
                <p>🖱️ Arrastra para mover • 🔍 Rueda para zoom</p>
                <p>📱 Pellizca para zoom • Toca planetas para seleccionar</p>
              </div>
            </div>
          </Card>

          {/* Selected Planet Details */}
          {selectedPlanetPos && (
            <Card title="Detalles del Objeto Seleccionado">
              {(() => {
                const selectedPlanet = systemData.find(p => p.position === selectedPlanetPos);
                if (!selectedPlanet) return null;
                
                // Show details for both inhabited and uninhabited positions
                if (!selectedPlanet.planet) {
                  return (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-rajdhani font-bold text-white mb-2">
                        Posición {selectedPlanet.position}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {currentGalaxy}:{currentSystem}:{selectedPlanet.position}
                      </p>
                      <p className="text-gray-500 mb-6">
                        Esta posición orbital está libre para colonización
                      </p>
                      <Button variant="success">
                        <MapPin className="w-4 h-4 mr-2" />
                        Colonizar Posición
                      </Button>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-full border-2 ${
                          selectedPlanet.player?.isOwn ? 'border-neon-green' : 'border-neon-blue'
                        } ${getPlanetColor(selectedPlanet)}`}>
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                        </div>
                        <div>
                          <h3 className="text-xl font-rajdhani font-bold text-white">
                            {selectedPlanet.planet.name}
                          </h3>
                          <p className="text-gray-400">
                            {currentGalaxy}:{currentSystem}:{selectedPlanet.position}
                          </p>
                          <p className="text-sm text-gray-400">
                            Tipo: {selectedPlanet.planet.type} • Tamaño: {selectedPlanet.planet.size}
                          </p>
                        </div>
                      </div>

                      {selectedPlanet.player && (
                        <div className={`p-3 rounded-lg border ${
                          selectedPlanet.player.isOwn 
                            ? 'bg-neon-green/10 border-neon-green/30' 
                            : 'bg-neon-purple/10 border-neon-purple/30'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`font-rajdhani font-semibold ${
                                selectedPlanet.player.isOwn ? 'text-neon-green' : 'text-white'
                              }`}>
                                {selectedPlanet.player.username}
                              </p>
                              <p className="text-sm text-gray-400">
                                Rango #{selectedPlanet.player.rank}
                                {selectedPlanet.player.alliance && ` • ${selectedPlanet.player.alliance}`}
                              </p>
                            </div>
                            {selectedPlanet.player.isOwn && (
                              <div className="px-2 py-1 bg-neon-green/20 text-neon-green rounded text-xs">
                                Tu Planeta
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedPlanet.moon && (
                        <div className={`p-3 rounded-lg border ${
                          selectedMoonPos === selectedPlanet.position 
                            ? 'bg-neon-blue/10 border-neon-blue/30' 
                            : 'bg-space-700/30 border-space-600'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <Moon className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-rajdhani font-semibold text-white">
                                Luna de {selectedPlanet.planet.name}
                              </p>
                              <p className="text-sm text-gray-400">
                                Tamaño: {selectedPlanet.moon.size} • Tipo: {selectedPlanet.moon.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-rajdhani font-semibold text-white">Acciones Disponibles</h4>
                      
                      {selectedPlanet.player && !selectedPlanet.player.isOwn && (
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="secondary" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Espionar
                          </Button>
                          <Button variant="danger" size="sm">
                            <Sword className="w-4 h-4 mr-2" />
                            Atacar
                          </Button>
                          <Button variant="primary" size="sm">
                            <Package className="w-4 h-4 mr-2" />
                            Transportar
                          </Button>
                          <Button variant="secondary" size="sm">
                            <Info className="w-4 h-4 mr-2" />
                            Información
                          </Button>
                        </div>
                      )}


                      {selectedPlanet.player?.isOwn && (
                        <div className="space-y-2">
                          <Button variant="primary" className="w-full">
                            <Target className="w-4 h-4 mr-2" />
                            Seleccionar como Activo
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="secondary" size="sm">
                              <Building className="w-4 h-4 mr-2" />
                              Edificios
                            </Button>
                            <Button variant="secondary" size="sm">
                              <Rocket className="w-4 h-4 mr-2" />
                              Flota
                            </Button>
                          </div>
                        </div>
                      )}

                      {selectedPlanet.moon && (
                        <div className="border-t border-space-600 pt-4">
                          <h5 className="font-rajdhani font-medium text-white mb-2">Acciones de Luna</h5>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="secondary" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Explorar
                            </Button>
                            <Button variant="primary" size="sm">
                              <Building className="w-4 h-4 mr-2" />
                              Construir Base
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </Card>
          )}

          {/* System Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Información del Sistema">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-space-700/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-4 h-4 text-neon-blue" />
                      <span className="text-sm font-rajdhani font-medium text-white">Planetas</span>
                    </div>
                    <p className="text-lg font-orbitron font-bold text-white">
                      {systemData.filter(p => p.planet).length}/15
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
                      <MapPin className="w-4 h-4 text-neon-green" />
                      <span className="text-sm font-rajdhani font-medium text-white">Colonizables</span>
                    </div>
                    <p className="text-lg font-orbitron font-bold text-white">
                      {systemData.filter(p => !p.planet).length}
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
                      <div 
                        key={planet.position} 
                        className="p-2 bg-neon-green/10 rounded border border-neon-green/30 cursor-pointer hover:bg-neon-green/20 transition-colors"
                        onClick={() => handlePlanetClick(planet)}
                      >
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

            <Card title="Lista de Planetas">
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-rajdhani font-medium text-gray-400 border-b border-space-600 pb-2 sticky top-0 bg-space-800/80">
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
                    onClick={() => handlePlanetClick(planet)}
                    className={`grid grid-cols-12 gap-2 py-2 rounded-lg transition-all duration-200 hover:bg-space-700/30 cursor-pointer ${
                      selectedPlanetPos === planet.position ? 'bg-neon-blue/10 border border-neon-blue/30' :
                      planet.player?.isOwn ? 'border-l-2 border-neon-green/50 bg-neon-green/5' :
                      planet.player ? 'border-l-2 border-neon-purple/30' : ''
                    }`}
                  >
                    <div className="text-sm text-gray-300 font-rajdhani font-medium">
                      {planet.position}
                    </div>

                    <div className="col-span-3">
                      {planet.planet ? (
                        <div className="flex items-center space-x-2">
                          <div 
                            className={`w-6 h-6 rounded-full border overflow-hidden ${
                              planet.player?.isOwn ? 'border-neon-green' : 'border-neon-blue'
                            }`}
                          >
                            <img 
                              src={`/images/planets/${planet.planet.type}.png`}
                              alt={planet.planet.type}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to gradient if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.className += ` ${getPlanetColor(planet)}`;
                                  const overlay = document.createElement('div');
                                  overlay.className = 'w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent';
                                  parent.appendChild(overlay);
                                }
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm text-white">{planet.planet.name}</p>
                            <p className="text-xs text-gray-400">
                              {planet.planet.type} • {planet.planet.temperature}°C
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center bg-space-800/30">
                            <div className="w-1 h-1 bg-gray-500 rounded-full opacity-50" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Posición {planet.position}</p>
                            <p className="text-xs text-gray-600">Libre para colonizar</p>
                          </div>
                        </div>
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
                        <div 
                          className="flex items-center space-x-1 cursor-pointer hover:text-neon-blue transition-colors"
                          onClick={(e) => handleMoonClick(planet, e)}
                        >
                          <div className="w-3 h-3 rounded-full overflow-hidden border border-gray-300">
                            <img 
                              src={`/images/moons/${planet.moon.type}.png`}
                              alt={planet.moon.type}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to Moon icon if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-full bg-gray-400 rounded-full"></div>';
                                }
                              }}
                            />
                          </div>
                          <span className="text-gray-400">{planet.moon.size}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>

                    <div className="text-xs">
                      {planet.planet ? (
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            planet.planet.activity < 15 ? 'bg-neon-green' :
                            planet.planet.activity < 30 ? 'bg-neon-orange' :
                            'bg-gray-500'
                          }`}
                          title={
                            planet.planet.activity < 15 ? 'Activo' :
                            planet.planet.activity < 30 ? 'Moderado' :
                            'Inactivo'
                          }
                        />
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>

                    <div className="col-span-2 flex space-x-1" onClick={(e) => e.stopPropagation()}>
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
                      {!planet.planet && (
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
    </div>
  );
}