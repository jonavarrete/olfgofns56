import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard from '../components/AdminCard';
import AdminStats from '../components/AdminStats';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import SystemHealth from '../components/SystemHealth';
import { 
  Users, 
  Globe, 
  Shield, 
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Database,
  Server,
  Zap,
  Clock,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const { state, refreshStats } = useAdmin();
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(() => {
    refreshStats();
    const interval = setInterval(() => {
      refreshStats();
      setLastRefresh(Date.now());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [refreshStats]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getSystemHealthStatus = () => {
    const { systemLoad, securityIncidents } = state.stats;
    
    if (systemLoad > 90 || securityIncidents > 10) {
      return { status: 'critical', color: 'text-neon-red', icon: AlertTriangle };
    }
    if (systemLoad > 70 || securityIncidents > 5) {
      return { status: 'warning', color: 'text-neon-orange', icon: AlertTriangle };
    }
    return { status: 'healthy', color: 'text-neon-green', icon: CheckCircle };
  };

  const healthStatus = getSystemHealthStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Panel de Administración
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Bienvenido, {state.currentAdmin?.username}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">
              Actualizado: {new Date(lastRefresh).toLocaleTimeString()}
            </span>
          </div>
          <button
            onClick={refreshStats}
            disabled={state.loading}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${state.loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* System Health Alert */}
      <div className={`p-4 rounded-lg border ${
        healthStatus.status === 'critical' ? 'bg-neon-red/10 border-neon-red/30' :
        healthStatus.status === 'warning' ? 'bg-neon-orange/10 border-neon-orange/30' :
        'bg-neon-green/10 border-neon-green/30'
      }`}>
        <div className="flex items-center space-x-3">
          <healthStatus.icon className={`w-5 h-5 ${healthStatus.color}`} />
          <div>
            <p className={`font-rajdhani font-semibold ${healthStatus.color}`}>
              Estado del Sistema: {
                healthStatus.status === 'critical' ? 'CRÍTICO' :
                healthStatus.status === 'warning' ? 'ADVERTENCIA' :
                'SALUDABLE'
              }
            </p>
            <p className="text-sm text-gray-400">
              Carga: {state.stats.systemLoad}% • Incidentes: {state.stats.securityIncidents} • 
              Último backup: {new Date(state.stats.lastBackup).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard
          title="Usuarios Totales"
          value={formatNumber(state.stats.totalUsers)}
          icon={Users}
          color="neon-blue"
          subtitle={`${formatNumber(state.stats.activeUsers)} activos`}
        />
        
        <AdminCard
          title="Universos"
          value={state.stats.totalUniverses.toString()}
          icon={Globe}
          color="neon-purple"
          subtitle="6 activos"
        />
        
        <AdminCard
          title="Batallas Totales"
          value={formatNumber(state.stats.totalBattles)}
          icon={Activity}
          color="neon-red"
          subtitle="Últimas 24h: 1.2K"
        />
        
        <AdminCard
          title="Incidentes"
          value={state.stats.securityIncidents.toString()}
          icon={Shield}
          color={state.stats.securityIncidents > 10 ? "neon-red" : "neon-green"}
          subtitle="Últimas 24h"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <AdminStats />
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}