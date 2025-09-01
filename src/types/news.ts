export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  universe: string;
  timestamp: number;
  type: 'battle' | 'diplomacy' | 'pve' | 'alliance' | 'discovery' | 'event';
  priority: 'low' | 'medium' | 'high' | 'breaking';
  participants?: string[];
  location?: string;
  details: {
    description: string;
    impact: string;
    callToAction: string;
  };
}

export interface UniverseNewsItem {
  id: string;
  universe: string;
  title: string;
  timestamp: number;
  type: 'battle' | 'discovery' | 'alliance' | 'diplomacy' | 'trade' | 'event' | 'ranking';
  priority: 'breaking' | 'high' | 'medium' | 'low';
  participants?: string[];
  data?: {
    shipsDestroyed?: number;
    playersInvolved?: number;
    resourcesTraded?: number;
    newRace?: string;
    discoverer?: string;
    allianceName?: string;
    allianceTag?: string;
    playerName?: string;
    previousRank?: number;
    newRank?: number;
  };
}