import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  X, 
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
  Filter,
  RefreshCw,
  BarChart3,
  Flame,
  Clock,
  MapPin,
  Home,
  Play
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
  isActive: boolean;
}

interface UniverseRecord {
  universe: string;
  universeName: string;
  records: HallOfFameRecord[];
  totalPlayers: number;
  totalBattles: number;
  averagePoints: number;
}

interface HallOfFameModalProps {
  onClose: () => void;
  mode: 'global' | 'universe';
  currentUniverse?: string;
  onJoinUniverse?: (universeId: string) => void;
}

type RecordCategory = 'all' | 'players' | 'alliances' | 'battles' | 'achievements';

export default function HallOfFameModal({ onClose, mode, currentUniverse, onJoinUniverse }: HallOfFameModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<RecordCategory>('all');
  const [selectedUniverse, setSelectedUniverse] = useState<string>(currentUniverse || 'universe_1');
  const [records, setRecords] = useState<HallOfFameRecord[]>([]);
  const [universeRecords, setUniverseRecords] = useState<UniverseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHallOfFameData();
  }, [mode, selectedUniverse, selectedCategory]);

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

      if (mode === 'global') {
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
        return `${value.toLocaleString()}`;
      case 'planet_count':
        return `${value}`;
      case 'research_level':
        return `Nv.${value}`;
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neon-orange/20 rounded-lg flex items-center justify-center animate-glow">
                <Trophy className="w-6 h-6 text-neon-orange" />
              </div>
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-white">
                  Salón de la Fama
                </h2>
                <p className="text-gray-400 font-rajdhani">
                  {mode === 'global' ? 'Los logros más épicos de toda la galaxia' : 'Leyendas del universo actual'}
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
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Universe Selector (only in global mode) */}
              {mode === 'global' && (
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
            </div>

            {/* Records Display */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-neon-blue animate-spin mr-3" />
                <span className="text-gray-400">Cargando récords legendarios...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredRecords
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 9)
                  .map((record, index) => {
                    const Icon = getRecordIcon(record.type);
                    const isTopThree = index < 3;
                    
                    return (
                      <div
                        key={record.id}
                        className={`relative overflow-hidden p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-all duration-200 ${
                          isTopThree ? 'ring-1 ring-neon-orange/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : ''
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className="absolute top-3 right-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-orbitron font-bold text-xs ${
                            index === 0 ? 'bg-neon-orange text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-yellow-600 text-white' :
                            'bg-space-600 text-gray-400'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>

                        <div className="space-y-3">
                          {/* Record Header */}
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg border ${getRecordColor(record.type)} bg-current/10 border-current/30`}>
                              <Icon className={`w-5 h-5 ${getRecordColor(record.type)}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-orbitron font-bold text-white">
                                {record.title}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {getCategoryName(record.type)}
                              </p>
                            </div>
                          </div>

                          {/* Record Value */}
                          <div className="text-center p-3 bg-space-800/50 rounded-lg border border-space-600">
                            <p className={`text-2xl font-orbitron font-bold ${getRecordColor(record.type)}`}>
                              {formatValue(record.type, record.value)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {record.description}
                            </p>
                          </div>

                          {/* Player Info */}
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Jugador:</span>
                              <span className="text-white font-rajdhani font-medium">
                                {record.playerName}
                              </span>
                            </div>
                            
                            {record.allianceName && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">Alianza:</span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-neon-blue font-rajdhani font-medium">
                                    {record.allianceName}
                                  </span>
                                  <span className="px-1 py-0.5 bg-neon-blue/20 text-neon-blue rounded text-xs font-rajdhani font-bold">
                                    [{record.allianceTag}]
                                  </span>
                                </div>
                              </div>
                            )}
                            
                            {mode === 'global' && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">Universo:</span>
                                <span className="text-neon-purple font-rajdhani font-medium">
                                  {universeRecords.find(u => u.universe === record.universe)?.universeName || record.universe}
                                </span>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Logrado:</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-gray-300">
                                  {formatTimeAgo(record.timestamp)} atrás
                                </span>
                                {record.isActive && (
                                  <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" title="Récord activo" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Special Effects for Top 3 */}
                        {isTopThree && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className={`absolute top-0 left-0 w-full h-0.5 ${
                              index === 0 ? 'bg-gradient-to-r from-neon-orange via-yellow-400 to-neon-orange' :
                              index === 1 ? 'bg-gradient-to-r from-gray-400 via-white to-gray-400' :
                              'bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600'
                            } animate-pulse`} />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Universe Statistics (only in universe mode) */}
            {mode === 'universe' && !loading && (
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

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-r from-neon-purple/10 via-neon-blue/10 to-neon-green/10 border border-neon-purple/30 rounded-lg">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-6 h-6 text-neon-orange animate-pulse" />
                  <h3 className="text-xl font-orbitron font-bold text-white">
                    ¡FORJA TU LEYENDA!
                  </h3>
                  <Star className="w-6 h-6 text-neon-orange animate-pulse" />
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Cada récord en este salón representa años de dedicación, estrategia brillante y momentos épicos. 
                  ¿Tienes lo necesario para unirte a estas leyendas galácticas?
                </p>
                <div className="flex items-center justify-center space-x-4">
                  {onJoinUniverse && (
                    <Button
                      variant="primary"
                      onClick={() => onJoinUniverse(selectedUniverse)}
                      className="px-8 py-3"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Unirse a {universeRecords.find(u => u.universe === selectedUniverse)?.universeName}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    className="px-8 py-3"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}