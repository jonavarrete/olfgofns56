import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  Menu, 
  Shield, 
  Bell, 
  Settings,
  User,
  Globe,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { state } = useAdmin();
  const { currentAdmin, stats } = state;

  const getSystemStatus = () => {
    if (stats.systemLoad > 90 || stats.securityIncidents > 10) {
      return { status: 'critical', color: 'text-neon-red', icon: AlertTriangle };
    }
    if (stats.systemLoad > 70 || stats.securityIncidents > 5) {
      return { status: 'warning', color: 'text-neon-orange', icon: AlertTriangle };
    }
    return { status: 'healthy', color: 'text-neon-green', icon: CheckCircle };
  };

  const systemStatus = getSystemStatus();

  return (
    <header className="relative bg-card-gradient border-b border-space-600 px-4 lg:px-6 py-4 z-20">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* System Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 px-3 py-2 bg-space-700/50 rounded-lg">
            <systemStatus.icon className={`w-4 h-4 ${systemStatus.color}`} />
            <div className="hidden sm:block">
              <p className="text-xs text-gray-400">Estado del Sistema</p>
              <p className={`text-sm font-rajdhani font-medium ${systemStatus.color}`}>
                {systemStatus.status === 'critical' ? 'CRÍTICO' :
                 systemStatus.status === 'warning' ? 'ADVERTENCIA' : 'SALUDABLE'}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-neon-blue" />
              <span className="text-gray-400">Carga:</span>
              <span className={`font-rajdhani font-medium ${
                stats.systemLoad > 80 ? 'text-neon-red' : 
                stats.systemLoad > 60 ? 'text-neon-orange' : 'text-neon-green'
              }`}>
                {stats.systemLoad.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-neon-orange" />
              <span className="text-gray-400">Incidentes:</span>
              <span className={`font-rajdhani font-medium ${
                stats.securityIncidents > 10 ? 'text-neon-red' : 'text-neon-green'
              }`}>
                {stats.securityIncidents}
              </span>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-red rounded-full flex items-center justify-center text-xs font-rajdhani font-bold text-white">
              3
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-space-700/50 rounded-lg">
            <div className="w-8 h-8 bg-neon-red/20 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-neon-red" />
            </div>
            <div>
              <p className="text-sm font-rajdhani font-medium text-white">
                {currentAdmin?.username}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {currentAdmin?.role.replace('_', ' ')}
              </p>
            </div>
          </div>
          
          {/* Mobile Admin Avatar */}
          <div className="md:hidden w-8 h-8 bg-neon-red/20 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-neon-red" />
          </div>
        </div>
      </div>
    </header>
  );
}