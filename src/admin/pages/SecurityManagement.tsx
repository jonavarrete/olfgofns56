import React, { useState, useEffect } from 'react';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import ViolationDetailModal from '../components/ViolationDetailModal';
import { 
  Shield, 
  AlertTriangle, 
  Ban, 
  UserX,
  Eye,
  Search,
  Filter,
  Clock,
  User,
  Globe,
  Activity,
  FileText,
  Gavel,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react';
import { Violation, IPBan, UserBan, SecurityLog } from '../../types/admin';

type SecurityTab = 'violations' | 'ip_bans' | 'user_bans' | 'logs';

export default function SecurityManagement() {
  const [activeTab, setActiveTab] = useState<SecurityTab>('violations');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [violations, setViolations] = useState<Violation[]>([]);

  const tabs = [
    { id: 'violations', name: 'Violaciones', icon: AlertTriangle, count: 23 },
    { id: 'ip_bans', name: 'Baneos IP', icon: Ban, count: 156 },
    { id: 'user_bans', name: 'Baneos Usuario', icon: UserX, count: 89 },
    { id: 'logs', name: 'Logs Seguridad', icon: FileText, count: 1247 },
  ];

  useEffect(() => {
    loadSecurityData();
  }, [activeTab]);

  const loadSecurityData = async () => {
    setLoading(true);
    
    // Load mock violations data
    const mockViolations: Violation[] = [
      {
        id: 'v1',
        type: 'cheating',
        description: 'Uso de bots para automatizar construcción detectado',
        severity: 'severe',
        reportedBy: 'AutoDetection',
        reportedAt: Date.now() - 86400000,
        status: 'pending'
      },
      {
        id: 'v2',
        type: 'harassment',
        description: 'Mensajes ofensivos reportados por múltiples usuarios',
        severity: 'moderate',
        reportedBy: 'player_123',
        reportedAt: Date.now() - 86400000 * 2,
        status: 'investigating'
      },
      {
        id: 'v3',
        type: 'multi_account',
        description: 'Múltiples cuentas desde la misma IP detectadas',
        severity: 'critical',
        reportedBy: 'AutoDetection',
        reportedAt: Date.now() - 86400000 * 3,
        status: 'resolved'
      }
    ];
    
    setViolations(mockViolations);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-neon-red bg-neon-red/10 border-neon-red/30';
      case 'severe': return 'text-neon-orange bg-neon-orange/10 border-neon-orange/30';
      case 'moderate': return 'text-neon-blue bg-neon-blue/10 border-neon-blue/30';
      case 'minor': return 'text-neon-green bg-neon-green/10 border-neon-green/30';
      default: return 'text-gray-400 bg-space-700/30 border-space-600';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'Ahora';
  };

  const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'text-neon-orange';
    case 'investigating': return 'text-neon-blue';
    case 'resolved': return 'text-neon-green';
    case 'dismissed': return 'text-gray-400';
    default: return 'text-gray-400';
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Gestión de Seguridad
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Monitoreo y control de seguridad del sistema
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Logs
          </Button>
          <Button variant="danger">
            <Plus className="w-4 h-4 mr-2" />
            Crear Penalización
          </Button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminCard
          title="Violaciones Activas"
          value="23"
          icon={AlertTriangle}
          color="neon-red"
          subtitle="Últimas 24h: +5"
        />
        
        <AdminCard
          title="IPs Bloqueadas"
          value="156"
          icon={Ban}
          color="neon-orange"
          subtitle="Activas: 89"
        />
        
        <AdminCard
          title="Usuarios Baneados"
          value="89"
          icon={UserX}
          color="neon-red"
          subtitle="Permanentes: 34"
        />
        
        <AdminCard
          title="Logs de Seguridad"
          value="1.2K"
          icon={FileText}
          color="neon-blue"
          subtitle="Últimas 24h"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-space-700/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as SecurityTab)}
            className={`flex items-center space-x-2 flex-1 py-3 px-4 rounded-md font-rajdhani font-medium transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-neon-red text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="px-2 py-0.5 bg-current/20 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AdminCard 
        title={tabs.find(t => t.id === activeTab)?.name || 'Seguridad'} 
        icon={tabs.find(t => t.id === activeTab)?.icon || Shield} 
        color="neon-red"
      >
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-4 p-4">
                  <div className="w-10 h-10 bg-space-600 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-space-600 rounded w-3/4"></div>
                    <div className="h-3 bg-space-600 rounded w-1/2"></div>
                  </div>
                  <div className="w-20 h-8 bg-space-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'violations' && (
  <div className="space-y-3">
    {violations.map((violation) => (
      <div key={violation.id} className="flex items-center space-x-4 p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors cursor-pointer"
           onClick={() => setSelectedViolation(violation)}>
        <div className={`p-2 rounded border ${getSeverityColor(violation.severity)}`}>
          <AlertTriangle className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-rajdhani font-semibold text-white">
                Violación: {violation.type}
              </h4>
              <p className="text-sm text-gray-400">
                {violation.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getSeverityColor(violation.severity)}`}>
                {violation.severity.toUpperCase()}
              </span>
              <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span>Reportado hace {formatTimeAgo(violation.reportedAt)}</span>
            <span>Por: {violation.reportedBy}</span>
            <span className={getStatusColor(violation.status)}>{violation.status.toUpperCase()}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

            {activeTab === 'ip_bans' && (
              <div className="space-y-3">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="p-2 rounded border bg-neon-red/20 border-neon-red/30">
                      <Ban className="w-4 h-4 text-neon-red" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-rajdhani font-semibold text-white">
                            192.168.1.{200 + i}
                          </h4>
                          <p className="text-sm text-gray-400">
                            Múltiples intentos de acceso no autorizado
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-neon-red/20 text-neon-red rounded text-xs font-rajdhani font-medium">
                            ACTIVO
                          </span>
                          <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Baneado hace {formatTimeAgo(Date.now() - Math.random() * 86400000 * 7)}</span>
                        <span>Por: AutoSystem</span>
                        <span>Expira: {i % 3 === 0 ? 'Permanente' : `en ${Math.floor(Math.random() * 24)}h`}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'user_bans' && (
              <div className="space-y-3">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="p-2 rounded border bg-neon-red/20 border-neon-red/30">
                      <UserX className="w-4 h-4 text-neon-red" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-rajdhani font-semibold text-white">
                            BannedUser{i + 1}
                          </h4>
                          <p className="text-sm text-gray-400">
                            Violación de términos de servicio - Uso de múltiples cuentas
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                            i % 2 === 0 ? 'bg-neon-red/20 text-neon-red' : 'bg-neon-orange/20 text-neon-orange'
                          }`}>
                            {i % 2 === 0 ? 'PERMANENTE' : 'TEMPORAL'}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Baneado hace {formatTimeAgo(Date.now() - Math.random() * 86400000 * 30)}</span>
                        <span>Por: ModeratorX</span>
                        {i % 2 !== 0 && <span>Expira en {Math.floor(Math.random() * 168)}h</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-3">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 bg-space-700/30 rounded border border-space-600">
                    <div className={`p-1.5 rounded border ${
                      ['bg-neon-red/20 border-neon-red/30 text-neon-red',
                       'bg-neon-orange/20 border-neon-orange/30 text-neon-orange',
                       'bg-neon-blue/20 border-neon-blue/30 text-neon-blue',
                       'bg-neon-green/20 border-neon-green/30 text-neon-green'][i % 4]
                    }`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-300">
                            {[
                              'Intento de login fallido desde IP sospechosa',
                              'Actividad de bot detectada en usuario SpaceBot',
                              'Acceso administrativo exitoso',
                              'Backup de seguridad completado',
                              'Violación reportada por usuario',
                              'Sistema de detección activado',
                              'Penalización aplicada a usuario',
                              'Configuración de seguridad actualizada'
                            ][i % 8]}
                          </p>
                          <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                            <span>{formatTimeAgo(Date.now() - Math.random() * 86400000)}</span>
                            <span>IP: 192.168.1.{100 + i}</span>
                            <span className={
                              ['text-neon-red', 'text-neon-orange', 'text-neon-blue', 'text-neon-green'][i % 4]
                            }>
                              {['ERROR', 'WARNING', 'INFO', 'SUCCESS'][i % 4]}
                            </span>
                          </div>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </AdminCard>

      {/* Violation Detail Modal */}
      {selectedViolation && (
        <ViolationDetailModal
          violation={selectedViolation}
          onClose={() => setSelectedViolation(null)}
          onUpdate={(updatedViolation) => {
            setViolations(prev => prev.map(v => v.id === updatedViolation.id ? updatedViolation : v));
            setSelectedViolation(null);
          }}
          onApplyPenalty={(penalty) => {
            console.log('Penalty applied:', penalty);
          }}
        />
      )}
    </div>
  );
}