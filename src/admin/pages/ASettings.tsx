import React, { useState, useEffect } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import { AdminLogger } from '../utils/adminLogger';
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Phone,
  Image,
  Palette,
  Server,
  Users,
  Clock,
  Shield,
  Zap,
  Database,
  Wifi,
  Monitor,
  Upload,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  Bell,
  FileText,
  BarChart3,
  Edit,
  RotateCcw,
  ExternalLink,
  MessageSquare,
  Star,
  Crown,
  Rocket,
  Building,
  Target,
  Package,
  Gamepad2,
  Activity
} from 'lucide-react';
import { PlatformConfig } from '../../types/admin';

interface ConfigSection {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

interface GameConfig {
  // Basic Information
  gameName: string;
  gameVersion: string;
  gameDescription: string;
  gameTagline: string;
  
  // Contact Information
  contactEmail: string;
  supportEmail: string;
  adminEmail: string;
  contactPhone: string;
  
  // Social Networks
  facebookUrl: string;
  twitterUrl: string;
  discordUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  telegramUrl: string;
  
  // Visual Identity
  logoUrl: string;
  faviconUrl: string;
  bannerUrl: string;
  loadingScreenUrl: string;
  
  // Server Configuration
  serverName: string;
  serverRegion: string;
  maxPlayersGlobal: number;
  maintenanceMode: boolean;
  registrationOpen: boolean;
  guestMode: boolean;
  
  // Game Mechanics
  speedMultiplier: number;
  economySpeed: number;
  fleetSpeed: number;
  researchSpeed: number;
  buildingSpeed: number;
  
  // Protection Settings
  newbieProtection: number; // days
  strongPlayerProtection: boolean;
  honorableTargetProtection: boolean;
  vacationMode: boolean;
  
  // Combat Settings
  rapidFire: boolean;
  debrisFieldPercentage: number;
  fleetCrashPercentage: number;
  defenseRepairPercentage: number;
  
  // Economic Settings
  tradeRateMetal: number;
  tradeRateCrystal: number;
  tradeRateDeuterium: number;
  
  // Features
  alliances: boolean;
  acs: boolean; // Attack Coordinate System
  expeditions: boolean;
  officers: boolean;
  darkMatter: boolean;
  marketplace: boolean;
  
  // Communication
  ingameMessages: boolean;
  allianceMessages: boolean;
  combatReports: boolean;
  spyReports: boolean;
  
  // Advanced Features
  jumpGate: boolean;
  gravitonTechnology: boolean;
  deathStars: boolean;
  moonDestruction: boolean;
  
  // Event Settings
  doubleResourceEvents: boolean;
  fleetSpeedEvents: boolean;
  buildingSpeedEvents: boolean;
  researchSpeedEvents: boolean;
  
  // Security
  multiAccountDetection: boolean;
  botDetection: boolean;
  vpnBlocking: boolean;
  ipLogging: boolean;
  
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  telegramNotifications: boolean;
  discordNotifications: boolean;
  
  // Backup & Maintenance
  autoBackup: boolean;
  backupInterval: number; // hours
  maintenanceWindow: string;
  
  // Legal
  termsOfServiceUrl: string;
  privacyPolicyUrl: string;
  cookiePolicyUrl: string;
  
  // Analytics
  googleAnalyticsId: string;
  enableAnalytics: boolean;
  
  // API Settings
  apiEnabled: boolean;
  apiRateLimit: number;
  apiKeyRequired: boolean;
}

const configSections: ConfigSection[] = [
  { id: 'basic', name: 'Información Básica', icon: Info, color: 'neon-blue', description: 'Nombre, versión y descripción del juego' },
  { id: 'contact', name: 'Información de Contacto', icon: Mail, color: 'neon-green', description: 'Emails y teléfonos de contacto' },
  { id: 'social', name: 'Redes Sociales', icon: MessageSquare, color: 'neon-purple', description: 'Enlaces a redes sociales' },
  { id: 'visual', name: 'Identidad Visual', icon: Palette, color: 'neon-orange', description: 'Logos, iconos y elementos visuales' },
  { id: 'server', name: 'Configuración del Servidor', icon: Server, color: 'neon-red', description: 'Configuraciones técnicas del servidor' },
  { id: 'gameplay', name: 'Mecánicas de Juego', icon: Gamepad2, color: 'neon-blue', description: 'Velocidades y multiplicadores' },
  { id: 'protection', name: 'Protecciones', icon: Shield, color: 'neon-green', description: 'Sistemas de protección de jugadores' },
  { id: 'combat', name: 'Sistema de Combate', icon: Target, color: 'neon-red', description: 'Configuraciones de batalla' },
  { id: 'economy', name: 'Sistema Económico', icon: Package, color: 'neon-orange', description: 'Tasas de comercio y economía' },
  { id: 'features', name: 'Características', icon: Star, color: 'neon-purple', description: 'Funcionalidades del juego' },
  { id: 'events', name: 'Eventos', icon: Zap, color: 'neon-orange', description: 'Configuración de eventos especiales' },
  { id: 'security', name: 'Seguridad', icon: Shield, color: 'neon-red', description: 'Sistemas de seguridad y detección' },
  { id: 'notifications', name: 'Notificaciones', icon: Bell, color: 'neon-blue', description: 'Sistemas de notificación' },
  { id: 'maintenance', name: 'Mantenimiento', icon: Settings, color: 'neon-green', description: 'Backups y mantenimiento' },
  { id: 'legal', name: 'Legal', icon: FileText, color: 'neon-purple', description: 'Términos, privacidad y políticas' },
  { id: 'analytics', name: 'Analíticas', icon: BarChart3, color: 'neon-blue', description: 'Google Analytics y métricas' },
  { id: 'api', name: 'API', icon: Database, color: 'neon-green', description: 'Configuración de API externa' }
];

export default function ASettings() {
  const [selectedSection, setSelectedSection] = useState('basic');
  const [config, setConfig] = useState<GameConfig>({
    // Basic Information
    gameName: 'Galactic Empire',
    gameVersion: '2.0 Next Generation',
    gameDescription: 'El juego de estrategia espacial más avanzado de la galaxia. Construye tu imperio, forma alianzas y conquista las estrellas.',
    gameTagline: 'Conquista la galaxia • Construye tu imperio • Domina las estrellas',
    
    // Contact Information
    contactEmail: 'contacto@galactic-empire.com',
    supportEmail: 'soporte@galactic-empire.com',
    adminEmail: 'admin@galactic-empire.com',
    contactPhone: '+34 900 123 456',
    
    // Social Networks
    facebookUrl: 'https://facebook.com/galactic-empire',
    twitterUrl: 'https://twitter.com/galactic_empire',
    discordUrl: 'https://discord.gg/galactic-empire',
    youtubeUrl: 'https://youtube.com/@galactic-empire',
    instagramUrl: 'https://instagram.com/galactic_empire',
    telegramUrl: 'https://t.me/galactic_empire',
    
    // Visual Identity
    logoUrl: '/images/logo.png',
    faviconUrl: '/favicon.ico',
    bannerUrl: '/images/banner.jpg',
    loadingScreenUrl: '/images/loading-bg.jpg',
    
    // Server Configuration
    serverName: 'Servidor Principal EU',
    serverRegion: 'Europa (Madrid)',
    maxPlayersGlobal: 50000,
    maintenanceMode: false,
    registrationOpen: true,
    guestMode: false,
    
    // Game Mechanics
    speedMultiplier: 1,
    economySpeed: 1,
    fleetSpeed: 1,
    researchSpeed: 1,
    buildingSpeed: 1,
    
    // Protection Settings
    newbieProtection: 7,
    strongPlayerProtection: true,
    honorableTargetProtection: true,
    vacationMode: true,
    
    // Combat Settings
    rapidFire: true,
    debrisFieldPercentage: 30,
    fleetCrashPercentage: 1,
    defenseRepairPercentage: 70,
    
    // Economic Settings
    tradeRateMetal: 2.5,
    tradeRateCrystal: 1.5,
    tradeRateDeuterium: 1.0,
    
    // Features
    alliances: true,
    acs: true,
    expeditions: true,
    officers: true,
    darkMatter: true,
    marketplace: true,
    
    // Communication
    ingameMessages: true,
    allianceMessages: true,
    combatReports: true,
    spyReports: true,
    
    // Advanced Features
    jumpGate: true,
    gravitonTechnology: true,
    deathStars: true,
    moonDestruction: true,
    
    // Event Settings
    doubleResourceEvents: true,
    fleetSpeedEvents: true,
    buildingSpeedEvents: true,
    researchSpeedEvents: true,
    
    // Security
    multiAccountDetection: true,
    botDetection: true,
    vpnBlocking: false,
    ipLogging: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    telegramNotifications: true,
    discordNotifications: true,
    
    // Backup & Maintenance
    autoBackup: true,
    backupInterval: 6,
    maintenanceWindow: '03:00-05:00',
    
    // Legal
    termsOfServiceUrl: '/legal/terms',
    privacyPolicyUrl: '/legal/privacy',
    cookiePolicyUrl: '/legal/cookies',
    
    // Analytics
    googleAnalyticsId: 'GA-XXXXXXXXX',
    enableAnalytics: true,
    
    // API Settings
    apiEnabled: true,
    apiRateLimit: 1000,
    apiKeyRequired: true,
  });
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const updateConfig = (key: keyof GameConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the configuration change
      AdminLogger.logSystemChange('platform_configuration_updated', 'current_admin', null, config);
      
      setMessage({ type: 'success', text: 'Configuración guardada exitosamente' });
      setHasChanges(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al guardar la configuración' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres restablecer toda la configuración?')) {
      // Reset to default values
      setConfig({
        ...config,
        // Reset critical settings
        maintenanceMode: false,
        registrationOpen: true,
        speedMultiplier: 1,
        economySpeed: 1,
        fleetSpeed: 1,
        researchSpeed: 1,
        buildingSpeed: 1,
      });
      setHasChanges(true);
    }
  };

  const renderBasicSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Nombre del Juego
          </label>
          <input
            type="text"
            value={config.gameName}
            onChange={(e) => updateConfig('gameName', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Versión del Juego
          </label>
          <input
            type="text"
            value={config.gameVersion}
            onChange={(e) => updateConfig('gameVersion', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
          Descripción del Juego
        </label>
        <textarea
          value={config.gameDescription}
          onChange={(e) => updateConfig('gameDescription', e.target.value)}
          className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          rows={3}
        />
      </div>
      
      <div>
        <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
          Eslogan/Tagline
        </label>
        <input
          type="text"
          value={config.gameTagline}
          onChange={(e) => updateConfig('gameTagline', e.target.value)}
          className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          placeholder="Conquista la galaxia • Construye tu imperio"
        />
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Email de Contacto General
          </label>
          <input
            type="email"
            value={config.contactEmail}
            onChange={(e) => updateConfig('contactEmail', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Email de Soporte Técnico
          </label>
          <input
            type="email"
            value={config.supportEmail}
            onChange={(e) => updateConfig('supportEmail', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Email de Administración
          </label>
          <input
            type="email"
            value={config.adminEmail}
            onChange={(e) => updateConfig('adminEmail', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            value={config.contactPhone}
            onChange={(e) => updateConfig('contactPhone', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="+34 900 123 456"
          />
        </div>
      </div>
    </div>
  );

  const renderSocialSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Facebook
          </label>
          <input
            type="url"
            value={config.facebookUrl}
            onChange={(e) => updateConfig('facebookUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="https://facebook.com/tu-pagina"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Twitter/X
          </label>
          <input
            type="url"
            value={config.twitterUrl}
            onChange={(e) => updateConfig('twitterUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="https://twitter.com/tu-cuenta"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Discord
          </label>
          <input
            type="url"
            value={config.discordUrl}
            onChange={(e) => updateConfig('discordUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="https://discord.gg/tu-servidor"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            YouTube
          </label>
          <input
            type="url"
            value={config.youtubeUrl}
            onChange={(e) => updateConfig('youtubeUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="https://youtube.com/@tu-canal"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Instagram
          </label>
          <input
            type="url"
            value={config.instagramUrl}
            onChange={(e) => updateConfig('instagramUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="https://instagram.com/tu-cuenta"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Telegram
          </label>
          <input
            type="url"
            value={config.telegramUrl}
            onChange={(e) => updateConfig('telegramUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="https://t.me/tu-canal"
          />
        </div>
      </div>
    </div>
  );

  const renderVisualSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            URL del Logo Principal
          </label>
          <input
            type="url"
            value={config.logoUrl}
            onChange={(e) => updateConfig('logoUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            URL del Favicon
          </label>
          <input
            type="url"
            value={config.faviconUrl}
            onChange={(e) => updateConfig('faviconUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Banner Principal
          </label>
          <input
            type="url"
            value={config.bannerUrl}
            onChange={(e) => updateConfig('bannerUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Fondo de Pantalla de Carga
          </label>
          <input
            type="url"
            value={config.loadingScreenUrl}
            onChange={(e) => updateConfig('loadingScreenUrl', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
      </div>
      
      {/* Visual Preview */}
      <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
        <h4 className="font-rajdhani font-semibold text-white mb-3">
          Vista Previa
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
            <div className="w-12 h-12 bg-neon-blue/20 rounded mx-auto mb-2 flex items-center justify-center">
              <Image className="w-6 h-6 text-neon-blue" />
            </div>
            <p className="text-xs text-gray-400">Logo</p>
          </div>
          <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
            <div className="w-12 h-12 bg-neon-green/20 rounded mx-auto mb-2 flex items-center justify-center">
              <Star className="w-6 h-6 text-neon-green" />
            </div>
            <p className="text-xs text-gray-400">Favicon</p>
          </div>
          <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
            <div className="w-12 h-12 bg-neon-purple/20 rounded mx-auto mb-2 flex items-center justify-center">
              <Monitor className="w-6 h-6 text-neon-purple" />
            </div>
            <p className="text-xs text-gray-400">Banner</p>
          </div>
          <div className="text-center p-3 bg-space-800/50 rounded border border-space-600">
            <div className="w-12 h-12 bg-neon-orange/20 rounded mx-auto mb-2 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-neon-orange" />
            </div>
            <p className="text-xs text-gray-400">Carga</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServerSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Nombre del Servidor
          </label>
          <input
            type="text"
            value={config.serverName}
            onChange={(e) => updateConfig('serverName', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Región del Servidor
          </label>
          <select
            value={config.serverRegion}
            onChange={(e) => updateConfig('serverRegion', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          >
            <option value="Europa (Madrid)">Europa (Madrid)</option>
            <option value="Europa (Frankfurt)">Europa (Frankfurt)</option>
            <option value="América (Nueva York)">América (Nueva York)</option>
            <option value="América (São Paulo)">América (São Paulo)</option>
            <option value="Asia (Tokio)">Asia (Tokio)</option>
            <option value="Asia (Singapur)">Asia (Singapur)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Máximo de Jugadores Global
          </label>
          <input
            type="number"
            value={config.maxPlayersGlobal}
            onChange={(e) => updateConfig('maxPlayersGlobal', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            min="1000"
            max="100000"
          />
        </div>
      </div>
      
      {/* Critical Server Settings */}
      <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg">
        <h4 className="font-rajdhani font-semibold text-neon-red mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Configuraciones Críticas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-white">Modo Mantenimiento</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.maintenanceMode}
                onChange={(e) => updateConfig('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-red"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-white">Registro Abierto</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.registrationOpen}
                onChange={(e) => updateConfig('registrationOpen', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-white">Modo Invitado</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.guestMode}
                onChange={(e) => updateConfig('guestMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGameplaySection = () => (
    <div className="space-y-6">
      <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
        <h4 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-neon-blue" />
          Multiplicadores de Velocidad
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: 'speedMultiplier', label: 'Velocidad General', min: 1, max: 50 },
            { key: 'economySpeed', label: 'Velocidad Económica', min: 1, max: 10 },
            { key: 'fleetSpeed', label: 'Velocidad de Flota', min: 1, max: 20 },
            { key: 'researchSpeed', label: 'Velocidad de Investigación', min: 1, max: 10 },
            { key: 'buildingSpeed', label: 'Velocidad de Construcción', min: 1, max: 10 },
          ].map(({ key, label, min, max }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{label}</span>
                <span className="text-sm font-rajdhani font-bold text-white">
                  x{config[key as keyof GameConfig]}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                value={config[key as keyof GameConfig] as number}
                onChange={(e) => updateConfig(key as keyof GameConfig, parseInt(e.target.value))}
                className="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer slider-speed"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>x{min}</span>
                <span>x{max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProtectionSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Protección de Novatos (días)
          </label>
          <input
            type="number"
            value={config.newbieProtection}
            onChange={(e) => updateConfig('newbieProtection', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            min="0"
            max="30"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'strongPlayerProtection', label: 'Protección de Jugadores Fuertes', desc: 'Protege a jugadores con muchos más puntos' },
          { key: 'honorableTargetProtection', label: 'Protección de Objetivo Honorable', desc: 'Protege objetivos con honor alto' },
          { key: 'vacationMode', label: 'Modo Vacaciones', desc: 'Permite activar modo vacaciones' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-space-700/30 rounded-lg border border-space-600">
            <div>
              <p className="text-sm font-rajdhani font-medium text-white">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config[key as keyof GameConfig] as boolean}
                onChange={(e) => updateConfig(key as keyof GameConfig, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCombatSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Porcentaje de Campo de Escombros (%)
          </label>
          <input
            type="number"
            value={config.debrisFieldPercentage}
            onChange={(e) => updateConfig('debrisFieldPercentage', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            min="0"
            max="100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Porcentaje de Crash de Flota (%)
          </label>
          <input
            type="number"
            value={config.fleetCrashPercentage}
            onChange={(e) => updateConfig('fleetCrashPercentage', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Porcentaje de Reparación de Defensas (%)
          </label>
          <input
            type="number"
            value={config.defenseRepairPercentage}
            onChange={(e) => updateConfig('defenseRepairPercentage', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            min="0"
            max="100"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-space-700/30 rounded-lg border border-space-600">
        <div>
          <p className="text-sm font-rajdhani font-medium text-white">Fuego Rápido (Rapid Fire)</p>
          <p className="text-xs text-gray-400">Permite que ciertas naves disparen múltiples veces</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.rapidFire}
            onChange={(e) => updateConfig('rapidFire', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-red"></div>
        </label>
      </div>
    </div>
  );

  const renderEconomySection = () => (
    <div className="space-y-6">
      <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
        <h4 className="font-rajdhani font-semibold text-white mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-neon-green" />
          Tasas de Comercio
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Tasa Metal:Cristal
            </label>
            <input
              type="number"
              value={config.tradeRateMetal}
              onChange={(e) => updateConfig('tradeRateMetal', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              min="1"
              max="10"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Tasa Cristal:Deuterio
            </label>
            <input
              type="number"
              value={config.tradeRateCrystal}
              onChange={(e) => updateConfig('tradeRateCrystal', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              min="1"
              max="5"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Tasa Base Deuterio
            </label>
            <input
              type="number"
              value={config.tradeRateDeuterium}
              onChange={(e) => updateConfig('tradeRateDeuterium', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              min="0.5"
              max="3"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeaturesSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'alliances', label: 'Sistema de Alianzas', desc: 'Permite crear y unirse a alianzas', icon: Users },
          { key: 'acs', label: 'ACS (Sistema de Ataque Coordinado)', desc: 'Ataques coordinados entre aliados', icon: Target },
          { key: 'expeditions', label: 'Expediciones', desc: 'Misiones de exploración al espacio profundo', icon: Rocket },
          { key: 'officers', label: 'Sistema de Oficiales', desc: 'Oficiales premium con bonificaciones', icon: Crown },
          { key: 'darkMatter', label: 'Materia Oscura', desc: 'Moneda premium del juego', icon: Star },
          { key: 'marketplace', label: 'Mercado', desc: 'Sistema de comercio entre jugadores', icon: Package },
          { key: 'jumpGate', label: 'Portal de Salto', desc: 'Transporte instantáneo entre lunas', icon: Zap },
          { key: 'gravitonTechnology', label: 'Tecnología Gravitón', desc: 'Tecnología avanzada para Estrella de la Muerte', icon: Star },
          { key: 'deathStars', label: 'Estrellas de la Muerte', desc: 'Superarmas destructivas', icon: Target },
          { key: 'moonDestruction', label: 'Destrucción de Lunas', desc: 'Permite destruir lunas enemigas', icon: Target },
        ].map(({ key, label, desc, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-space-700/30 rounded-lg border border-space-600">
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-neon-blue" />
              <div>
                <p className="text-sm font-rajdhani font-medium text-white">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config[key as keyof GameConfig] as boolean}
                onChange={(e) => updateConfig(key as keyof GameConfig, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'multiAccountDetection', label: 'Detección de Múltiples Cuentas', desc: 'Detecta y previene cuentas múltiples' },
          { key: 'botDetection', label: 'Detección de Bots', desc: 'Sistema anti-bot avanzado' },
          { key: 'vpnBlocking', label: 'Bloqueo de VPN', desc: 'Bloquea conexiones VPN/Proxy' },
          { key: 'ipLogging', label: 'Registro de IPs', desc: 'Registra todas las IPs de conexión' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-space-700/30 rounded-lg border border-space-600">
            <div>
              <p className="text-sm font-rajdhani font-medium text-white">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config[key as keyof GameConfig] as boolean}
                onChange={(e) => updateConfig(key as keyof GameConfig, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-red"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaintenanceSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Intervalo de Backup Automático (horas)
          </label>
          <input
            type="number"
            value={config.backupInterval}
            onChange={(e) => updateConfig('backupInterval', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            min="1"
            max="24"
          />
        </div>
        
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Ventana de Mantenimiento
          </label>
          <input
            type="text"
            value={config.maintenanceWindow}
            onChange={(e) => updateConfig('maintenanceWindow', e.target.value)}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            placeholder="03:00-05:00"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-space-700/30 rounded-lg border border-space-600">
        <div>
          <p className="text-sm font-rajdhani font-medium text-white">Backup Automático</p>
          <p className="text-xs text-gray-400">Realiza backups automáticos de la base de datos</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.autoBackup}
            onChange={(e) => updateConfig('autoBackup', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
        </label>
      </div>
    </div>
  );

  const renderApiSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
            Límite de Rate (requests/minuto)
          </label>
          <input
            type="number"
            value={config.apiRateLimit}
            onChange={(e) => updateConfig('apiRateLimit', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            min="100"
            max="10000"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'apiEnabled', label: 'API Habilitada', desc: 'Permite acceso a la API externa' },
          { key: 'apiKeyRequired', label: 'API Key Requerida', desc: 'Requiere autenticación con API key' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-space-700/30 rounded-lg border border-space-600">
            <div>
              <p className="text-sm font-rajdhani font-medium text-white">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config[key as keyof GameConfig] as boolean}
                onChange={(e) => updateConfig(key as keyof GameConfig, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (selectedSection) {
      case 'basic': return renderBasicSection();
      case 'contact': return renderContactSection();
      case 'social': return renderSocialSection();
      case 'visual': return renderVisualSection();
      case 'server': return renderServerSection();
      case 'gameplay': return renderGameplaySection();
      case 'protection': return renderProtectionSection();
      case 'combat': return renderCombatSection();
      case 'economy': return renderEconomySection();
      case 'features': return renderFeaturesSection();
      case 'security': return renderSecuritySection();
      case 'maintenance': return renderMaintenanceSection();
      case 'api': return renderApiSection();
      default: return <div>Sección en desarrollo</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Configuración de Plataforma
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Configuraciones globales del servidor OGame
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-neon-orange/20 border border-neon-orange/30 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-neon-orange" />
              <span className="text-sm text-neon-orange font-rajdhani font-medium">
                Cambios sin guardar
              </span>
            </div>
          )}
          
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restablecer
          </Button>
          
          <Button 
            variant="primary" 
            onClick={handleSave}
            loading={saving}
            disabled={!hasChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-neon-green/10 border-neon-green/30' 
            : 'bg-neon-red/10 border-neon-red/30'
        }`}>
          <div className="flex items-center space-x-3">
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-neon-green" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-neon-red" />
            )}
            <span className={`font-rajdhani font-medium ${
              message.type === 'success' ? 'text-neon-green' : 'text-neon-red'
            }`}>
              {message.text}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <AdminCard title="Secciones de Configuración" icon={Settings} color="neon-purple">
            <div className="space-y-2">
              {configSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 text-left ${
                    selectedSection === section.id
                      ? 'bg-neon-blue/20 border-neon-blue/30 text-neon-blue'
                      : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white hover:border-neon-purple/30'
                  }`}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-rajdhani font-medium">{section.name}</p>
                    <p className="text-xs opacity-75 line-clamp-2">{section.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AdminCard 
            title={configSections.find(s => s.id === selectedSection)?.name || 'Configuración'} 
            icon={configSections.find(s => s.id === selectedSection)?.icon || Settings} 
            color="neon-blue"
          >
            {renderCurrentSection()}
          </AdminCard>
        </div>
      </div>

      {/* Configuration Summary */}
      <AdminCard title="Resumen de Configuración Actual" icon={Activity} color="neon-green">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
            <Globe className="w-8 h-8 text-neon-blue mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              {config.gameName}
            </p>
            <p className="text-xs text-gray-400">Nombre del Juego</p>
          </div>
          
          <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
            <Zap className="w-8 h-8 text-neon-orange mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              x{config.speedMultiplier}
            </p>
            <p className="text-xs text-gray-400">Velocidad General</p>
          </div>
          
          <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
            <Users className="w-8 h-8 text-neon-green mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              {config.maxPlayersGlobal.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Máx. Jugadores</p>
          </div>
          
          <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
            <Shield className="w-8 h-8 text-neon-purple mx-auto mb-2" />
            <p className="text-lg font-orbitron font-bold text-white">
              {config.newbieProtection}d
            </p>
            <p className="text-xs text-gray-400">Protección Novatos</p>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}