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