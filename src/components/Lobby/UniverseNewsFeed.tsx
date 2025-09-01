import React from 'react';
import { UniverseNewsItem } from '../../types/news';
import { getLatestUniverseNews } from '../../data/universeNews';
import { 
  Radio, 
  Sword, 
  Star, 
  Users, 
  Handshake, 
  Package, 
  Zap,
  TrendingUp,
  Crown,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface UniverseNewsFeedProps {
  universeId: string;
  universeName: string;
}

export default function UniverseNewsFeed({ universeId, universeName }: UniverseNewsFeedProps) {
  const news = getLatestUniverseNews(universeId, 4);

  const getNewsIcon = (type: UniverseNewsItem['type']) => {
    switch (type) {
      case 'battle': return Sword;
      case 'discovery': return Star;
      case 'alliance': return Users;
      case 'diplomacy': return Handshake;
      case 'trade': return Package;
      case 'event': return Zap;
      case 'ranking': return TrendingUp;
      default: return Radio;
    }
  };

  const getPriorityColor = (priority: UniverseNewsItem['priority']) => {
    switch (priority) {
      case 'breaking': return 'text-neon-red';
      case 'high': return 'text-neon-orange';
      case 'medium': return 'text-neon-blue';
      case 'low': return 'text-gray-400';
    }
  };

  const getTypeColor = (type: UniverseNewsItem['type']) => {
    switch (type) {
      case 'battle': return 'text-neon-red';
      case 'discovery': return 'text-neon-purple';
      case 'alliance': return 'text-neon-blue';
      case 'diplomacy': return 'text-neon-green';
      case 'trade': return 'text-neon-orange';
      case 'event': return 'text-neon-purple';
      case 'ranking': return 'text-neon-blue';
      default: return 'text-gray-400';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const getUniverseActivityLevel = () => {
    const battleNews = news.filter(n => n.type === 'battle').length;
    const recentNews = news.filter(n => Date.now() - n.timestamp < 3600000).length; // Last hour
    
    if (battleNews >= 2 || recentNews >= 3) return { level: 'GUERRA TOTAL', color: 'text-neon-red' };
    if (battleNews >= 1 || recentNews >= 2) return { level: 'ALTA ACTIVIDAD', color: 'text-neon-orange' };
    if (news.some(n => n.type === 'diplomacy' || n.type === 'trade')) return { level: 'DIPLOMÁTICO', color: 'text-neon-green' };
    return { level: 'TRANQUILO', color: 'text-neon-blue' };
  };

  const activityLevel = getUniverseActivityLevel();

  if (news.length === 0) {
    return (
      <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-6 h-6 bg-gray-500/20 rounded flex items-center justify-center">
            <Radio className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <h4 className="font-rajdhani font-semibold text-white text-sm">
              GNN - {universeName}
            </h4>
            <p className="text-xs text-gray-500">Sin noticias recientes</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center py-4">
          No hay actividad reciente reportada en este universo
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
      {/* GNN Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-neon-red/20 rounded flex items-center justify-center animate-pulse">
            <Radio className="w-4 h-4 text-neon-red" />
          </div>
          <div>
            <h4 className="font-rajdhani font-semibold text-white text-sm">
              GNN - {universeName}
            </h4>
            <p className="text-xs text-gray-400">Últimas 24-48 horas</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-neon-red rounded-full animate-pulse"></div>
          <span className={`text-xs font-rajdhani font-bold ${activityLevel.color}`}>
            {activityLevel.level}
          </span>
        </div>
      </div>

      {/* News Items */}
      <div className="space-y-2">
        {news.map((newsItem) => {
          const Icon = getNewsIcon(newsItem.type);
          return (
            <div
              key={newsItem.id}
              className="p-2 bg-space-800/50 rounded border border-space-600/50 hover:border-neon-blue/30 transition-all duration-200 group"
            >
              <div className="flex items-start space-x-2">
                <div className={`p-1 rounded ${getTypeColor(newsItem.type)} bg-current/10 border border-current/20`}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <span className={`text-xs font-rajdhani font-bold ${getPriorityColor(newsItem.priority)}`}>
                      [{universeName.toUpperCase()}]
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(newsItem.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    {newsItem.title}
                  </p>
                  
                  {/* Additional data indicators */}
                  {newsItem.data && (
                    <div className="flex items-center space-x-3 mt-1">
                      {newsItem.data.shipsDestroyed && (
                        <div className="flex items-center space-x-1">
                          <Sword className="w-2 h-2 text-neon-red" />
                          <span className="text-xs text-gray-500">
                            {newsItem.data.shipsDestroyed.toLocaleString()} naves
                          </span>
                        </div>
                      )}
                      {newsItem.data.playersInvolved && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-2 h-2 text-neon-blue" />
                          <span className="text-xs text-gray-500">
                            {newsItem.data.playersInvolved} jugadores
                          </span>
                        </div>
                      )}
                      {newsItem.data.resourcesTraded && (
                        <div className="flex items-center space-x-1">
                          <Package className="w-2 h-2 text-neon-green" />
                          <span className="text-xs text-gray-500">
                            {(newsItem.data.resourcesTraded / 1000000).toFixed(1)}M recursos
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Summary */}
      <div className="mt-3 pt-3 border-t border-space-600/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Estado del universo:</span>
          <span className={`font-rajdhani font-bold ${activityLevel.color}`}>
            {activityLevel.level}
          </span>
        </div>
      </div>
    </div>
  );
}