import { Player, Planet, Buildings, Research, FleetShips, Resources, Mission, Alliance, Message } from '../types/game';

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