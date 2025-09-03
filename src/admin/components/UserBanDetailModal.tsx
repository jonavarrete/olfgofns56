import React, { useState } from 'react';
import { UserBan, PlayerAccount } from '../../types/admin';
import Button from '../../components/UI/Button';
import { AdminLogger } from '../utils/adminLogger';
import { 
  X, 
  UserX, 
  User, 
  Clock, 
  Shield,
  Gavel,
  Eye,
  MessageSquare,
  Save,
  Calendar,
  Info,
  CheckCircle,
  XCircle,
  Globe,
  Mail,
  Activity,
  AlertTriangle,
  Edit,
  Trash2,
  Crown,
  Trophy,
  Rocket,
  Building,
  Target,
  Sword
} from 'lucide-react';

interface UserBanDetailModalProps {
  ban: UserBan;
  onClose: () => void;
  onUpdate: (ban: UserBan) => void;
  onDelete: (banId: string) => void;
}

export default function UserBanDetailModal({ ban, onClose, onUpdate, onDelete }: UserBanDetailModalProps) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    reason: ban.reason,
    type: ban.type,
    expiresAt: ban.expiresAt ? new Date(ban.expiresAt).toISOString().slice(0, 16) : '',
    active: ban.active
  });
  const [loading, setLoading] = useState(false);

  // Mock user data for the banned user
  const userData = {
    email: 'spacehacker@galaxy.com',
    level: 15,
    experience: 45000,
    rank: 156,
    points: 23456,
    alliance: 'Dark Hackers',
    universes: ['Galaxia Prima', 'Nebulosa Veloce'],
    planetsOwned: 3,
    fleetsDestroyed: 12,
    battlesWon: 8,
    battlesLost: 15,
    totalPlayTime: 156, // hours
    accountAge: 45, // days
    lastLogin: Date.now() - 86400000 * 3,
    ipHistory: [
      { ip: '192.168.1.200', location: 'Madrid, España', lastUsed: Date.now() - 86400000 },
      { ip: '10.0.0.1', location: 'Barcelona, España', lastUsed: Date.now() - 86400000 * 5 },
      { ip: '172.16.0.1', location: 'Valencia, España', lastUsed: Date.now() - 86400000 * 10 }
    ],
    violations: [
      { type: 'cheating', date: Date.now() - 86400000 * 3, severity: 'severe' },
      { type: 'multi_account', date: Date.now() - 86400000 * 15, severity: 'moderate' },
      { type: 'harassment', date: Date.now() - 86400000 * 30, severity: 'minor' }
    ],
    recentActivity: [
      'Construcción automatizada detectada (15 edificios en 2 minutos)',
      'Patrón de movimiento de flota no humano',
      'Actividad simultánea en múltiples cuentas',
      'Uso de scripts para automatizar comercio'
    ]
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedBan: UserBan = {
        ...ban,
        reason: formData.reason,
        type: formData.type,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt).getTime() : undefined,
        active: formData.active
      };
      
      AdminLogger.logUserAction('update_user_ban', ban.userId, 'current_admin', {
        oldReason: ban.reason,
        newReason: formData.reason,
        oldType: ban.type,
        newType: formData.type
      });
      
      onUpdate(updatedBan);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user ban:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este baneo de usuario?')) return;
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      AdminLogger.logUserAction('delete_user_ban', ban.userId, 'current_admin', {
        username: ban.username,
        reason: ban.reason
      });
      
      onDelete(ban.id);
      onClose();
    } catch (error) {
      console.error('Error deleting user ban:', error);
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'text-neon-red';
      case 'moderate': return 'text-neon-orange';
      case 'minor': return 'text-neon-green';
      default: return 'text-gray-400';
    }
  };

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
              <UserX className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Baneo de Usuario: {ban.username}
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                  ban.active && !isExpired 
                    ? 'bg-neon-red/20 text-neon-red border border-neon-red/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {ban.type === 'permanent' ? 'PERMANENTE' : 'TEMPORAL'}
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
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Usuario</span>
                    </div>
                    <p className="text-neon-blue font-rajdhani font-medium text-lg">
                      {ban.username}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ID: {ban.userId}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Tipo de Baneo</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm font-rajdhani font-medium ${
                      ban.type === 'permanent' 
                        ? 'bg-neon-red/20 text-neon-red border border-neon-red/30'
                        : 'bg-neon-orange/20 text-neon-orange border border-neon-orange/30'
                    }`}>
                      {ban.type === 'permanent' ? 'PERMANENTE' : 'TEMPORAL'}
                    </span>
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
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Baneado por</span>
                    </div>
                    <p className="text-neon-purple font-rajdhani font-medium">
                      {ban.bannedBy}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Profile Summary */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-4">
                  Perfil del Usuario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600 text-center">
                    <Crown className="w-6 h-6 text-neon-orange mx-auto mb-2" />
                    <p className="text-lg font-orbitron font-bold text-white">
                      {userData.level}
                    </p>
                    <p className="text-xs text-gray-400">Nivel</p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600 text-center">
                    <Trophy className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                    <p className="text-lg font-orbitron font-bold text-white">
                      #{userData.rank}
                    </p>
                    <p className="text-xs text-gray-400">Rango</p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600 text-center">
                    <Target className="w-6 h-6 text-neon-green mx-auto mb-2" />
                    <p className="text-lg font-orbitron font-bold text-white">
                      {userData.points.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Puntos</p>
                  </div>
                </div>
              </div>

              {/* Game Statistics */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-4">
                  Estadísticas de Juego
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-space-700/30 rounded border border-space-600 text-center">
                    <Globe className="w-5 h-5 text-neon-purple mx-auto mb-1" />
                    <p className="text-sm font-orbitron font-bold text-white">
                      {userData.planetsOwned}
                    </p>
                    <p className="text-xs text-gray-400">Planetas</p>
                  </div>
                  
                  <div className="p-3 bg-space-700/30 rounded border border-space-600 text-center">
                    <Sword className="w-5 h-5 text-neon-red mx-auto mb-1" />
                    <p className="text-sm font-orbitron font-bold text-white">
                      {userData.battlesWon}/{userData.battlesLost}
                    </p>
                    <p className="text-xs text-gray-400">V/D</p>
                  </div>
                  
                  <div className="p-3 bg-space-700/30 rounded border border-space-600 text-center">
                    <Rocket className="w-5 h-5 text-neon-blue mx-auto mb-1" />
                    <p className="text-sm font-orbitron font-bold text-white">
                      {userData.fleetsDestroyed}
                    </p>
                    <p className="text-xs text-gray-400">Flotas Destruidas</p>
                  </div>
                  
                  <div className="p-3 bg-space-700/30 rounded border border-space-600 text-center">
                    <Clock className="w-5 h-5 text-neon-green mx-auto mb-1" />
                    <p className="text-sm font-orbitron font-bold text-white">
                      {userData.totalPlayTime}h
                    </p>
                    <p className="text-xs text-gray-400">Tiempo Jugado</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Razón del Baneo
                </h3>
                {editing ? (
                  <div className="space-y-4">
                    <textarea
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      rows={4}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                          Tipo de Baneo
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                          className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        >
                          <option value="temporary">Temporal</option>
                          <option value="permanent">Permanente</option>
                        </select>
                      </div>
                      
                      {formData.type === 'temporary' && (
                        <div>
                          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                            Fecha de Expiración
                          </label>
                          <input
                            type="datetime-local"
                            value={formData.expiresAt}
                            onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <p className="text-gray-300 leading-relaxed">
                      {ban.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Violation History */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Historial de Violaciones
                </h3>
                <div className="space-y-2">
                  {userData.violations.map((violation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`w-4 h-4 ${getSeverityColor(violation.severity)}`} />
                        <div>
                          <p className="text-white font-rajdhani font-medium">
                            {violation.type === 'cheating' ? 'Trampa/Bots' :
                             violation.type === 'multi_account' ? 'Múltiples Cuentas' :
                             violation.type === 'harassment' ? 'Acoso' : violation.type}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(violation.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getSeverityColor(violation.severity)} bg-current/10`}>
                        {violation.severity.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Suspicious Activity */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Actividad Sospechosa Reciente
                </h3>
                <div className="space-y-2">
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-neon-red/10 border border-neon-red/30 rounded">
                      <AlertTriangle className="w-4 h-4 text-neon-red mt-0.5" />
                      <span className="text-sm text-gray-300">
                        {activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IP History */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Historial de IPs
                </h3>
                <div className="space-y-2">
                  {userData.ipHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-4 h-4 text-neon-green" />
                        <div>
                          <p className="text-white font-mono">
                            {entry.ip}
                          </p>
                          <p className="text-xs text-gray-400">
                            {entry.location}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(entry.lastUsed)}
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
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Tipo:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {ban.type === 'permanent' ? 'Permanente' : 'Temporal'}
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

              {/* User Info */}
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Información del Usuario
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white font-mono text-xs">
                      {userData.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Alianza:</span>
                    <span className="text-neon-blue font-rajdhani font-medium">
                      {userData.alliance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Universos:</span>
                    <span className="text-white">
                      {userData.universes.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Edad de cuenta:</span>
                    <span className="text-white">
                      {userData.accountAge} días
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Última conexión:</span>
                    <span className="text-gray-300">
                      {formatTimeAgo(userData.lastLogin)}
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
                    <Eye className="w-4 h-4" />
                    <span>Ver Perfil Completo</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <Activity className="w-4 h-4" />
                    <span>Ver Timeline Completo</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Contactar Usuario</span>
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

              {/* Impact Assessment */}
              <div className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
                <h4 className="font-rajdhani font-semibold text-neon-orange mb-3">
                  Evaluación de Impacto
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cuentas afectadas:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {userData.violations.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Puntos perdidos:</span>
                    <span className="text-neon-red font-rajdhani font-medium">
                      ~{userData.points.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jugadores protegidos:</span>
                    <span className="text-neon-green font-rajdhani font-medium">
                      ~{Math.floor(Math.random() * 500) + 100}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efectividad:</span>
                    <span className="text-neon-blue font-rajdhani font-medium">
                      95.7%
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