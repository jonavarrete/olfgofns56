import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGame } from '../../context/GameContext';
import { useGNN } from '../../hooks/useGNN';
import Card from '../UI/Card';
import Button from '../UI/Button';
import GNNNewsItem from './GNNNewsItem';
import GNNSettings from './GNNSettings';
import { 
  Radio, 
  X, 
  Filter, 
  Settings, 
  RefreshCw, 
  Eye,
  EyeOff,
  Sword,
  Handshake,
  Star,
  TrendingUp,
  Zap,
  AlertTriangle,
  Clock,
  Globe,
  Search
} from 'lucide-react';
import { GNNNewsItem as NewsItemType } from '../../types/gnn';

interface GNNPanelProps {
  onClose: () => void;
  onNavigate?: (type: 'combat' | 'alien_race' | 'mission' | 'alliance' | 'player', data: any) => void;
}

type CategoryFilter = 'all' | 'combat' | 'diplomacy' | 'exploration' | 'rankings' | 'events';

export default function GNNPanel({ onClose, onNavigate = () => {} }: GNNPanelProps) {
  const { state: gameState } = useGame();
  const { player } = gameState;
  
  // Get current universe from localStorage
  const currentUniverse = localStorage.getItem('selected_universe') || 'universe_1';
  const { state, markAsRead, markAllAsRead, updateSettings, getNewsByCategory, refreshNews, getBreakingNewsItems } = useGNN(currentUniverse, player.id);

  
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const categoryConfig = {
    all: { name: 'Todas', icon: Globe, color: 'text-gray-400' },
    combat: { name: 'Combates', icon: Sword, color: 'text-neon-red' },
    diplomacy: { name: 'Diplomacia', icon: Handshake, color: 'text-neon-green' },
    exploration: { name: 'Exploración', icon: Star, color: 'text-neon-purple' },
    rankings: { name: 'Rankings', icon: TrendingUp, color: 'text-neon-blue' },
    events: { name: 'Eventos', icon: Zap, color: 'text-neon-orange' }
  };

  const filteredNews = selectedCategory === 'all' 
    ? state.news 
    : getNewsByCategory(selectedCategory);

  const searchFilteredNews = searchTerm 
    ? filteredNews.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.participants?.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredNews;

  const handleNewsClick = (news: NewsItemType) => {
    markAsRead(news.id);
    
    // Navigate based on news type and data
    switch (news.category) {
      case 'combat':
        if (news.data?.combatReportId) {
          onNavigate('combat', { 
            reportId: news.data.combatReportId,
            coordinates: news.data.coordinates 
          });
        }
        break;
      case 'exploration':
        if (news.data?.alienRaceId) {
          onNavigate('alien_race', { 
            raceId: news.data.alienRaceId 
          });
        } else if (news.data?.missionName) {
          onNavigate('mission', { 
            missionName: news.data.missionName 
          });
        }
        break;
      case 'rankings':
        if (news.data?.playerName) {
          onNavigate('player', { 
            playerName: news.data.playerName 
          });
        } else if (news.data?.allianceName) {
          onNavigate('alliance', { 
            allianceName: news.data.allianceName 
          });
        }
        break;
      case 'diplomacy':
        if (news.data?.alliance1 || news.data?.alliance2) {
          onNavigate('alliance', { 
            allianceName: news.data.alliance1 || news.data.alliance2 
          });
        }
        break;
      case 'events':
        // Navigate to events page or specific event
        break;
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

  const getCategoryCount = (category: CategoryFilter) => {
    if (category === 'all') return state.news.length;
    return getNewsByCategory(category).length;
  };

  return (
    <>
      {/* Main GNN Panel */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full h-[95vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-space-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-red/20 rounded-lg flex items-center justify-center animate-pulse">
                  <Radio className="w-6 h-6 text-neon-red" />
                </div>
                <div>
                  <h2 className="text-2xl font-orbitron font-bold text-white">
                    Galactic News Network
                  </h2>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-gray-400">
                      Transmitiendo desde {currentUniverse}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse"></div>
                      <span className="text-xs text-neon-red font-rajdhani font-bold">
                        EN VIVO
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {state.unreadCount > 0 && (
                  <Button variant="secondary" size="sm" onClick={markAllAsRead}>
                    <Eye className="w-4 h-4 mr-2" />
                    Marcar todo leído ({state.unreadCount})
                  </Button>
                )}
                
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={refreshNews}
                  disabled={state.loading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${state.loading ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
                
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <div className="w-80 border-r border-space-600 flex flex-col">
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar noticias..."
                    className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 text-sm focus:border-neon-blue focus:outline-none"
                  />
                </div>

                {/* Category Filters */}
                <div>
                  <h3 className="text-sm font-rajdhani font-semibold text-gray-400 mb-3">
                    Categorías
                  </h3>
                  <div className="space-y-1">
                    {Object.entries(categoryConfig).map(([category, config]) => {
                      const count = getCategoryCount(category as CategoryFilter);
                      const Icon = config.icon;
                      
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category as CategoryFilter)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                            selectedCategory === category
                              ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                              : 'text-gray-400 hover:text-white hover:bg-space-700/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span className="font-rajdhani font-medium">{config.name}</span>
                          </div>
                          <span className="text-xs bg-space-600 px-2 py-1 rounded">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Breaking News */}
                <div>
                  <h3 className="text-sm font-rajdhani font-semibold text-gray-400 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-neon-red animate-pulse" />
                    Última Hora
                  </h3>
                  <div className="space-y-2">
                    {getBreakingNewsItems(currentUniverse).slice(0, 3).map((news) => (
                      <div
                        key={news.id}
                        onClick={() => handleNewsClick(news)}
                        className="p-2 bg-neon-red/10 border border-neon-red/30 rounded cursor-pointer hover:bg-neon-red/20 transition-colors"
                      >
                        <p className="text-xs text-neon-red font-rajdhani font-bold mb-1">
                          ÚLTIMA HORA
                        </p>
                        <p className="text-xs text-white line-clamp-2">
                          {news.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTimeAgo(news.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Stats */}
                <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">
                    Estadísticas en Vivo
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Noticias hoy:</span>
                      <span className="text-white font-rajdhani font-medium">
                        {state.news.filter(n => Date.now() - n.timestamp < 86400000).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Última actualización:</span>
                      <span className="text-gray-400">
                        {state.lastUpdate ? formatTimeAgo(state.lastUpdate) : 'Nunca'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Sin leer:</span>
                      <span className="text-neon-blue font-rajdhani font-medium">
                        {state.unreadCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Content Header */}
              <div className="p-4 border-b border-space-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-rajdhani font-semibold text-white">
                      {categoryConfig[selectedCategory].name}
                      {searchTerm && ` - "${searchTerm}"`}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {searchFilteredNews.length} noticia{searchFilteredNews.length !== 1 ? 's' : ''}
                      {selectedCategory !== 'all' && ` en ${categoryConfig[selectedCategory].name.toLowerCase()}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Actualizado {formatTimeAgo(state.lastUpdate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Feed */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {state.loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 text-neon-blue animate-spin mx-auto mb-4" />
                      <p className="text-gray-400 font-rajdhani">Cargando noticias galácticas...</p>
                    </div>
                  </div>
                ) : searchFilteredNews.length === 0 ? (
                  <div className="text-center py-12">
                    <Radio className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-rajdhani font-semibold text-gray-400 mb-2">
                      {searchTerm ? 'Sin resultados' : 'Sin noticias'}
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm 
                        ? `No se encontraron noticias que coincidan con "${searchTerm}"`
                        : `No hay noticias disponibles en ${categoryConfig[selectedCategory].name.toLowerCase()}`
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchFilteredNews.map((news) => (
                      <GNNNewsItem
                        key={news.id}
                        news={news}
                        isRead={news.readBy?.includes(player.id) || false}
                        onClick={() => handleNewsClick(news)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel - Using Portal */}
      {mounted && showSettings && createPortal(
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <GNNSettings
            settings={state.settings}
            onUpdate={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        </div>,
        document.body
      )}
    </>
  );
}