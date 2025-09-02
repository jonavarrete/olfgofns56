import { useState, useEffect } from 'react';
import { 
  PlayerAccount, 
  AdminPvEMission, 
  AdminAlienRace,
  GlobalMessage,
  Violation,
  IPBan,
  UserBan,
  SecurityLog,
  PlatformConfig,
  UniverseConfig,
  ExternalAPI,
  AdminTemplate
} from '../../types/admin';
import {
  mockPlayerAccounts,
  mockViolations,
  mockGlobalMessages,
  mockIPBans,
  mockUserBans,
  mockSecurityLogs,
  mockPlatformConfig,
  mockUniverseConfigs,
  mockExternalAPIs,
  mockAdminTemplates
} from '../data/mockAdminData';

export function useAdminData<T>(
  dataType: 'users' | 'missions' | 'aliens' | 'messages' | 'violations' | 'ip_bans' | 'user_bans' | 'logs' | 'config' | 'universes' | 'apis' | 'templates'
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [dataType]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let mockData: any[] = [];
      
      switch (dataType) {
        case 'users':
          mockData = mockPlayerAccounts;
          break;
        case 'violations':
          mockData = mockViolations;
          break;
        case 'messages':
          mockData = mockGlobalMessages;
          break;
        case 'ip_bans':
          mockData = mockIPBans;
          break;
        case 'user_bans':
          mockData = mockUserBans;
          break;
        case 'logs':
          mockData = mockSecurityLogs;
          break;
        case 'config':
          mockData = mockPlatformConfig;
          break;
        case 'universes':
          mockData = mockUniverseConfigs;
          break;
        case 'apis':
          mockData = mockExternalAPIs;
          break;
        case 'templates':
          mockData = mockAdminTemplates;
          break;
        default:
          mockData = [];
      }
      
      setData(mockData as T[]);
    } catch (err) {
      setError('Error loading data');
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: Omit<T, 'id' | 'createdAt'>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newItem = {
        ...item,
        id: Date.now().toString(),
        createdAt: Date.now()
      } as T;
      
      setData(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError('Error creating item');
      throw err;
    }
  };

  const updateItem = async (id: string, updates: Partial<T>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData(prev => prev.map(item => 
        (item as any).id === id ? { ...item, ...updates } : item
      ));
    } catch (err) {
      setError('Error updating item');
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData(prev => prev.filter(item => (item as any).id !== id));
    } catch (err) {
      setError('Error deleting item');
      throw err;
    }
  };

  const refreshData = () => {
    loadData();
  };

  return {
    data,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refreshData
  };
}