export interface GNNNewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'combat' | 'diplomacy' | 'exploration' | 'rankings' | 'events';
  priority: 'breaking' | 'high' | 'medium' | 'low';
  timestamp: number;
  universe: string;
  location?: string;
  participants?: string[];
  data?: {
    // Combat data
    attackerName?: string;
    defenderName?: string;
    attackerAlliance?: string;
    defenderAlliance?: string;
    shipsDestroyed?: number;
    pointsDestroyed?: number;
    coordinates?: string;
    combatReportId?: string;
    
    // Diplomacy data
    alliance1?: string;
    alliance2?: string;
    pactType?: string;
    pactStatus?: 'signed' | 'broken' | 'proposed';
    
    // Exploration data
    discovererName?: string;
    alienRaceName?: string;
    alienRaceId?: string;
    missionName?: string;
    missionType?: string;
    
    // Rankings data
    playerName?: string;
    allianceName?: string;
    previousRank?: number;
    newRank?: number;
    pointsGained?: number;
    
    // Events data
    eventType?: string;
    eventDuration?: number;
    eventRewards?: string[];
  };
  tags?: string[];
  readBy?: string[]; // Player IDs who have read this news
}

export interface GNNSettings {
  combatThreshold: number; // Minimum points for combat news
  showOwnBattles: boolean;
  showAllianceBattles: boolean;
  showDiplomacy: boolean;
  showExploration: boolean;
  showRankings: boolean;
  showEvents: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // seconds
  maxNewsItems: number;
}

export interface GNNState {
  news: GNNNewsItem[];
  settings: GNNSettings;
  loading: boolean;
  lastUpdate: number;
  unreadCount: number;
}