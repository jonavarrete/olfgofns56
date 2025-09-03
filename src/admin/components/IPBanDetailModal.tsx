import React, { useState } from 'react';
import { IPBan } from '../../types/admin';
import Button from '../../components/UI/Button';
import { AdminLogger } from '../utils/adminLogger';
import { 
  X, 
  Ban, 
  Globe, 
  Clock, 
  User,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Database,
  Wifi,
  Monitor
} from 'lucide-react';

interface IPBanDetailModalProps {
  ban: IPBan;
  onClose: () => void;
  onUpdate: (ban: IPBan) => void;
  onDelete: (banId: string) => void;
}

export default function IPBanDetailModal({ ban, onClose, onUpdate, onDelete }: IPBanDetailModalProps) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    reason: ban.reason,
    expiresAt: ban.expiresAt ? new Date(ban.expiresAt).toISOString().slice(0, 16) : '',
    active: ban.active
  });
  const [loading, setLoading] = useState(false);

  // Mock data for IP analysis
  const ipAnalysis = {
    location: 'Madrid, España',
    isp: 'Telefónica España',
    threatLevel: 'Alto',
    vpnDetected: true,
    proxyDetected: false,
    lastSeen: Date.now() - 3600000,
    attemptCount: 47,
    successfulLogins: 0,
    associatedAccounts: ['SpaceHacker', 'BotUser123', 'MultiAccount1'],
    suspiciousActivity: [
      'Múltiples intentos de login fallidos',
      'Patrón de actividad automatizada',
      'Creación de cuentas múltiples',
      'Uso de VPN para evadir restricciones'
    ],
    geoHistory: [
      { location: 'Madrid, España', timestamp: Date.now() - 3600000 },
      { location: 'Barcelona, España', timestamp: Date.now() - 86400000 },
      { location: 'Valencia, España', timestamp: Date.now() - 172800000 }
    ]
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedBan: IPBan = {
        ...ban,
        reason: formData.reason,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt).getTime() : undefined,
        active: formData.active
      };
      
      AdminLogger.logUserAction('update_ip_ban', ban.ipAddress, 'current_admin', {
        oldReason: ban.reason,
        newReason: formData.reason,
        oldExpiry: ban.expiresAt,
        newExpiry: formData.expiresAt ? new Date(formData.expiresAt).getTime() : undefined
      });
      
      onUpdate(updatedBan);
      setEditing(false);
    } catch (error) {
      console.error('Error updating IP ban:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este baneo de IP?')) return;
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      AdminLogger.logUserAction('delete_ip_ban', ban.ipAddress, 'current_admin', {
        reason: ban.reason,
        wasActive: ban.active
      });
      
      onDelete(ban.id);
      onClose();
    } catch (error) {
      console.error('Error deleting IP ban:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}`;
    return 'Menos de 1 hora';
  };

  const isExpired = ban.expiresAt && Date.now() > ban.expiresAt;
  const timeUntilExpiry = ban.expiresAt ? ban.expiresAt - Date.now() : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg border ${
              ban.active && !isExpired 
                ? 'bg-neon-red/20 border-neon-red/30 text-neon-red' 
                : 'bg-gray-500/20 border-gray-500/30 text-gray-400'
            }`}>
              <Ban className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Baneo de IP: {ban.ipAddress}
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                  ban.active && !isExpired 
                    ? 'bg-neon-red/20 text-neon-red border border-neon-red/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {ban.active && !isExpired ? 'ACTIVO' : isExpired ? 'EXPIRADO' : 'INACTIVO'}
                </span>
                <span className="text-gray-400 text-sm">
                  ID: {ban.id}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                title="Editar"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ban Details */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-4">
                  Detalles del Baneo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Dirección IP</span>
                    </div>
                    <p className="text-white font-mono text-lg">
                      {ban.ipAddress}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Baneado por</span>
                    </div>
                    <p className="text-neon-blue font-rajdhani font-medium">
                      {ban.bannedBy}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Fecha de Baneo</span>
                    </div>
                    <p className="text-white font-rajdhani font-medium">
                      {new Date(ban.bannedAt).toLocaleString('es-ES')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Hace {formatTimeAgo(ban.bannedAt)}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Expiración</span>
                    </div>
                    {ban.expiresAt ? (
                      <div>
                        <p className="text-white font-rajdhani font-medium">
                          {new Date(ban.expiresAt).toLocaleString('es-ES')}
                        </p>
                        {timeUntilExpiry && timeUntilExpiry > 0 && (
                          <p className="text-xs text-neon-orange mt-1">
                            Expira en {Math.floor(timeUntilExpiry / 86400000)} días
                          </p>
                        )}
                        {isExpired && (
                          <p className="text-xs text-neon-red mt-1">
                            EXPIRADO
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-neon-red font-rajdhani font-medium">
                        PERMANENTE
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Razón del Baneo
                </h3>
                {editing ? (
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    rows={4}
                  />
                ) : (
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <p className="text-gray-300 leading-relaxed">
                      {ban.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* IP Analysis */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-4">
                  Análisis de Dirección IP
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Ubicación Geográfica</span>
                    </div>
                    <p className="text-white font-rajdhani font-medium">
                      {ipAnalysis.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ISP: {ipAnalysis.isp}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Nivel de Amenaza</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm font-rajdhani font-medium ${
                      ipAnalysis.threatLevel === 'Alto' ? 'bg-neon-red/20 text-neon-red border border-neon-red/30' :
                      ipAnalysis.threatLevel === 'Medio' ? 'bg-neon-orange/20 text-neon-orange border border-neon-orange/30' :
                      'bg-neon-green/20 text-neon-green border border-neon-green/30'
                    }`}>
                      {ipAnalysis.threatLevel}
                    </span>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Wifi className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Detección VPN/Proxy</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {ipAnalysis.vpnDetected ? (
                          <XCircle className="w-3 h-3 text-neon-red" />
                        ) : (
                          <CheckCircle className="w-3 h-3 text-neon-green" />
                        )}
                        <span className="text-xs text-gray-300">
                          VPN: {ipAnalysis.vpnDetected ? 'Detectado' : 'No detectado'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {ipAnalysis.proxyDetected ? (
                          <XCircle className="w-3 h-3 text-neon-red" />
                        ) : (
                          <CheckCircle className="w-3 h-3 text-neon-green" />
                        )}
                        <span className="text-xs text-gray-300">
                          Proxy: {ipAnalysis.proxyDetected ? 'Detectado' : 'No detectado'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Estadísticas de Acceso</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Intentos totales:</span>
                        <span className="text-neon-red font-rajdhani font-medium">
                          {ipAnalysis.attemptCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Logins exitosos:</span>
                        <span className="text-neon-green font-rajdhani font-medium">
                          {ipAnalysis.successfulLogins}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Última actividad:</span>
                        <span className="text-gray-300">
                          {formatTimeAgo(ipAnalysis.lastSeen)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Associated Accounts */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Cuentas Asociadas
                </h3>
                <div className="space-y-2">
                  {ipAnalysis.associatedAccounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-neon-blue" />
                        <span className="text-white font-rajdhani font-medium">
                          {account}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-neon-red bg-neon-red/20 px-2 py-1 rounded">
                          SOSPECHOSO
                        </span>
                        <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suspicious Activity */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Actividad Sospechosa Detectada
                </h3>
                <div className="space-y-2">
                  {ipAnalysis.suspiciousActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-neon-red/10 border border-neon-red/30 rounded">
                      <AlertTriangle className="w-4 h-4 text-neon-red mt-0.5" />
                      <span className="text-sm text-gray-300">
                        {activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic History */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Historial Geográfico
                </h3>
                <div className="space-y-2">
                  {ipAnalysis.geoHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-neon-green" />
                        <span className="text-white">
                          {entry.location}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(entry.timestamp).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="space-y-6">
              {/* Status */}
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Estado del Baneo
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Estado:</span>
                    <span className={`font-rajdhani font-medium ${
                      ban.active && !isExpired ? 'text-neon-red' : 'text-gray-400'
                    }`}>
                      {ban.active && !isExpired ? 'ACTIVO' : isExpired ? 'EXPIRADO' : 'INACTIVO'}
                    </span>
                  </div>
                  
                  {timeUntilExpiry && timeUntilExpiry > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Tiempo restante:</span>
                      <span className="text-neon-orange font-rajdhani font-medium">
                        {Math.floor(timeUntilExpiry / 86400000)} días
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Duración total:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {ban.expiresAt 
                        ? `${Math.floor((ban.expiresAt - ban.bannedAt) / 86400000)} días`
                        : 'Permanente'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              {editing && (
                <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
                  <h4 className="font-rajdhani font-semibold text-white mb-4">
                    Editar Baneo
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                        Nueva Fecha de Expiración
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.expiresAt}
                        onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                        className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Dejar vacío para baneo permanente
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                        Razón Actualizada
                      </label>
                      <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="active"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="rounded border-space-600 bg-space-700 text-neon-blue focus:ring-neon-blue"
                      />
                      <label htmlFor="active" className="text-sm font-rajdhani font-medium text-gray-300">
                        Baneo Activo
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button 
                        variant="secondary" 
                        onClick={() => setEditing(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleSave}
                        loading={loading}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Acciones Rápidas
                </h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <Database className="w-4 h-4" />
                    <span>Ver Logs Completos</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <Monitor className="w-4 h-4" />
                    <span>Monitorear IP</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span>Actualizar Análisis</span>
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-neon-red hover:bg-neon-red/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar Baneo</span>
                  </button>
                </div>
              </div>

              {/* System Impact */}
              <div className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
                <h4 className="font-rajdhani font-semibold text-neon-orange mb-3">
                  Impacto en el Sistema
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Intentos bloqueados:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {Math.floor(Math.random() * 200) + 50}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recursos ahorrados:</span>
                    <span className="text-neon-green font-rajdhani font-medium">
                      ~{Math.floor(Math.random() * 500) + 100} MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cuentas protegidas:</span>
                    <span className="text-neon-blue font-rajdhani font-medium">
                      {Math.floor(Math.random() * 1000) + 500}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}