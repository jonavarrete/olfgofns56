import { Buildings, Research, FleetShips, DefenseStructures } from '../types/game';

export interface TechnologyRequirement {
  type: 'building' | 'research';
  key: string;
  level: number;
}

export interface TechnologyNode {
  id: string;
  name: string;
  description: string;
  category: 'building' | 'research' | 'ship' | 'defense';
  requirements: TechnologyRequirement[];
  unlocks: string[]; // IDs of technologies this unlocks
  cost: {
    base: {
      metal: number;
      crystal: number;
      deuterium: number;
      energy?: number;
      time: number; // in seconds
    };
    factor: number; // Multiplier for each level
  };
  maxLevel?: number; // For ships/defenses, this is undefined (unlimited)
}

// Building Dependencies
export const buildingTree: { [key in keyof Buildings]: TechnologyNode } = {
  metalMine: {
    id: 'metalMine',
    name: 'Mina de Metal',
    description: 'Extrae metal del núcleo planetario',
    category: 'building',
    requirements: [],
    unlocks: ['roboticsFactory', 'shipyard'],
    cost: {
      base: { metal: 60, crystal: 15, deuterium: 0, time: 60 },
      factor: 1.5
    }
  },
  crystalMine: {
    id: 'crystalMine',
    name: 'Mina de Cristal',
    description: 'Extrae cristales preciosos',
    category: 'building',
    requirements: [],
    unlocks: ['roboticsFactory', 'shipyard'],
    cost: {
      base: { metal: 48, crystal: 24, deuterium: 0, time: 60 },
      factor: 1.6
    }
  },
  deuteriumSynthesizer: {
    id: 'deuteriumSynthesizer',
    name: 'Sintetizador de Deuterio',
    description: 'Sintetiza deuterio del agua pesada',
    category: 'building',
    requirements: [],
    unlocks: ['fusionReactor'],
    cost: {
      base: { metal: 225, crystal: 75, deuterium: 0, time: 180 },
      factor: 1.5
    }
  },
  solarPlant: {
    id: 'solarPlant',
    name: 'Planta Solar',
    description: 'Genera energía solar',
    category: 'building',
    requirements: [],
    unlocks: ['fusionReactor'],
    cost: {
      base: { metal: 75, crystal: 30, deuterium: 0, time: 120 },
      factor: 1.5
    }
  },
  fusionReactor: {
    id: 'fusionReactor',
    name: 'Planta de Fusión',
    description: 'Reactor de fusión avanzado',
    category: 'building',
    requirements: [
      { type: 'building', key: 'deuteriumSynthesizer', level: 5 },
      { type: 'research', key: 'energyTechnology', level: 3 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 900, crystal: 360, deuterium: 180, time: 600 },
      factor: 1.8
    }
  },
  roboticsFactory: {
    id: 'roboticsFactory',
    name: 'Fábrica de Robots',
    description: 'Acelera la construcción',
    category: 'building',
    requirements: [
      { type: 'building', key: 'metalMine', level: 2 },
      { type: 'building', key: 'crystalMine', level: 1 }
    ],
    unlocks: ['shipyard', 'naniteFactory'],
    cost: {
      base: { metal: 400, crystal: 120, deuterium: 200, time: 300 },
      factor: 2.0
    }
  },
  naniteFactory: {
    id: 'naniteFactory',
    name: 'Fábrica de Nanitas',
    description: 'Construcción ultra rápida',
    category: 'building',
    requirements: [
      { type: 'building', key: 'roboticsFactory', level: 10 },
      { type: 'research', key: 'computerTechnology', level: 10 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 1000000, crystal: 500000, deuterium: 100000, time: 86400 },
      factor: 2.0
    }
  },
  shipyard: {
    id: 'shipyard',
    name: 'Hangar',
    description: 'Construye naves espaciales',
    category: 'building',
    requirements: [
      { type: 'building', key: 'roboticsFactory', level: 2 }
    ],
    unlocks: ['smallCargo', 'largeCargo', 'lightFighter', 'heavyFighter'],
    cost: {
      base: { metal: 400, crystal: 200, deuterium: 100, time: 450 },
      factor: 2.0
    }
  },
  metalStorage: {
    id: 'metalStorage',
    name: 'Almacén de Metal',
    description: 'Almacena metal',
    category: 'building',
    requirements: [],
    unlocks: [],
    cost: {
      base: { metal: 1000, crystal: 0, deuterium: 0, time: 180 },
      factor: 2.0
    }
  },
  crystalStorage: {
    id: 'crystalStorage',
    name: 'Almacén de Cristal',
    description: 'Almacena cristal',
    category: 'building',
    requirements: [],
    unlocks: [],
    cost: {
      base: { metal: 1000, crystal: 500, deuterium: 0, time: 180 },
      factor: 2.0
    }
  },
  deuteriumTank: {
    id: 'deuteriumTank',
    name: 'Tanque de Deuterio',
    description: 'Almacena deuterio',
    category: 'building',
    requirements: [],
    unlocks: [],
    cost: {
      base: { metal: 1000, crystal: 1000, deuterium: 0, time: 180 },
      factor: 2.0
    }
  },
  researchLab: {
    id: 'researchLab',
    name: 'Laboratorio de Investigación',
    description: 'Permite investigar tecnologías',
    category: 'building',
    requirements: [],
    unlocks: ['energyTechnology', 'laserTechnology', 'weaponsTechnology'],
    cost: {
      base: { metal: 200, crystal: 400, deuterium: 200, time: 300 },
      factor: 2.0
    }
  },
  terraformer: {
    id: 'terraformer',
    name: 'Terraformador',
    description: 'Aumenta los campos del planeta',
    category: 'building',
    requirements: [
      { type: 'building', key: 'naniteFactory', level: 1 },
      { type: 'research', key: 'energyTechnology', level: 12 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 0, crystal: 50000, deuterium: 100000, energy: 1000, time: 7200 },
      factor: 2.0
    }
  },
  allianceDepot: {
    id: 'allianceDepot',
    name: 'Depósito de Alianza',
    description: 'Permite ayuda de alianza',
    category: 'building',
    requirements: [],
    unlocks: [],
    cost: {
      base: { metal: 20000, crystal: 40000, deuterium: 0, time: 1800 },
      factor: 2.0
    }
  },
  missileSilo: {
    id: 'missileSilo',
    name: 'Silo de Misiles',
    description: 'Construye misiles defensivos',
    category: 'building',
    requirements: [
      { type: 'building', key: 'shipyard', level: 1 }
    ],
    unlocks: ['antiBallisticMissiles', 'interplanetaryMissiles'],
    cost: {
      base: { metal: 20000, crystal: 20000, deuterium: 1000, time: 1800 },
      factor: 2.0
    }
  }
};

// Research Dependencies
export const researchTree: { [key in keyof Research]: TechnologyNode } = {
  energyTechnology: {
    id: 'energyTechnology',
    name: 'Tecnología de Energía',
    description: 'Mejora la eficiencia energética',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 1 }
    ],
    unlocks: ['laserTechnology', 'ionTechnology', 'hyperspaceTechnology', 'plasmaTechnology'],
    cost: {
      base: { metal: 0, crystal: 800, deuterium: 400, time: 1800 },
      factor: 2.0
    }
  },
  laserTechnology: {
    id: 'laserTechnology',
    name: 'Tecnología Láser',
    description: 'Tecnología de armas láser',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 1 },
      { type: 'research', key: 'energyTechnology', level: 2 }
    ],
    unlocks: ['lightLaser', 'heavyLaser', 'ionTechnology'],
    cost: {
      base: { metal: 200, crystal: 100, deuterium: 0, time: 900 },
      factor: 2.0
    }
  },
  ionTechnology: {
    id: 'ionTechnology',
    name: 'Tecnología Iónica',
    description: 'Tecnología de iones',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 4 },
      { type: 'research', key: 'laserTechnology', level: 5 },
      { type: 'research', key: 'energyTechnology', level: 4 }
    ],
    unlocks: ['ionCannon'],
    cost: {
      base: { metal: 1000, crystal: 300, deuterium: 100, time: 1800 },
      factor: 2.0
    }
  },
  hyperspaceTechnology: {
    id: 'hyperspaceTechnology',
    name: 'Tecnología Hiperespacio',
    description: 'Manipulación del hiperespacio',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 7 },
      { type: 'research', key: 'energyTechnology', level: 5 },
      { type: 'research', key: 'shieldingTechnology', level: 5 }
    ],
    unlocks: ['hyperspaceDrive'],
    cost: {
      base: { metal: 0, crystal: 4000, deuterium: 2000, time: 4500 },
      factor: 2.0
    }
  },
  plasmaTechnology: {
    id: 'plasmaTechnology',
    name: 'Tecnología de Plasma',
    description: 'Armas de plasma avanzadas',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 4 },
      { type: 'research', key: 'energyTechnology', level: 8 },
      { type: 'research', key: 'laserTechnology', level: 10 },
      { type: 'research', key: 'ionTechnology', level: 5 }
    ],
    unlocks: ['plasmaTurret'],
    cost: {
      base: { metal: 2000, crystal: 4000, deuterium: 1000, time: 7200 },
      factor: 2.0
    }
  },
  combustionDrive: {
    id: 'combustionDrive',
    name: 'Motor de Combustión',
    description: 'Propulsión básica para naves',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 1 },
      { type: 'research', key: 'energyTechnology', level: 1 }
    ],
    unlocks: ['smallCargo', 'largeCargo', 'lightFighter', 'espionageProbe'],
    cost: {
      base: { metal: 400, crystal: 0, deuterium: 600, time: 1200 },
      factor: 2.0
    }
  },
  impulseDrive: {
    id: 'impulseDrive',
    name: 'Motor de Impulso',
    description: 'Propulsión avanzada',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 2 },
      { type: 'research', key: 'energyTechnology', level: 1 }
    ],
    unlocks: ['heavyFighter', 'cruiser', 'battleship', 'bomber'],
    cost: {
      base: { metal: 2000, crystal: 4000, deuterium: 600, time: 2700 },
      factor: 2.0
    }
  },
  hyperspaceDrive: {
    id: 'hyperspaceDrive',
    name: 'Motor Hiperespacio',
    description: 'Propulsión de hiperespacio',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 7 },
      { type: 'research', key: 'hyperspaceTechnology', level: 3 }
    ],
    unlocks: ['colonyShip', 'recycler', 'destroyer', 'deathstar', 'battlecruiser'],
    cost: {
      base: { metal: 10000, crystal: 20000, deuterium: 6000, time: 10800 },
      factor: 2.0
    }
  },
  espionageTechnology: {
    id: 'espionageTechnology',
    name: 'Tecnología de Espionaje',
    description: 'Sistemas de espionaje avanzados',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 3 }
    ],
    unlocks: ['espionageProbe'],
    cost: {
      base: { metal: 200, crystal: 1000, deuterium: 200, time: 1800 },
      factor: 2.0
    }
  },
  computerTechnology: {
    id: 'computerTechnology',
    name: 'Tecnología de Computación',
    description: 'Sistemas informáticos avanzados',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 1 }
    ],
    unlocks: ['naniteFactory'],
    cost: {
      base: { metal: 0, crystal: 400, deuterium: 600, time: 1200 },
      factor: 2.0
    }
  },
  astrophysics: {
    id: 'astrophysics',
    name: 'Astrofísica',
    description: 'Permite colonizar más planetas',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 3 },
      { type: 'research', key: 'espionageTechnology', level: 4 },
      { type: 'research', key: 'impulseDrive', level: 3 }
    ],
    unlocks: ['colonyShip'],
    cost: {
      base: { metal: 4000, crystal: 8000, deuterium: 4000, time: 7200 },
      factor: 1.75
    }
  },
  intergalacticResearchNetwork: {
    id: 'intergalacticResearchNetwork',
    name: 'Red de Investigación Intergaláctica',
    description: 'Conecta laboratorios de investigación',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 10 },
      { type: 'research', key: 'computerTechnology', level: 8 },
      { type: 'research', key: 'hyperspaceTechnology', level: 8 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 240000, crystal: 400000, deuterium: 160000, time: 28800 },
      factor: 2.0
    }
  },
  gravitonTechnology: {
    id: 'gravitonTechnology',
    name: 'Tecnología Gravitón',
    description: 'Manipulación gravitacional',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 12 }
    ],
    unlocks: ['deathstar'],
    cost: {
      base: { metal: 0, crystal: 0, deuterium: 0, energy: 300000, time: 86400 },
      factor: 3.0
    }
  },
  weaponsTechnology: {
    id: 'weaponsTechnology',
    name: 'Tecnología de Armas',
    description: 'Mejora el daño de combate',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 4 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 800, crystal: 200, deuterium: 0, time: 1800 },
      factor: 2.0
    }
  },
  shieldingTechnology: {
    id: 'shieldingTechnology',
    name: 'Tecnología de Escudos',
    description: 'Mejora los escudos defensivos',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 6 },
      { type: 'research', key: 'energyTechnology', level: 3 }
    ],
    unlocks: ['smallShieldDome', 'largeShieldDome'],
    cost: {
      base: { metal: 200, crystal: 600, deuterium: 0, time: 1800 },
      factor: 2.0
    }
  },
  armourTechnology: {
    id: 'armourTechnology',
    name: 'Tecnología de Blindaje',
    description: 'Mejora el blindaje de unidades',
    category: 'research',
    requirements: [
      { type: 'building', key: 'researchLab', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 1000, crystal: 0, deuterium: 0, time: 1800 },
      factor: 2.0
    }
  }
};

// Ship Dependencies
export const shipTree: { [key in keyof FleetShips]: TechnologyNode } = {
  smallCargo: {
    id: 'smallCargo',
    name: 'Nave de Carga Pequeña',
    description: 'Transporte básico de recursos',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 2 },
      { type: 'research', key: 'combustionDrive', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 2000, crystal: 2000, deuterium: 0, time: 900 },
      factor: 1.0
    }
  },
  largeCargo: {
    id: 'largeCargo',
    name: 'Nave de Carga Grande',
    description: 'Transporte masivo de recursos',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 4 },
      { type: 'research', key: 'combustionDrive', level: 6 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 6000, crystal: 6000, deuterium: 0, time: 2700 },
      factor: 1.0
    }
  },
  lightFighter: {
    id: 'lightFighter',
    name: 'Cazador Ligero',
    description: 'Caza básico de combate',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 1 },
      { type: 'research', key: 'combustionDrive', level: 1 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 3000, crystal: 1000, deuterium: 0, time: 1200 },
      factor: 1.0
    }
  },
  heavyFighter: {
    id: 'heavyFighter',
    name: 'Cazador Pesado',
    description: 'Caza avanzado de combate',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 3 },
      { type: 'research', key: 'armourTechnology', level: 2 },
      { type: 'research', key: 'impulseDrive', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 6000, crystal: 4000, deuterium: 0, time: 2700 },
      factor: 1.0
    }
  },
  cruiser: {
    id: 'cruiser',
    name: 'Crucero',
    description: 'Nave de guerra media',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 5 },
      { type: 'research', key: 'impulseDrive', level: 4 },
      { type: 'research', key: 'ionTechnology', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 20000, crystal: 7000, deuterium: 2000, time: 5400 },
      factor: 1.0
    }
  },
  battleship: {
    id: 'battleship',
    name: 'Nave de Batalla',
    description: 'Nave de guerra pesada',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 7 },
      { type: 'research', key: 'hyperspaceDrive', level: 4 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 45000, crystal: 15000, deuterium: 0, time: 10800 },
      factor: 1.0
    }
  },
  colonyShip: {
    id: 'colonyShip',
    name: 'Nave Colonizadora',
    description: 'Coloniza nuevos planetas',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 4 },
      { type: 'research', key: 'impulseDrive', level: 3 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 10000, crystal: 20000, deuterium: 10000, time: 14400 },
      factor: 1.0
    }
  },
  recycler: {
    id: 'recycler',
    name: 'Reciclador',
    description: 'Recoge escombros espaciales',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 4 },
      { type: 'research', key: 'combustionDrive', level: 6 },
      { type: 'research', key: 'shieldingTechnology', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 10000, crystal: 6000, deuterium: 2000, time: 3600 },
      factor: 1.0
    }
  },
  espionageProbe: {
    id: 'espionageProbe',
    name: 'Sonda de Espionaje',
    description: 'Espía planetas enemigos',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 3 },
      { type: 'research', key: 'combustionDrive', level: 3 },
      { type: 'research', key: 'espionageTechnology', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 0, crystal: 1000, deuterium: 0, time: 300 },
      factor: 1.0
    }
  },
  bomber: {
    id: 'bomber',
    name: 'Bombardero',
    description: 'Destruye defensas planetarias',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 8 },
      { type: 'research', key: 'impulseDrive', level: 6 },
      { type: 'research', key: 'plasmaTechnology', level: 5 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 50000, crystal: 25000, deuterium: 15000, time: 18000 },
      factor: 1.0
    }
  },
  destroyer: {
    id: 'destroyer',
    name: 'Destructor',
    description: 'Caza bombarderos enemigos',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 9 },
      { type: 'research', key: 'hyperspaceDrive', level: 6 },
      { type: 'research', key: 'hyperspaceTechnology', level: 5 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 60000, crystal: 50000, deuterium: 15000, time: 21600 },
      factor: 1.0
    }
  },
  deathstar: {
    id: 'deathstar',
    name: 'Estrella de la Muerte',
    description: 'Superarma definitiva',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 12 },
      { type: 'research', key: 'hyperspaceDrive', level: 7 },
      { type: 'research', key: 'hyperspaceTechnology', level: 6 },
      { type: 'research', key: 'gravitonTechnology', level: 1 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 5000000, crystal: 4000000, deuterium: 1000000, time: 1728000 },
      factor: 1.0
    }
  },
  battlecruiser: {
    id: 'battlecruiser',
    name: 'Crucero de Batalla',
    description: 'Nave de guerra rápida y poderosa',
    category: 'ship',
    requirements: [
      { type: 'building', key: 'shipyard', level: 8 },
      { type: 'research', key: 'hyperspaceTechnology', level: 5 },
      { type: 'research', key: 'hyperspaceDrive', level: 5 },
      { type: 'research', key: 'laserTechnology', level: 12 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 30000, crystal: 40000, deuterium: 15000, time: 14400 },
      factor: 1.0
    }
  }
};

// Defense Dependencies
export const defenseTree: { [key in keyof DefenseStructures]: TechnologyNode } = {
  rocketLauncher: {
    id: 'rocketLauncher',
    name: 'Lanzamisiles',
    description: 'Defensa básica planetaria',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 1 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 2000, crystal: 0, deuterium: 0, time: 600 },
      factor: 1.0
    }
  },
  lightLaser: {
    id: 'lightLaser',
    name: 'Láser Ligero',
    description: 'Defensa láser básica',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 2 },
      { type: 'research', key: 'energyTechnology', level: 1 },
      { type: 'research', key: 'laserTechnology', level: 3 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 1500, crystal: 500, deuterium: 0, time: 900 },
      factor: 1.0
    }
  },
  heavyLaser: {
    id: 'heavyLaser',
    name: 'Láser Pesado',
    description: 'Defensa láser avanzada',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 4 },
      { type: 'research', key: 'energyTechnology', level: 3 },
      { type: 'research', key: 'laserTechnology', level: 6 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 6000, crystal: 2000, deuterium: 0, time: 1800 },
      factor: 1.0
    }
  },
  gaussCannon: {
    id: 'gaussCannon',
    name: 'Cañón Gauss',
    description: 'Artillería electromagnética',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 6 },
      { type: 'research', key: 'energyTechnology', level: 6 },
      { type: 'research', key: 'weaponsTechnology', level: 3 },
      { type: 'research', key: 'shieldingTechnology', level: 1 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 20000, crystal: 15000, deuterium: 2000, time: 3600 },
      factor: 1.0
    }
  },
  ionCannon: {
    id: 'ionCannon',
    name: 'Cañón Iónico',
    description: 'Defensa iónica especializada',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 4 },
      { type: 'research', key: 'ionTechnology', level: 4 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 2000, crystal: 6000, deuterium: 0, time: 2700 },
      factor: 1.0
    }
  },
  plasmaTurret: {
    id: 'plasmaTurret',
    name: 'Torreta de Plasma',
    description: 'Defensa de plasma devastadora',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 8 },
      { type: 'research', key: 'plasmaTechnology', level: 7 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 50000, crystal: 50000, deuterium: 30000, time: 28800 },
      factor: 1.0
    }
  },
  smallShieldDome: {
    id: 'smallShieldDome',
    name: 'Cúpula de Escudo Pequeña',
    description: 'Escudo planetario básico',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 1 },
      { type: 'research', key: 'shieldingTechnology', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 10000, crystal: 10000, deuterium: 0, time: 3600 },
      factor: 1.0
    },
    maxLevel: 1
  },
  largeShieldDome: {
    id: 'largeShieldDome',
    name: 'Cúpula de Escudo Grande',
    description: 'Escudo planetario avanzado',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'shipyard', level: 6 },
      { type: 'research', key: 'shieldingTechnology', level: 6 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 50000, crystal: 50000, deuterium: 0, time: 14400 },
      factor: 1.0
    },
    maxLevel: 1
  },
  antiBallisticMissiles: {
    id: 'antiBallisticMissiles',
    name: 'Misiles Antibalísticos',
    description: 'Intercepta misiles enemigos',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'missileSilo', level: 2 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 8000, crystal: 0, deuterium: 2000, time: 2400 },
      factor: 1.0
    }
  },
  interplanetaryMissiles: {
    id: 'interplanetaryMissiles',
    name: 'Misiles Interplanetarios',
    description: 'Ataca defensas enemigas',
    category: 'defense',
    requirements: [
      { type: 'building', key: 'missileSilo', level: 4 },
      { type: 'research', key: 'impulseDrive', level: 1 }
    ],
    unlocks: [],
    cost: {
      base: { metal: 12500, crystal: 2500, deuterium: 10000, time: 3600 },
      factor: 1.0
    }
  }
};

// Utility functions
export class TechnologyTreeUtils {
  static getAllTechnologies(): TechnologyNode[] {
    return [
      ...Object.values(buildingTree),
      ...Object.values(researchTree),
      ...Object.values(shipTree),
      ...Object.values(defenseTree)
    ];
  }

  static getTechnologyById(id: string): TechnologyNode | undefined {
    return this.getAllTechnologies().find(tech => tech.id === id);
  }

  static checkRequirements(
    technologyId: string, 
    buildings: Buildings, 
    research: Research
  ): { canBuild: boolean; missingRequirements: TechnologyRequirement[] } {
    const technology = this.getTechnologyById(technologyId);
    if (!technology) return { canBuild: false, missingRequirements: [] };

    const missingRequirements: TechnologyRequirement[] = [];

    for (const requirement of technology.requirements) {
      if (requirement.type === 'building') {
        const currentLevel = buildings[requirement.key as keyof Buildings] || 0;
        if (currentLevel < requirement.level) {
          missingRequirements.push(requirement);
        }
      } else if (requirement.type === 'research') {
        const currentLevel = research[requirement.key as keyof Research] || 0;
        if (currentLevel < requirement.level) {
          missingRequirements.push(requirement);
        }
      }
    }

    return {
      canBuild: missingRequirements.length === 0,
      missingRequirements
    };
  }

  static calculateCost(technologyId: string, level: number): {
    metal: number;
    crystal: number;
    deuterium: number;
    energy: number;
    time: number;
  } {
    const technology = this.getTechnologyById(technologyId);
    if (!technology) {
      return { metal: 0, crystal: 0, deuterium: 0, energy: 0, time: 0 };
    }

    const factor = Math.pow(technology.cost.factor, level - 1);
    
    return {
      metal: Math.floor(technology.cost.base.metal * factor),
      crystal: Math.floor(technology.cost.base.crystal * factor),
      deuterium: Math.floor(technology.cost.base.deuterium * factor),
      energy: Math.floor((technology.cost.base.energy || 0) * factor),
      time: Math.floor(technology.cost.base.time * factor)
    };
  }

  static getUnlockedTechnologies(buildings: Buildings, research: Research): string[] {
    const unlocked: string[] = [];
    
    this.getAllTechnologies().forEach(tech => {
      const { canBuild } = this.checkRequirements(tech.id, buildings, research);
      if (canBuild) {
        unlocked.push(tech.id);
      }
    });

    return unlocked;
  }

  static getTechnologyDependents(technologyId: string): TechnologyNode[] {
    return this.getAllTechnologies().filter(tech =>
      tech.requirements.some(req => req.key === technologyId)
    );
  }

  static getTechnologyPath(targetId: string): TechnologyNode[] {
    const target = this.getTechnologyById(targetId);
    if (!target) return [];

    const path: TechnologyNode[] = [];
    const visited = new Set<string>();

    const buildPath = (techId: string) => {
      if (visited.has(techId)) return;
      visited.add(techId);

      const tech = this.getTechnologyById(techId);
      if (!tech) return;

      // Add requirements first
      tech.requirements.forEach(req => {
        buildPath(req.key);
      });

      // Then add this technology
      if (!path.find(p => p.id === techId)) {
        path.push(tech);
      }
    };

    buildPath(targetId);
    return path;
  }

  static getRequirementText(requirement: TechnologyRequirement): string {
    const names: { [key: string]: string } = {
      // Buildings
      metalMine: 'Mina de Metal',
      crystalMine: 'Mina de Cristal',
      deuteriumSynthesizer: 'Sintetizador de Deuterio',
      solarPlant: 'Planta Solar',
      fusionReactor: 'Planta de Fusión',
      roboticsFactory: 'Fábrica de Robots',
      naniteFactory: 'Fábrica de Nanitas',
      shipyard: 'Hangar',
      researchLab: 'Laboratorio de Investigación',
      missileSilo: 'Silo de Misiles',
      
      // Research
      energyTechnology: 'Tecnología de Energía',
      laserTechnology: 'Tecnología Láser',
      ionTechnology: 'Tecnología Iónica',
      hyperspaceTechnology: 'Tecnología Hiperespacio',
      plasmaTechnology: 'Tecnología de Plasma',
      combustionDrive: 'Motor de Combustión',
      impulseDrive: 'Motor de Impulso',
      hyperspaceDrive: 'Motor Hiperespacio',
      espionageTechnology: 'Tecnología de Espionaje',
      computerTechnology: 'Tecnología de Computación',
      astrophysics: 'Astrofísica',
      gravitonTechnology: 'Tecnología Gravitón',
      weaponsTechnology: 'Tecnología de Armas',
      shieldingTechnology: 'Tecnología de Escudos',
      armourTechnology: 'Tecnología de Blindaje'
    };

    const name = names[requirement.key] || requirement.key;
    return `${name} Nivel ${requirement.level}`;
  }

  static canBuildMultiple(
    technologyId: string,
    quantity: number,
    buildings: Buildings,
    research: Research,
    availableResources: { metal: number; crystal: number; deuterium: number; energy: number }
  ): { canBuild: boolean; maxQuantity: number; totalCost: any } {
    const technology = this.getTechnologyById(technologyId);
    if (!technology) {
      return { canBuild: false, maxQuantity: 0, totalCost: null };
    }

    // Check basic requirements
    const { canBuild: meetsRequirements } = this.checkRequirements(technologyId, buildings, research);
    if (!meetsRequirements) {
      return { canBuild: false, maxQuantity: 0, totalCost: null };
    }

    // For buildings and research, quantity is always 1 (level up)
    if (technology.category === 'building' || technology.category === 'research') {
      const currentLevel = technology.category === 'building' 
        ? buildings[technologyId as keyof Buildings] || 0
        : research[technologyId as keyof Research] || 0;
      
      const cost = this.calculateCost(technologyId, currentLevel + 1);
      const canAfford = availableResources.metal >= cost.metal &&
                       availableResources.crystal >= cost.crystal &&
                       availableResources.deuterium >= cost.deuterium &&
                       availableResources.energy >= cost.energy;

      return {
        canBuild: canAfford,
        maxQuantity: canAfford ? 1 : 0,
        totalCost: cost
      };
    }

    // For ships and defenses, calculate maximum quantity
    const unitCost = this.calculateCost(technologyId, 1);
    let maxQuantity = 0;
    let totalCost = { metal: 0, crystal: 0, deuterium: 0, energy: 0, time: 0 };

    for (let i = 1; i <= quantity; i++) {
      const costForThis = {
        metal: totalCost.metal + unitCost.metal,
        crystal: totalCost.crystal + unitCost.crystal,
        deuterium: totalCost.deuterium + unitCost.deuterium,
        energy: totalCost.energy + unitCost.energy,
        time: totalCost.time + unitCost.time
      };

      if (costForThis.metal <= availableResources.metal &&
          costForThis.crystal <= availableResources.crystal &&
          costForThis.deuterium <= availableResources.deuterium &&
          costForThis.energy <= availableResources.energy) {
        maxQuantity = i;
        totalCost = costForThis;
      } else {
        break;
      }
    }

    return {
      canBuild: maxQuantity > 0,
      maxQuantity,
      totalCost: maxQuantity > 0 ? totalCost : null
    };
  }
}