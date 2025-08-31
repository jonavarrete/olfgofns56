import { Officer } from '../types/officers';

export const baseOfficers: Omit<Officer, 'id' | 'rank' | 'active' | 'experience' | 'experienceToNext'>[] = [
  {
    name: 'Comandante',
    title: 'Oficial Supremo',
    description: 'El líder de tu imperio, proporciona bonificaciones generales a todas las operaciones.',
    maxRank: 10,
    cost: {
      darkMatter: 500,
      maintenanceCost: 50,
    },
    bonuses: {
      metalProduction: 10,
      crystalProduction: 10,
      deuteriumProduction: 10,
      buildingSpeed: 25,
      researchSpeed: 25,
      fleetSpeed: 10,
    },
    specialAbilities: [
      {
        id: 'imperial_decree',
        name: 'Decreto Imperial',
        description: 'Acelera todas las construcciones activas en un 50% durante 24 horas',
        type: 'active',
        cooldown: 168, // 7 days in hours
        cost: { darkMatter: 100 },
        effect: {
          duration: 24,
          value: { buildingSpeedBoost: 50 }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'legendary',
  },
  {
    name: 'Almirante',
    title: 'Comandante de Flota',
    description: 'Especialista en operaciones navales y combate espacial.',
    maxRank: 8,
    cost: {
      darkMatter: 300,
      maintenanceCost: 30,
    },
    bonuses: {
      fleetSpeed: 20,
      fleetCapacity: 25,
      fuelConsumption: -15,
      weaponsTechnology: 2,
      shipyardSpeed: 30,
    },
    specialAbilities: [
      {
        id: 'tactical_strike',
        name: 'Ataque Táctico',
        description: 'Aumenta el daño de combate en un 25% para la próxima batalla',
        type: 'active',
        cooldown: 72,
        cost: { darkMatter: 75 },
        effect: {
          duration: 1, // Next battle only
          value: { combatDamageBoost: 25 }
        }
      },
      {
        id: 'fleet_coordination',
        name: 'Coordinación de Flota',
        description: 'Permite enviar flotas adicionales simultáneamente',
        type: 'passive',
        effect: {
          value: { additionalFleetSlots: 2 }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'epic',
  },
  {
    name: 'Ingeniero',
    title: 'Maestro Constructor',
    description: 'Experto en construcción y desarrollo de infraestructura.',
    maxRank: 8,
    cost: {
      darkMatter: 250,
      maintenanceCost: 25,
    },
    bonuses: {
      buildingSpeed: 40,
      buildingCost: -20,
      energyProduction: 15,
      storageCapacity: 30,
    },
    specialAbilities: [
      {
        id: 'rapid_construction',
        name: 'Construcción Rápida',
        description: 'Completa instantáneamente una construcción en progreso',
        type: 'active',
        cooldown: 120,
        cost: { darkMatter: 150 },
        effect: {
          value: { instantBuild: true }
        }
      },
      {
        id: 'resource_optimization',
        name: 'Optimización de Recursos',
        description: 'Reduce el costo de construcción de edificios',
        type: 'passive',
        effect: {
          value: { buildingCostReduction: 20 }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'rare',
  },
  {
    name: 'Científico',
    title: 'Director de Investigación',
    description: 'Genio científico que acelera el progreso tecnológico.',
    maxRank: 8,
    cost: {
      darkMatter: 200,
      maintenanceCost: 20,
    },
    bonuses: {
      researchSpeed: 50,
      researchCost: -25,
      expeditionSuccess: 20,
      espionageBonus: 15,
    },
    specialAbilities: [
      {
        id: 'research_breakthrough',
        name: 'Avance Científico',
        description: 'Completa instantáneamente una investigación en progreso',
        type: 'active',
        cooldown: 168,
        cost: { darkMatter: 200 },
        effect: {
          value: { instantResearch: true }
        }
      },
      {
        id: 'knowledge_network',
        name: 'Red de Conocimiento',
        description: 'Permite investigar múltiples tecnologías simultáneamente',
        type: 'passive',
        effect: {
          value: { additionalResearchSlots: 1 }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'rare',
  },
  {
    name: 'Espía',
    title: 'Maestro de Inteligencia',
    description: 'Especialista en operaciones encubiertas y espionaje.',
    maxRank: 6,
    cost: {
      darkMatter: 150,
      maintenanceCost: 15,
    },
    bonuses: {
      espionageBonus: 30,
      expeditionSuccess: 15,
      fleetSpeed: 10,
    },
    specialAbilities: [
      {
        id: 'deep_scan',
        name: 'Escaneo Profundo',
        description: 'Revela información detallada sobre un planeta objetivo',
        type: 'active',
        cooldown: 48,
        cost: { darkMatter: 50 },
        effect: {
          value: { detailedScan: true }
        }
      },
      {
        id: 'stealth_operations',
        name: 'Operaciones Sigilosas',
        description: 'Reduce la probabilidad de detección en misiones de espionaje',
        type: 'passive',
        effect: {
          value: { stealthBonus: 25 }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'uncommon',
  },
  {
    name: 'Comerciante',
    title: 'Magnate del Comercio',
    description: 'Experto en comercio y gestión de recursos.',
    maxRank: 6,
    cost: {
      darkMatter: 100,
      maintenanceCost: 10,
    },
    bonuses: {
      tradeBonus: 25,
      storageCapacity: 40,
      metalProduction: 5,
      crystalProduction: 5,
      deuteriumProduction: 5,
    },
    specialAbilities: [
      {
        id: 'market_manipulation',
        name: 'Manipulación del Mercado',
        description: 'Obtiene mejores precios en el mercado durante 48 horas',
        type: 'active',
        cooldown: 120,
        cost: { darkMatter: 75 },
        effect: {
          duration: 48,
          value: { tradeBonusBoost: 50 }
        }
      },
      {
        id: 'resource_network',
        name: 'Red de Recursos',
        description: 'Acceso a ofertas comerciales exclusivas',
        type: 'passive',
        effect: {
          value: { exclusiveTrades: true }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'uncommon',
  },
  {
    name: 'Explorador',
    title: 'Pionero Galáctico',
    description: 'Especialista en expediciones y descubrimiento de nuevos mundos.',
    maxRank: 6,
    cost: {
      darkMatter: 120,
      maintenanceCost: 12,
    },
    bonuses: {
      expeditionSlots: 2,
      expeditionSuccess: 35,
      planetSlots: 1,
      fleetSpeed: 15,
    },
    specialAbilities: [
      {
        id: 'deep_space_expedition',
        name: 'Expedición Espacial Profunda',
        description: 'Lanza una expedición especial con mayores recompensas',
        type: 'active',
        cooldown: 96,
        cost: { darkMatter: 100 },
        effect: {
          value: { specialExpedition: true }
        }
      },
      {
        id: 'stellar_cartography',
        name: 'Cartografía Estelar',
        description: 'Revela planetas abandonados y oportunidades de colonización',
        type: 'passive',
        effect: {
          value: { planetDiscovery: true }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'rare',
  },
  {
    name: 'Tecnócrata',
    title: 'Visionario Tecnológico',
    description: 'Innovador que impulsa el desarrollo tecnológico del imperio.',
    maxRank: 7,
    cost: {
      darkMatter: 180,
      maintenanceCost: 18,
    },
    bonuses: {
      researchSpeed: 35,
      energyProduction: 20,
      shipyardSpeed: 20,
      expeditionSuccess: 10,
    },
    specialAbilities: [
      {
        id: 'tech_surge',
        name: 'Impulso Tecnológico',
        description: 'Duplica la velocidad de investigación durante 72 horas',
        type: 'active',
        cooldown: 240,
        cost: { darkMatter: 250 },
        effect: {
          duration: 72,
          value: { researchSpeedBoost: 100 }
        }
      },
      {
        id: 'innovation_network',
        name: 'Red de Innovación',
        description: 'Desbloquea tecnologías experimentales',
        type: 'passive',
        effect: {
          value: { experimentalTech: true }
        }
      }
    ],
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    rarity: 'epic',
  }
];

export const officerPromotionCosts = {
  1: { darkMatter: 100, experience: 1000 },
  2: { darkMatter: 200, experience: 2500 },
  3: { darkMatter: 400, experience: 5000 },
  4: { darkMatter: 800, experience: 10000 },
  5: { darkMatter: 1600, experience: 20000 },
  6: { darkMatter: 3200, experience: 40000 },
  7: { darkMatter: 6400, experience: 80000 },
  8: { darkMatter: 12800, experience: 160000 },
  9: { darkMatter: 25600, experience: 320000 },
  10: { darkMatter: 51200, experience: 640000 },
};

export const darkMatterSources = [
  {
    id: 'daily_login',
    name: 'Conexión Diaria',
    description: 'Recompensa por conectarse diariamente',
    amount: 25,
    frequency: 'daily',
  },
  {
    id: 'weekly_missions',
    name: 'Misiones Semanales',
    description: 'Completa objetivos semanales',
    amount: 100,
    frequency: 'weekly',
  },
  {
    id: 'achievements',
    name: 'Logros',
    description: 'Desbloquea logros especiales',
    amount: 50,
    frequency: 'achievement',
  },
  {
    id: 'expeditions',
    name: 'Expediciones',
    description: 'Encuentra materia oscura en expediciones',
    amount: 75,
    frequency: 'random',
  },
  {
    id: 'combat_victories',
    name: 'Victorias en Combate',
    description: 'Recompensa por victorias importantes',
    amount: 30,
    frequency: 'combat',
  },
];