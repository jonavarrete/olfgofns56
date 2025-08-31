export interface Player {
  id: string;
  username: string;
  email: string;
  level: number;
  experience: number;
  alliance?: string;
  rank: number;
  points: number;
  planets: Planet[];
  resources: Resources;
  research: Research;
  fleet: FleetShips;
}

export interface Planet {
  id: string;
  name: string;
  coordinates: string;
  type: 'main' | 'colony';
  temperature: number;
  size: number;
  fields: number;
  usedFields: number;
  resources: Resources;
  buildings: Buildings;
  production: ResourceProduction;
  debris: Resources;
}

export interface Resources {
  metal: number;
  crystal: number;
  deuterium: number;
  energy: number;
}

export interface ResourceProduction {
  metal: number;
  crystal: number;
  deuterium: number;
  energy: number;
}

export interface Buildings {
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

export interface Research {
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

export interface FleetShips {
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

export interface BuildingCost {
  metal: number;
  crystal: number;
  deuterium: number;
  energy?: number;
  time: number; // in seconds
}

export interface Mission {
  id: string;
  type: 'attack' | 'transport' | 'deploy' | 'spy' | 'colonize' | 'harvest';
  from: string;
  to: string;
  fleet: FleetShips;
  resources?: Resources;
  arrivalTime: number;
  returnTime: number;
  status: 'outbound' | 'returning' | 'completed';
}

export interface Alliance {
  id: string;
  name: string;
  tag: string;
  members: number;
  points: number;
  rank: number;
  description: string;
  banner?: {
    elements: BannerElement[];
    background: string;
  };
  foundedDate?: number;
  leader?: string;
  isPublic?: boolean;
  requiresApproval?: boolean;
}

export interface DiplomaticPact {
  id: string;
  name: string;
  alliance1: string; // Alliance ID
  alliance2: string; // Alliance ID
  types: PactType[];
  status: 'proposed' | 'pending_signature' | 'active' | 'expired' | 'cancelled';
  proposedBy: string; // Alliance ID
  proposedDate: number;
  signedDate?: number;
  expirationDate?: number;
  duration: number; // in days
  terms: PactTerms;
  signatures: {
    alliance1: boolean;
    alliance2: boolean;
  };
  benefits: PactBenefits;
  restrictions: PactRestrictions;
}

export type PactType = 
  | 'non_aggression'
  | 'trade_agreement'
  | 'military_alliance'
  | 'research_cooperation'
  | 'mutual_defense'
  | 'resource_sharing';

export interface PactTerms {
  description: string;
  conditions: string[];
  penalties: string[];
  renewalOptions: 'automatic' | 'manual' | 'none';
}

export interface PactBenefits {
  tradeDiscount?: number; // percentage
  resourceSharing?: {
    metal: number;
    crystal: number;
    deuterium: number;
  };
  militarySupport?: {
    fleetSharing: boolean;
    coordinatedAttacks: boolean;
    defenseAssistance: boolean;
  };
  researchBonus?: number; // percentage
  diplomaticImmunity?: boolean;
}

export interface PactRestrictions {
  noAttackZones?: string[]; // coordinates
  tradeLimitations?: string[];
  militaryLimitations?: string[];
  exclusivityClauses?: string[];
}

export interface BannerElement {
  id: string;
  type: 'shape' | 'symbol' | 'text';
  shape?: 'circle' | 'square' | 'triangle' | 'star' | 'shield';
  symbol?: 'crown' | 'sword' | 'lightning' | 'star' | 'shield';
  text?: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  layer: number;
}

export interface GameState {
  player: Player;
  selectedPlanet: Planet;
  missions: Mission[];
  messages: Message[];
  rankings: Player[];
  alliances: Alliance[];
  diplomaticPacts: DiplomaticPact[];
  notifications: Notification[];
  settings: GameSettings;
  combatReports: CombatReport[];
  constructionQueues: ConstructionQueues;
}

export interface ConstructionQueues {
  buildings: BuildingQueueItem[];
  research: ResearchQueueItem[];
  shipyard: ShipyardQueueItem[];
}

export interface BuildingQueueItem {
  id: string;
  planetId: string;
  planetName: string;
  building: keyof Buildings;
  level: number;
  startTime: number;
  endTime: number;
  cost: BuildingCost;
}

export interface ResearchQueueItem {
  id: string;
  research: keyof Research;
  level: number;
  startTime: number;
  endTime: number;
  cost: BuildingCost;
}

export interface ShipyardQueueItem {
  id: string;
  planetId: string;
  planetName: string;
  ship: keyof FleetShips;
  quantity: number;
  startTime: number;
  endTime: number;
  cost: BuildingCost;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: number;
  read: boolean;
  type: 'combat' | 'spy' | 'transport' | 'system' | 'alliance' | 'pve_mission' | 'faction';
  combatReport?: CombatReport;
  missionData?: {
    missionId: string;
    missionName: string;
    result: 'success' | 'failure' | 'partial';
    rewards?: {
      experience: number;
      resources?: Resources;
      technology?: string[];
      alienRace?: string;
    };
  };
  faction?: 'galactic_confederation' | 'democratic_order' | 'alien_race' | 'pirates' | 'traders';
}

export interface Notification {
  id: string;
  type: 'building' | 'research' | 'fleet' | 'attack' | 'message' | 'alliance';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  planetId?: string;
}

export interface GameSettings {
  language: 'es' | 'en' | 'fr' | 'de';
  theme: 'dark' | 'light' | 'auto';
  notifications: {
    sound: boolean;
    desktop: boolean;
    email: boolean;
    buildingComplete: boolean;
    researchComplete: boolean;
    fleetArrival: boolean;
    underAttack: boolean;
  };
  graphics: {
    quality: 'low' | 'medium' | 'high' | 'ultra';
    animations: boolean;
    particles: boolean;
    backgroundEffects: boolean;
  };
  gameplay: {
    autoRefresh: boolean;
    refreshInterval: number;
    confirmActions: boolean;
    showTooltips: boolean;
  };
}

export interface CombatReport {
  id: string;
  timestamp: number;
  attacker: {
    name: string;
    fleet: FleetShips;
    losses: FleetShips;
  };
  defender: {
    name: string;
    fleet: FleetShips;
    defenses: DefenseStructures;
    losses: FleetShips & DefenseStructures;
  };
  result: 'victory' | 'defeat' | 'draw';
  loot: Resources;
  debrisField: Resources;
  rounds: CombatRound[];
}

export interface CombatRound {
  round: number;
  attackerDamage: number;
  defenderDamage: number;
  attackerLosses: FleetShips;
  defenderLosses: FleetShips & DefenseStructures;
}

export interface DefenseStructures {
  rocketLauncher: number;
  lightLaser: number;
  heavyLaser: number;
  gaussCannon: number;
  ionCannon: number;
  plasmaTurret: number;
  smallShieldDome: number;
  largeShieldDome: number;
  antiBallisticMissiles: number;
  interplanetaryMissiles: number;
}

export interface SimulationResult {
  rounds: number;
  winner: 'attacker' | 'defender' | 'draw';
  attackerLosses: FleetShips;
  defenderLosses: FleetShips & DefenseStructures;
  loot: Resources;
  debrisField: Resources;
  probability: {
    attackerWins: number;
    defenderWins: number;
    draw: number;
  };
}

export interface AlienRace {
  id: string;
  name: string;
  description: string;
  homeworld: string;
  discovered: boolean;
  discoveryDate?: number;
  type: 'peaceful' | 'neutral' | 'aggressive' | 'ancient' | 'mysterious';
  traits: {
    technology: number; // 1-10
    military: number; // 1-10
    diplomacy: number; // 1-10
    trade: number; // 1-10
    expansion: number; // 1-10
  };
  specialties: string[];
  weaknesses: string[];
  preferredDiplomacy: 'alliance' | 'trade' | 'neutral' | 'hostile';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
  rewards: {
    technology?: string[];
    resources?: Resources;
    ships?: Partial<FleetShips>;
  };
  lore: string;
  image: string;
}

export interface PvEMission {
  id: string;
  name: string;
  description: string;
  type: 'exploration' | 'combat' | 'diplomacy' | 'trade' | 'rescue' | 'artifact';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme' | 'legendary';
  status: 'available' | 'active' | 'completed' | 'failed' | 'locked';
  requirements: {
    level?: number;
    research?: Partial<Research>;
    fleet?: Partial<FleetShips>;
    alliance?: boolean;
  };
  rewards: {
    experience: number;
    resources?: Resources;
    technology?: string[];
    ships?: Partial<FleetShips>;
    alienRace?: string;
    artifacts?: string[];
  };
  duration: number; // in minutes
  cooldown: number; // in hours
  lastCompleted?: number;
  progress: number; // 0-100
  location: string;
  enemyFleet?: FleetShips;
  enemyDefenses?: DefenseStructures;
  lore: string;
  image: string;
}