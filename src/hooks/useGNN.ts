import { useState, useEffect, useCallback } from 'react';
import { GNNNewsItem, GNNSettings, GNNState } from '../types/gnn';
import { getGNNNewsByUniverse, getGNNNewsByCategory, getBreakingNews } from '../data/gnnData';

const defaultSettings: GNNSettings = {
  combatThreshold: 100000, // 100K points minimum
  showOwnBattles: true,
  showAllianceBattles: true,
  showDiplomacy: true,
  showExploration: true,
  showRankings: true,
  showEvents: true,
  autoRefresh: true,
  refreshInterval: 60, // 1 minute
  maxNewsItems: 100
};

export function useGNN(universe: string, playerId: string) {
  const [state, setState] = useState<GNNState>({
    news: [],
    settings: defaultSettings,
    loading: true,
    lastUpdate: 0,
    unreadCount: 0
  });

  const loadNews = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const allNews = getGNNNewsByUniverse(universe);
      const filteredNews = filterNewsBySettings(allNews, state.settings, playerId);
      
      // Calculate unread count
      const unreadCount = filteredNews.filter(news => 
        !news.readBy?.includes(playerId)
      ).length;
      
      setState(prev => ({
        ...prev,
        news: filteredNews,
        loading: false,
        lastUpdate: Date.now(),
        unreadCount
      }));
    } catch (error) {
      console.error('Error loading GNN news:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [universe, playerId, state.settings]);

  const filterNewsBySettings = (
    news: GNNNewsItem[], 
    settings: GNNSettings, 
    playerId: string
  ): GNNNewsItem[] => {
    return news.filter(item => {
      // Category filters
      if (!settings.showDiplomacy && item.category === 'diplomacy') return false;
      if (!settings.showExploration && item.category === 'exploration') return false;
      if (!settings.showRankings && item.category === 'rankings') return false;
      if (!settings.showEvents && item.category === 'events') return false;
      
      // Combat filters
      if (item.category === 'combat') {
        if (item.data?.pointsDestroyed && item.data.pointsDestroyed < settings.combatThreshold) {
          return false;
        }
        
        // Check if it's own battle or alliance battle
        const isOwnBattle = item.data?.attackerName === playerId || item.data?.defenderName === playerId;
        const isAllianceBattle = false; // Would check alliance membership in real app
        
        if (!settings.showOwnBattles && isOwnBattle) return false;
        if (!settings.showAllianceBattles && isAllianceBattle) return false;
      }
      
      return true;
    }).slice(0, settings.maxNewsItems);
  };

  const markAsRead = (newsId: string) => {
    setState(prev => ({
      ...prev,
      news: prev.news.map(item => 
        item.id === newsId 
          ? { ...item, readBy: [...(item.readBy || []), playerId] }
          : item
      ),
      unreadCount: Math.max(0, prev.unreadCount - 1)
    }));
  };

  const markAllAsRead = () => {
    setState(prev => ({
      ...prev,
      news: prev.news.map(item => ({
        ...item,
        readBy: [...(item.readBy || []), playerId]
      })),
      unreadCount: 0
    }));
  };

  const updateSettings = (newSettings: Partial<GNNSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const getNewsByCategory = (category: GNNNewsItem['category']) => {
    return state.news.filter(news => news.category === category);
  };

  const getBreakingNewsItems = () => {
    return state.news.filter(news => news.priority === 'breaking').slice(0, 3);
  };

  const refreshNews = () => {
    loadNews();
  };

  // Auto-refresh
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  useEffect(() => {
    if (!state.settings.autoRefresh) return;

    const interval = setInterval(() => {
      loadNews();
    }, state.settings.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [state.settings.autoRefresh, state.settings.refreshInterval, loadNews]);

  return {
    state,
    markAsRead,
    markAllAsRead,
    updateSettings,
    getNewsByCategory,
    getBreakingNewsItems,
    refreshNews,
    loadNews
  };
}