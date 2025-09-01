import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  X, 
  TrendingUp, 
  Users, 
  Globe, 
  Rocket, 
  Sword, 
  Trophy,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Star,
  Crown,
  Target,
  Info,
  Zap,
  RefreshCw,
  Eye
} from 'lucide-react';

interface GlobalStatsProps {
  onClose: () => void;
}

interface GlobalStatistics {
  totalPlayers: number;
  activeUniverses: number;
  totalBattles: number;
  totalFleets: number;
  totalPlanets: number;
  totalAlliances: number;
  topPlayers: Array<{
    username: string;
    points: number;
    universe: string;
    alliance?: string;
  }>;
  topAlliances: Array<{
    name: string;
    tag: string;
    members: number;
    points: number;
    universe: string;
  }>;
  universeStats: Array<{
    name: string;
    players: number;
    battles: number;
    activity: 'high' | 'medium' | 'low';
  }>;
  dailyStats: Array<{
    date: string;
    newPlayers: number;
    battles: number;
    trades: number;
  }>;
}

export default function GlobalStats({ onClose }: GlobalStatsProps) {
  const [stats, setStats] = useState<GlobalStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'players' | 'alliances' | 'universes'>('overview');

  useEffect(() => {
    loadGlobalStats();
  }, []);

  const loadGlobalStats = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock global statistics
      const mockStats: GlobalStatistics = {
        totalPlayers: 47892,
        activeUniverses: 6,
        totalBattles: 1234567,
        totalFleets: 892456,
        totalPlanets: 156789,
        totalAlliances: 2847,
        topPlayers: [
          { username: 'GalacticEmperor', points: 2456789, universe: 'Galaxia Prima', alliance: 'Dark Empire' },
          { username: 'StarConqueror', points: 2234567, universe: 'Galaxia Prima', alliance: 'Galactic Federation' },
          { username: 'VoidMaster', points: 1987654, universe: 'Abismo Hardcore', alliance: 'Void Lords' },
          { username: 'CrystalKing', points: 1876543, universe: 'Sector Pacífico', alliance: 'Crystal Miners' },
          { username: 'FleetCommander', points: 1654321, universe: 'Nebulosa Veloce' },
        ],
        topAlliances: [
          { name: 'Dark Empire', tag: 'DARK', members: 62, points: 15678901, universe: 'Galaxia Prima' },
          { name: 'Galactic Federation', tag: 'GFED', members: 58, points: 14567890, universe: 'Galaxia Prima' },
          { name: 'Void Lords', tag: 'VOID', members: 45, points: 12345678, universe: 'Abismo Hardcore' },
          { name: 'Star Traders', tag: 'STAR', members: 52, points: 11234567, universe: 'Sector Pacífico' },
          { name: 'Speed Demons', tag: 'FAST', members: 38, points: 9876543, universe: 'Nebulosa Veloce' },
        ],
        universeStats: [
          { name: 'Galaxia Prima', players: 3247, battles: 45678, activity: 'high' },
          { name: 'Nebulosa Veloce', players: 1834, battles: 67890, activity: 'high' },
          { name: 'Sector Pacífico', players: 2156, battles: 12345, activity: 'medium' },
          { name: 'Abismo Hardcore', players: 789, battles: 23456, activity: 'medium' },
          { name: 'Nueva Frontera', players: 234, battles: 567, activity: 'low' },
          { name: 'Legado Ancestral', players: 1456, battles: 34567, activity: 'medium' },
        ],
        dailyStats: [
          { date: '2025-01-15', newPlayers: 234, battles: 1567, trades: 892 },
          { date: '2025-01-14', newPlayers: 189, battles: 1423, trades: 756 },
          { date: '2025-01-13', newPlayers: 267, battles: 1689, trades: 934 },
          { date: '2025-01-12', newPlayers: 198, battles: 1345, trades: 678 },
          { date: '2025-01-11', newPlayers: 223, battles: 1456, trades: 823 },
          { date: '2025-01-10', newPlayers: 245, battles: 1578, trades: 901 },
          { date: '2025-01-09', newPlayers: 212, battles: 1389, trades: 745 },
        ],
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Error loading global stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getActivityColor = (activity: 'high' | 'medium' | 'low') => {
    switch (activity) {
      case 'high': return 'text-neon-green';
      case 'medium': return 'text-neon-orange';
      case 'low': return 'text-neon-red';
    }
  };

  const getActivityText = (activity: 'high' | 'medium' | 'low') => {
    switch (activity) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card-gradient border border-space-600 rounded-lg p-8">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-neon-blue animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-rajdhani">Cargando estadísticas globales...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Estadísticas Globales
              </h2>
              <p className="text-gray-400 mt-1">
                Datos en tiempo real de todos los universos
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="sm" onClick={loadGlobalStats}>
                <RefreshCw className="w-4 h-4 mr-2" />
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

        {/* Tabs */}
        <div className="border-b border-space-600">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'overview', name: 'Resumen', icon: BarChart3 },
              { id: 'players', name: 'Jugadores', icon: Users },
              { id: 'alliances', name: 'Alianzas', icon: Crown },
              { id: 'universes', name: 'Universos', icon: Globe },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-neon-blue text-white'
                    : 'text-gray-400 hover:text-white hover:bg-space-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Users className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {formatNumber(stats.totalPlayers)}
                  </p>
                  <p className="text-xs text-gray-400">Jugadores Totales</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Globe className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {stats.activeUniverses}
                  </p>
                  <p className="text-xs text-gray-400">Universos Activos</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Sword className="w-8 h-8 text-neon-red mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {formatNumber(stats.totalBattles)}
                  </p>
                  <p className="text-xs text-gray-400">Batallas Totales</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Rocket className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {formatNumber(stats.totalFleets)}
                  </p>
                  <p className="text-xs text-gray-400">Flotas Activas</p>
                </div>
              </div>

              {/* Daily Activity Chart */}
              <Card title="Actividad de los Últimos 7 Días">
                <div className="space-y-4">
                  {stats.dailyStats.map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {new Date(day.date).toLocaleDateString('es-ES', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-xs">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-neon-blue" />
                          <span className="text-gray-400">+{day.newPlayers}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Sword className="w-3 h-3 text-neon-red" />
                          <span className="text-gray-400">{formatNumber(day.battles)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="w-3 h-3 text-neon-green" />
                          <span className="text-gray-400">{formatNumber(day.trades)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Players Tab */}
          {selectedTab === 'players' && (
            <div className="space-y-6">
              <Card title="Top 5 Jugadores Globales" glowing>
                <div className="space-y-3">
                  {stats.topPlayers.map((player, index) => (
                    <div key={player.username} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-neon-orange/20 text-neon-orange' :
                          index === 1 ? 'bg-gray-400/20 text-gray-400' :
                          index === 2 ? 'bg-yellow-600/20 text-yellow-600' :
                          'bg-space-600 text-gray-400'
                        }`}>
                          {index < 3 ? (
                            <Crown className="w-4 h-4" />
                          ) : (
                            <span className="font-orbitron font-bold text-sm">#{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-rajdhani font-semibold text-white">
                            {player.username}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-gray-400">
                            <span>{player.universe}</span>
                            {player.alliance && (
                              <span className="text-neon-blue">[{player.alliance}]</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-orbitron font-bold text-white">
                          {formatNumber(player.points)}
                        </p>
                        <p className="text-xs text-gray-400">puntos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <TrendingUp className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {stats.dailyStats[0]?.newPlayers || 0}
                  </p>
                  <p className="text-xs text-gray-400">Nuevos Hoy</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Activity className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {Math.floor(stats.totalPlayers * 0.65)}
                  </p>
                  <p className="text-xs text-gray-400">Activos (24h)</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Star className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {Math.floor(stats.totalPlayers * 0.12)}
                  </p>
                  <p className="text-xs text-gray-400">Veteranos (1+ año)</p>
                </div>
              </div>
            </div>
          )}

          {/* Alliances Tab */}
          {selectedTab === 'alliances' && (
            <div className="space-y-6">
              <Card title="Top 5 Alianzas Globales" glowing>
                <div className="space-y-3">
                  {stats.topAlliances.map((alliance, index) => (
                    <div key={alliance.name} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-neon-orange/20 text-neon-orange' :
                          index === 1 ? 'bg-gray-400/20 text-gray-400' :
                          index === 2 ? 'bg-yellow-600/20 text-yellow-600' :
                          'bg-space-600 text-gray-400'
                        }`}>
                          {index < 3 ? (
                            <Crown className="w-4 h-4" />
                          ) : (
                            <span className="font-orbitron font-bold text-sm">#{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-rajdhani font-semibold text-white">
                              {alliance.name}
                            </p>
                            <span className="px-2 py-0.5 bg-neon-blue/20 text-neon-blue rounded text-xs font-rajdhani font-medium">
                              [{alliance.tag}]
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-400">
                            <span>{alliance.universe}</span>
                            <span>{alliance.members} miembros</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-orbitron font-bold text-white">
                          {formatNumber(alliance.points)}
                        </p>
                        <p className="text-xs text-gray-400">puntos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Users className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {stats.totalAlliances}
                  </p>
                  <p className="text-xs text-gray-400">Alianzas Totales</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Target className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {Math.floor(stats.totalAlliances * 0.73)}
                  </p>
                  <p className="text-xs text-gray-400">Alianzas Activas</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Trophy className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {Math.round(stats.totalPlayers / stats.totalAlliances)}
                  </p>
                  <p className="text-xs text-gray-400">Promedio Miembros</p>
                </div>
              </div>
            </div>
          )}

          {/* Universes Tab */}
          {selectedTab === 'universes' && (
            <div className="space-y-6">
              <Card title="Estadísticas por Universo" glowing>
                <div className="space-y-3">
                  {stats.universeStats.map((universe) => (
                    <div key={universe.name} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-rajdhani font-semibold text-white">
                          {universe.name}
                        </h4>
                        <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getActivityColor(universe.activity)} bg-current/10`}>
                          Actividad {getActivityText(universe.activity)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-neon-blue" />
                          </div>
                          <p className="text-lg font-orbitron font-bold text-white">
                            {formatNumber(universe.players)}
                          </p>
                          <p className="text-xs text-gray-400">Jugadores</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Sword className="w-4 h-4 text-neon-red" />
                          </div>
                          <p className="text-lg font-orbitron font-bold text-white">
                            {formatNumber(universe.battles)}
                          </p>
                          <p className="text-xs text-gray-400">Batallas</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Activity className="w-4 h-4 text-neon-green" />
                          </div>
                          <p className="text-lg font-orbitron font-bold text-white">
                            {Math.floor(universe.battles / universe.players * 100) / 100}
                          </p>
                          <p className="text-xs text-gray-400">Batallas/Jugador</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Globe className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {formatNumber(stats.totalPlanets)}
                  </p>
                  <p className="text-xs text-gray-400">Planetas Colonizados</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Zap className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <p className="text-xl font-orbitron font-bold text-white">
                    {Math.round(stats.totalPlanets / stats.totalPlayers * 10) / 10}
                  </p>
                  <p className="text-xs text-gray-400">Planetas por Jugador</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}