import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard from './AdminCard';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Globe,
  Sword,
  MessageSquare,
  Shield,
  Calendar,
  Clock
} from 'lucide-react';

export default function AdminStats() {
  const { state } = useAdmin();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  // Mock data for different time ranges
  const getStatsForRange = (range: '24h' | '7d' | '30d') => {
    const multipliers = { '24h': 1, '7d': 7, '30d': 30 };
    const mult = multipliers[range];
    
    return {
      newUsers: Math.floor(234 * mult),
      battles: Math.floor(1567 * mult),
      messages: Math.floor(8934 * mult),
      violations: Math.floor(12 * mult),
    };
  };

  const rangeStats = getStatsForRange(timeRange);

  return (
    <AdminCard title="Estadísticas del Sistema" icon={BarChart3} color="neon-blue">
      <div className="space-y-4">
        {/* Time Range Selector */}
        <div className="flex space-x-1 bg-space-700/50 rounded-lg p-1">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`flex-1 py-2 px-3 rounded-md font-rajdhani font-medium transition-all duration-200 text-sm ${
                timeRange === range 
                  ? 'bg-neon-blue text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {range === '24h' ? 'Últimas 24h' : range === '7d' ? 'Última semana' : 'Último mes'}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-space-700/30 rounded-lg border border-space-600">
            <Users className="w-5 h-5 text-neon-green mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              {formatNumber(rangeStats.newUsers)}
            </p>
            <p className="text-xs text-gray-400">Nuevos Usuarios</p>
          </div>
          
          <div className="text-center p-3 bg-space-700/30 rounded-lg border border-space-600">
            <Sword className="w-5 h-5 text-neon-red mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              {formatNumber(rangeStats.battles)}
            </p>
            <p className="text-xs text-gray-400">Batallas</p>
          </div>
          
          <div className="text-center p-3 bg-space-700/30 rounded-lg border border-space-600">
            <MessageSquare className="w-5 h-5 text-neon-blue mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              {formatNumber(rangeStats.messages)}
            </p>
            <p className="text-xs text-gray-400">Mensajes</p>
          </div>
          
          <div className="text-center p-3 bg-space-700/30 rounded-lg border border-space-600">
            <Shield className="w-5 h-5 text-neon-orange mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              {rangeStats.violations}
            </p>
            <p className="text-xs text-gray-400">Violaciones</p>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Carga del Sistema</span>
            <span className={`font-rajdhani font-medium ${
              state.stats.systemLoad > 80 ? 'text-neon-red' : 
              state.stats.systemLoad > 60 ? 'text-neon-orange' : 'text-neon-green'
            }`}>
              {state.stats.systemLoad}%
            </span>
          </div>
          <div className="w-full bg-space-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                state.stats.systemLoad > 80 ? 'bg-neon-red' : 
                state.stats.systemLoad > 60 ? 'bg-neon-orange' : 'bg-neon-green'
              }`}
              style={{ width: `${state.stats.systemLoad}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Base de Datos</span>
          <span className="text-neon-blue font-rajdhani font-medium">
            {state.stats.databaseSize} GB
          </span>
        </div>
      </div>
    </AdminCard>
  );
}