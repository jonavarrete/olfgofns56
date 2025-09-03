import React from 'react';
import Button from '../../components/UI/Button';
import { 
  X, 
  Mail, 
  Users, 
  Eye,
  MousePointer,
  Calendar,
  Globe,
  BarChart3,
  TrendingUp,
  Activity,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
  Download,
  Edit,
  FileText
} from 'lucide-react';

interface EmailViewerProps {
  email: any;
  onClose: () => void;
  onEdit?: () => void;
}

export default function EmailViewer({ email, onClose, onEdit }: EmailViewerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-neon-green';
      case 'active': return 'text-neon-blue';
      case 'scheduled': return 'text-neon-orange';
      case 'draft': return 'text-gray-400';
      case 'paused': return 'text-neon-red';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'ENVIADO';
      case 'active': return 'ACTIVO';
      case 'scheduled': return 'PROGRAMADO';
      case 'draft': return 'BORRADOR';
      case 'paused': return 'PAUSADO';
      default: return 'DESCONOCIDO';
    }
  };

  const getAudienceText = (audience: string) => {
    switch (audience) {
      case 'all': return 'Todos los usuarios';
      case 'universe': return 'Universo específico';
      case 'alliance': return 'Miembros de alianza';
      case 'inactive': return 'Usuarios inactivos';
      case 'new_users': return 'Usuarios nuevos';
      default: return audience;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-ES');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-neon-green/20 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                {email.name}
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getStatusColor(email.status)} bg-current/10`}>
                  {getStatusText(email.status)}
                </span>
                <span className="text-gray-400 text-sm">
                  Creado: {formatDate(email.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {onEdit && (
              <Button variant="secondary" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
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
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
              <Users className="w-8 h-8 text-neon-blue mx-auto mb-2" />
              <p className="text-2xl font-orbitron font-bold text-white">
                {formatNumber(email.sentCount || 0)}
              </p>
              <p className="text-xs text-gray-400">Emails Enviados</p>
            </div>
            
            <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
              <Eye className="w-8 h-8 text-neon-green mx-auto mb-2" />
              <p className="text-2xl font-orbitron font-bold text-white">
                {email.openRate?.toFixed(1) || '0.0'}%
              </p>
              <p className="text-xs text-gray-400">Tasa de Apertura</p>
            </div>
            
            <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
              <MousePointer className="w-8 h-8 text-neon-purple mx-auto mb-2" />
              <p className="text-2xl font-orbitron font-bold text-white">
                {email.clickRate?.toFixed(1) || '0.0'}%
              </p>
              <p className="text-xs text-gray-400">Tasa de Clics</p>
            </div>
            
            <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
              <Target className="w-8 h-8 text-neon-orange mx-auto mb-2" />
              <p className="text-2xl font-orbitron font-bold text-white">
                {getAudienceText(email.targetAudience)}
              </p>
              <p className="text-xs text-gray-400">Audiencia</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Content */}
            <div>
              <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                Contenido del Email
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Asunto</span>
                  </div>
                  <p className="text-white font-rajdhani font-medium text-lg">
                    {email.subject}
                  </p>
                </div>

                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Contenido</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-black max-h-80 overflow-y-auto">
                    <div className="border-b border-gray-200 pb-3 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>De: Galactic Empire &lt;noreply@galaxy.com&gt;</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mt-2">
                        {email.subject}
                      </h2>
                    </div>
                    
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {email.content.replace(/\{\{(\w+)\}\}/g, (match: string, variable: string) => {
                          const replacements: { [key: string]: string } = {
                            username: 'ComandanteEjemplo',
                            email: 'usuario@ejemplo.com',
                            universe: 'Galaxia Prima',
                            rank: '42',
                            points: '89,567',
                            game_url: 'https://galaxy.com/play'
                          };
                          return replacements[variable] || match;
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                      <p>© 2025 Galactic Empire. Todos los derechos reservados.</p>
                      <p className="mt-1">
                        Si no deseas recibir estos emails, puedes darte de baja 
                        <a href="#" className="text-blue-600 hover:underline ml-1">aquí</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Detalles de la Campaña
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Estado:</span>
                      <span className={`font-rajdhani font-medium ${getStatusColor(email.status)}`}>
                        {getStatusText(email.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Audiencia:</span>
                      <span className="text-white font-rajdhani font-medium">
                        {getAudienceText(email.targetAudience)}
                      </span>
                    </div>
                  </div>
                  
                  {email.lastSent && (
                    <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Último envío:</span>
                        <span className="text-white font-rajdhani font-medium">
                          {formatDate(email.lastSent)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {email.scheduledFor && (
                    <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Programado para:</span>
                        <span className="text-neon-blue font-rajdhani font-medium">
                          {formatDate(email.scheduledFor)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              {email.sentCount > 0 && (
                <div>
                  <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                    Métricas de Rendimiento
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Tasa de Apertura</span>
                        <span className="text-neon-green font-rajdhani font-bold">
                          {email.openRate?.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-space-600 rounded-full h-2">
                        <div 
                          className="h-2 bg-neon-green rounded-full transition-all duration-300"
                          style={{ width: `${email.openRate || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {Math.floor((email.sentCount || 0) * (email.openRate || 0) / 100)} usuarios abrieron el email
                      </p>
                    </div>

                    <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Tasa de Clics</span>
                        <span className="text-neon-purple font-rajdhani font-bold">
                          {email.clickRate?.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-space-600 rounded-full h-2">
                        <div 
                          className="h-2 bg-neon-purple rounded-full transition-all duration-300"
                          style={{ width: `${email.clickRate || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {Math.floor((email.sentCount || 0) * (email.clickRate || 0) / 100)} usuarios hicieron clic
                      </p>
                    </div>

                    <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <h4 className="font-rajdhani font-semibold text-white mb-3">
                        Comparación con Promedio
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Apertura (promedio: 65%):</span>
                          <span className={`font-rajdhani font-medium ${
                            (email.openRate || 0) > 65 ? 'text-neon-green' : 'text-neon-red'
                          }`}>
                            {(email.openRate || 0) > 65 ? '+' : ''}{((email.openRate || 0) - 65).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Clics (promedio: 35%):</span>
                          <span className={`font-rajdhani font-medium ${
                            (email.clickRate || 0) > 35 ? 'text-neon-green' : 'text-neon-red'
                          }`}>
                            {(email.clickRate || 0) > 35 ? '+' : ''}{((email.clickRate || 0) - 35).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Acciones Rápidas
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                    <Copy className="w-4 h-4 text-neon-blue" />
                    <span className="text-white">Duplicar Campaña</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                    <Download className="w-4 h-4 text-neon-green" />
                    <span className="text-white">Exportar Métricas</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                    <BarChart3 className="w-4 h-4 text-neon-purple" />
                    <span className="text-white">Ver Análisis Detallado</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                    <ExternalLink className="w-4 h-4 text-neon-orange" />
                    <span className="text-white">Ver en Proveedor de Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {email.sentCount > 0 && (
            <div>
              <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                Timeline de la Campaña
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-rajdhani font-medium">Campaña enviada</p>
                    <p className="text-xs text-gray-400">
                      {email.lastSent ? formatDate(email.lastSent) : 'Fecha no disponible'}
                    </p>
                  </div>
                  <span className="text-neon-green font-rajdhani font-bold">
                    {formatNumber(email.sentCount)} emails
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-neon-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-rajdhani font-medium">Primeras aperturas</p>
                    <p className="text-xs text-gray-400">
                      ~{Math.floor((email.sentCount || 0) * 0.6)} en las primeras 2 horas
                    </p>
                  </div>
                  <span className="text-neon-blue font-rajdhani font-bold">
                    {email.openRate?.toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-neon-purple" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-rajdhani font-medium">Interacciones</p>
                    <p className="text-xs text-gray-400">
                      Enlaces más clickeados: "Jugar Ahora"
                    </p>
                  </div>
                  <span className="text-neon-purple font-rajdhani font-bold">
                    {email.clickRate?.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}