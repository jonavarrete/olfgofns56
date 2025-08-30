export const translations = {
  es: {
    // Navigation
    empire: 'Imperio',
    buildings: 'Edificios',
    research: 'Investigación',
    shipyard: 'Astillero',
    fleet: 'Flota',
    galaxy: 'Galaxia',
    rankings: 'Rankings',
    alliance: 'Alianza',
    messages: 'Mensajes',
    settings: 'Configuración',
    simulator: 'Simulador',
    
    // Resources
    metal: 'Metal',
    crystal: 'Cristal',
    deuterium: 'Deuterio',
    energy: 'Energía',
    
    // Buildings
    metalMine: 'Mina de Metal',
    crystalMine: 'Mina de Cristal',
    deuteriumSynthesizer: 'Sintetizador de Deuterio',
    solarPlant: 'Planta Solar',
    fusionReactor: 'Planta de Fusión',
    roboticsFactory: 'Fábrica de Robots',
    naniteFactory: 'Fábrica de Nanitas',
    shipyard: 'Hangar',
    
    // Ships
    smallCargo: 'Nave de Carga Pequeña',
    largeCargo: 'Nave de Carga Grande',
    lightFighter: 'Cazador Ligero',
    heavyFighter: 'Cazador Pesado',
    cruiser: 'Crucero',
    battleship: 'Nave de Batalla',
    
    // Common
    level: 'Nivel',
    cost: 'Costo',
    time: 'Tiempo',
    build: 'Construir',
    research: 'Investigar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    loading: 'Cargando...',
    
    // Notifications
    buildingComplete: 'Construcción completada',
    researchComplete: 'Investigación completada',
    fleetArrival: 'Flota ha llegado',
    underAttack: '¡Bajo ataque!',
  },
  en: {
    // Navigation
    empire: 'Empire',
    buildings: 'Buildings',
    research: 'Research',
    shipyard: 'Shipyard',
    fleet: 'Fleet',
    galaxy: 'Galaxy',
    rankings: 'Rankings',
    alliance: 'Alliance',
    messages: 'Messages',
    settings: 'Settings',
    simulator: 'Simulator',
    
    // Resources
    metal: 'Metal',
    crystal: 'Crystal',
    deuterium: 'Deuterium',
    energy: 'Energy',
    
    // Buildings
    metalMine: 'Metal Mine',
    crystalMine: 'Crystal Mine',
    deuteriumSynthesizer: 'Deuterium Synthesizer',
    solarPlant: 'Solar Plant',
    fusionReactor: 'Fusion Reactor',
    roboticsFactory: 'Robotics Factory',
    naniteFactory: 'Nanite Factory',
    shipyard: 'Shipyard',
    
    // Ships
    smallCargo: 'Small Cargo Ship',
    largeCargo: 'Large Cargo Ship',
    lightFighter: 'Light Fighter',
    heavyFighter: 'Heavy Fighter',
    cruiser: 'Cruiser',
    battleship: 'Battleship',
    
    // Common
    level: 'Level',
    cost: 'Cost',
    time: 'Time',
    build: 'Build',
    research: 'Research',
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    
    // Notifications
    buildingComplete: 'Building completed',
    researchComplete: 'Research completed',
    fleetArrival: 'Fleet has arrived',
    underAttack: 'Under attack!',
  }
};

export type TranslationKey = keyof typeof translations.es;