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
    planets: [
      {
        id: 'planet_1',
        name: 'Planeta Principal',
        coordinates: '1:2:3',
        type: 'main',
        temperature: 25,
        size: 188,
        fields: 188,
        usedFields: 145,
        resources: { metal: 150000, crystal: 75000, deuterium: 25000, energy: 12000, darkMatter: 0 },
        buildings: {
          metalMine: 12,
          crystalMine: 10,
          deuteriumSynthesizer: 8,
          solarPlant: 15,
          fusionReactor: 3,
          roboticsFactory: 5,
          naniteFactory: 1,
          shipyard: 7,
          metalStorage: 6,
          crystalStorage: 5,
          deuteriumTank: 4,
          researchLab: 6,
          terraformer: 0,
          allianceDepot: 2,
          missileSilo: 3,
        },
        production: { metal: 3600, crystal: 1800, deuterium: 900, energy: 2400, darkMatter: 0 },
        debris: { metal: 45000, crystal: 22000, deuterium: 0, energy: 0, darkMatter: 0 },
        moons: [
          {
            id: 'moon_1',
            name: 'Luna Alpha',
            size: 45,
            temperature: -150,
            buildings: {
              metalMine: 0,
              crystalMine: 0,
              deuteriumSynthesizer: 0,
              solarPlant: 0,
              fusionReactor: 0,
              roboticsFactory: 2,
              naniteFactory: 0,
              shipyard: 3,
              metalStorage: 2,
              crystalStorage: 2,
              deuteriumTank: 2,
              researchLab: 0,
              terraformer: 0,
              allianceDepot: 1,
              missileSilo: 5,
            },
            resources: { metal: 25000, crystal: 15000, deuterium: 8000, energy: 2000, darkMatter: 0 }
          }
        ]
      },
      {
        id: 'planet_2',
        name: 'Colonia Beta',
        coordinates: '2:4:8',
        type: 'colony',
        temperature: -45,
        size: 163,
        fields: 163,
        usedFields: 89,
        resources: { metal: 89000, crystal: 45000, deuterium: 18000, energy: 8000, darkMatter: 0 },
        buildings: {
          metalMine: 8,
          crystalMine: 7,
          deuteriumSynthesizer: 9,
          solarPlant: 10,
          fusionReactor: 2,
          roboticsFactory: 3,
          naniteFactory: 0,
          shipyard: 4,
          metalStorage: 4,
          crystalStorage: 3,
          deuteriumTank: 5,
          researchLab: 3,
          terraformer: 0,
          allianceDepot: 1,
          missileSilo: 2,
        },
        production: { metal: 2400, crystal: 1200, deuterium: 1200, energy: 1800, darkMatter: 0 },
        debris: { metal: 18000, crystal: 8000, deuterium: 0, energy: 0, darkMatter: 0 },
        moons: []
      }
    ],
    resources: { metal: 0, crystal: 0, deuterium: 0, energy: 0, darkMatter: 1250 },
    research: {
      energyTechnology: 8,
      laserTechnology: 6,
      ionTechnology: 3,
      hyperspaceTechnology: 4,
      plasmaTechnology: 1,
      combustionDrive: 7,
      impulseDrive: 5,
      hyperspaceDrive: 2,
      espionageTechnology: 4,
      computerTechnology: 6,
      astrophysics: 3,
      intergalacticResearchNetwork: 2,
      gravitonTechnology: 0,
      weaponsTechnology: 5,
      shieldingTechnology: 4,
      armourTechnology: 3,
    },
    fleet: {
      smallCargo: 45,
      largeCargo: 22,
      lightFighter: 156,
      heavyFighter: 78,
      cruiser: 34,
      battleship: 12,
      colonyShip: 2,
      recycler: 8,
      espionageProbe: 25,
      bomber: 6,
      destroyer: 3,
      deathstar: 1,
      battlecruiser: 5,
    },
    officers: { darkMatter: 1250, officers: [] },
    status: 'active',
    createdAt: Date.now() - 86400000 * 30,
    lastLogin: Date.now() - 3600000,
    ipAddress: '192.168.1.100',
    violations: [],
    timeline: []
  },
  {
    id: 'player_2',
    email: 'player2@galaxy.com',
    username: 'GalacticTrader',
    universeId: 'universe_2',
    level: 18,
    experience: 89450,
    rank: 78,
    points: 45678,
    alliance: 'Star Traders',
    planets: [
      {
        id: 'planet_3',
        name: 'Base Comercial',
        coordinates: '3:7:12',
        type: 'main',
        temperature: 15,
        size: 175,
        fields: 175,
        usedFields: 98,
        resources: { metal: 89000, crystal: 156000, deuterium: 45000, energy: 18000, darkMatter: 0 },
        buildings: {
          metalMine: 10,
          crystalMine: 12,
          deuteriumSynthesizer: 6,
          solarPlant: 12,
          fusionReactor: 2,
          roboticsFactory: 4,
          naniteFactory: 0,
          shipyard: 5,
          metalStorage: 8,
          crystalStorage: 9,
          deuteriumTank: 6,
          researchLab: 4,
          terraformer: 0,
          allianceDepot: 3,
          missileSilo: 1,
        },
        production: { metal: 3000, crystal: 3600, deuterium: 1200, energy: 2800, darkMatter: 0 },
        debris: { metal: 12000, crystal: 8000, deuterium: 0, energy: 0, darkMatter: 0 },
        moons: []
      }
    ],
    resources: { metal: 0, crystal: 0, deuterium: 0, energy: 0, darkMatter: 850 },
    research: {
      energyTechnology: 6,
      laserTechnology: 4,
      ionTechnology: 2,
      hyperspaceTechnology: 2,
      plasmaTechnology: 0,
      combustionDrive: 5,
      impulseDrive: 3,
      hyperspaceDrive: 1,
      espionageTechnology: 6,
      computerTechnology: 4,
      astrophysics: 2,
      intergalacticResearchNetwork: 1,
      gravitonTechnology: 0,
      weaponsTechnology: 3,
      shieldingTechnology: 3,
      armourTechnology: 2,
    },
    fleet: {
      smallCargo: 25,
      largeCargo: 15,
      lightFighter: 89,
      heavyFighter: 45,
      cruiser: 18,
      battleship: 6,
      colonyShip: 1,
      recycler: 12,
      espionageProbe: 35,
      bomber: 2,
      destroyer: 1,
      deathstar: 0,
      battlecruiser: 3,
    },
    officers: { darkMatter: 850, officers: [] },
    status: 'active',
    createdAt: Date.now() - 86400000 * 45,
    lastLogin: Date.now() - 7200000,
    ipAddress: '192.168.1.150',
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
  },
  {
    id: 'ub_2',
    userId: 'player_4',
    username: 'ToxicCommander',
    reason: 'Acoso persistente a otros jugadores - Múltiples reportes confirmados',
    type: 'temporary',
    bannedBy: 'admin_2',
    bannedAt: Date.now() - 86400000 * 2,
    expiresAt: Date.now() + 86400000 * 5, // 5 more days
    active: true
  },
  {
    id: 'ub_3',
    userId: 'player_5',
    username: 'MultiAccountUser',
    reason: 'Operación de múltiples cuentas para manipular rankings',
    type: 'temporary',
    bannedBy: 'admin_1',
    bannedAt: Date.now() - 86400000 * 10,
    expiresAt: Date.now() - 86400000 * 3, // Already expired
    active: false
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