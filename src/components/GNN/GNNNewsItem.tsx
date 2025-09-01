import React, { useState } from 'react';
import { GNNNewsItem as NewsItemType } from '../../types/gnn';
import { 
  Sword, 
  Handshake, 
  Star, 
  TrendingUp, 
  Zap,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  ChevronDown,
  Eye,
  AlertTriangle,
  Target,
  Crown,
  Globe,
  Package
} from 'lucide-react';

interface GNNNewsItemProps {
  news: NewsItemType;
  isRead: boolean;
  onClick: () => void;
}

export default function GNNNewsItem({ news, isRead, onClick }: GNNNewsItemProps) {
  const [expanded, setExpanded] = useState(false);

  const getCategoryIcon = (category: NewsItemType['category']) => {
    switch (category) {
      case 'combat': return Sword;
      case 'diplomacy': return Handshake;
      case 'exploration': return Star;
      case 'rankings': return TrendingUp;
      case 'events': return Zap;
      default: return Globe;
    }
  };

  const getCategoryColor = (category: NewsItemType['category']) => {
    switch (category) {
      case 'combat': return 'text-neon-red';
      case 'diplomacy': return 'text-neon-green';
      case 'exploration': return 'text-neon-purple';
      case 'rankings': return 'text-neon-blue';
      case 'events': return 'text-neon-orange';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: NewsItemType['priority']) => {
    switch (priority) {
      case 'breaking': return 'text-neon-red border-neon-red/30 bg-neon-red/10';
      case 'high': return 'text-neon-orange border-neon-orange/30 bg-neon-orange/10';
      case 'medium': return 'text-neon-blue border-neon-blue/30 bg-neon-blue/10';
      case 'low': return 'text-gray-400 border-space-600 bg-space-700/30';
    }
  };

  const getPriorityText = (priority: NewsItemType['priority']) => {
    switch (priority) {
      case 'breaking': return 'ÚLTIMA HORA';
      case 'high': return 'IMPORTANTE';
      case 'medium': return 'DESTACADO';
      case 'low': return 'GENERAL';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const Icon = getCategoryIcon(news.category);

  const handleClick = () => {
    onClick();
    if (!expanded) {
      setExpanded(true);
    }
  };

  return (
    <div
      className={`p-3 lg:p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:border-neon-blue/30 group touch-manipulation ${
        isRead 
          ? 'bg-space-700/30 border-space-600' 
          : 'bg-space-700/50 border-space-500 shadow-[0_0_10px_rgba(0,212,255,0.1)]'
      }`}
      onClick={handleClick}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`p-2 rounded-lg border ${getPriorityColor(news.priority)}`}>
              <Icon className={`w-4 h-4 ${getCategoryColor(news.category)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className={`px-2 py-1 rounded text-xs font-rajdhani font-bold ${getPriorityColor(news.priority)}`}>
                    {getPriorityText(news.priority)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTimeAgo(news.timestamp)}
                  </span>
                  {!isRead && (
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                  )}
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-all duration-200 ${
                  expanded ? 'rotate-90' : ''
                }`} />
              </div>
              
              <h3 className={`text-sm font-rajdhani font-semibold leading-tight mb-2 group-hover:text-neon-blue transition-colors ${
                isRead ? 'text-gray-300' : 'text-white'
              }`}>
                {news.title}
              </h3>
              
              <p className="text-xs text-gray-400 line-clamp-2">
                {news.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center space-x-2 lg:space-x-4 text-xs flex-wrap">
          {news.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">{news.location}</span>
            </div>
          )}
          
          {news.participants && news.participants.length > 0 && (
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">
                {news.participants.length > 2 
                  ? `${news.participants.slice(0, 2).join(', ')} +${news.participants.length - 2}`
                  : news.participants.join(', ')
                }
              </span>
            </div>
          )}

          {/* Category-specific data */}
          {news.category === 'combat' && news.data?.pointsDestroyed && (
            <div className="flex items-center space-x-1">
              <Target className="w-3 h-3 text-neon-red" />
              <span className="text-neon-red font-rajdhani font-medium">
                {formatNumber(news.data.pointsDestroyed)} pts
              </span>
            </div>
          )}

          {news.category === 'rankings' && news.data?.pointsGained && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-neon-green" />
              <span className="text-neon-green font-rajdhani font-medium">
                +{formatNumber(news.data.pointsGained)}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {news.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-space-600/50 text-gray-400 rounded text-xs font-rajdhani"
              >
                #{tag}
              </span>
            ))}
            {news.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{news.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Expanded Content */}
        {expanded && (
          <div className="pt-3 border-t border-space-600">
            <div className="space-y-3">
              <div className="text-sm text-gray-300 leading-relaxed">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2 flex-wrap gap-2">
                {news.category === 'combat' && news.data?.combatReportId && (
                  <button className="px-3 py-1 bg-neon-red/20 text-neon-red rounded text-xs font-rajdhani font-medium hover:bg-neon-red/30 transition-colors touch-manipulation">
                    Ver Reporte de Combate
                  </button>
                )}
                
                {news.category === 'exploration' && news.data?.alienRaceId && (
                  <button className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded text-xs font-rajdhani font-medium hover:bg-neon-purple/30 transition-colors touch-manipulation">
                    Ver Raza Alienígena
                  </button>
                )}
                
                {news.category === 'rankings' && news.data?.playerName && (
                  <button className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded text-xs font-rajdhani font-medium hover:bg-neon-blue/30 transition-colors touch-manipulation">
                    Ver Perfil de Jugador
                  </button>
                )}
                
                {news.category === 'diplomacy' && (news.data?.alliance1 || news.data?.alliance2) && (
                  <button className="px-3 py-1 bg-neon-green/20 text-neon-green rounded text-xs font-rajdhani font-medium hover:bg-neon-green/30 transition-colors touch-manipulation">
                    Ver Alianza
                  </button>
                )}

                {news.data?.coordinates && (
                  <button className="px-3 py-1 bg-neon-orange/20 text-neon-orange rounded text-xs font-rajdhani font-medium hover:bg-neon-orange/30 transition-colors touch-manipulation">
                    Ir a {news.data.coordinates}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}