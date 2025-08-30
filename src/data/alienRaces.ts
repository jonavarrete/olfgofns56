import { AlienRace } from '../types/game';

export const alienRaces: AlienRace[] = [
  {
    id: 'zephyrians',
    name: 'Zephyrianos',
    description: 'Una raza antigua de seres energéticos que dominan la tecnología de cristales.',
    homeworld: 'Zephyr Prime',
    discovered: true,
    discoveryDate: Date.now() - 86400000 * 30,
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
      resources: { metal: 0, crystal: 50000, deuterium: 0, energy: 10000 },
    },
    lore: 'Los Zephyrianos evolucionaron en un mundo de cristales flotantes, desarrollando la capacidad de manipular la energía pura. Su civilización se basa en la armonía y el conocimiento, construyendo ciudades que flotan en el aire mediante campos de energía cristalina.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
  },
  {
    id: 'voidborn',
    name: 'Nacidos del Vacío',
    description: 'Entidades sombrias que emergen del espacio profundo, maestros de la guerra.',
    homeworld: 'Nexus Oscuro',
    discovered: true,
    discoveryDate: Date.now() - 86400000 * 15,
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
  },
  {
    id: 'crystalline',
    name: 'Entidades Cristalinas',
    description: 'Seres de silicio puro que viven en simbiosis con estructuras cristalinas.',
    homeworld: 'Mundo Cristal',
    discovered: false,
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
      resources: { metal: 25000, crystal: 100000, deuterium: 0, energy: 0 },
      technology: ['computerTechnology'],
    },
    lore: 'Evolucionaron en un planeta rico en cristales, desarrollando cuerpos de silicio que les permiten procesar y almacenar información de manera extraordinaria. Son los mejores mineros y comerciantes de la galaxia.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
  },
  {
    id: 'ancients',
    name: 'Los Antiguos',
    description: 'Civilización milenaria con tecnología incomprensible para las razas jóvenes.',
    homeworld: 'Mundo Perdido',
    discovered: false,
    type: 'ancient',
    traits: {
      technology: 10,
      military: 8,
      diplomacy: 6,
      trade: 4,
      expansion: 2,
    },
    specialties: [
      'Tecnología Gravitacional',
      'Manipulación Temporal',
      'Construcción de Megaestructuras',
      'Ascensión Dimensional'
    ],
    weaknesses: [
      'Números muy reducidos',
      'Desinterés en asuntos menores',
      'Tecnología incompatible'
    ],
    preferredDiplomacy: 'neutral',
    rarity: 'mythic',
    rewards: {
      technology: ['gravitonTechnology', 'hyperspaceTechnology'],
      ships: { deathstar: 1 },
    },
    lore: 'Una civilización que alcanzó la perfección tecnológica hace millones de años. Pocos especímenes permanecen en nuestra dimensión, observando el desarrollo de las razas más jóvenes con curiosidad distante.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
  },
  {
    id: 'traders',
    name: 'Mercaderes Estelares',
    description: 'Nómadas espaciales dedicados al comercio intergaláctico.',
    homeworld: 'Estaciones Comerciales',
    discovered: true,
    discoveryDate: Date.now() - 86400000 * 45,
    type: 'peaceful',
    traits: {
      technology: 6,
      military: 3,
      diplomacy: 9,
      trade: 10,
      expansion: 8,
    },
    specialties: [
      'Redes Comerciales',
      'Logística Avanzada',
      'Negociación Galáctica',
      'Tecnología de Transporte'
    ],
    weaknesses: [
      'Capacidad militar limitada',
      'Dependientes del comercio',
      'Evitan conflictos'
    ],
    preferredDiplomacy: 'trade',
    rarity: 'common',
    rewards: {
      resources: { metal: 50000, crystal: 50000, deuterium: 25000, energy: 0 },
      ships: { largeCargo: 10, smallCargo: 20 },
    },
    lore: 'Abandonaron sus mundos natales hace milenios para convertirse en los principales facilitadores del comercio galáctico. Sus flotas de carga conectan civilizaciones distantes.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
  },
  {
    id: 'hive',
    name: 'Mente Colmena',
    description: 'Insectoides con consciencia colectiva y capacidad de reproducción exponencial.',
    homeworld: 'Colmena Central',
    discovered: false,
    type: 'aggressive',
    traits: {
      technology: 5,
      military: 9,
      diplomacy: 1,
      trade: 2,
      expansion: 10,
    },
    specialties: [
      'Reproducción Acelerada',
      'Construcción Orgánica',
      'Tácticas de Enjambre',
      'Adaptación Biológica'
    ],
    weaknesses: [
      'Dependientes de la Reina',
      'Vulnerables a virus',
      'Comunicación limitada'
    ],
    preferredDiplomacy: 'hostile',
    rarity: 'rare',
    rewards: {
      technology: ['armourTechnology'],
      ships: { lightFighter: 50, heavyFighter: 25 },
    },
    lore: 'Una especie insectoide que opera como una sola mente distribuida. Su capacidad de reproducción y adaptación los convierte en una amenaza exponencial para cualquier civilización.',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
  },
];