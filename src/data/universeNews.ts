import { UniverseNewsItem } from '../types/news';

export const universeNewsData: { [universeId: string]: UniverseNewsItem[] } = {
  universe_1: [ // Galaxia Prima
    {
      id: 'gp_1',
      universe: 'Galaxia Prima',
      title: 'Guerra masiva: >150k naves destruidas en las últimas 24h entre Dark Empire y Galactic Federation',
      timestamp: Date.now() - 3600000, // 1 hour ago
      type: 'battle',
      priority: 'breaking',
      participants: ['Dark Empire', 'Galactic Federation'],
      data: { shipsDestroyed: 156789, playersInvolved: 47 }
    },
    {
      id: 'gp_2',
      universe: 'Galaxia Prima',
      title: 'La raza alienígena "Ethereal Collective" descubierta por el comandante "StarHunter"',
      timestamp: Date.now() - 7200000, // 2 hours ago
      type: 'discovery',
      priority: 'high',
      data: { newRace: 'Ethereal Collective', discoverer: 'StarHunter' }
    },
    {
      id: 'gp_3',
      universe: 'Galaxia Prima',
      title: 'Dark Empire mantiene el #1 del ranking con 15.6M puntos tras absorber alianza menor',
      timestamp: Date.now() - 10800000, // 3 hours ago
      type: 'alliance',
      priority: 'medium',
      data: { allianceName: 'Dark Empire', allianceTag: 'DARK' }
    },
    {
      id: 'gp_4',
      universe: 'Galaxia Prima',
      title: 'Récord comercial: 2.3M recursos intercambiados en el mercado galáctico hoy',
      timestamp: Date.now() - 14400000, // 4 hours ago
      type: 'trade',
      priority: 'medium',
      data: { resourcesTraded: 2300000 }
    },
    {
      id: 'gp_5',
      universe: 'Galaxia Prima',
      title: 'SpaceEmperor asciende al puesto #2 tras conquistar 3 sistemas en una sola semana',
      timestamp: Date.now() - 18000000, // 5 hours ago
      type: 'ranking',
      priority: 'medium',
      data: { playerName: 'SpaceEmperor', previousRank: 5, newRank: 2 }
    }
  ],
  universe_2: [ // Nebulosa Veloce
    {
      id: 'nv_1',
      universe: 'Nebulosa Veloce',
      title: 'Velocidad extrema: 89k naves construidas en las últimas 12h gracias al multiplicador x5',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      type: 'event',
      priority: 'high',
      data: { shipsDestroyed: 89000 }
    },
    {
      id: 'nv_2',
      universe: 'Nebulosa Veloce',
      title: 'Speed Demons [FAST] lidera con estrategia de expansión relámpago',
      timestamp: Date.now() - 5400000, // 1.5 hours ago
      type: 'alliance',
      priority: 'medium',
      data: { allianceName: 'Speed Demons', allianceTag: 'FAST' }
    },
    {
      id: 'nv_3',
      universe: 'Nebulosa Veloce',
      title: 'Batalla relámpago: FleetMaster destruye flota enemiga en 3 minutos',
      timestamp: Date.now() - 9000000, // 2.5 hours ago
      type: 'battle',
      priority: 'medium',
      data: { shipsDestroyed: 12500, playersInvolved: 2 }
    },
    {
      id: 'nv_4',
      universe: 'Nebulosa Veloce',
      title: 'Nuevo récord: Tecnología Gravitón investigada en solo 6 horas',
      timestamp: Date.now() - 12600000, // 3.5 hours ago
      type: 'discovery',
      priority: 'medium',
      data: { discoverer: 'TechRusher' }
    }
  ],
  universe_3: [ // Sector Pacífico
    {
      id: 'sp_1',
      universe: 'Sector Pacífico',
      title: 'Tratado de paz firmado entre 5 alianzas principales - Era de cooperación galáctica',
      timestamp: Date.now() - 3600000, // 1 hour ago
      type: 'diplomacy',
      priority: 'breaking',
      participants: ['Crystal Miners', 'Peaceful Builders', 'Trade Federation', 'Science Guild', 'Explorer Union']
    },
    {
      id: 'sp_2',
      universe: 'Sector Pacífico',
      title: 'Megaproyecto: Construcción colaborativa de estación espacial internacional',
      timestamp: Date.now() - 7200000, // 2 hours ago
      type: 'alliance',
      priority: 'high',
      data: { playersInvolved: 156 }
    },
    {
      id: 'sp_3',
      universe: 'Sector Pacífico',
      title: 'Intercambio masivo: 5.7M recursos distribuidos en red comercial cooperativa',
      timestamp: Date.now() - 10800000, // 3 hours ago
      type: 'trade',
      priority: 'medium',
      data: { resourcesTraded: 5700000 }
    },
    {
      id: 'sp_4',
      universe: 'Sector Pacífico',
      title: 'Expedición conjunta descubre 3 nuevas razas alienígenas pacíficas',
      timestamp: Date.now() - 14400000, // 4 hours ago
      type: 'discovery',
      priority: 'medium',
      data: { playersInvolved: 12 }
    }
  ],
  universe_4: [ // Abismo Hardcore
    {
      id: 'ah_1',
      universe: 'Abismo Hardcore',
      title: '🔥 MASACRE TOTAL: Void Lords elimina completamente a 3 alianzas en 6 horas',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      type: 'battle',
      priority: 'breaking',
      participants: ['Void Lords'],
      data: { shipsDestroyed: 234567, playersInvolved: 89 }
    },
    {
      id: 'ah_2',
      universe: 'Abismo Hardcore',
      title: 'Sin piedad: 67% de jugadores han perdido al menos un planeta esta semana',
      timestamp: Date.now() - 5400000, // 1.5 hours ago
      type: 'battle',
      priority: 'high',
      data: { playersInvolved: 528 }
    },
    {
      id: 'ah_3',
      universe: 'Abismo Hardcore',
      title: 'VoidMaster construye la primera Estrella de la Muerte del universo',
      timestamp: Date.now() - 9000000, // 2.5 hours ago
      type: 'discovery',
      priority: 'high',
      data: { discoverer: 'VoidMaster' }
    },
    {
      id: 'ah_4',
      universe: 'Abismo Hardcore',
      title: 'Alianza "Survivors" se disuelve tras perder 90% de su flota',
      timestamp: Date.now() - 12600000, // 3.5 hours ago
      type: 'alliance',
      priority: 'medium',
      data: { allianceName: 'Survivors' }
    }
  ],
  universe_5: [ // Nueva Frontera
    {
      id: 'nf_1',
      universe: 'Nueva Frontera',
      title: 'Fiebre del oro espacial: +234 nuevos comandantes se unen en las últimas 24h',
      timestamp: Date.now() - 3600000, // 1 hour ago
      type: 'event',
      priority: 'high',
      data: { playersInvolved: 234 }
    },
    {
      id: 'nf_2',
      universe: 'Nueva Frontera',
      title: 'Primera alianza formada: "Pioneers" alcanza 15 miembros fundadores',
      timestamp: Date.now() - 7200000, // 2 hours ago
      type: 'alliance',
      priority: 'medium',
      data: { allianceName: 'Pioneers', playersInvolved: 15 }
    },
    {
      id: 'nf_3',
      universe: 'Nueva Frontera',
      title: 'Territorio virgen: 89% de sistemas galácticos aún sin explorar',
      timestamp: Date.now() - 10800000, // 3 hours ago
      type: 'discovery',
      priority: 'medium'
    },
    {
      id: 'nf_4',
      universe: 'Nueva Frontera',
      title: 'Primer intercambio comercial exitoso entre comandantes novatos',
      timestamp: Date.now() - 14400000, // 4 hours ago
      type: 'trade',
      priority: 'low',
      data: { resourcesTraded: 50000 }
    }
  ],
  universe_6: [ // Legado Ancestral
    {
      id: 'la_1',
      universe: 'Legado Ancestral',
      title: '⚡ EVENTO FINAL: Portal dimensional se abre - Últimas 30 días para gloria eterna',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      type: 'event',
      priority: 'breaking'
    },
    {
      id: 'la_2',
      universe: 'Legado Ancestral',
      title: 'Veteranos se preparan: Mega-alianza de 8 facciones para evento final',
      timestamp: Date.now() - 5400000, // 1.5 hours ago
      type: 'alliance',
      priority: 'high',
      data: { playersInvolved: 312 }
    },
    {
      id: 'la_3',
      universe: 'Legado Ancestral',
      title: 'Legado histórico: AncientKing mantiene #1 por 11 meses consecutivos',
      timestamp: Date.now() - 9000000, // 2.5 hours ago
      type: 'ranking',
      priority: 'medium',
      data: { playerName: 'AncientKing' }
    },
    {
      id: 'la_4',
      universe: 'Legado Ancestral',
      title: 'Artefactos ancestrales: Última oportunidad para obtener tecnología perdida',
      timestamp: Date.now() - 12600000, // 3.5 hours ago
      type: 'discovery',
      priority: 'medium'
    }
  ]
};

export function getUniverseNews(universeId: string): UniverseNewsItem[] {
  return universeNewsData[universeId] || [];
}

export function getLatestUniverseNews(universeId: string, limit: number = 4): UniverseNewsItem[] {
  const news = getUniverseNews(universeId);
  return news
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}