import { Player, Planet, Buildings, Research, FleetShips, Resources, Mission, Alliance, Message } from '../types/game';
import { DiplomaticPact } from '../types/game';

export const mockResources: Resources = {
  metal: 150000,
  crystal: 75000,
  deuterium: 25000,
  energy: 12000,
};

export const mockBuildings: Buildings = {
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
};

export const mockResearch: Research = {
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
};

export const mockFleet: FleetShips = {
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
};

export const mockPlanets: Planet[] = [
  {
    id: '1',
    name: 'Planeta Principal',
    coordinates: '1:2:3',
    type: 'main',
    temperature: 25,
    size: 188,
    fields: 188,
    usedFields: 145,
    resources: mockResources,
    buildings: mockBuildings,
    production: {
      metal: 3600,
      crystal: 1800,
      deuterium: 900,
      energy: 2400,
    },
  },
  {
    id: '2',
    name: 'Colonia Alpha',
    coordinates: '2:4:8',
    type: 'colony',
    temperature: -45,
    size: 163,
    fields: 163,
    usedFields: 89,
    resources: {
      metal: 89000,
      crystal: 45000,
      deuterium: 18000,
      energy: 8000,
    },
    buildings: {
      ...mockBuildings,
      metalMine: 8,
      crystalMine: 7,
      deuteriumSynthesizer: 9,
      solarPlant: 10,
      fusionReactor: 2,
    },
    production: {
      metal: 2400,
      crystal: 1200,
      deuterium: 1200,
      energy: 1800,
    },
  },
];

export const mockPlayer: Player = {
  id: '1',
  username: 'SpaceCommander',
  email: 'commander@galaxy.com',
  level: 25,
  experience: 156890,
  alliance: 'Galactic Federation',
  rank: 42,
  points: 89567,
  planets: mockPlanets,
  resources: mockResources,
  research: mockResearch,
  fleet: mockFleet,
};

export const mockMissions: Mission[] = [
  {
    id: '1',
    type: 'attack',
    from: '1:2:3',
    to: '3:4:5',
    fleet: {
      ...Object.fromEntries(Object.keys(mockFleet).map(key => [key, 0])) as FleetShips,
      lightFighter: 25,
      heavyFighter: 12,
      cruiser: 5,
    },
    arrivalTime: Date.now() + 3600000,
    returnTime: Date.now() + 7200000,
    status: 'outbound',
  },
  {
    id: '2',
    type: 'transport',
    from: '2:4:8',
    to: '1:2:3',
    fleet: {
      ...Object.fromEntries(Object.keys(mockFleet).map(key => [key, 0])) as FleetShips,
      largeCargo: 8,
    },
    resources: {
      metal: 50000,
      crystal: 25000,
      deuterium: 10000,
      energy: 0,
    },
    arrivalTime: Date.now() + 1800000,
    returnTime: Date.now() + 3600000,
    status: 'returning',
  },
];

export const mockAlliances: Alliance[] = [
  {
    id: '1',
    name: 'Galactic Federation',
    tag: 'GFED',
    members: 47,
    points: 2456789,
    rank: 3,
    description: 'Una alianza de comandantes espaciales dedicados a la exploración y defensa mutual.',
  },
  {
    id: '2',
    name: 'Dark Empire',
    tag: 'DARK',
    members: 62,
    points: 3567890,
    rank: 1,
    description: 'Los conquistadores del espacio profundo.',
  },
  {
    id: '3',
    name: 'Star Traders',
    tag: 'STAR',
    members: 38,
    points: 1890456,
    rank: 7,
    description: 'Comerciantes y exploradores de nuevos mundos.',
  },
];

export const mockRankings: Player[] = [
  {
    ...mockPlayer,
    id: '1',
    username: 'SpaceEmperor',
    rank: 1,
    points: 567890,
  },
  {
    ...mockPlayer,
    id: '2',
    username: 'GalacticLord',
    rank: 2,
    points: 445678,
  },
  {
    ...mockPlayer,
    id: '3',
    username: 'StarConqueror',
    rank: 3,
    points: 389456,
  },
  {
    ...mockPlayer,
    id: '4',
    username: 'SpaceCommander',
    rank: 42,
    points: 89567,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    from: 'Sistema',
    to: 'SpaceCommander',
    subject: 'Construcción completada',
    content: 'Tu Mina de Metal nivel 12 ha sido completada en el planeta Principal.',
    timestamp: Date.now() - 3600000,
    read: false,
    type: 'system',
  },
  {
    id: '2',
    from: 'StarConqueror',
    to: 'SpaceCommander',
    subject: 'Propuesta de intercambio',
    content: 'Hola, ¿te interesaría intercambiar deuterio por cristal? Tengo una buena oferta.',
    timestamp: Date.now() - 7200000,
    read: true,
    type: 'system',
  },
  {
    id: '3',
    from: 'Sistema de Combate',
    to: 'SpaceCommander',
    subject: 'Reporte de Ataque',
    content: 'Tu flota ha regresado victoriosa del ataque a las coordenadas 3:4:5.',
    timestamp: Date.now() - 10800000,
    read: false,
    type: 'combat',
  },
];

export const mockDiplomaticPacts: DiplomaticPact[] = [
  {
    id: '1',
    name: 'Pacto de Cooperación Galáctica',
    alliance1: '1', // Galactic Federation
    alliance2: '3', // Star Traders
    types: ['non_aggression', 'trade_agreement', 'research_cooperation'],
    status: 'active',
    proposedBy: '1',
    proposedDate: Date.now() - 86400000 * 30,
    signedDate: Date.now() - 86400000 * 25,
    expirationDate: Date.now() + 86400000 * 60,
    duration: 90,
    terms: {
      description: 'Pacto integral de cooperación que incluye no agresión, comercio preferencial y colaboración en investigación.',
      conditions: [
        'Prohibido atacar territorios de la alianza firmante',
        'Descuento del 20% en intercambios comerciales',
        'Compartir avances en tecnologías de nivel básico',
        'Asistencia mutua en caso de ataques de terceros'
      ],
      penalties: [
        'Ruptura automática del pacto por agresión',
        'Compensación de 500,000 recursos por violación comercial',
        'Bloqueo diplomático por 30 días'
      ],
      renewalOptions: 'manual'
    },
    signatures: {
      alliance1: true,
      alliance2: true
    },
    benefits: {
      tradeDiscount: 20,
      researchBonus: 10,
      diplomaticImmunity: true
    },
    restrictions: {
      noAttackZones: ['2:4:*', '3:1:*'],
      exclusivityClauses: ['No pactos militares con Dark Empire']
    }
  },
  {
    id: '2',
    name: 'Propuesta de Alianza Militar',
    alliance1: '1', // Galactic Federation
    alliance2: '3', // Star Traders
    types: ['military_alliance', 'mutual_defense'],
    status: 'pending_signature',
    proposedBy: '1',
    proposedDate: Date.now() - 86400000 * 3,
    duration: 180,
    terms: {
      description: 'Alianza militar completa con defensa mutua y operaciones coordinadas.',
      conditions: [
        'Asistencia militar obligatoria en caso de ataque',
        'Coordinación de ataques contra enemigos comunes',
        'Compartir inteligencia militar',
        'Acceso a bases militares aliadas'
      ],
      penalties: [
        'Exclusión de futuras alianzas por 6 meses',
        'Compensación militar equivalente a daños'
      ],
      renewalOptions: 'automatic'
    },
    signatures: {
      alliance1: true,
      alliance2: false
    },
    benefits: {
      militarySupport: {
        fleetSharing: true,
        coordinatedAttacks: true,
        defenseAssistance: true
      }
    },
    restrictions: {
      exclusivityClauses: ['No pactos con alianzas enemigas', 'Consulta obligatoria para declaraciones de guerra']
    }
  },
  {
    id: '3',
    name: 'Acuerdo de Intercambio de Recursos',
    alliance1: '1', // Galactic Federation
    alliance2: '2', // Dark Empire (proposed but not signed)
    types: ['trade_agreement', 'resource_sharing'],
    status: 'proposed',
    proposedBy: '2',
    proposedDate: Date.now() - 86400000 * 1,
    duration: 45,
    terms: {
      description: 'Acuerdo comercial limitado para intercambio de recursos específicos.',
      conditions: [
        'Intercambio semanal de 100K metal por 50K cristal',
        'Rutas comerciales protegidas',
        'Precios fijos durante la vigencia del acuerdo'
      ],
      penalties: [
        'Multa del 50% del valor comercial por incumplimiento'
      ],
      renewalOptions: 'manual'
    },
    signatures: {
      alliance1: false,
      alliance2: true
    },
    benefits: {
      tradeDiscount: 15,
      resourceSharing: {
        metal: 100000,
        crystal: 50000,
        deuterium: 25000
      }
    },
    restrictions: {
      tradeLimitations: ['Solo recursos básicos', 'Máximo 500K por semana']
    }
  }
];