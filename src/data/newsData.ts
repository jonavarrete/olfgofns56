import { NewsItem } from '../types/news';

export const galacticNews: NewsItem[] = [
  {
    id: '1',
    title: '¡ALERTA GALÁCTICA! La Alianza [Legión Delta] ha aniquilado una flota de 1.5M de puntos en el sistema ZTK-218',
    summary: 'Una batalla épica que cambió el equilibrio de poder en el Universo Orion',
    universe: 'Orion',
    timestamp: Date.now() - 3600000, // 1 hour ago
    type: 'battle',
    priority: 'breaking',
    participants: ['Legión Delta', 'Imperio Sombra'],
    location: 'Sistema ZTK-218',
    details: {
      description: 'En una operación coordinada sin precedentes, la alianza Legión Delta ejecutó un ataque devastador contra las fuerzas del Imperio Sombra. La batalla duró 6 rondas intensas, resultando en la destrucción completa de la flota enemiga y la captura de recursos valorados en más de 800K puntos.',
      impact: 'Esta victoria consolida a Legión Delta como la fuerza dominante en el sector norte del Universo Orion, alterando significativamente el mapa político galáctico.',
      callToAction: '¡Las batallas épicas como esta suceden todos los días en Orion! ¿Tienes lo necesario para forjar tu propio destino?'
    }
  },
  {
    id: '2',
    title: '¡DIPLOMACIA TRIUNFA! Se firma el primer pacto de no agresión entre las Razas Xylophian y Kryptarian',
    summary: 'Un hito histórico en las relaciones intergalácticas del Universo Sirius',
    universe: 'Sirius',
    timestamp: Date.now() - 7200000, // 2 hours ago
    type: 'diplomacy',
    priority: 'high',
    participants: ['Raza Xylophian', 'Raza Kryptarian'],
    details: {
      description: 'Después de décadas de conflicto, las razas alienígenas Xylophian y Kryptarian han firmado un tratado de paz histórico. Este pacto incluye intercambio tecnológico, rutas comerciales protegidas y cooperación en la exploración del espacio profundo.',
      impact: 'Este acuerdo abre nuevas oportunidades para los comandantes humanos, incluyendo acceso a tecnologías alienígenas avanzadas y misiones diplomáticas exclusivas.',
      callToAction: 'El Universo Sirius ofrece las mejores oportunidades diplomáticas. ¡Conviértete en un embajador galáctico!'
    }
  },
  {
    id: '3',
    title: '¡INVASIÓN DETENIDA! Jugadores del Universo Andrómeda repelen con éxito la crisis PvE "Amenaza Devoradora"',
    summary: 'Una coalición de 200+ comandantes salva la galaxia de la extinción',
    universe: 'Andrómeda',
    timestamp: Date.now() - 10800000, // 3 hours ago
    type: 'pve',
    priority: 'breaking',
    location: 'Frontera Galáctica',
    details: {
      description: 'La temida "Amenaza Devoradora", una entidad cósmica que consume planetas enteros, fue finalmente derrotada por una coalición masiva de comandantes. La batalla final duró 72 horas y requirió la coordinación de más de 200 jugadores de diferentes alianzas.',
      impact: 'Los participantes recibieron recompensas legendarias, incluyendo tecnología gravitón avanzada y acceso a nuevas regiones del espacio profundo. Varios comandantes ascendieron múltiples niveles.',
      callToAction: 'Los eventos PvE épicos como este son exclusivos de Andrómeda. ¡Únete a la próxima gran aventura!'
    }
  },
  {
    id: '4',
    title: '¡DESCUBRIMIENTO HISTÓRICO! Comandante [AstroExplorer] encuentra la primera Estrella de la Muerte funcional',
    summary: 'Un hallazgo que reescribe la historia galáctica en el Universo Nova',
    universe: 'Nova',
    timestamp: Date.now() - 14400000, // 4 hours ago
    type: 'discovery',
    priority: 'high',
    participants: ['AstroExplorer'],
    location: 'Sector Perdido X-99',
    details: {
      description: 'Durante una expedición de rutina, el comandante AstroExplorer descubrió los restos de una Estrella de la Muerte ancestral en perfecto estado de funcionamiento. Los análisis revelan que pertenece a una civilización desaparecida hace milenios.',
      impact: 'Este descubrimiento ha desatado una carrera espacial, con múltiples alianzas compitiendo por acceder a la tecnología ancestral. El equilibrio de poder en Nova está a punto de cambiar dramáticamente.',
      callToAction: 'En Nova, cada expedición puede cambiar tu destino. ¡Explora lo desconocido y haz historia!'
    }
  },
  {
    id: '5',
    title: '¡RÉCORD GALÁCTICO! Alianza [Conquistadores Cósmicos] alcanza 10 millones de puntos en tiempo récord',
    summary: 'Un hito sin precedentes en la historia del Universo Vega',
    universe: 'Vega',
    timestamp: Date.now() - 18000000, // 5 hours ago
    type: 'alliance',
    priority: 'medium',
    participants: ['Conquistadores Cósmicos'],
    details: {
      description: 'La alianza Conquistadores Cósmicos ha logrado lo imposible: alcanzar 10 millones de puntos en solo 3 meses galácticos. Su estrategia combinó construcción acelerada, investigación coordinada y diplomacia inteligente.',
      impact: 'Este logro establece un nuevo estándar para el crecimiento de alianzas y demuestra que la cooperación estratégica puede superar cualquier obstáculo.',
      callToAction: 'Vega es donde nacen las leyendas. ¡Únete y escribe tu propia historia de éxito!'
    }
  },
  {
    id: '6',
    title: '¡EVENTO ESPECIAL! Portal dimensional se abre en el Universo Centauri - Recompensas épicas disponibles',
    summary: 'Un evento temporal que ofrece tecnología de otra dimensión',
    universe: 'Centauri',
    timestamp: Date.now() - 21600000, // 6 hours ago
    type: 'event',
    priority: 'high',
    location: 'Anomalía Dimensional Alpha',
    details: {
      description: 'Un portal dimensional estable se ha manifestado en Centauri, ofreciendo acceso a tecnologías de civilizaciones paralelas. Los comandantes pueden obtener mejoras únicas para sus flotas y edificios durante las próximas 48 horas.',
      impact: 'Este evento temporal está atrayendo a comandantes de toda la galaxia. Las recompensas incluyen naves experimentales y tecnologías que no existen en nuestra dimensión.',
      callToAction: 'Los eventos dimensionales son exclusivos de Centauri. ¡No pierdas esta oportunidad única!'
    }
  }
];

export function getRandomNews(count: number = 4): NewsItem[] {
  const shuffled = [...galacticNews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getNewsByPriority(): NewsItem[] {
  return galacticNews
    .sort((a, b) => {
      const priorityOrder = { breaking: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    .slice(0, 4);
}