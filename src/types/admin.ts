export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'support';
  permissions: AdminPermission[];
  createdAt: number;
  lastLogin: number;
  active: boolean;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'content' | 'security' | 'system' | 'communication';
}

export interface PlayerAccount {
  id: string;
  email: string;
  username: string;
  universeId: string;
  level: number;
  experience: number;
  rank: number;
  points: number;
  alliance?: string;
  planets: AdminPlanet[];
  resources: AdminResources;
  research: AdminResearch;
  fleet: AdminFleet;
  officers: AdminOfficers;
  status: 'active' | 'banned' | 'suspended' | 'vacation';
  createdAt: number;
  lastLogin: number;
  ipAddress: string;
  violations: Violation[];
  timeline: TimelineEvent[];
}

export interface AdminPlanet {
  id: string;
  name: string;
  coordinates: string;
  type: 'main' | 'colony';
  temperature: number;
  size: number;
  fields: number;
  usedFields: number;
  resources: AdminResources;
  buildings: AdminBuildings;
  production: AdminResources;
  debris: AdminResources;
  moons: AdminMoon[];
}

export interface AdminMoon {
  id: string;
  name: string;
  size: number;
  temperature: number;
  buildings: AdminBuildings;
  resources: AdminResources;
}

export interface AdminResources {
  metal: number;
  crystal: number;
  deuterium: number;
  energy: number;
  darkMatter: number;
}

export interface AdminBuildings {
  metalMine: number;
  crystalMine: number;
  deuteriumSynthesizer: number;
  solarPlant: number;
  fusionReactor: number;
  roboticsFactory: number;
  naniteFactory: number;
  shipyard: number;
  metalStorage: number;
  crystalStorage: number;
  deuteriumTank: number;
  researchLab: number;
  terraformer: number;
  allianceDepot: number;
  missileSilo: number;
}

export interface AdminResearch {
  energyTechnology: number;
  laserTechnology: number;
  ionTechnology: number;
  hyperspaceTechnology: number;
  plasmaTechnology: number;
  combustionDrive: number;
  impulseDrive: number;
  hyperspaceDrive: number;
  espionageTechnology: number;
  computerTechnology: number;
  astrophysics: number;
  intergalacticResearchNetwork: number;
  gravitonTechnology: number;
  weaponsTechnology: number;
  shieldingTechnology: number;
  armourTechnology: number;
}

export interface AdminFleet {
  smallCargo: number;
  largeCargo: number;
  lightFighter: number;
  heavyFighter: number;
  cruiser: number;
  battleship: number;
  colonyShip: number;
  recycler: number;
  espionageProbe: number;
  bomber: number;
  destroyer: number;
  deathstar: number;
  battlecruiser: number;
}

export interface AdminOfficers {
  darkMatter: number;
  officers: Array<{
    id: string;
    type: string;
    rank: number;
    active: boolean;
    experience: number;
  }>;
}

export interface Violation {
  id: string;
  type: 'cheating' | 'harassment' | 'spam' | 'inappropriate_name' | 'multi_account' | 'other';
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  reportedBy: string;
  reportedAt: number;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  penalty?: Penalty;
}

export interface Penalty {
  id: string;
  type: 'warning' | 'temporary_ban' | 'permanent_ban' | 'resource_reduction' | 'rank_reduction';
  duration?: number; // in hours
  reason: string;
  appliedBy: string;
  appliedAt: number;
  active: boolean;
}

export interface TimelineEvent {
  id: string;
  type: 'login' | 'logout' | 'battle' | 'building' | 'research' | 'trade' | 'violation' | 'penalty';
  description: string;
  timestamp: number;
  metadata?: any;
}

export interface AdminPvEMission {
  id: string;
  name: string;
  description: string;
  type: 'exploration' | 'combat' | 'diplomacy' | 'trade' | 'rescue' | 'artifact';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme' | 'legendary';
  universeId?: string; // If null, available in all universes
  requirements: {
    level?: number;
    research?: Partial<AdminResearch>;
    fleet?: Partial<AdminFleet>;
    alliance?: boolean;
  };
  rewards: {
    experience: number;
    resources?: AdminResources;
    technology?: string[];
    ships?: Partial<AdminFleet>;
    alienRace?: string;
    artifacts?: string[];
  };
  duration: number;
  cooldown: number;
  location: string;
  enemyFleet?: AdminFleet;
  enemyDefenses?: any;
  lore: string;
  image: string;
  active: boolean;
  createdBy: string;
  createdAt: number;
}

export interface AdminAlienRace {
  id: string;
  name: string;
  description: string;
  homeworld: string;
  type: 'peaceful' | 'neutral' | 'aggressive' | 'ancient' | 'mysterious';
  traits: {
    technology: number;
    military: number;
    diplomacy: number;
    trade: number;
    expansion: number;
  };
  specialties: string[];
  weaknesses: string[];
  preferredDiplomacy: 'alliance' | 'trade' | 'neutral' | 'hostile';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
  rewards: {
    technology?: string[];
    resources?: AdminResources;
    ships?: Partial<AdminFleet>;
  };
  lore: string;
  image: string;
  active: boolean;
  createdBy: string;
  createdAt: number;
}

export interface GlobalMessage {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'maintenance' | 'event' | 'warning' | 'celebration';
  priority: 'low' | 'medium' | 'high' | 'critical';
  targetAudience: 'all' | 'universe' | 'alliance' | 'specific_users';
  targetIds?: string[]; // Universe IDs, Alliance IDs, or User IDs
  scheduledFor?: number;
  expiresAt?: number;
  sentAt?: number;
  sentBy: string;
  status: 'draft' | 'scheduled' | 'sent' | 'expired';
  readBy: string[];
}

export interface IPBan {
  id: string;
  ipAddress: string;
  reason: string;
  bannedBy: string;
  bannedAt: number;
  expiresAt?: number;
  active: boolean;
}

export interface UserBan {
  id: string;
  userId: string;
  username: string;
  reason: string;
  type: 'temporary' | 'permanent';
  bannedBy: string;
  bannedAt: number;
  expiresAt?: number;
  active: boolean;
}

export interface SecurityLog {
  id: string;
  type: 'login_attempt' | 'failed_login' | 'suspicious_activity' | 'admin_action' | 'violation_report';
  userId?: string;
  ipAddress: string;
  userAgent: string;
  description: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: number;
  metadata?: any;
}

export interface PlatformConfig {
  id: string;
  category: 'general' | 'gameplay' | 'security' | 'communication' | 'features';
  key: string;
  value: any;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  updatedBy: string;
  updatedAt: number;
}

export interface UniverseConfig {
  id: string;
  name: string;
  description: string;
  type: 'standard' | 'speed' | 'peaceful' | 'hardcore';
  speed: number;
  maxPlayers: number;
  status: 'active' | 'new' | 'ending' | 'maintenance';
  startDate: number;
  endDate?: number;
  features: {
    alliances: boolean;
    officers: boolean;
    expeditions: boolean;
    acs: boolean;
    trade: boolean;
    [key: string]: boolean;
  };
  settings: {
    newbieProtection: number; // days
    fleetSpeed: number;
    economySpeed: number;
    researchSpeed: number;
    rapidFire: boolean;
    debrisField: number; // percentage
    [key: string]: any;
  };
  createdBy: string;
  createdAt: number;
}

export interface ExternalAPI {
  id: string;
  name: string;
  type: 'telegram' | 'discord' | 'email' | 'webhook' | 'analytics';
  endpoint: string;
  apiKey: string;
  active: boolean;
  settings: any;
  lastUsed?: number;
  createdBy: string;
  createdAt: number;
}

export interface AdminTemplate {
  id: string;
  name: string;
  type: 'message' | 'penalty' | 'mission' | 'alien_race' | 'news';
  content: any;
  description: string;
  category: string;
  createdBy: string;
  createdAt: number;
  usageCount: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  totalUniverses: number;
  totalBattles: number;
  totalMessages: number;
  securityIncidents: number;
  systemLoad: number;
  databaseSize: number;
  lastBackup: number;
}

export interface AdminState {
  currentAdmin: AdminUser | null;
  stats: AdminStats;
  selectedUniverse: string | null;
  loading: boolean;
  error: string | null;
}