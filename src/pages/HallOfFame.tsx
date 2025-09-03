import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SpaceBackground from '../components/UI/SpaceBackground';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  Sword, 
  Users, 
  Globe,
  TrendingUp,
  Award,
  Target,
  Rocket,
  Shield,
  Zap,
  Calendar,
  Eye,
  ArrowLeft,
  Filter,
  RefreshCw,
  BarChart3,
  Flame,
  Clock,
  MapPin,
  Home
} from 'lucide-react';

interface HallOfFameRecord {
  id: string;
  type: 'player_points' | 'alliance_points' | 'battle_destruction' | 'fleet_size' | 'planet_count' | 'research_level';
  title: string;
  playerName: string;
  allianceName?: string;
  allianceTag?: string;
  value: number;
  universe: string;
  coordinates?: string;
  timestamp: number;
  description: string;
  isActive: boolean; // If the record is still current
}

interface UniverseRecord {
  universe: string;
  universeName: string;
  records: HallOfFameRecord[];
  totalPlayers: number;
  totalBattles: number;
  averagePoints: number;
}

type ViewMode = 'global' | 'universe';
type RecordCategory = 'all' | 'players' | 'alliances' | 'battles' | 'achievements';

export default function HallOfFame() {
  const location = useLocation();
  const navigate = useNavigate();
  const isInGame = location.pathname.startsWith('/hall-of-fame') && localStorage.getItem('selected_universe');
  const currentUniverse = localStorage.getItem('selected_universe');
  
  const [viewMode, setViewMode] = useState<ViewMode>(isInGame ? 'universe' : 'global');
  const [selectedCategory, setSelectedCategory] = useState<RecordCategory>('all');
  const [selectedUniverse, setSelectedUniverse] = useState<string>(currentUniverse || 'universe_1');
  const [records, setRecords] = useState<HallOfFameRecord[]>([]);
  const [universeRecords, setUniverseRecords] = useState<UniverseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHallOfFameData();
  }, [viewMode, selectedUniverse, selectedCategory]);

  const loadHallOfFameData = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for Hall of Fame records
      const mockRecords: HallOfFameRecord[] = [
        {
          id: '1',
          type: 'player_points',
          title: 'Emperador Supremo',
          playerName: 'GalacticEmperor',
          allianceName: 'Dark Empire',
          allianceTag: 'DARK',
          value: 15678901,
          universe: 'universe_1',
          timestamp: Date.now() - 86400000 * 30,
          description: 'El jugador con más puntos en toda la historia de Galaxia Prima',
          isActive: true
        },
        {
          id: '2',
          type: 'battle_destruction',
          title: 'Destrucción Masiva',
          playerName: 'VoidDestroyer',
          allianceName: 'Void Lords',
          allianceTag: 'VOID',
          value: 2345678,
          universe: 'universe_4',
          coordinates: '1:2:3',
          timestamp: Date.now() - 86400000 * 7,
          description: 'La batalla más destructiva registrada: 2.3M puntos en naves destruidas',
          isActive: true
        },
        {
          id: '3',
          type: 'alliance_points',
          title: 'Alianza Legendaria',
          playerName: 'AllianceLeader',
          allianceName: 'Galactic Federation',
          allianceTag: 'GFED',
          value: 45678901,
          universe: 'universe_1',
          timestamp: Date.now() - 86400000 * 60,
          description: 'La alianza más poderosa jamás formada en la galaxia',
          isActive: true
        },
        {
          id: '4',
          type: 'fleet_size',
          title: 'Armada Colosal',
          playerName: 'FleetMaster',
          allianceName: 'Star Commanders',
          allianceTag: 'STAR',
          value: 50000,
          universe: 'universe_2',
          timestamp: Date.now() - 86400000 * 15,
          description: 'La flota más grande jamás construida: 50,000 naves de guerra',
          isActive: true
        },
        {
          id: '5',
          type: 'research_level',
          title: 'Genio Científico',
          playerName: 'TechMaster',
          value: 20,
          universe: 'universe_3',
          timestamp: Date.now() - 86400000 * 45,
          description: 'Primer jugador en alcanzar nivel 20 en Tecnología Gravitón',
          isActive: false
        },
        {
          id: '6',
          type: 'planet_count',
          title: 'Conquistador Galáctico',
          playerName: 'PlanetHunter',
          allianceName: 'Explorers United',
          allianceTag: 'EXPL',
          value: 25,
          universe: 'universe_1',
          timestamp: Date.now() - 86400000 * 90,
          description: 'El imperio más extenso: 25 planetas colonizados',
          isActive: true
        }
      ];

      const mockUniverseRecords: UniverseRecord[] = [
        {
          universe: 'universe_1',
          universeName: 'Galaxia Prima',
          records: mockRecords.filter(r => r.universe === 'universe_1'),
          totalPlayers: 3247,
          totalBattles: 45678,
          averagePoints: 125000
        },
        {
          universe: 'universe_2',
          universeName: 'Nebulosa Veloce',
          records: mockRecords.filter(r => r.universe === 'universe_2'),
          totalPlayers: 1834,
          totalBattles: 67890,
          averagePoints: 89000
        },
        {
          universe: 'universe_3',
          universeName: 'Sector Pacífico',
          records: mockRecords.filter(r => r.universe === 'universe_3'),
          totalPlayers: 2156,
          totalBattles: 12345,
          averagePoints: 156000
        },
        {
          universe: 'universe_4',
          universeName: 'Abismo Hardcore',
          records: mockRecords.filter(r => r.universe === 'universe_4'),
          totalPlayers: 789,
          totalBattles: 23456,
          averagePoints: 234000
        }
      ];

      if (viewMode === 'global') {
        setRecords(mockRecords);
      } else {
        const universeData = mockUniverseRecords.find(u => u.universe === selectedUniverse);
        setRecords(universeData?.records || []);
      }
      
      setUniverseRecords(mockUniverseRecords);
    } catch (error) {
      console.error('Error loading Hall of Fame data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRecordIcon = (type: HallOfFameRecord['type']) => {
    switch (type) {
      case 'player_points': return Crown;
      case 'alliance_points': return Users;
      case 'battle_destruction': return Sword;
      case 'fleet_size': return Rocket;
      case 'planet_count': return Globe;
      case 'research_level': return Star;
      default: return Trophy;
    }
  };

  const getRecordColor = (type: HallOfFameRecord['type']) => {
    switch (type) {
      case 'player_points': return 'text-neon-orange';
      case 'alliance_points': return 'text-neon-blue';
      case 'battle_destruction': return 'text-neon-red';
      case 'fleet_size': return 'text-neon-purple';
      case 'planet_count': return 'text-neon-green';
      case 'research_level': return 'text-neon-blue';
      default: return 'text-gray-400';
    }
  };

  const formatValue = (type: HallOfFameRecord['type'], value: number) => {
    switch (type) {
      case 'player_points':
      case 'alliance_points':
      case 'battle_destruction':
        return value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`;
      case 'fleet_size':
        return `${value.toLocaleString()} naves`;
      case 'planet_count':
        return `${value} planetas`;
      case 'research_level':
        return `Nivel ${value}`;
      default:
        return value.toLocaleString();
    }
  };

  const getCategoryName = (type: HallOfFameRecord['type']) => {
    switch (type) {
      case 'player_points': return 'Puntos de Jugador';
      case 'alliance_points': return 'Puntos de Alianza';
      case 'battle_destruction': return 'Destrucción en Batalla';
      case 'fleet_size': return 'Tamaño de Flota';
      case 'planet_count': return 'Planetas Colonizados';
      case 'research_level': return 'Nivel de Investigación';
      default: return 'Desconocido';
    }
  };

  const filteredRecords = selectedCategory === 'all' 
    ? records 
    : records.filter(record => {
        switch (selectedCategory) {
          case 'players': return record.type === 'player_points' || record.type === 'planet_count' || record.type === 'research_level';
          case 'alliances': return record.type === 'alliance_points';
          case 'battles': return record.type === 'battle_destruction';
          case 'achievements': return record.type === 'fleet_size' || record.type === 'research_level';
          default: return true;
        }
      });

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    
    if (days > 30) {
      const months = Math.floor(days / 30);
      return `${months} mes${months !== 1 ? 'es' : ''}`;
    }
    if (days > 0) return `${days} día${days !== 1 ? 's' : ''}`;
    return `${hours} hora${hours !== 1 ? 's' : ''}`;
  };

  const handleBackToLobby = () => {
    if (isInGame) {
      navigate('/');
    } else {
      navigate('/lobby');
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient text-white relative">
      <SpaceBackground />
      
      <div className="relative z-10 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="sm" onClick={handleBackToLobby}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isInGame ? 'Volver al Imperio' : 'Volver al Lobby'}
              </Button>
              <div>
                <h1 className="text-3xl font-orbitron font-bold text-white flex items-center">
                  <Trophy className="w-8 h-8 text-neon-orange mr-3 animate-glow" />
                  Salón de la Fama
                </h1>
                <p className="text-gray-400 font-rajdhani">
                  Los logros más épicos de la historia galáctica
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={loadHallOfFameData}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex bg-space-700/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('global')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-rajdhani font-medium transition-all duration-200 ${
                    viewMode === 'global' 
                      ? 'bg-neon-blue text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Global</span>
                </button>
                <button
                  onClick={() => setViewMode('universe')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-rajdhani font-medium transition-all duration-200 ${
                    viewMode === 'universe' 
                      ? 'bg-neon-blue text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span>Por Universo</span>
                </button>
              </div>

              {/* Universe Selector (only in universe mode) */}
              {viewMode === 'universe' && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">Universo:</span>
                  <select
                    value={selectedUniverse}
                    onChange={(e) => setSelectedUniverse(e.target.value)}
                    className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
                  >
                    <option value="universe_1">Galaxia Prima</option>
                    <option value="universe_2">Nebulosa Veloce</option>
                    <option value="universe_3">Sector Pacífico</option>
                    <option value="universe_4">Abismo Hardcore</option>
                    <option value="universe_5">Nueva Frontera</option>
                    <option value="universe_6">Legado Ancestral</option>
                  </select>
                </div>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', name: 'Todos', icon: Trophy },
                { id: 'players', name: 'Jugadores', icon: Crown },
                { id: 'alliances', name: 'Alianzas', icon: Users },
                { id: 'battles', name: 'Batallas', icon: Sword },
                { id: 'achievements', name: 'Logros', icon: Award },
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as RecordCategory)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                      : 'text-gray-400 hover:text-white hover:bg-space-700/50'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Records Display */}
          {loading ? (
            <Card>
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-neon-blue animate-spin mr-3" />
                <span className="text-gray-400">Cargando récords legendarios...</span>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecords
                .sort((a, b) => b.value - a.value)
                .slice(0, 12)
                .map((record, index) => {
                  const Icon = getRecordIcon(record.type);
                  const isTopThree = index < 3;
                  
                  return (
                    <Card
                      key={record.id}
                      className={`relative overflow-hidden ${
                        isTopThree ? 'ring-2 ring-neon-orange/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : ''
                      }`}
                      glowing={isTopThree}
                    >
                      {/* Rank Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-bold text-sm ${
                          index === 0 ? 'bg-neon-orange text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-yellow-600 text-white' :
                          'bg-space-600 text-gray-400'
                        }`}>
                          #{index + 1}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Record Header */}
                        <div className="flex items-start space-x-3">
                          <div className={`p-3 rounded-lg border ${getRecordColor(record.type)} bg-current/10 border-current/30`}>
                            <Icon className={`w-6 h-6 ${getRecordColor(record.type)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-orbitron font-bold text-white">
                              {record.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {getCategoryName(record.type)}
                            </p>
                          </div>
                        </div>

                        {/* Record Value */}
                        <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                          <p className={`text-3xl font-orbitron font-bold ${getRecordColor(record.type)}`}>
                            {formatValue(record.type, record.value)}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {record.description}
                          </p>
                        </div>

                        {/* Player Info */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Jugador:</span>
                            <span className="text-sm text-white font-rajdhani font-medium">
                              {record.playerName}
                            </span>
                          </div>
                          
                          {record.allianceName && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Alianza:</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-neon-blue font-rajdhani font-medium">
                                  {record.allianceName}
                                </span>
                                <span className="px-2 py-0.5 bg-neon-blue/20 text-neon-blue rounded text-xs font-rajdhani font-bold">
                                  [{record.allianceTag}]
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {viewMode === 'global' && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Universo:</span>
                              <span className="text-sm text-neon-purple font-rajdhani font-medium">
                                {universeRecords.find(u => u.universe === record.universe)?.universeName || record.universe}
                              </span>
                            </div>
                          )}
                          
                          {record.coordinates && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Coordenadas:</span>
                              <span className="text-sm text-gray-300 font-mono">
                                {record.coordinates}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Logrado:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-300">
                                {formatTimeAgo(record.timestamp)} atrás
                              </span>
                              {record.isActive && (
                                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" title="Récord activo" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Special Effects for Top 3 */}
                        {isTopThree && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className={`absolute top-0 left-0 w-full h-1 ${
                              index === 0 ? 'bg-gradient-to-r from-neon-orange via-yellow-400 to-neon-orange' :
                              index === 1 ? 'bg-gradient-to-r from-gray-400 via-white to-gray-400' :
                              'bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600'
                            } animate-pulse`} />
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
            </div>
          )}

          {/* Universe Statistics (only in universe mode) */}
          {viewMode === 'universe' && !loading && (
            <Card title="Estadísticas del Universo" glowing>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Users className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {universeRecords.find(u => u.universe === selectedUniverse)?.totalPlayers.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs text-gray-400">Jugadores Totales</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Sword className="w-8 h-8 text-neon-red mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {universeRecords.find(u => u.universe === selectedUniverse)?.totalBattles.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs text-gray-400">Batallas Totales</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <BarChart3 className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {universeRecords.find(u => u.universe === selectedUniverse)?.averagePoints.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs text-gray-400">Puntos Promedio</p>
                </div>
              </div>
            </Card>
          )}

          {/* Global Universe Comparison (only in global mode) */}
          {viewMode === 'global' && !loading && (
            <Card title="Comparación de Universos" glowing>
              <div className="space-y-3">
                {universeRecords
                  .sort((a, b) => b.averagePoints - a.averagePoints)
                  .map((universe, index) => (
                    <div
                      key={universe.universe}
                      className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-bold text-sm ${
                          index === 0 ? 'bg-neon-orange text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-yellow-600 text-white' :
                          'bg-space-600 text-gray-400'
                        }`}>
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-rajdhani font-semibold text-white">
                            {universe.universeName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {universe.totalPlayers.toLocaleString()} jugadores • {universe.totalBattles.toLocaleString()} batallas
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-orbitron font-bold text-white">
                          {universe.averagePoints >= 1000000 
                            ? `${(universe.averagePoints / 1000000).toFixed(1)}M` 
                            : `${(universe.averagePoints / 1000).toFixed(0)}K`
                          }
                        </p>
                        <p className="text-xs text-gray-400">Puntos promedio</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {/* Legend */}
          <Card title="Leyenda de Récords">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { type: 'player_points', name: 'Puntos de Jugador', desc: 'Máximos puntos alcanzados por un jugador individual' },
                { type: 'alliance_points', name: 'Puntos de Alianza', desc: 'Máximos puntos combinados de una alianza' },
                { type: 'battle_destruction', name: 'Destrucción en Batalla', desc: 'Mayor cantidad de puntos destruidos en una sola batalla' },
                { type: 'fleet_size', name: 'Tamaño de Flota', desc: 'Mayor número de naves en una sola flota' },
                { type: 'planet_count', name: 'Planetas Colonizados', desc: 'Mayor número de planetas controlados' },
                { type: 'research_level', name: 'Nivel de Investigación', desc: 'Nivel más alto alcanzado en cualquier tecnología' },
              ].map(item => {
                const Icon = getRecordIcon(item.type as HallOfFameRecord['type']);
                return (
                  <div key={item.type} className="flex items-start space-x-3 p-3 bg-space-700/30 rounded-lg border border-space-600">
                    <Icon className={`w-5 h-5 ${getRecordColor(item.type as HallOfFameRecord['type'])} mt-0.5`} />
                    <div>
                      <p className="text-sm font-rajdhani font-semibold text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Promotional Banner */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-neon-blue/10 to-neon-green/10"></div>
            <div className="relative text-center py-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-neon-orange animate-pulse" />
                <h3 className="text-2xl font-orbitron font-bold text-white">
                  ¡FORJA TU LEYENDA!
                </h3>
                <Star className="w-6 h-6 text-neon-orange animate-pulse" />
              </div>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Cada récord en este salón representa años de dedicación, estrategia brillante y momentos épicos. 
                ¿Tienes lo necesario para unirte a estas leyendas galácticas?
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="primary"
                  onClick={() => navigate(isInGame ? '/' : '/lobby')}
                  className="px-8 py-3"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {isInGame ? 'Continuar Jugando' : 'Comenzar Aventura'}
                </Button>
                {!isInGame && (
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/login')}
                    className="px-8 py-3"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Crear Cuenta
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}