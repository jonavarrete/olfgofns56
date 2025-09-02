import { GNNNewsItem } from '../types/gnn';

export const mockGNNNews: GNNNewsItem[] = [
  {
    id: 'gnn_1',
    title: '🔥 MASACRE GALÁCTICA: Dark Empire aniquila flota de 2.3M puntos en batalla épica',
    summary: 'La mayor batalla del mes deja 156 naves destruidas en el sistema Omega-7',
    content: 'En una operación militar sin precedentes, la alianza Dark Empire [DARK] ejecutó un ataque devastador contra las fuerzas de Galactic Federation [GFED] en las coordenadas 7:89:12. La batalla, que duró 4 rondas intensas, resultó en la destrucción completa de la flota defensora y la captura de recursos valorados en más de 800K puntos.\n\nEl comandante VoidMaster lideró el ataque con una flota compuesta por 45 Cruceros de Batalla, 78 Destructores y 12 Bombarderos. Las defensas planetarias, que incluían 200 Torretas de Plasma y múltiples Cúpulas de Escudo, fueron completamente aniquiladas.\n\nEsta victoria consolida a Dark Empire como la fuerza dominante en el sector norte, alterando significativamente el equilibrio de poder galáctico.',
    category: 'combat',
    priority: 'breaking',
    timestamp: Date.now() - 1800000, // 30 minutes ago
    universe: 'Galaxia Prima',
    location: 'Sistema Omega-7',
    participants: ['VoidMaster', 'StarDefender'],
    data: {
      attackerName: 'VoidMaster',
      defenderName: 'StarDefender',
      attackerAlliance: 'Dark Empire',
      defenderAlliance: 'Galactic Federation',
      shipsDestroyed: 156,
      pointsDestroyed: 2300000,
      coordinates: '7:89:12',
      combatReportId: 'combat_epic_001'
    },
    tags: ['epic_battle', 'alliance_war', 'dark_empire']
  },
  {
    id: 'gnn_2',
    title: '🤝 DIPLOMACIA HISTÓRICA: Se firma el primer pacto de cooperación científica intergaláctica',
    summary: 'Cinco alianzas principales unen fuerzas para acelerar la investigación',
    content: 'En una ceremonia diplomática sin precedentes, las alianzas Star Traders [STAR], Crystal Miners [CRYS], Science Guild [SCI], Explorer Union [EXPL] y Peaceful Builders [PEAC] han firmado el "Pacto de Cooperación Científica Intergaláctica".\n\nEste acuerdo histórico establece:\n• Intercambio libre de tecnologías básicas\n• Proyectos de investigación conjuntos\n• Protección mutua de laboratorios de investigación\n• Bonus del 25% en velocidad de investigación para tecnologías compartidas\n\nEl pacto tiene una duración inicial de 6 meses galácticos y marca el inicio de una nueva era de cooperación científica.',
    category: 'diplomacy',
    priority: 'high',
    timestamp: Date.now() - 3600000, // 1 hour ago
    universe: 'Sector Pacífico',
    participants: ['Star Traders', 'Crystal Miners', 'Science Guild', 'Explorer Union', 'Peaceful Builders'],
    data: {
      alliance1: 'Star Traders',
      alliance2: 'Crystal Miners',
      pactType: 'research_cooperation',
      pactStatus: 'signed'
    },
    tags: ['diplomacy', 'research', 'cooperation', 'peace']
  },
  {
    id: 'gnn_3',
    title: '👽 PRIMER CONTACTO: Comandante AstroExplorer descubre la raza alienígena "Ethereal Collective"',
    summary: 'Nueva civilización pacífica con tecnología de manipulación dimensional',
    content: 'El comandante AstroExplorer de la alianza Explorer Union ha logrado el primer contacto exitoso con una nueva raza alienígena en el sector inexplorado Delta-9. Los "Ethereal Collective" son seres de energía pura capaces de manipular las dimensiones del espacio-tiempo.\n\nCaracterísticas de la nueva raza:\n• Tipo: Pacífica y altamente avanzada\n• Especialidad: Tecnología dimensional y energética\n• Homeworld: Nexus Etéreo (coordenadas clasificadas)\n• Nivel tecnológico: 9/10\n• Disposición diplomática: Abierta a alianzas\n\nLos Ethereal Collective han ofrecido compartir conocimientos sobre tecnología gravitón a cambio de recursos cristalinos. Esta alianza podría revolucionar nuestra comprensión del hiperespacio.',
    category: 'exploration',
    priority: 'high',
    timestamp: Date.now() - 5400000, // 1.5 hours ago
    universe: 'Galaxia Prima',
    location: 'Sector Delta-9',
    participants: ['AstroExplorer'],
    data: {
      discovererName: 'AstroExplorer',
      alienRaceName: 'Ethereal Collective',
      alienRaceId: 'ethereal_collective',
      missionName: 'Expedición al Sector Delta-9',
      missionType: 'exploration'
    },
    tags: ['first_contact', 'alien_race', 'exploration', 'technology']
  }
];

export function generateRandomGNNNews(universe: string): GNNNewsItem[] {
  const templates = [
    {
      category: 'combat' as const,
      titles: [
        'Batalla masiva en {location}: {attacker} vs {defender}',
        'Flota de {points}K puntos destruida en {location}',
        'Guerra total: {alliance1} declara guerra a {alliance2}',
        'Emboscada exitosa: {attacker} sorprende a {defender}'
      ],
      priorities: ['breaking', 'high', 'medium'] as const
    },
    {
      category: 'diplomacy' as const,
      titles: [
        'Pacto histórico: {alliance1} y {alliance2} firman alianza',
        'Ruptura diplomática: {alliance1} cancela pacto con {alliance2}',
        'Cumbre de paz: 5 alianzas negocian cese al fuego',
        'Traición: {alliance1} rompe pacto de no agresión'
      ],
      priorities: ['high', 'medium'] as const
    },
    {
      category: 'exploration' as const,
      titles: [
        'Primer contacto: {discoverer} descubre raza {alienRace}',
        'Expedición exitosa: Misión {mission} completada',
        'Nuevo mundo: {discoverer} coloniza planeta único',
        'Artefacto ancestral encontrado en {location}'
      ],
      priorities: ['high', 'medium', 'low'] as const
    },
    {
      category: 'rankings' as const,
      titles: [
        '{player} asciende al puesto #{rank} con {points}M puntos',
        'Cambio en el top: {alliance} alcanza el #{rank}',
        'Récord histórico: {player} supera los {points}M puntos',
        'Caída dramática: {player} pierde {points}K puntos'
      ],
      priorities: ['medium', 'low'] as const
    },
    {
      category: 'events' as const,
      titles: [
        'ALERTA: Crisis {eventType} amenaza {location}',
        'Evento especial: {eventType} disponible por {duration}h',
        'Invasión alienígena: {alienRace} ataca {location}',
        'Portal temporal abierto en {location}'
      ],
      priorities: ['breaking', 'high'] as const
    }
  ];

  const locations = [
    'Sector Alpha-7', 'Sistema Omega', 'Nebulosa Perdida', 'Frontera Galáctica',
    'Zona Neutral', 'Espacio Profundo', 'Cinturón de Asteroides', 'Agujero Negro Central'
  ];

  const playerNames = [
    'StarConqueror', 'VoidMaster', 'GalacticLord', 'SpaceEmperor', 'CosmicRuler',
    'NebulaKing', 'AstroCommander', 'FleetMaster', 'PlanetHunter', 'WarpLord'
  ];

  const allianceNames = [
    'Dark Empire', 'Galactic Federation', 'Void Lords', 'Star Traders', 'Crystal Miners',
    'Science Guild', 'Explorer Union', 'Peaceful Builders', 'War Machine', 'Cosmic Alliance'
  ];

  const alienRaces = [
    'Ethereal Collective', 'Void Spawn', 'Crystal Entities', 'Ancient Ones',
    'Quantum Beings', 'Shadow Walkers', 'Light Bringers', 'Time Weavers'
  ];

  const eventTypes = [
    'Invasión Dimensional', 'Tormenta Cósmica', 'Portal Temporal', 'Anomalía Gravitacional',
    'Despertar Ancestral', 'Crisis Energética', 'Plaga Cuántica', 'Convergencia Estelar'
  ];

  const generatedNews: GNNNewsItem[] = [];

  // Generate 3-5 random news items
  const newsCount = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < newsCount; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const titleTemplate = template.titles[Math.floor(Math.random() * template.titles.length)];
    const priority = template.priorities[Math.floor(Math.random() * template.priorities.length)];

    let title = titleTemplate;
    let data: any = {};

    // Replace placeholders based on category
    switch (template.category) {
      case 'combat':
        const attacker = playerNames[Math.floor(Math.random() * playerNames.length)];
        const defender = playerNames[Math.floor(Math.random() * playerNames.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const points = Math.floor(Math.random() * 2000) + 500;
        
        title = title
          .replace('{attacker}', attacker)
          .replace('{defender}', defender)
          .replace('{location}', location)
          .replace('{points}', points.toString())
          .replace('{alliance1}', allianceNames[Math.floor(Math.random() * allianceNames.length)])
          .replace('{alliance2}', allianceNames[Math.floor(Math.random() * allianceNames.length)]);
        
        data = {
          attackerName: attacker,
          defenderName: defender,
          pointsDestroyed: points * 1000,
          coordinates: `${Math.floor(Math.random() * 9) + 1}:${Math.floor(Math.random() * 99) + 1}:${Math.floor(Math.random() * 15) + 1}`,
          shipsDestroyed: Math.floor(Math.random() * 200) + 50
        };
        break;

      case 'diplomacy':
        title = title
          .replace('{alliance1}', allianceNames[Math.floor(Math.random() * allianceNames.length)])
          .replace('{alliance2}', allianceNames[Math.floor(Math.random() * allianceNames.length)]);
        break;

      case 'exploration':
        const discoverer = playerNames[Math.floor(Math.random() * playerNames.length)];
        const alienRace = alienRaces[Math.floor(Math.random() * alienRaces.length)];
        const mission = `Expedición ${Math.floor(Math.random() * 100) + 1}`;
        
        title = title
          .replace('{discoverer}', discoverer)
          .replace('{alienRace}', alienRace)
          .replace('{mission}', mission)
          .replace('{location}', locations[Math.floor(Math.random() * locations.length)]);
        
        data = {
          discovererName: discoverer,
          alienRaceName: alienRace,
          missionName: mission
        };
        break;

      case 'rankings':
        const player = playerNames[Math.floor(Math.random() * playerNames.length)];
        const alliance = allianceNames[Math.floor(Math.random() * allianceNames.length)];
        const rank = Math.floor(Math.random() * 10) + 1;
        const pointsValue = Math.floor(Math.random() * 5) + 1;
        
        title = title
          .replace('{player}', player)
          .replace('{alliance}', alliance)
          .replace('{rank}', rank.toString())
          .replace('{points}', pointsValue.toString());
        
        data = {
          playerName: player,
          allianceName: alliance,
          newRank: rank,
          pointsGained: pointsValue * 1000000
        };
        break;

      case 'events':
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const duration = Math.floor(Math.random() * 48) + 24;
        
        title = title
          .replace('{eventType}', eventType)
          .replace('{location}', locations[Math.floor(Math.random() * locations.length)])
          .replace('{duration}', duration.toString())
          .replace('{alienRace}', alienRaces[Math.floor(Math.random() * alienRaces.length)]);
        
        data = {
          eventType,
          eventDuration: duration
        };
        break;
    }

    generatedNews.push({
      id: `gnn_generated_${Date.now()}_${i}`,
      title,
      summary: `Noticia generada automáticamente para ${template.category}`,
      content: `Contenido detallado de la noticia sobre ${template.category}...`,
      category: template.category,
      priority,
      timestamp: Date.now() - (Math.random() * 86400000), // Random time in last 24h
      universe,
      location: locations[Math.floor(Math.random() * locations.length)],
      data,
      tags: [template.category]
    });
  }

  return generatedNews;
}

export function getGNNNewsByUniverse(universe: string): GNNNewsItem[] {
  // In a real app, this would fetch from API
  const staticNews = mockGNNNews.filter(news => news.universe === universe);
  const generatedNews = generateRandomGNNNews(universe);
  
  return [...staticNews, ...generatedNews]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 50); // Limit to 50 most recent
}

export function getGNNNewsByCategory(universe: string, category: GNNNewsItem['category']): GNNNewsItem[] {
  return getGNNNewsByUniverse(universe).filter(news => news.category === category);
}

export function getBreakingNews(universe: string): GNNNewsItem[] {
  return getGNNNewsByUniverse(universe)
    .filter(news => news.priority === 'breaking')
    .slice(0, 5);
}