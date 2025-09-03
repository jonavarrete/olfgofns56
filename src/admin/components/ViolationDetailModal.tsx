import React, { useState } from 'react';
import { Violation, Penalty } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  X, 
  AlertTriangle, 
  User, 
  Clock, 
  Shield,
  Gavel,
  Eye,
  MessageSquare,
  Save,
  Ban,
  UserX,
  Calendar,
  Info,
  CheckCircle,
  XCircle,
  Globe,
  Mail,
  Activity
} from 'lucide-react';

interface ViolationDetailModalProps {
  violation: Violation;
  onClose: () => void;
  onUpdate: (violation: Violation) => void;
  onApplyPenalty: (penalty: Penalty) => void;
}

export default function ViolationDetailModal({ 
  violation, 
  onClose, 
  onUpdate, 
  onApplyPenalty 
}: ViolationDetailModalProps) {
  const [showPenaltyForm, setShowPenaltyForm] = useState(false);
  const [penaltyData, setPenaltyData] = useState({
    type: 'warning' as Penalty['type'],
    duration: 24,
    reason: '',
  });
  const [notes, setNotes] = useState('');

  const getSeverityColor = (severity: Violation['severity']) => {
    switch (severity) {
      case 'critical': return 'text-neon-red bg-neon-red/10 border-neon-red/30';
      case 'severe': return 'text-neon-orange bg-neon-orange/10 border-neon-orange/30';
      case 'moderate': return 'text-neon-blue bg-neon-blue/10 border-neon-blue/30';
      case 'minor': return 'text-neon-green bg-neon-green/10 border-neon-green/30';
    }
  };

  const getStatusColor = (status: Violation['status']) => {
    switch (status) {
      case 'pending': return 'text-neon-orange';
      case 'investigating': return 'text-neon-blue';
      case 'resolved': return 'text-neon-green';
      case 'dismissed': return 'text-gray-400';
    }
  };

  const getTypeText = (type: Violation['type']) => {
    switch (type) {
      case 'cheating': return 'Trampa/Bots';
      case 'harassment': return 'Acoso';
      case 'spam': return 'Spam';
      case 'inappropriate_name': return 'Nombre Inapropiado';
      case 'multi_account': return 'Múltiples Cuentas';
      case 'other': return 'Otro';
    }
  };

  const handleStatusUpdate = (newStatus: Violation['status']) => {
    onUpdate({ ...violation, status: newStatus });
  };

  const handleApplyPenalty = () => {
    const penalty: Penalty = {
      id: Date.now().toString(),
      type: penaltyData.type,
      duration: penaltyData.type === 'permanent_ban' ? undefined : penaltyData.duration,
      reason: penaltyData.reason,
      appliedBy: 'current_admin_id',
      appliedAt: Date.now(),
      active: true,
    };

    onApplyPenalty(penalty);
    onUpdate({ ...violation, status: 'resolved', penalty });
    setShowPenaltyForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg border ${getSeverityColor(violation.severity)}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Detalle de Violación
              </h2>
              <p className="text-gray-400 mt-1">
                ID: {violation.id} • {getTypeText(violation.type)}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Violation Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-4">
                  Información de la Violación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Tipo de Violación</span>
                    </div>
                    <p className="text-white font-rajdhani font-medium">
                      {getTypeText(violation.type)}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Severidad</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm font-rajdhani font-medium ${getSeverityColor(violation.severity)}`}>
                      {violation.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Estado</span>
                    </div>
                    <span className={`font-rajdhani font-medium ${getStatusColor(violation.status)}`}>
                      {violation.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Reportado por</span>
                    </div>
                    <p className="text-white font-rajdhani font-medium">
                      {violation.reportedBy}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Fecha del Reporte</span>
                    </div>
                    <p className="text-white font-rajdhani font-medium">
                      {new Date(violation.reportedAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Tiempo Transcurrido</span>
                    </div>
                    <p className="text-white font-rajdhani font-medium">
                      {Math.floor((Date.now() - violation.reportedAt) / 86400000)} días
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Descripción Detallada
                </h3>
                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <p className="text-gray-300 leading-relaxed">
                    {violation.description}
                  </p>
                </div>
              </div>

              {/* Evidence Section */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Evidencia y Detalles Técnicos
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">
                      Información del Usuario
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">IP Address:</span>
                        <p className="text-white font-mono">192.168.1.100</p>
                      </div>
                      <div>
                        <span className="text-gray-400">User Agent:</span>
                        <p className="text-white font-mono text-xs">Chrome/120.0.0.0</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Última Actividad:</span>
                        <p className="text-white">Hace 2 horas</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Nivel de Cuenta:</span>
                        <p className="text-white">Nivel 15</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">
                      Patrones Detectados
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Construcción automatizada detectada (15 edificios en 2 minutos)</li>
                      <li>• Patrón de clics no humano identificado</li>
                      <li>• Actividad fuera de horarios normales (3:00 AM - 6:00 AM)</li>
                      <li>• Velocidad de respuesta consistente (±5ms)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Investigation Notes */}
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-3">
                  Notas de Investigación
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  rows={4}
                  placeholder="Agregar notas sobre la investigación..."
                />
              </div>
            </div>

            {/* Actions Panel */}
            <div className="space-y-6">
              <div>
                <h3 className="font-rajdhani font-semibold text-white mb-4">
                  Acciones Rápidas
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    onClick={() => handleStatusUpdate('investigating')}
                    className="w-full justify-start"
                    disabled={violation.status === 'investigating'}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Marcar como Investigando
                  </Button>
                  
                  <Button
                    variant="success"
                    onClick={() => handleStatusUpdate('resolved')}
                    className="w-full justify-start"
                    disabled={violation.status === 'resolved'}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Resuelto
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={() => handleStatusUpdate('dismissed')}
                    className="w-full justify-start"
                    disabled={violation.status === 'dismissed'}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Desestimar
                  </Button>
                  
                  <Button
                    variant="danger"
                    onClick={() => setShowPenaltyForm(true)}
                    className="w-full justify-start"
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Aplicar Penalización
                  </Button>
                </div>
              </div>

              {/* Current Penalty */}
              {violation.penalty && (
                <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg">
                  <h4 className="font-rajdhani font-semibold text-neon-red mb-3">
                    Penalización Aplicada
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tipo:</span>
                      <span className="text-white">{violation.penalty.type}</span>
                    </div>
                    {violation.penalty.duration && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duración:</span>
                        <span className="text-white">{violation.penalty.duration}h</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Aplicada:</span>
                      <span className="text-white">
                        {new Date(violation.penalty.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Por:</span>
                      <span className="text-white">{violation.penalty.appliedBy}</span>
                    </div>
                    <div className="mt-3 p-2 bg-space-800/50 rounded">
                      <span className="text-gray-400 text-xs">Razón:</span>
                      <p className="text-gray-300 text-sm mt-1">{violation.penalty.reason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Penalty Form */}
              {showPenaltyForm && (
                <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg">
                  <h4 className="font-rajdhani font-semibold text-white mb-4">
                    Aplicar Penalización
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                        Tipo de Penalización
                      </label>
                      <select
                        value={penaltyData.type}
                        onChange={(e) => setPenaltyData({ ...penaltyData, type: e.target.value as any })}
                        className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      >
                        <option value="warning">Advertencia</option>
                        <option value="temporary_ban">Baneo Temporal</option>
                        <option value="permanent_ban">Baneo Permanente</option>
                        <option value="resource_reduction">Reducción de Recursos</option>
                        <option value="rank_reduction">Reducción de Rango</option>
                      </select>
                    </div>

                    {penaltyData.type === 'temporary_ban' && (
                      <div>
                        <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                          Duración (horas)
                        </label>
                        <input
                          type="number"
                          value={penaltyData.duration}
                          onChange={(e) => setPenaltyData({ ...penaltyData, duration: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          min="1"
                          max="8760"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                        Razón de la Penalización
                      </label>
                      <textarea
                        value={penaltyData.reason}
                        onChange={(e) => setPenaltyData({ ...penaltyData, reason: e.target.value })}
                        className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        rows={3}
                        placeholder="Explica la razón de la penalización..."
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button 
                        variant="secondary" 
                        onClick={() => setShowPenaltyForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={handleApplyPenalty}
                        disabled={!penaltyData.reason}
                      >
                        <Gavel className="w-4 h-4 mr-2" />
                        Aplicar Penalización
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Information */}
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Información Relacionada
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-neon-blue" />
                    <span className="text-gray-400">Usuario:</span>
                    <span className="text-neon-blue font-rajdhani font-medium">SpaceHacker</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-neon-purple" />
                    <span className="text-gray-400">Universo:</span>
                    <span className="text-white">Galaxia Prima</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-neon-green" />
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">cheater@galaxy.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-neon-orange" />
                    <span className="text-gray-400">Violaciones previas:</span>
                    <span className="text-neon-red font-rajdhani font-medium">2</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Acciones Adicionales
                </h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <User className="w-4 h-4" />
                    <span>Ver Perfil Completo</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <Activity className="w-4 h-4" />
                    <span>Ver Timeline de Usuario</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar Mensaje</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors">
                    <Ban className="w-4 h-4" />
                    <span>Banear IP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}