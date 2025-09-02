import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AdminState, AdminUser, AdminStats } from '../../types/admin';

interface AdminContextType {
  state: AdminState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectUniverse: (universeId: string) => void;
  refreshStats: () => Promise<void>;
}

type AdminAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AdminUser }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SELECT_UNIVERSE'; payload: string }
  | { type: 'UPDATE_STATS'; payload: AdminStats }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AdminState = {
  currentAdmin: null,
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    totalUniverses: 0,
    totalBattles: 0,
    totalMessages: 0,
    securityIncidents: 0,
    systemLoad: 0,
    databaseSize: 0,
    lastBackup: 0,
  },
  selectedUniverse: null,
  loading: false,
  error: null,
};

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        currentAdmin: action.payload,
        error: null 
      };
    case 'LOGIN_ERROR':
      return { 
        ...state, 
        loading: false, 
        currentAdmin: null,
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        currentAdmin: null,
        error: null 
      };
    case 'SELECT_UNIVERSE':
      return { ...state, selectedUniverse: action.payload };
    case 'UPDATE_STATS':
      return { ...state, stats: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin authentication
      if (email === 'admin@galaxy.com' && password === 'admin123') {
        const admin: AdminUser = {
          id: 'admin_1',
          email,
          username: 'SuperAdmin',
          role: 'super_admin',
          permissions: [], // Would be loaded from API
          createdAt: Date.now() - 86400000 * 365,
          lastLogin: Date.now(),
          active: true,
        };
        
        localStorage.setItem('galactic_empire_admin', JSON.stringify(admin));
        dispatch({ type: 'LOGIN_SUCCESS', payload: admin });
        await refreshStats();
      } else {
        throw new Error('Credenciales de administrador inválidas');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: (error as Error).message });
    }
  };

  const logout = () => {
    localStorage.removeItem('galactic_empire_admin');
    dispatch({ type: 'LOGOUT' });
  };

  const selectUniverse = (universeId: string) => {
    dispatch({ type: 'SELECT_UNIVERSE', payload: universeId });
  };

  const refreshStats = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockStats: AdminStats = {
        totalUsers: 47892,
        activeUsers: 31245,
        bannedUsers: 156,
        totalUniverses: 6,
        totalBattles: 1234567,
        totalMessages: 5678901,
        securityIncidents: 23,
        systemLoad: 67.5,
        databaseSize: 2.3, // GB
        lastBackup: Date.now() - 3600000,
      };
      
      dispatch({ type: 'UPDATE_STATS', payload: mockStats });
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  return (
    <AdminContext.Provider value={{
      state,
      login,
      logout,
      selectUniverse,
      refreshStats,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}