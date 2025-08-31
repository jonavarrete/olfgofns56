import { TradeOffer, AuctionItem, ScrapDealerOffer, MerchantOffer, TradeRoute } from '../types/trade';

export const mockTradeOffers: TradeOffer[] = [
  {
    id: '1',
    playerId: 'player2',
    playerName: 'GalacticTrader',
    type: 'sell',
    offering: { metal: 100000, crystal: 0, deuterium: 0 },
    requesting: { metal: 0, crystal: 50000, deuterium: 0 },
    ratio: 2.0,
    expires: Date.now() + 86400000, // 24 hours
    created: Date.now() - 3600000, // 1 hour ago
    status: 'active',
    coordinates: '2:4:8',
    minRank: 1,
    maxRank: 100,
  },
  {
    id: '2',
    playerId: 'player3',
    playerName: 'ResourceKing',
    type: 'buy',
    offering: { metal: 0, crystal: 75000, deuterium: 25000 },
    requesting: { metal: 150000, crystal: 0, deuterium: 0 },
    ratio: 1.5,
    expires: Date.now() + 172800000, // 48 hours
    created: Date.now() - 7200000, // 2 hours ago
    status: 'active',
    coordinates: '1:3:7',
    allianceOnly: true,
  },
  {
    id: '3',
    playerId: 'player4',
    playerName: 'DeuteriumMaster',
    type: 'sell',
    offering: { metal: 0, crystal: 0, deuterium: 50000 },
    requesting: { metal: 200000, crystal: 0, deuterium: 0 },
    ratio: 4.0,
    expires: Date.now() + 43200000, // 12 hours
    created: Date.now() - 1800000, // 30 minutes ago
    status: 'active',
    coordinates: '3:2:5',
  },
];

export const mockAuctions: AuctionItem[] = [
  {
    id: '1',
    sellerId: 'player5',
    sellerName: 'FleetCommander',
    item: {
      type: 'ship',
      name: 'Crucero de Batalla Modificado',
      description: 'Crucero de batalla con mejoras de blindaje y velocidad',
      quantity: 1,
      details: { shipType: 'battlecruiser', modifications: ['armor_boost', 'speed_boost'] }
    },
    startingBid: 500000,
    currentBid: 750000,
    currentBidder: 'player6',
    currentBidderName: 'WarLord',
    bidHistory: [
      { id: '1', bidderId: 'player6', bidderName: 'WarLord', amount: 750000, timestamp: Date.now() - 1800000 },
      { id: '2', bidderId: 'player7', bidderName: 'SpaceAce', amount: 650000, timestamp: Date.now() - 3600000 },
      { id: '3', bidderId: 'player6', bidderName: 'WarLord', amount: 500000, timestamp: Date.now() - 7200000 },
    ],
    startTime: Date.now() - 86400000,
    endTime: Date.now() + 3600000, // 1 hour remaining
    status: 'active',
    buyoutPrice: 1200000,
    coordinates: '4:1:9',
  },
  {
    id: '2',
    sellerId: 'player8',
    sellerName: 'TechMaster',
    item: {
      type: 'technology',
      name: 'Datos de Investigación: Tecnología Láser',
      description: 'Acelera la investigación de Tecnología Láser en un 50%',
      quantity: 1,
      details: { technology: 'laserTechnology', boost: 50 }
    },
    startingBid: 200000,
    currentBid: 350000,
    currentBidder: 'player9',
    currentBidderName: 'ScienceGuy',
    bidHistory: [
      { id: '4', bidderId: 'player9', bidderName: 'ScienceGuy', amount: 350000, timestamp: Date.now() - 900000 },
      { id: '5', bidderId: 'player10', bidderName: 'Researcher', amount: 300000, timestamp: Date.now() - 1800000 },
    ],
    startTime: Date.now() - 43200000,
    endTime: Date.now() + 7200000, // 2 hours remaining
    status: 'active',
    coordinates: '2:3:4',
  },
];

export const mockScrapDealer: ScrapDealerOffer[] = [
  {
    id: '1',
    type: 'debris',
    name: 'Escombros de Batalla Premium',
    description: 'Restos de una gran batalla espacial, ricos en metales raros',
    cost: { metal: 50000, crystal: 25000, deuterium: 10000 },
    value: { metal: 125000, crystal: 75000, deuterium: 0 },
    efficiency: 85,
    available: 3,
    refreshTime: Date.now() + 14400000, // 4 hours
    rarity: 'rare',
  },
  {
    id: '2',
    type: 'ships',
    name: 'Cazadores Ligeros Dañados',
    description: 'Cazadores ligeros recuperados, necesitan reparación menor',
    cost: { metal: 15000, crystal: 5000, deuterium: 0 },
    value: { metal: 0, crystal: 0, deuterium: 0 }, // Ships go to fleet
    efficiency: 70,
    available: 8,
    refreshTime: Date.now() + 10800000, // 3 hours
    rarity: 'common',
  },
  {
    id: '3',
    type: 'defenses',
    name: 'Torretas de Plasma Experimentales',
    description: 'Prototipos de torretas con tecnología avanzada',
    cost: { metal: 200000, crystal: 150000, deuterium: 75000 },
    value: { metal: 0, crystal: 0, deuterium: 0 }, // Defenses go to planet
    efficiency: 60,
    available: 1,
    refreshTime: Date.now() + 21600000, // 6 hours
    rarity: 'epic',
  },
];

export const mockMerchant: MerchantOffer[] = [
  {
    id: '1',
    type: 'resource_exchange',
    name: 'Intercambio Preferencial de Cristal',
    description: 'Convierte metal en cristal con una tasa favorable',
    cost: { metal: 100000, crystal: 0, deuterium: 0 },
    benefit: {
      type: 'resources',
      value: { metal: 0, crystal: 60000, deuterium: 0 }
    },
    available: 5,
    refreshTime: Date.now() + 7200000, // 2 hours
    rarity: 'common',
  },
  {
    id: '2',
    type: 'technology_boost',
    name: 'Acelerador de Investigación',
    description: 'Reduce el tiempo de investigación en un 25% durante 24 horas',
    cost: { metal: 0, crystal: 50000, deuterium: 25000 },
    benefit: {
      type: 'research_boost',
      value: 25,
      duration: 86400000 // 24 hours
    },
    available: 2,
    refreshTime: Date.now() + 18000000, // 5 hours
    rarity: 'uncommon',
    requirements: { level: 10 },
  },
  {
    id: '3',
    type: 'special_item',
    name: 'Núcleo de Energía Alienígena',
    description: 'Aumenta la producción de energía en un 15% permanentemente',
    cost: { metal: 500000, crystal: 300000, deuterium: 200000 },
    benefit: {
      type: 'special',
      value: { energyBoost: 15 }
    },
    available: 1,
    refreshTime: Date.now() + 86400000, // 24 hours
    rarity: 'legendary',
    requirements: { level: 20, research: { energyTechnology: 8 } },
  },
];

export const mockTradeRoutes: TradeRoute[] = [
  {
    id: '1',
    from: '1:2:3',
    to: '2:4:8',
    resource: 'metal',
    amount: 50000,
    frequency: 'daily',
    active: true,
    nextDelivery: Date.now() + 3600000,
    totalDeliveries: 15,
    profit: 125000,
  },
  {
    id: '2',
    from: '2:4:8',
    to: '1:2:3',
    resource: 'crystal',
    amount: 25000,
    frequency: 'weekly',
    active: false,
    nextDelivery: Date.now() + 86400000 * 3,
    totalDeliveries: 3,
    profit: 45000,
  },
];