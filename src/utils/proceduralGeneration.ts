import { AlienRace, PvEMission } from '../types/game';

export class ProceduralGenerator {
  private static raceTemplates = [
    {
      namePatterns: ['Zephyr', 'Void', 'Crystal', 'Plasma', 'Quantum', 'Stellar', 'Cosmic', 'Nebula'],
      suffixes: ['ians', 'born', 'ites', 'ans', 'oids', 'ers', 'lings'],
      types: ['peaceful', 'neutral', 'aggressive', 'ancient', 'mysterious'] as const,
      specialtyCategories: {
        technology: ['Tecnología Avanzada', 'Manipulación Cuántica', 'Ingeniería Molecular'],
        military: ['Tácticas de Guerra', 'Armamento Pesado', 'Estrategia Naval'],
        trade: ['Redes Comerciales', 'Logística', 'Negociación'],
        exploration: ['Cartografía Galáctica', 'Exploración Profunda', 'Colonización'],
        culture: ['Arte Dimensional', 'Filosofía Cósmica', 'Rituales Ancestrales']
      }
    }
  ];

  private static missionTemplates = [
    {
      types: ['exploration', 'combat', 'diplomacy', 'trade', 'rescue', 'artifact'] as const,
      difficulties: ['easy', 'medium', 'hard', 'extreme', 'legendary'] as const,
      locations: [
        'Sector Desconocido', 'Nebulosa Perdida', 'Sistema Abandonado', 'Estación Deriva',
        'Campo de Asteroides', 'Agujero Negro', 'Pulsar Binario', 'Anomalía Espacial',
        'Ruinas Ancestrales', 'Frontera Galáctica', 'Zona Neutral', 'Espacio Profundo'
      ],
      prefixes: ['Operación', 'Misión', 'Expedición', 'Protocolo', 'Iniciativa'],
      names: [
        'Aurora', 'Eclipse', 'Génesis', 'Nexus', 'Vórtice', 'Horizonte', 'Infinito',
        'Destino', 'Legado', 'Renacimiento', 'Despertar', 'Convergencia'
      ]
    }
  ];

  static generateAlienRace(): AlienRace {
    const template = this.raceTemplates[0];
    const namePattern = template.namePatterns[Math.floor(Math.random() * template.namePatterns.length)];
    const suffix = template.suffixes[Math.floor(Math.random() * template.suffixes.length)];
    const type = template.types[Math.floor(Math.random() * template.types.length)];
    
    const name = namePattern + suffix;
    const homeworld = `${namePattern} ${['Prime', 'Central', 'Alpha', 'Omega', 'Core'][Math.floor(Math.random() * 5)]}`;

    // Generate balanced traits
    const traits = {
      technology: Math.floor(Math.random() * 6) + 3,
      military: Math.floor(Math.random() * 6) + 3,
      diplomacy: Math.floor(Math.random() * 6) + 3,
      trade: Math.floor(Math.random() * 6) + 3,
      expansion: Math.floor(Math.random() * 6) + 3,
    };

    // Adjust traits based on type
    switch (type) {
      case 'peaceful':
        traits.diplomacy += 2;
        traits.military = Math.max(1, traits.military - 2);
        break;
      case 'aggressive':
        traits.military += 3;
        traits.diplomacy = Math.max(1, traits.diplomacy - 2);
        traits.expansion += 1;
        break;
      case 'ancient':
        traits.technology += 2;
        traits.expansion = Math.max(1, traits.expansion - 3);
        break;
      case 'mysterious':
        traits.technology += 1;
        traits.diplomacy = Math.max(1, traits.diplomacy - 1);
        break;
    }

    // Cap traits at 10
    Object.keys(traits).forEach(key => {
      traits[key as keyof typeof traits] = Math.min(10, traits[key as keyof typeof traits]);
    });

    const specialties = this.generateSpecialties(traits);
    const weaknesses = this.generateWeaknesses(type, traits);

    return {
      id: `race_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: this.generateDescription(name, type),
      homeworld,
      discovered: false,
      type,
      traits,
      specialties,
      weaknesses,
      preferredDiplomacy: this.getPreferredDiplomacy(type),
      rarity: this.generateRarity(),
      rewards: this.generateRewards(traits, type),
      lore: this.generateLore(name, homeworld, type),
      image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    };
  }

  static generatePvEMission(source?: 'system' | 'alien' | 'neutral', alienRace?: AlienRace): PvEMission {
    const template = this.missionTemplates[0];
    const type = template.types[Math.floor(Math.random() * template.types.length)];
    const difficulty = template.difficulties[Math.floor(Math.random() * template.difficulties.length)];
    const location = template.locations[Math.floor(Math.random() * template.locations.length)];
    const prefix = template.prefixes[Math.floor(Math.random() * template.prefixes.length)];
    const missionName = template.names[Math.floor(Math.random() * template.names.length)];

    const name = `${prefix} ${missionName}`;
    const description = this.generateMissionDescription(type, source, alienRace);
    const lore = this.generateMissionLore(type, source, alienRace, location);

    const baseDuration = {
      easy: 30,
      medium: 60,
      hard: 120,
      extreme: 240,
      legendary: 360
    }[difficulty];

    const baseExperience = {
      easy: 500,
      medium: 1200,
      hard: 2500,
      extreme: 5000,
      legendary: 10000
    }[difficulty];

    return {
      id: `mission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      type,
      difficulty,
      status: 'available',
      requirements: this.generateMissionRequirements(difficulty, type),
      rewards: this.generateMissionRewards(difficulty, type, alienRace),
      duration: baseDuration + Math.floor(Math.random() * baseDuration * 0.5),
      cooldown: baseDuration / 2,
      progress: 0,
      location,
      enemyFleet: type === 'combat' ? this.generateEnemyFleet(difficulty) : undefined,
      lore,
      image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    };
  }

  private static generateDescription(name: string, type: AlienRace['type']): string {
    const descriptions = {
      peaceful: [
        `Los ${name} son una raza pacífica dedicada al conocimiento y la armonía.`,
        `Una civilización avanzada que prefiere la diplomacia sobre el conflicto.`,
        `Seres sabios que han trascendido la necesidad de guerra.`
      ],
      aggressive: [
        `Los ${name} son conquistadores implacables del espacio profundo.`,
        `Una raza guerrera que expande su imperio a través de la fuerza.`,
        `Depredadores espaciales que ven la galaxia como su territorio de caza.`
      ],
      neutral: [
        `Los ${name} mantienen una postura equilibrada en los asuntos galácticos.`,
        `Una raza pragmática que evalúa cada situación por sus méritos.`,
        `Observadores cautelosos que prefieren la neutralidad estratégica.`
      ],
      ancient: [
        `Los ${name} son una civilización ancestral con sabiduría milenaria.`,
        `Seres antiguos que han presenciado el nacimiento y muerte de estrellas.`,
        `Una raza primordial que guarda secretos del universo primitivo.`
      ],
      mysterious: [
        `Los ${name} son enigmáticos y sus motivaciones son incomprensibles.`,
        `Una raza misteriosa que aparece y desaparece sin explicación.`,
        `Seres cuya naturaleza desafía la comprensión de las razas jóvenes.`
      ]
    };

    const options = descriptions[type];
    return options[Math.floor(Math.random() * options.length)];
  }

  private static generateSpecialties(traits: AlienRace['traits']): string[] {
    const specialties: string[] = [];
    const categories = this.raceTemplates[0].specialtyCategories;

    if (traits.technology >= 7) {
      specialties.push(...categories.technology.slice(0, Math.floor(Math.random() * 2) + 1));
    }
    if (traits.military >= 7) {
      specialties.push(...categories.military.slice(0, Math.floor(Math.random() * 2) + 1));
    }
    if (traits.trade >= 7) {
      specialties.push(...categories.trade.slice(0, Math.floor(Math.random() * 2) + 1));
    }
    if (traits.expansion >= 7) {
      specialties.push(...categories.exploration.slice(0, Math.floor(Math.random() * 2) + 1));
    }

    // Ensure at least 2 specialties
    while (specialties.length < 2) {
      const allSpecialties = Object.values(categories).flat();
      const randomSpecialty = allSpecialties[Math.floor(Math.random() * allSpecialties.length)];
      if (!specialties.includes(randomSpecialty)) {
        specialties.push(randomSpecialty);
      }
    }

    return specialties.slice(0, 4);
  }

  private static generateWeaknesses(type: AlienRace['type'], traits: AlienRace['traits']): string[] {
    const weaknesses: string[] = [];

    if (traits.military <= 3) weaknesses.push('Capacidad militar limitada');
    if (traits.diplomacy <= 3) weaknesses.push('Dificultades diplomáticas');
    if (traits.technology <= 4) weaknesses.push('Tecnología obsoleta');
    if (traits.expansion <= 3) weaknesses.push('Crecimiento lento');

    const typeWeaknesses = {
      peaceful: ['Evitan el conflicto', 'Vulnerables a ataques sorpresa'],
      aggressive: ['Diplomacia limitada', 'Tendencia a hacer enemigos'],
      neutral: ['Falta de aliados fuertes', 'Indecisión estratégica'],
      ancient: ['Números reducidos', 'Desinterés en asuntos menores'],
      mysterious: ['Comunicación limitada', 'Motivaciones incomprensibles']
    };

    weaknesses.push(...typeWeaknesses[type].slice(0, Math.floor(Math.random() * 2) + 1));

    return weaknesses.slice(0, 3);
  }

  private static getPreferredDiplomacy(type: AlienRace['type']): AlienRace['preferredDiplomacy'] {
    const preferences = {
      peaceful: 'alliance',
      aggressive: 'hostile',
      neutral: 'neutral',
      ancient: 'neutral',
      mysterious: 'neutral'
    } as const;

    return preferences[type];
  }

  private static generateRarity(): AlienRace['rarity'] {
    const rand = Math.random();
    if (rand < 0.5) return 'common';
    if (rand < 0.75) return 'uncommon';
    if (rand < 0.9) return 'rare';
    if (rand < 0.98) return 'legendary';
    return 'mythic';
  }

  private static generateRewards(traits: AlienRace['traits'], type: AlienRace['type']): AlienRace['rewards'] {
    const rewards: AlienRace['rewards'] = {};

    if (traits.technology >= 7) {
      rewards.technology = ['energyTechnology', 'computerTechnology', 'hyperspaceTechnology']
        .slice(0, Math.floor(Math.random() * 2) + 1);
    }

    if (type === 'peaceful' || traits.trade >= 6) {
      rewards.resources = {
        metal: Math.floor(Math.random() * 50000) + 25000,
        crystal: Math.floor(Math.random() * 75000) + 25000,
        deuterium: Math.floor(Math.random() * 25000) + 10000,
        energy: 0
      };
    }

    if (traits.military >= 6 || type === 'aggressive') {
      rewards.ships = {
        lightFighter: Math.floor(Math.random() * 20) + 10,
        heavyFighter: Math.floor(Math.random() * 10) + 5,
      };
    }

    return rewards;
  }

  private static generateLore(name: string, homeworld: string, type: AlienRace['type']): string {
    const loreTemplates = {
      peaceful: [
        `Los ${name} evolucionaron en ${homeworld}, un mundo de perfecta armonía donde desarrollaron una sociedad basada en el conocimiento compartido y la cooperación mutua.`,
        `Originarios de ${homeworld}, los ${name} han dedicado milenios a perfeccionar las artes de la paz y la sabiduría cósmica.`
      ],
      aggressive: [
        `Los ${name} surgieron de ${homeworld}, un mundo hostil que forjó su naturaleza conquistadora a través de constantes conflictos.`,
        `Desde ${homeworld}, los ${name} han expandido su imperio a través de la fuerza, viendo la galaxia como su derecho de nacimiento.`
      ],
      neutral: [
        `Los ${name} de ${homeworld} han adoptado una filosofía de equilibrio, observando y adaptándose a los cambios galácticos.`,
        `Habitantes de ${homeworld}, los ${name} prefieren evaluar cada situación antes de comprometerse con cualquier facción.`
      ],
      ancient: [
        `Los ${name} son una de las civilizaciones más antiguas conocidas, originarios de ${homeworld} cuando la galaxia era joven.`,
        `Desde ${homeworld}, los ${name} han observado el ascenso y caída de innumerables civilizaciones a lo largo de eones.`
      ],
      mysterious: [
        `El origen de los ${name} en ${homeworld} está envuelto en misterio, y sus verdaderas intenciones permanecen ocultas.`,
        `Los ${name} aparecieron por primera vez cerca de ${homeworld}, pero su verdadera naturaleza sigue siendo un enigma.`
      ]
    };

    const templates = loreTemplates[type];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private static generateMissionDescription(type: PvEMission['type'], source?: string, alienRace?: AlienRace): string {
    const descriptions = {
      exploration: [
        'Explora un sector desconocido en busca de nuevos recursos y civilizaciones.',
        'Investiga anomalías espaciales que podrían revelar secretos del universo.',
        'Cartografía una región inexplorada del espacio profundo.'
      ],
      combat: [
        'Elimina una amenaza hostil que pone en peligro las rutas comerciales.',
        'Defiende un puesto avanzado de ataques enemigos.',
        'Neutraliza una flota pirata que opera en la zona.'
      ],
      diplomacy: [
        'Establece relaciones diplomáticas con una nueva civilización.',
        'Negocia un tratado de paz entre facciones en conflicto.',
        'Representa a tu alianza en una cumbre galáctica.'
      ],
      trade: [
        'Establece una nueva ruta comercial lucrativa.',
        'Negocia un acuerdo de intercambio de recursos.',
        'Transporta mercancías valiosas a través de territorio peligroso.'
      ],
      rescue: [
        'Rescata a supervivientes de una estación espacial en peligro.',
        'Evacúa colonos de un planeta amenazado por desastres naturales.',
        'Salva a diplomáticos capturados por piratas espaciales.'
      ],
      artifact: [
        'Recupera artefactos alienígenas de valor incalculable.',
        'Busca tecnología perdida en ruinas ancestrales.',
        'Investiga objetos misteriosos de origen desconocido.'
      ]
    };

    let description = descriptions[type][Math.floor(Math.random() * descriptions[type].length)];

    if (source === 'alien' && alienRace) {
      description += ` Los ${alienRace.name} han solicitado tu ayuda en esta misión.`;
    } else if (source === 'system') {
      description += ' Esta misión ha sido generada por el sistema de defensa galáctico.';
    } else if (source === 'neutral') {
      description += ' Una facción neutral ha puesto esta misión a disposición de comandantes independientes.';
    }

    return description;
  }

  private static generateMissionLore(type: PvEMission['type'], source?: string, alienRace?: AlienRace, location?: string): string {
    const baseLore = {
      exploration: `Los sensores de largo alcance han detectado actividad inusual en ${location}. Esta región del espacio ha permanecido inexplorada durante décadas.`,
      combat: `Reportes de inteligencia confirman actividad hostil en ${location}. La amenaza debe ser neutralizada antes de que se extienda.`,
      diplomacy: `Una oportunidad única se presenta en ${location} para establecer nuevas alianzas y expandir nuestra influencia diplomática.`,
      trade: `${location} se ha convertido en un punto estratégico para el comercio intergaláctico. Establecer presencia aquí sería muy beneficioso.`,
      rescue: `Una señal de socorro ha sido detectada desde ${location}. Vidas inocentes están en peligro y necesitan ayuda inmediata.`,
      artifact: `Antiguos registros sugieren que ${location} podría contener artefactos de civilizaciones perdidas con tecnología avanzada.`
    };

    let lore = baseLore[type];

    if (source === 'alien' && alienRace) {
      lore += ` Los ${alienRace.name} han compartido información crucial sobre esta región, sugiriendo que su cooperación podría ser mutuamente beneficiosa.`;
    }

    return lore;
  }

  private static generateMissionRequirements(difficulty: PvEMission['difficulty'], type: PvEMission['type']) {
    const baseLevel = {
      easy: 3,
      medium: 8,
      hard: 15,
      extreme: 22,
      legendary: 30
    }[difficulty];

    const requirements: PvEMission['requirements'] = {
      level: baseLevel + Math.floor(Math.random() * 5),
    };

    if (type === 'combat') {
      requirements.fleet = {
        lightFighter: Math.floor(Math.random() * 20) + 10,
        heavyFighter: Math.floor(Math.random() * 10) + 5,
      };
    } else if (type === 'exploration') {
      requirements.fleet = {
        espionageProbe: Math.floor(Math.random() * 5) + 2,
        smallCargo: Math.floor(Math.random() * 3) + 1,
      };
    } else if (type === 'trade') {
      requirements.fleet = {
        largeCargo: Math.floor(Math.random() * 5) + 2,
      };
    }

    return requirements;
  }

  private static generateMissionRewards(difficulty: PvEMission['difficulty'], type: PvEMission['type'], alienRace?: AlienRace): PvEMission['rewards'] {
    const baseExperience = {
      easy: 500,
      medium: 1200,
      hard: 2500,
      extreme: 5000,
      legendary: 10000
    }[difficulty];

    const rewards: PvEMission['rewards'] = {
      experience: baseExperience + Math.floor(Math.random() * baseExperience * 0.5),
    };

    // Add resources based on difficulty
    const resourceMultiplier = {
      easy: 1,
      medium: 2,
      hard: 4,
      extreme: 8,
      legendary: 15
    }[difficulty];

    rewards.resources = {
      metal: Math.floor(Math.random() * 25000 * resourceMultiplier) + 10000 * resourceMultiplier,
      crystal: Math.floor(Math.random() * 15000 * resourceMultiplier) + 5000 * resourceMultiplier,
      deuterium: Math.floor(Math.random() * 10000 * resourceMultiplier) + 2000 * resourceMultiplier,
      energy: 0
    };

    // Add technology for harder missions
    if (difficulty === 'hard' || difficulty === 'extreme' || difficulty === 'legendary') {
      const techs = ['energyTechnology', 'weaponsTechnology', 'shieldingTechnology', 'hyperspaceTechnology'];
      rewards.technology = [techs[Math.floor(Math.random() * techs.length)]];
    }

    // Add alien race discovery
    if (alienRace && !alienRace.discovered) {
      rewards.alienRace = alienRace.id;
    }

    return rewards;
  }

  private static generateEnemyFleet(difficulty: PvEMission['difficulty']) {
    const fleetSizes = {
      easy: { min: 10, max: 30 },
      medium: { min: 25, max: 60 },
      hard: { min: 50, max: 120 },
      extreme: { min: 100, max: 250 },
      legendary: { min: 200, max: 500 }
    }[difficulty];

    const fleet: any = {};
    const totalShips = Math.floor(Math.random() * (fleetSizes.max - fleetSizes.min)) + fleetSizes.min;
    
    // Distribute ships based on difficulty
    if (difficulty === 'easy') {
      fleet.lightFighter = Math.floor(totalShips * 0.8);
      fleet.heavyFighter = Math.floor(totalShips * 0.2);
    } else if (difficulty === 'medium') {
      fleet.lightFighter = Math.floor(totalShips * 0.6);
      fleet.heavyFighter = Math.floor(totalShips * 0.3);
      fleet.cruiser = Math.floor(totalShips * 0.1);
    } else {
      fleet.lightFighter = Math.floor(totalShips * 0.4);
      fleet.heavyFighter = Math.floor(totalShips * 0.3);
      fleet.cruiser = Math.floor(totalShips * 0.2);
      fleet.battleship = Math.floor(totalShips * 0.1);
    }

    return fleet;
  }
}