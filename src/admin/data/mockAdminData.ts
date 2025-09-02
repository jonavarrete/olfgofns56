import { 
  AdminUser, 
  PlayerAccount, 
  AdminPvEMission, 
  AdminAlienRace,
  GlobalMessage,
  IPBan,
  UserBan,
  SecurityLog,
  PlatformConfig,
  UniverseConfig,
  ExternalAPI,
  AdminTemplate,
  Violation,
  TimelineEvent
} from '../../types/admin';

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'admin_1',
    email: 'admin@galaxy.com',
    username: 'SuperAdmin',
    role: 'super_admin',
    permissions: [],
    createdAt: Date.now() - 86400000 * 365,
    lastLogin: Date.now(),
    active: true,
  },
  {
    id: 'admin_2',
    email: 'mod@galaxy.com',
    username: 'ModeratorX',
    role: 'moderator',
    permissions: [],
    createdAt: Date.now() - 86400000 * 180,
    lastLogin: Date.now() - 3600000,
    active: true,
  }
];

export const mockPlayerAccounts: PlayerAccount[] = [
  {
    id: 'player_1',
    email: 'player1@galaxy.com',
    username: 'SpaceCommander',
    universeId: 'universe_1',
    level: 25,
    experience: 156890,
    rank: 42,
    points: 89567,
    alliance: 'Galactic Federation',
    planets: [],
    resources: { metal: 150000, crystal: 75000, deuterium: 25000, energy: 12000, darkMatter: 1250 },
    research: {} as any,
    fleet: {} as any,
    officers: { darkMatter: 1250, officers: [] },
    status: 'active',
    createdAt: Date.now() - 86400000 * 30,
    lastLogin: Date.now() - 3600000,
    ipAddress: '192.168.1.100',
    violations: [],
    timeline: []
  }
];

export const mockViolations: Violation[] = [
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
  }
];

export const mockGlobalMessages: GlobalMessage[] = [
  {
    id: 'msg_1',
    title: 'Mantenimiento Programado del Servidor',
    content: 'El servidor estará en mantenimiento el próximo domingo de 02:00 a 06:00 GMT. Durante este tiempo, el juego no estará disponible.',
    type: 'maintenance',
    priority: 'high',
    targetAudience: 'all',
    sentAt: Date.now() - 86400000,
    sentBy: 'admin_1',
    status: 'sent',
    readBy: []
  }
];

export const mockIPBans: IPBan[] = [
  {
    id: 'ip_1',
    ipAddress: '192.168.1.200',
    reason: 'Múltiples intentos de acceso no autorizado',
    bannedBy: 'admin_1',
    bannedAt: Date.now() - 86400000 * 3,
    active: true
  }
];

export const mockUserBans: UserBan[] = [
  {
    id: 'ub_1',
    userId: 'player_2',
    username: 'SpaceHacker',
    reason: 'Uso confirmado de bots y múltiples cuentas',
    type: 'permanent',
    bannedBy: 'admin_1',
    bannedAt: Date.now() - 86400000 * 7,
    active: true
  }
];

export const mockSecurityLogs: SecurityLog[] = [
  {
    id: 'log_1',
    type: 'failed_login',
    userId: 'player_1',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0',
    description: 'Intento de login fallido - contraseña incorrecta',
    severity: 'warning',
    timestamp: Date.now() - 3600000
  }
];

export const mockPlatformConfig: PlatformConfig[] = [
  {
    id: 'config_1',
    category: 'general',
    key: 'maintenance_mode',
    value: false,
    description: 'Activar modo mantenimiento',
    type: 'boolean',
    updatedBy: 'admin_1',
    updatedAt: Date.now() - 86400000
  },
  {
    id: 'config_2',
    category: 'gameplay',
    key: 'max_planets_per_user',
    value: 9,
    description: 'Máximo número de planetas por usuario',
    type: 'number',
    updatedBy: 'admin_1',
    updatedAt: Date.now() - 86400000 * 7
  }
];

export const mockUniverseConfigs: UniverseConfig[] = [
  {
    id: 'universe_1',
    name: 'Galaxia Prima',
    description: 'Universo principal con configuración estándar',
    type: 'standard',
    speed: 1,
    maxPlayers: 5000,
    status: 'active',
    startDate: Date.now() - 86400000 * 180,
    features: {
      alliances: true,
      officers: true,
      expeditions: true,
      acs: true,
      trade: true
    },
    settings: {
      newbieProtection: 7,
      fleetSpeed: 1,
      economySpeed: 1,
      researchSpeed: 1,
      rapidFire: true,
      debrisField: 30
    },
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 200
  }
];

export const mockExternalAPIs: ExternalAPI[] = [
  {
    id: 'api_1',
    name: 'Telegram Bot',
    type: 'telegram',
    endpoint: 'https://api.telegram.org/bot',
    apiKey: 'BOT_TOKEN_HERE',
    active: true,
    settings: {
      chatId: '-1001234567890',
      notifications: ['maintenance', 'events', 'violations']
    },
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: 'api_2',
    name: 'Email Service',
    type: 'email',
    endpoint: 'https://api.sendgrid.com/v3',
    apiKey: 'SG.API_KEY_HERE',
    active: true,
    settings: {
      fromEmail: 'noreply@galaxy.com',
      fromName: 'Galactic Empire'
    },
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 60
  }
];

export const mockAdminTemplates: AdminTemplate[] = [
  {
    id: 'template_1',
    name: 'Mensaje de Mantenimiento',
    type: 'message',
    content: {
      title: 'Mantenimiento Programado',
      content: 'El servidor estará en mantenimiento desde {start_time} hasta {end_time}. Durante este tiempo, el juego no estará disponible.',
      type: 'maintenance',
      priority: 'high'
    },
    description: 'Plantilla estándar para anuncios de mantenimiento',
    category: 'system',
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 90,
    usageCount: 15
  },
  {
    id: 'template_2',
    name: 'Penalización por Trampa',
    type: 'penalty',
    content: {
      reason: 'Uso de software automatizado (bots) detectado',
      type: 'temporary_ban',
      duration: 72,
      warning: 'Futuras violaciones resultarán en baneos permanentes'
    },
    description: 'Penalización estándar por uso de bots',
    category: 'security',
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 120,
    usageCount: 8
  }
];