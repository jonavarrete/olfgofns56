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

export const mockAdminPvEMissions: AdminPvEMission[] = [
  {
    id: 'mission_1',
    name: 'Primer Contacto',
    description: 'Establece comunicación con una civilización alienígena recién descubierta.',
    type: 'diplomacy',
    difficulty: 'easy',
    universeId: 'universe_1',
    requirements: {
      level: 5,
      research: { espionageTechnology: 2 },
      fleet: { espionageProbe: 3 },
    },
    rewards: {
      experience: 1000,
      resources: { metal: 10000, crystal: 5000, deuterium: 2000, energy: 0, darkMatter: 0 },
      alienRace: 'traders',
    },
    duration: 30,
    cooldown: 24,
    location: 'Sector Alfa-7',
    lore: 'Nuestros sensores han detectado señales de una civilización desconocida. Esta podría ser nuestra oportunidad de establecer relaciones diplomáticas con una nueva especie.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: 'mission_2',
    name: 'Ruinas Ancestrales',
    description: 'Explora las ruinas de una civilización antigua en busca de tecnología perdida.',
    type: 'exploration',
    difficulty: 'medium',
    universeId: 'universe_1',
    requirements: {
      level: 10,
      research: { astrophysics: 3, espionageTechnology: 4 },
      fleet: { colonyShip: 1, lightFighter: 10 },
    },
    rewards: {
      experience: 2500,
      technology: ['gravitonTechnology'],
      artifacts: ['Ancient Data Core', 'Quantum Resonator'],
    },
    duration: 120,
    cooldown: 72,
    location: 'Sistema Perdido',
    lore: 'Antiguos registros hablan de una civilización que desapareció misteriosamente. Sus ruinas podrían contener secretos tecnológicos invaluables.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 25,
  },
  {
    id: 'mission_3',
    name: 'Amenaza Pirata',
    description: 'Elimina una base pirata que está atacando rutas comerciales.',
    type: 'combat',
    difficulty: 'medium',
    universeId: 'universe_2',
    requirements: {
      level: 8,
      fleet: { lightFighter: 25, heavyFighter: 10 },
    },
    rewards: {
      experience: 1800,
      resources: { metal: 30000, crystal: 15000, deuterium: 8000, energy: 0, darkMatter: 0 },
      ships: { recycler: 2 },
    },
    duration: 45,
    cooldown: 48,
    location: 'Cinturón de Asteroides Kappa',
    enemyFleet: {
      smallCargo: 0,
      largeCargo: 0,
      lightFighter: 30,
      heavyFighter: 15,
      cruiser: 5,
      battleship: 2,
      colonyShip: 0,
      recycler: 3,
      espionageProbe: 0,
      bomber: 0,
      destroyer: 0,
      deathstar: 0,
      battlecruiser: 1,
    },
    lore: 'Los piratas han establecido una base en el cinturón de asteroides y están interceptando naves comerciales. Es hora de limpiar el sector.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 20,
  },
  {
    id: 'mission_4',
    name: 'Cosecha de Cristales',
    description: 'Extrae cristales raros de un campo de asteroides peligroso.',
    type: 'exploration',
    difficulty: 'easy',
    universeId: null,
    requirements: {
      level: 3,
      fleet: { smallCargo: 5, recycler: 2 },
    },
    rewards: {
      experience: 800,
      resources: { metal: 5000, crystal: 25000, deuterium: 0, energy: 0, darkMatter: 0 },
    },
    duration: 60,
    cooldown: 12,
    location: 'Campo de Asteroides Beta',
    lore: 'Un campo de asteroides rico en cristales ha sido descubierto. La extracción será peligrosa pero muy lucrativa.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: 'mission_5',
    name: 'Misión de Rescate',
    description: 'Rescata a científicos atrapados en una estación de investigación.',
    type: 'rescue',
    difficulty: 'hard',
    universeId: 'universe_1',
    requirements: {
      level: 15,
      research: { hyperspaceDrive: 2 },
      fleet: { cruiser: 5, battleship: 2 },
      alliance: true,
    },
    rewards: {
      experience: 3500,
      technology: ['intergalacticResearchNetwork'],
      resources: { metal: 0, crystal: 0, deuterium: 50000, energy: 0, darkMatter: 0 },
    },
    duration: 180,
    cooldown: 168,
    location: 'Estación Prometheus',
    enemyFleet: {
      smallCargo: 0,
      largeCargo: 0,
      lightFighter: 0,
      heavyFighter: 0,
      cruiser: 0,
      battleship: 0,
      colonyShip: 0,
      recycler: 0,
      espionageProbe: 0,
      bomber: 0,
      destroyer: 3,
      deathstar: 0,
      battlecruiser: 0,
    },
    lore: 'Una estación de investigación ha perdido contacto después de experimentar con tecnología alienígena. Los científicos necesitan rescate urgente.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 10,
  }
];

// Generar más misiones automáticamente
for (let i = 6; i <= 45; i++) {
  const types: AdminPvEMission['type'][] = ['exploration', 'combat', 'diplomacy', 'trade', 'rescue', 'artifact'];
  const difficulties: AdminPvEMission['difficulty'][] = ['easy', 'medium', 'hard', 'extreme', 'legendary'];
  const universes = ['universe_1', 'universe_2', 'universe_3', 'universe_4', null];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  const universe = universes[Math.floor(Math.random() * universes.length)];
  
  mockAdminPvEMissions.push({
    id: `mission_${i}`,
    name: `Misión ${i}: ${type === 'exploration' ? 'Exploración' : type === 'combat' ? 'Combate' : type === 'diplomacy' ? 'Diplomacia' : type === 'trade' ? 'Comercio' : type === 'rescue' ? 'Rescate' : 'Artefacto'} ${difficulty}`,
    description: `Misión generada automáticamente de tipo ${type} con dificultad ${difficulty}.`,
    type,
    difficulty,
    universeId: universe,
    requirements: { level: Math.floor(Math.random() * 20) + 1 },
    rewards: { 
      experience: Math.floor(Math.random() * 5000) + 500,
      resources: { 
        metal: Math.floor(Math.random() * 50000) + 10000, 
        crystal: Math.floor(Math.random() * 25000) + 5000, 
        deuterium: Math.floor(Math.random() * 15000) + 2000, 
        energy: 0, 
        darkMatter: 0 
      }
    },
    duration: Math.floor(Math.random() * 180) + 30,
    cooldown: Math.floor(Math.random() * 72) + 12,
    location: `Sector ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 99) + 1}`,
    lore: `Esta es una misión generada automáticamente para demostrar el sistema de contenido PvE.`,
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: Math.random() > 0.2,
    createdBy: 'admin_1',
    createdAt: Date.now() - Math.floor(Math.random() * 86400000 * 60),
  });
}

export const mockAdminAlienRaces: AdminAlienRace[] = [
  {
    id: 'race_1',
    name: 'Zephyrianos',
    description: 'Una raza antigua de seres energéticos que dominan la tecnología de cristales.',
    homeworld: 'Zephyr Prime',
    type: 'peaceful',
    traits: {
      technology: 9,
      military: 4,
      diplomacy: 8,
      trade: 7,
      expansion: 3,
    },
    specialties: [
      'Tecnología de Cristales Avanzada',
      'Manipulación de Energía',
      'Arquitectura Flotante',
      'Medicina Regenerativa'
    ],
    weaknesses: [
      'Vulnerable a campos electromagnéticos',
      'Dependientes de cristales de energía',
      'Pacifistas por naturaleza'
    ],
    preferredDiplomacy: 'alliance',
    rarity: 'uncommon',
    rewards: {
      technology: ['energyTechnology', 'shieldingTechnology'],
      resources: { metal: 0, crystal: 50000, deuterium: 0, energy: 10000, darkMatter: 0 },
    },
    lore: 'Los Zephyrianos evolucionaron en un mundo de cristales flotantes, desarrollando la capacidad de manipular la energía pura. Su civilización se basa en la armonía y el conocimiento, construyendo ciudades que flotan en el aire mediante campos de energía cristalina.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: 'race_2',
    name: 'Nacidos del Vacío',
    description: 'Entidades sombrias que emergen del espacio profundo, maestros de la guerra.',
    homeworld: 'Nexus Oscuro',
    type: 'aggressive',
    traits: {
      technology: 7,
      military: 10,
      diplomacy: 2,
      trade: 3,
      expansion: 9,
    },
    specialties: [
      'Tecnología de Materia Oscura',
      'Naves Stealth',
      'Armas de Antimateria',
      'Tácticas de Guerra Psicológica'
    ],
    weaknesses: [
      'Vulnerables a la luz intensa',
      'Dificultad para diplomacia',
      'Dependientes de materia oscura'
    ],
    preferredDiplomacy: 'hostile',
    rarity: 'rare',
    rewards: {
      technology: ['weaponsTechnology', 'hyperspaceTechnology'],
      ships: { destroyer: 1, bomber: 2 },
    },
    lore: 'Surgieron de las profundidades del espacio intergaláctico, donde la materia oscura es abundante. Su sociedad se basa en la conquista y la absorción de otras civilizaciones para alimentar su crecimiento exponencial.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 25,
  },
  {
    id: 'race_3',
    name: 'Entidades Cristalinas',
    description: 'Seres de silicio puro que viven en simbiosis con estructuras cristalinas.',
    homeworld: 'Mundo Cristal',
    type: 'neutral',
    traits: {
      technology: 8,
      military: 6,
      diplomacy: 5,
      trade: 9,
      expansion: 4,
    },
    specialties: [
      'Minería Avanzada',
      'Construcción Cristalina',
      'Almacenamiento Cuántico',
      'Purificación de Recursos'
    ],
    weaknesses: [
      'Lentos para adaptarse',
      'Vulnerables a vibraciones sónicas',
      'Requieren ambientes específicos'
    ],
    preferredDiplomacy: 'trade',
    rarity: 'common',
    rewards: {
      resources: { metal: 25000, crystal: 100000, deuterium: 0, energy: 0, darkMatter: 0 },
      technology: ['computerTechnology'],
    },
    lore: 'Evolucionaron en un planeta rico en cristales, desarrollando cuerpos de silicio que les permiten procesar y almacenar información de manera extraordinaria. Son los mejores mineros y comerciantes de la galaxia.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: true,
    createdBy: 'admin_1',
    createdAt: Date.now() - 86400000 * 20,
  }
];

// Generar más razas automáticamente
for (let i = 4; i <= 23; i++) {
  const types: AdminAlienRace['type'][] = ['peaceful', 'neutral', 'aggressive', 'ancient', 'mysterious'];
  const rarities: AdminAlienRace['rarity'][] = ['common', 'uncommon', 'rare', 'legendary', 'mythic'];
  const diplomacies: AdminAlienRace['preferredDiplomacy'][] = ['alliance', 'trade', 'neutral', 'hostile'];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const rarity = rarities[Math.floor(Math.random() * rarities.length)];
  const diplomacy = diplomacies[Math.floor(Math.random() * diplomacies.length)];
  
  mockAdminAlienRaces.push({
    id: `race_${i}`,
    name: `Raza ${i}`,
    description: `Raza alienígena generada automáticamente de tipo ${type}.`,
    homeworld: `Mundo ${i}`,
    type,
    traits: {
      technology: Math.floor(Math.random() * 10) + 1,
      military: Math.floor(Math.random() * 10) + 1,
      diplomacy: Math.floor(Math.random() * 10) + 1,
      trade: Math.floor(Math.random() * 10) + 1,
      expansion: Math.floor(Math.random() * 10) + 1,
    },
    specialties: [`Especialidad ${i}A`, `Especialidad ${i}B`],
    weaknesses: [`Debilidad ${i}A`, `Debilidad ${i}B`],
    preferredDiplomacy: diplomacy,
    rarity,
    rewards: {
      resources: { 
        metal: Math.floor(Math.random() * 50000), 
        crystal: Math.floor(Math.random() * 50000), 
        deuterium: Math.floor(Math.random() * 25000), 
        energy: 0, 
        darkMatter: 0 
      }
    },
    lore: `Esta es una raza alienígena generada automáticamente para demostrar el sistema de contenido.`,
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: Math.random() > 0.3,
    createdBy: 'admin_1',
    createdAt: Date.now() - Math.floor(Math.random() * 86400000 * 90),
  });
}

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