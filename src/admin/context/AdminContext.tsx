import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AdminState, AdminUser, AdminStats, AdminNotification, AdminNotificationState } from '../../types/admin';

interface AdminContextType {
  state: AdminState;
  notifications: AdminNotificationState;
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

const initialNotificationState: AdminNotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  lastUpdate: 0,
};

function notificationReducer(state: AdminNotificationState, action: AdminAction): AdminNotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotifications = [action.payload, ...state.notifications].slice(0, 100); // Keep only last 100
      return {
        ...state,
        notifications: newNotifications,
        unreadCount: newNotifications.filter(n => !n.read).length,
        lastUpdate: Date.now(),
      };
    case 'MARK_NOTIFICATION_READ':
      const updatedNotifications = state.notifications.map(notification =>
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.read).length,
      };
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0,
      };
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(n => !n.read).length,
        loading: false,
        lastUpdate: Date.now(),
      };
    case 'SET_NOTIFICATIONS_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

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
  const [notifications, notificationDispatch] = useReducer(notificationReducer, initialNotificationState);

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
        await loadNotifications();
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

  const addNotification = (notification: Omit<AdminNotification, 'id' | 'timestamp'>) => {
    const newNotification: AdminNotification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    notificationDispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const markNotificationAsRead = (notificationId: string) => {
    notificationDispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
  };

  const markAllNotificationsAsRead = () => {
    notificationDispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' });
  };

  const clearNotifications = () => {
    notificationDispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const loadNotifications = async () => {
    notificationDispatch({ type: 'SET_NOTIFICATIONS_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock notifications data
      const mockNotifications: AdminNotification[] = [
        {
          id: '1',
          title: 'Actividad Sospechosa Detectada',
          message: 'Usuario "SpaceHacker" reportado por uso de bots automatizados',
          type: 'security',
          priority: 'high',
          timestamp: Date.now() - 300000, // 5 minutes ago
          read: false,
          actionRequired: true,
          relatedId: 'player_2',
          metadata: { violationType: 'cheating', autoDetected: true }
        },
        {
          id: '2',
          title: 'Nuevo Usuario Registrado',
          message: 'GalacticNewbie se ha registrado en Galaxia Prima',
          type: 'user_action',
          priority: 'low',
          timestamp: Date.now() - 600000, // 10 minutes ago
          read: false,
          actionRequired: false,
          relatedId: 'player_new',
          metadata: { universe: 'universe_1', registrationMethod: 'email' }
        },
        {
          id: '3',
          title: 'Carga del Sistema Alta',
          message: 'La carga del CPU ha superado el 85% durante los últimos 10 minutos',
          type: 'performance',
          priority: 'medium',
          timestamp: Date.now() - 900000, // 15 minutes ago
          read: false,
          actionRequired: true,
          metadata: { cpuLoad: 87.3, duration: 10 }
        },
        {
          id: '4',
          title: 'Backup Completado',
          message: 'Backup automático de la base de datos completado exitosamente',
          type: 'system',
          priority: 'low',
          timestamp: Date.now() - 1800000, // 30 minutes ago
          read: true,
          actionRequired: false,
          metadata: { backupSize: '2.3GB', duration: '45s' }
        },
        {
          id: '5',
          title: 'Múltiples Intentos de Login Fallidos',
          message: 'IP 192.168.1.200 ha realizado 25 intentos fallidos en 5 minutos',
          type: 'security',
          priority: 'critical',
          timestamp: Date.now() - 2400000, // 40 minutes ago
          read: false,
          actionRequired: true,
          relatedId: 'ip_192.168.1.200',
          metadata: { attempts: 25, timespan: 5, ipAddress: '192.168.1.200' }
        },
        {
          id: '6',
          title: 'Violación Reportada',
          message: 'Usuario reportado por acoso - Requiere investigación',
          type: 'violation',
          priority: 'medium',
          timestamp: Date.now() - 3600000, // 1 hour ago
          read: true,
          actionRequired: true,
          relatedId: 'violation_123',
          metadata: { reportedBy: 'player_456', violationType: 'harassment' }
        },
        {
          id: '7',
          title: 'Mantenimiento Programado',
          message: 'Recordatorio: Mantenimiento programado para mañana a las 02:00',
          type: 'maintenance',
          priority: 'medium',
          timestamp: Date.now() - 7200000, // 2 hours ago
          read: false,
          actionRequired: false,
          metadata: { scheduledTime: Date.now() + 86400000, duration: 4 }
        }
      ];
      
      notificationDispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
    } catch (error) {
      console.error('Error loading notifications:', error);
      notificationDispatch({ type: 'SET_NOTIFICATIONS_LOADING', payload: false });
    }
  };

  return (
    <AdminContext.Provider value={{
      state,
      notifications,
      login,
      logout,
      selectUniverse,
      refreshStats,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      clearNotifications,
      loadNotifications,
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