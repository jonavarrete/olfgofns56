export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: number;
  lastLogin: number;
  preferences: {
    language: 'es' | 'en' | 'fr' | 'de';
    theme: 'dark' | 'light' | 'auto';
    notifications: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Universe {
  id: string;
  name: string;
  description: string;
  type: 'standard' | 'speed' | 'peaceful' | 'hardcore';
  speed: number;
  maxPlayers: number;
  currentPlayers: number;
  status: 'active' | 'new' | 'ending' | 'maintenance';
  startDate: number;
  endDate?: number;
  features: UniverseFeature[];
  playerData?: {
    hasAccount: boolean;
    rank?: number;
    points?: number;
    lastActive?: number;
  };
}

export interface UniverseFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}