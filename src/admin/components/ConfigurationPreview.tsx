import React from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare,
  ExternalLink,
  Server,
  Users,
  Zap,
  Shield,
  Package,
  Star,
  Settings,
  Activity,
  Clock,
  Database,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface ConfigurationPreviewProps {
  config: any;
  onClose: () => void;
}

export default function ConfigurationPreview({ config, onClose }: ConfigurationPreviewProps) {
  const getStatusIcon = (enabled: boolean) => {
    return enabled ? (
      <CheckCircle className="w-4 h-4 text-neon-green" />
    ) : (
      <XCircle className="w-4 h-4 text-neon-red" />
    );
  };

  const criticalSettings = [
    { key: 'maintenanceMode', label: 'Modo Mantenimiento', critical: true },
    { key: 'registrationOpen', label: 'Registro Abierto', critical: true },
    { key: 'speedMultiplier', label: 'Velocidad General', critical: false },
    { key: 'newbieProtection', label: 'Protección Novatos', critical: false },
  ];

  const featureCount = Object.entries(config).filter(([key, value]) => 
    typeof value === 'boolean' && value === true && 
    ['alliances', 'acs', 'expeditions', 'officers', 'darkMatter', 'marketplace'].includes(key)
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Vista Previa de Configuración
              </h2>
              <p className="text-gray-400 mt-1">
                Resumen completo de la configuración actual
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Game Identity */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-neon-blue" />
              Identidad del Juego
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Nombre:</p>
                <p className="text-lg font-orbitron font-bold text-white">{config.gameName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Versión:</p>
                <p className="text-white font-rajdhani font-medium">{config.gameVersion}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-400">Descripción:</p>
                <p className="text-white">{config.gameDescription}</p>
              </div>
            </div>
          </div>

          {/* Critical Status */}
          <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-neon-red" />
              Estado Crítico del Servidor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {criticalSettings.map(({ key, label, critical }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                  <span className="text-sm text-white">{label}:</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(config[key])}
                    <span className={`text-sm font-rajdhani font-medium ${
                      typeof config[key] === 'boolean' 
                        ? (config[key] ? 'text-neon-green' : 'text-neon-red')
                        : 'text-white'
                    }`}>
                      {typeof config[key] === 'boolean' 
                        ? (config[key] ? 'ACTIVO' : 'INACTIVO')
                        : config[key]
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Performance */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <Server className="w-5 h-5 mr-2 text-neon-green" />
              Configuración de Rendimiento
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-orbitron font-bold text-neon-orange">
                  x{config.speedMultiplier}
                </p>
                <p className="text-xs text-gray-400">Velocidad General</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-orbitron font-bold text-neon-blue">
                  x{config.economySpeed}
                </p>
                <p className="text-xs text-gray-400">Economía</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-orbitron font-bold text-neon-purple">
                  x{config.fleetSpeed}
                </p>
                <p className="text-xs text-gray-400">Flotas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-orbitron font-bold text-neon-green">
                  x{config.researchSpeed}
                </p>
                <p className="text-xs text-gray-400">Investigación</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-orbitron font-bold text-neon-red">
                  x{config.buildingSpeed}
                </p>
                <p className="text-xs text-gray-400">Construcción</p>
              </div>
            </div>
          </div>

          {/* Features Summary */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-neon-purple" />
              Características Habilitadas ({featureCount}/6)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: 'alliances', label: 'Alianzas', icon: Users },
                { key: 'acs', label: 'ACS', icon: Target },
                { key: 'expeditions', label: 'Expediciones', icon: Rocket },
                { key: 'officers', label: 'Oficiales', icon: Crown },
                { key: 'darkMatter', label: 'Materia Oscura', icon: Star },
                { key: 'marketplace', label: 'Mercado', icon: Package },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className={`flex items-center space-x-2 p-2 rounded border ${
                  config[key] 
                    ? 'bg-neon-green/10 border-neon-green/30 text-neon-green'
                    : 'bg-gray-500/10 border-gray-500/30 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-rajdhani font-medium">{label}</span>
                  {getStatusIcon(config[key])}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-neon-green" />
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Contacto:</span>
                <span className="text-white">{config.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Soporte:</span>
                <span className="text-white">{config.supportEmail}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Teléfono:</span>
                <span className="text-white">{config.contactPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Admin:</span>
                <span className="text-white">{config.adminEmail}</span>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-neon-red" />
              Estado de Seguridad
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { key: 'multiAccountDetection', label: 'Anti Multi-Cuenta' },
                { key: 'botDetection', label: 'Anti-Bot' },
                { key: 'vpnBlocking', label: 'Bloqueo VPN' },
                { key: 'ipLogging', label: 'Log de IPs' },
              ].map(({ key, label }) => (
                <div key={key} className={`flex items-center justify-between p-2 rounded border ${
                  config[key] 
                    ? 'bg-neon-green/10 border-neon-green/30'
                    : 'bg-neon-red/10 border-neon-red/30'
                }`}>
                  <span className="text-xs text-white">{label}</span>
                  {getStatusIcon(config[key])}
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-neon-purple" />
              Redes Sociales
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: 'facebookUrl', label: 'Facebook', color: 'text-blue-400' },
                { key: 'twitterUrl', label: 'Twitter/X', color: 'text-gray-300' },
                { key: 'discordUrl', label: 'Discord', color: 'text-indigo-400' },
                { key: 'youtubeUrl', label: 'YouTube', color: 'text-red-400' },
                { key: 'instagramUrl', label: 'Instagram', color: 'text-pink-400' },
                { key: 'telegramUrl', label: 'Telegram', color: 'text-blue-300' },
              ].map(({ key, label, color }) => (
                <div key={key} className={`flex items-center justify-between p-2 rounded border ${
                  config[key] && config[key] !== '' 
                    ? 'bg-neon-green/10 border-neon-green/30'
                    : 'bg-gray-500/10 border-gray-500/30'
                }`}>
                  <span className={`text-xs font-rajdhani font-medium ${color}`}>{label}</span>
                  {config[key] && config[key] !== '' ? (
                    <ExternalLink className="w-3 h-3 text-neon-green" />
                  ) : (
                    <XCircle className="w-3 h-3 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Combat & Economy Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
              <h4 className="font-rajdhani font-semibold text-white mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-neon-red" />
                Configuración de Combate
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Campo de Escombros:</span>
                  <span className="text-white">{config.debrisFieldPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Crash de Flota:</span>
                  <span className="text-white">{config.fleetCrashPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reparación Defensas:</span>
                  <span className="text-white">{config.defenseRepairPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fuego Rápido:</span>
                  {getStatusIcon(config.rapidFire)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
              <h4 className="font-rajdhani font-semibold text-white mb-3 flex items-center">
                <Package className="w-4 h-4 mr-2 text-neon-green" />
                Configuración Económica
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tasa Metal:</span>
                  <span className="text-white">{config.tradeRateMetal}:1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tasa Cristal:</span>
                  <span className="text-white">{config.tradeRateCrystal}:1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tasa Deuterio:</span>
                  <span className="text-white">{config.tradeRateDeuterium}:1</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h3 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-neon-orange" />
              Estado del Sistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
                <Users className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                <p className="text-lg font-orbitron font-bold text-white">
                  {config.maxPlayersGlobal.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">Máx. Jugadores</p>
              </div>
              
              <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
                <Star className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                <p className="text-lg font-orbitron font-bold text-white">
                  {featureCount}/6
                </p>
                <p className="text-xs text-gray-400">Características</p>
              </div>
              
              <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
                <Shield className="w-6 h-6 text-neon-green mx-auto mb-2" />
                <p className="text-lg font-orbitron font-bold text-white">
                  {config.newbieProtection}d
                </p>
                <p className="text-xs text-gray-400">Protección</p>
              </div>
              
              <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
                <Database className="w-6 h-6 text-neon-orange mx-auto mb-2" />
                <p className="text-lg font-orbitron font-bold text-white">
                  {config.backupInterval}h
                </p>
                <p className="text-xs text-gray-400">Backup</p>
              </div>
            </div>
          </div>

          {/* Configuration Export */}
          <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
            <h3 className="font-rajdhani font-semibold text-white mb-3 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-neon-blue" />
              Exportar Configuración
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Descarga la configuración actual en formato JSON para backup o migración.
            </p>
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Descargar config.json
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}