export interface TradeOffer {
  id: string;
  playerId: string;
  playerName: string;
  type: 'sell' | 'buy';
  offering: {
    metal: number;
    crystal: number;
    deuterium: number;
  };
  requesting: {
    metal: number;
    crystal: number;
    deuterium: number;
  };
  ratio: number;
  expires: number;
  created: number;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  coordinates: string;
  minRank?: number;
  maxRank?: number;
  allianceOnly?: boolean;
}

export interface AuctionItem {
  id: string;
  sellerId: string;
  sellerName: string;
  item: {
    type: 'ship' | 'defense' | 'resource_package' | 'technology' | 'artifact';
    name: string;
    description: string;
    quantity: number;
    details: any; // Ship type, defense type, etc.
  };
  startingBid: number;
  currentBid: number;
  currentBidder?: string;
  currentBidderName?: string;
  bidHistory: AuctionBid[];
  startTime: number;
  endTime: number;
  status: 'active' | 'completed' | 'cancelled';
  buyoutPrice?: number;
  coordinates: string;
}

export interface AuctionBid {
  id: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: number;
}

export interface ScrapDealerOffer {
  id: string;
  type: 'debris' | 'ships' | 'defenses';
  name: string;
  description: string;
  cost: {
    metal: number;
    crystal: number;
    deuterium: number;
  };
  value: {
    metal: number;
    crystal: number;
    deuterium: number;
  };
  efficiency: number; // percentage of original value
  available: number;
  refreshTime: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

export interface MerchantOffer {
  id: string;
  type: 'resource_exchange' | 'ship_parts' | 'technology_boost' | 'special_item';
  name: string;
  description: string;
  cost: {
    metal: number;
    crystal: number;
    deuterium: number;
  };
  benefit: {
    type: 'resources' | 'ships' | 'research_boost' | 'building_boost' | 'special';
    value: any;
    duration?: number; // for temporary boosts
  };
  available: number;
  refreshTime: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  requirements?: {
    level?: number;
    research?: { [key: string]: number };
    alliance?: boolean;
  };
}

export interface TradeRoute {
  id: string;
  from: string;
  to: string;
  resource: 'metal' | 'crystal' | 'deuterium';
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  active: boolean;
  nextDelivery: number;
  totalDeliveries: number;
  profit: number;
}

export interface TradeState {
  offers: TradeOffer[];
  auctions: AuctionItem[];
  scrapDealer: ScrapDealerOffer[];
  merchant: MerchantOffer[];
  tradeRoutes: TradeRoute[];
  playerTrades: {
    completedTrades: number;
    reputation: number;
    totalProfit: number;
    successRate: number;
  };
}