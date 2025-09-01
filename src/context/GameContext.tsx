import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Player, Planet, Mission, Notification, GameSettings, ConstructionQueues } from '../types/game';
import { DiplomaticPact } from '../types/game';
import { TradeState } from '../types/trade';
import { mockTradeOffers, mockAuctions, mockScrapDealer, mockMerchant, mockTradeRoutes } from '../data/tradeData';
import { 
  mockPlayer, 
  mockMissions, 
  mockRankings, 
  mockAlliances, 
  mockMessages,
  mockDiplomaticPacts
} from '../data/mockData';

// Add trade property to GameState interface
declare module '../types/game' {
  interface GameState {
    trade: TradeState;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  selectPlanet: (planet: Planet) => void;
  updateResources: (planetId: string, resources: any) => void;
  updateDebris: (planetId: string, debris: any) => void;
  addMission: (mission: Mission) => void;
  updateBuilding: (planetId: string, building: string, level: number) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
  updateSettings: (settings: GameSettings) => void;
  discoverAlienRace: (raceId: string) => void;
  completePvEMission: (missionId: string) => void;
  proposePact: (pact: DiplomaticPact) => void;
  signPact: (pactId: string, allianceId: string) => void;
  cancelPact: (pactId: string) => void;
}

type GameAction = 
  | { type: 'SELECT_PLANET'; payload: Planet }
  | { type: 'UPDATE_RESOURCES'; payload: { planetId: string; resources: any } }
  | { type: 'UPDATE_DEBRIS'; payload: { planetId: string; debris: any } }
  | { type: 'ADD_MISSION'; payload: Mission }
  | { type: 'UPDATE_BUILDING'; payload: { planetId: string; building: string; level: number } }
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'UPDATE_SETTINGS'; payload: GameSettings }
  | { type: 'DISCOVER_ALIEN_RACE'; payload: string }
  | { type: 'COMPLETE_PVE_MISSION'; payload: string }
  | { type: 'PROPOSE_PACT'; payload: DiplomaticPact }
  | { type: 'SIGN_PACT'; payload: { pactId: string; allianceId: string } }
  | { type: 'CANCEL_PACT'; payload: string };

const defaultSettings: GameSettings = {
  language: 'es',
  theme: 'dark',
  notifications: {
    sound: true,
    desktop: true,
    email: false,
    buildingComplete: true,
    researchComplete: true,
    fleetArrival: true,
    underAttack: true,
  },
  graphics: {
    quality: 'high',
    animations: true,
    particles: true,
    backgroundEffects: true,
  },
  gameplay: {
    autoRefresh: true,
    refreshInterval: 30,
    confirmActions: true,
    showTooltips: true,
  },
};

const mockConstructionQueues: ConstructionQueues = {
  buildings: [
    {
      id: '1',
      planetId: '1',
      planetName: 'Planeta Principal',
      building: 'metalMine',
      level: 13,
      startTime: Date.now() - 1800000, // Started 30 minutes ago
      endTime: Date.now() + 2700000, // Ends in 45 minutes
      cost: { metal: 50000, crystal: 25000, deuterium: 0, time: 4500 }
    },
    {
      id: '2',
      planetId: '2',
      planetName: 'Colonia Alpha',
      building: 'solarPlant',
      level: 11,
      startTime: Date.now() + 2700000, // Starts after first building
      endTime: Date.now() + 5400000, // Ends in 1.5 hours
      cost: { metal: 30000, crystal: 15000, deuterium: 0, time: 2700 }
    }
  ],
  research: [
    {
      id: '1',
      research: 'weaponsTechnology',
      level: 6,
      startTime: Date.now() - 900000, // Started 15 minutes ago
      endTime: Date.now() + 3600000, // Ends in 1 hour
      cost: { metal: 80000, crystal: 40000, deuterium: 20000, time: 4500 }
    }
  ],
  shipyard: [
    {
      id: '1',
      planetId: '1',
      planetName: 'Planeta Principal',
      ship: 'lightFighter',
      quantity: 25,
      startTime: Date.now() - 600000, // Started 10 minutes ago
      endTime: Date.now() + 1800000, // Ends in 30 minutes
      cost: { metal: 75000, crystal: 25000, deuterium: 0, time: 2400 }
    },
    {
      id: '2',
      planetId: '1',
      planetName: 'Planeta Principal',
      ship: 'cruiser',
      quantity: 5,
      startTime: Date.now() + 1800000, // Starts after fighters
      endTime: Date.now() + 5400000, // Ends in 1.5 hours
      cost: { metal: 100000, crystal: 35000, deuterium: 10000, time: 3600 }
    }
  ]
};

const initialState: GameState = {
  player: mockPlayer,
  selectedPlanet: mockPlayer.planets[0],
  missions: mockMissions,
  messages: mockMessages,
  rankings: mockRankings,
  alliances: mockAlliances,
  diplomaticPacts: mockDiplomaticPacts,
  notifications: [],
  settings: defaultSettings,
  combatReports: [],
  constructionQueues: mockConstructionQueues,
  trade: {
    offers: mockTradeOffers,
    auctions: mockAuctions,
    scrapDealer: mockScrapDealer,
    merchant: mockMerchant,
    tradeRoutes: mockTradeRoutes,
    playerTrades: {
      completedTrades: 23,
      reputation: 4.8,
      totalProfit: 567890,
      successRate: 95.7,
    },
  },
  gnn: mockGNNState,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_PLANET':
      return { ...state, selectedPlanet: action.payload };
    case 'UPDATE_RESOURCES':
      const updatedPlanets = state.player.planets.map(planet =>
        planet.id === action.payload.planetId
          ? { ...planet, resources: { ...planet.resources, ...action.payload.resources } }
          : planet
      );
      return {
        ...state,
        player: { ...state.player, planets: updatedPlanets },
        selectedPlanet: state.selectedPlanet.id === action.payload.planetId
          ? { ...state.selectedPlanet, resources: { ...state.selectedPlanet.resources, ...action.payload.resources } }
          : state.selectedPlanet,
      };
    case 'UPDATE_DEBRIS':
      const planetsWithUpdatedDebris = state.player.planets.map(planet =>
        planet.id === action.payload.planetId
          ? { ...planet, debris: { ...planet.debris, ...action.payload.debris } }
          : planet
      );
      return {
        ...state,
        player: { ...state.player, planets: planetsWithUpdatedDebris },
        selectedPlanet: state.selectedPlanet.id === action.payload.planetId
          ? { ...state.selectedPlanet, debris: { ...state.selectedPlanet.debris, ...action.payload.debris } }
          : state.selectedPlanet,
      };
    case 'ADD_MISSION':
      return { ...state, missions: [...state.missions, action.payload] };
    case 'UPDATE_BUILDING':
      const planetsWithUpdatedBuilding = state.player.planets.map(planet =>
        planet.id === action.payload.planetId
          ? {
              ...planet,
              buildings: { ...planet.buildings, [action.payload.building]: action.payload.level },
              usedFields: planet.usedFields + 1,
            }
          : planet
      );
      return {
        ...state,
        player: { ...state.player, planets: planetsWithUpdatedBuilding },
        selectedPlanet: state.selectedPlanet.id === action.payload.planetId
          ? {
              ...state.selectedPlanet,
              buildings: { ...state.selectedPlanet.buildings, [action.payload.building]: action.payload.level },
              usedFields: state.selectedPlanet.usedFields + 1,
            }
          : state.selectedPlanet,
      };
    case 'SET_PLAYER':
      return { ...state, player: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [action.payload, ...state.notifications].slice(0, 50) // Keep only last 50 notifications
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: action.payload };
    case 'DISCOVER_ALIEN_RACE':
      return {
        ...state,
        // This will be handled by the procedural content hook
      };
    case 'COMPLETE_PVE_MISSION':
      return {
        ...state,
        // This will be handled by the procedural content hook
      };
    case 'PROPOSE_PACT':
      return {
        ...state,
        diplomaticPacts: [...state.diplomaticPacts, action.payload]
      };
    case 'SIGN_PACT':
      return {
        ...state,
        diplomaticPacts: state.diplomaticPacts.map(pact =>
          pact.id === action.payload.pactId
            ? {
                ...pact,
                signatures: {
                  ...pact.signatures,
                  [action.payload.allianceId === pact.alliance1 ? 'alliance1' : 'alliance2']: true
                },
                status: pact.signatures.alliance1 && pact.signatures.alliance2 ? 'active' as const : 'pending_signature' as const,
                signedDate: pact.signatures.alliance1 && pact.signatures.alliance2 ? Date.now() : pact.signedDate
              }
            : pact
        )
      };
    case 'CANCEL_PACT':
      return {
        ...state,
        diplomaticPacts: state.diplomaticPacts.map(pact =>
          pact.id === action.payload
            ? { ...pact, status: 'cancelled' as const }
            : pact
        )
      };
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const selectPlanet = (planet: Planet) => {
    dispatch({ type: 'SELECT_PLANET', payload: planet });
  };

  const updateResources = (planetId: string, resources: any) => {
    dispatch({ type: 'UPDATE_RESOURCES', payload: { planetId, resources } });
  };

  const updateDebris = (planetId: string, debris: any) => {
    dispatch({ type: 'UPDATE_DEBRIS', payload: { planetId, debris } });
  };

  const addMission = (mission: Mission) => {
    dispatch({ type: 'ADD_MISSION', payload: mission });
  };

  const updateBuilding = (planetId: string, building: string, level: number) => {
    dispatch({ type: 'UPDATE_BUILDING', payload: { planetId, building, level } });
  };

  const addNotification = (notification: Notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const markNotificationAsRead = (notificationId: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
  };

  const clearAllNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const updateSettings = (settings: GameSettings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const discoverAlienRace = (raceId: string) => {
    dispatch({ type: 'DISCOVER_ALIEN_RACE', payload: raceId });
  };

  const completePvEMission = (missionId: string) => {
    dispatch({ type: 'COMPLETE_PVE_MISSION', payload: missionId });
  };

  const proposePact = (pact: DiplomaticPact) => {
    dispatch({ type: 'PROPOSE_PACT', payload: pact });
  };

  const signPact = (pactId: string, allianceId: string) => {
    dispatch({ type: 'SIGN_PACT', payload: { pactId, allianceId } });
  };

  const cancelPact = (pactId: string) => {
    dispatch({ type: 'CANCEL_PACT', payload: pactId });
  };

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      selectPlanet,
      updateResources,
      updateDebris,
      addMission,
      updateBuilding,
      addNotification,
      markNotificationAsRead,
      clearAllNotifications,
      updateSettings,
      discoverAlienRace,
      completePvEMission,
      proposePact,
      signPact,
      cancelPact,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}