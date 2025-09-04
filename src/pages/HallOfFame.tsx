import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
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
  isActive: boolean;
}

type RecordCategory = 'all' | 'players' | 'alliances' | 'battles' | 'achievements';

export default function HallOfFame() {
  const navigate = useNavigate();
  const { state } = useGame();
  const currentUniverse = localStorage.getItem('selected_universe') || 'universe_1';
  
  const [selectedCategory, setSelectedCategory] = useState<RecordCategory>('all');
  const [records, setRecords] = useState<HallOfFameRecord[]>([]);
  const [universeStats, setUniverseStats] = useState({
    totalPlayers: 0,
    totalBattles: 0,
    averagePoints: 0,
    universeName: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUniverseHallOfFame();
  }, [selectedCategory, currentUniverse]);

  const loadUniverseHallOfFame = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for current universe only
      const mockRecords: HallOfFameRecord[] = [
        {
          id: '1',
          type: 'player_points',
          title: 'Emperador del Universo',
          playerName: 'GalacticEmperor',
          allianceName: 'Dark Empire',
          allianceTag: 'DARK',
          value: 15678901,
          universe: currentUniverse,
          timestamp: Date.now() - 86400000 * 30,
          description: 'El jugador con más puntos en este universo',
          isActive: true
        },
        {
          id: '2',
          type: 'battle_destruction',
          title: 'Destructor Supremo',
          playerName: 'VoidDestroyer',
          allianceName: 'Void Lords',
          allianceTag: 'VOID',
          value: 2345678,
          universe: currentUniverse,
          coordinates: '1:2:3',
          timestamp: Date.now() - 86400000 * 7,
          description: 'La batalla más destructiva en este universo',
          isActive: true
        },
        {
          id: '3',
          type: 'alliance_points',
          title: 'Alianza Dominante',
          playerName: 'AllianceLeader',
          allianceName: 'Galactic Federation',
          allianceTag: 'GFED',
          value: 45678901,
          universe: currentUniverse,
          timestamp: Date.now() - 86400000 * 60,
          description: 'La alianza más poderosa de este universo',
          isActive: true
        },
        {
          id: '4',
          type: 'fleet_size',
          title: 'Comandante de Flotas',
          playerName: 'FleetMaster',
          allianceName: 'Star Commanders',
          allianceTag: 'STAR',
          value: 50000,
          universe: currentUniverse,
          timestamp: Date.now() - 86400000 * 15,
          description: 'La flota más grande en este universo',
          isActive: true
        },
        {
          id: '5',
          type: 'research_level',
          title: 'Maestro de la Ciencia',
          playerName: 'TechMaster',
          value: 20,
          universe: currentUniverse,
          timestamp: Date.now() - 86400000 * 45,
          description: 'Nivel más alto de investigación en este universo',
          isActive: false
        },
        {
          id: '6',
          type: 'planet_count',
          title: 'Señor de Mundos',
          playerName: 'PlanetHunter',
          allianceName: 'Explorers United',
          allianceTag: 'EXPL',
          value: 25,
          universe: currentUniverse,
          timestamp: Date.now() - 86400000 * 90,
          description: 'El imperio más extenso en este universo',
          isActive: true
        }
      ];

      // Get universe name
      const universeNames: { [key: string]: string } = {
        'universe_1': 'Galaxia Prima',
        'universe_2': 'Nebulosa Veloce',
        'universe_3': 'Sector Pacífico',
        'universe_4': 'Abismo Hardcore',
        'universe_5': 'Nueva Frontera',
        'universe_6': 'Legado Ancestral'
      };

      setRecords(mockRecords);
      setUniverseStats({
        totalPlayers: 3247,
        totalBattles: 45678,
        averagePoints: 125000,
        universeName: universeNames[currentUniverse] || 'Universo Desconocido'
      });
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Imperio
          </Button>
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white flex items-center">
              <Trophy className="w-8 h-8 text-neon-orange mr-3 animate-glow" />
              Salón de la Fama - {universeStats.universeName}
            </h1>
            <p className="text-gray-400 font-rajdhani">
              Los logros más épicos de este universo
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadUniverseHallOfFame}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <Card>
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

      {/* Universe Statistics */}
      <Card title="Estadísticas del Universo" glowing>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
            <Users className="w-8 h-8 text-neon-blue mx-auto mb-2" />
            <p className="text-2xl font-orbitron font-bold text-white">
              {universeStats.totalPlayers.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Jugadores Totales</p>
          </div>
          
          <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
            <Sword className="w-8 h-8 text-neon-red mx-auto mb-2" />
            <p className="text-2xl font-orbitron font-bold text-white">
              {universeStats.totalBattles.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Batallas Totales</p>
          </div>
          
          <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
            <BarChart3 className="w-8 h-8 text-neon-green mx-auto mb-2" />
            <p className="text-2xl font-orbitron font-bold text-white">
              {universeStats.averagePoints.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Puntos Promedio</p>
          </div>
        </div>
      </Card>

      {/* Records Display */}
      {loading ? (
        <Card>
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-neon-blue animate-spin mr-3" />
            <span className="text-gray-400">Cargando récords del universo...</span>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecords
            .sort((a, b) => b.value - a.value)
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

      {/* Promotional Banner */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-neon-blue/10 to-neon-green/10"></div>
        <div className="relative text-center py-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-6 h-6 text-neon-orange animate-pulse" />
            <h3 className="text-2xl font-orbitron font-bold text-white">
              ¡FORJA TU LEYENDA EN {universeStats.universeName.toUpperCase()}!
            </h3>
            <Star className="w-6 h-6 text-neon-orange animate-pulse" />
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Cada récord en este salón representa dedicación, estrategia brillante y momentos épicos en este universo. 
            ¿Tienes lo necesario para superar a estas leyendas?
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              className="px-8 py-3"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Continuar Jugando
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}