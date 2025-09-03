import React, { useState, useEffect } from 'react';
import { NewsItem } from '../../types/news';
import { getNewsByPriority } from '../../data/newsData';
import Card from '../UI/Card';
import Button from '../UI/Button';
import HallOfFameModal from '../HallOfFame/HallOfFameModal';
import { 
  Radio, 
  Clock, 
  MapPin, 
  Users, 
  Sword, 
  Handshake, 
  Target, 
  Star,
  Zap,
  Calendar,
  ChevronRight,
  X,
  Globe,
  AlertTriangle,
  Award,
  Rocket
} from 'lucide-react';

export default function GalacticNewsNetwork() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
    
    // Refresh news every 5 minutes
    const interval = setInterval(loadNews, 300000);
    return () => clearInterval(interval);
  }, []);

  const loadNews = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const latestNews = getNewsByPriority();
    setNews(latestNews);
    setLoading(false);
  };

  const getNewsIcon = (type: NewsItem['type']) => {
    switch (type) {
      case 'battle': return Sword;
      case 'diplomacy': return Handshake;
      case 'pve': return Target;
      case 'alliance': return Users;
      case 'discovery': return Star;
      case 'event': return Zap;
      default: return Radio;
    }
  };

  const getPriorityColor = (priority: NewsItem['priority']) => {
    switch (priority) {
      case 'breaking': return 'text-neon-red border-neon-red/30 bg-neon-red/10';
      case 'high': return 'text-neon-orange border-neon-orange/30 bg-neon-orange/10';
      case 'medium': return 'text-neon-blue border-neon-blue/30 bg-neon-blue/10';
      case 'low': return 'text-gray-400 border-space-600 bg-space-700/30';
    }
  };

  const getPriorityText = (priority: NewsItem['priority']) => {
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
    
    if (hours > 0) return `Hace ${hours}h`;
    return `Hace ${minutes}m`;
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleJoinUniverse = (universe: string) => {
    // In a real app, this would navigate to universe selection
    alert(`Redirigiendo al Universo ${universe}...`);
    setSelectedNews(null);
  };

  const handleViewHallOfFame = () => {
    setShowHallOfFame(true);
  };
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-space-600 rounded animate-pulse"></div>
            <div className="h-4 bg-space-600 rounded w-48 animate-pulse"></div>
          </div>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-space-600 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-space-600 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="relative overflow-hidden">
        <div className="space-y-4">
          {/* GNN Header */}
          <div className="flex items-center space-x-3 pb-3 border-b border-space-600">
            <div className="w-8 h-8 bg-neon-red/20 rounded-lg flex items-center justify-center animate-pulse">
              <Radio className="w-4 h-4 text-neon-red" />
            </div>
            <div>
              <h3 className="text-lg font-orbitron font-bold text-white">
                Galactic News Network
              </h3>
              <p className="text-xs text-gray-400">
                Transmitiendo desde toda la galaxia • EN VIVO
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* News Items */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {news.map((newsItem) => {
              const Icon = getNewsIcon(newsItem.type);
              return (
                <div
                  key={newsItem.id}
                  onClick={() => handleNewsClick(newsItem)}
                  className="p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 cursor-pointer transition-all duration-200 hover:bg-space-600/30 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded border ${getPriorityColor(newsItem.priority)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-rajdhani font-bold ${getPriorityColor(newsItem.priority)}`}>
                            {getPriorityText(newsItem.priority)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(newsItem.timestamp)}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors" />
                      </div>
                      
                      <h4 className="text-sm font-rajdhani font-semibold text-white mb-1 line-clamp-2 group-hover:text-neon-blue transition-colors">
                        {newsItem.title}
                      </h4>
                      
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {newsItem.summary}
                      </p>
                      
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3 h-3 text-neon-purple" />
                          <span className="text-xs text-neon-purple font-rajdhani font-medium">
                            {newsItem.universe}
                          </span>
                        </div>
                        {newsItem.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {newsItem.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-space-600">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                Actualizado cada 5 minutos
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-neon-green font-rajdhani font-medium">
                  TRANSMISIÓN EN VIVO
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-space-600">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg border ${getPriorityColor(selectedNews.priority)}`}>
                    {React.createElement(getNewsIcon(selectedNews.type), { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-rajdhani font-bold ${getPriorityColor(selectedNews.priority)}`}>
                        {getPriorityText(selectedNews.priority)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(selectedNews.timestamp)}
                      </span>
                    </div>
                    <h2 className="text-xl font-orbitron font-bold text-white leading-tight">
                      {selectedNews.title}
                    </h2>
                    <p className="text-gray-400 mt-2">{selectedNews.summary}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* News Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-rajdhani font-semibold text-white mb-2">
                    Detalles del Evento
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedNews.details.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-rajdhani font-semibold text-white mb-2">
                    Impacto Galáctico
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedNews.details.impact}
                  </p>
                </div>

                {/* Participants */}
                {selectedNews.participants && selectedNews.participants.length > 0 && (
                  <div>
                    <h3 className="font-rajdhani font-semibold text-white mb-2">
                      Participantes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedNews.participants.map((participant, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-xs font-rajdhani font-medium"
                        >
                          {participant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                {selectedNews.location && (
                  <div className="flex items-center space-x-2 p-3 bg-space-700/30 rounded-lg border border-space-600">
                    <MapPin className="w-4 h-4 text-neon-green" />
                    <span className="text-sm text-gray-300">
                      Ubicación: {selectedNews.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <div className="p-4 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Rocket className="w-6 h-6 text-neon-blue mt-1" />
                  <div className="flex-1">
                    <h3 className="font-rajdhani font-semibold text-white mb-2">
                      ¡Sé Parte de la Historia!
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {selectedNews.details.callToAction}
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => handleJoinUniverse(selectedNews.universe)}
                      className="w-full"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      ¡Únete a {selectedNews.universe} para ser parte de la historia!
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleViewHallOfFame}
                      className="w-full mt-2"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Ver Salón de la Fama
                    </Button>
                  </div>
                </div>
              </div>

              {/* Universe Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <Globe className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Universo</p>
                  <p className="text-sm font-rajdhani font-bold text-white">
                    {selectedNews.universe}
                  </p>
                </div>
                
                <div className="text-center p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <Users className="w-6 h-6 text-neon-green mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Jugadores Activos</p>
                  <p className="text-sm font-rajdhani font-bold text-white">
                    {Math.floor(Math.random() * 2000) + 1000}+
                  </p>
                </div>
                
                <div className="text-center p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <Award className="w-6 h-6 text-neon-orange mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Actividad</p>
                  <p className="text-sm font-rajdhani font-bold text-neon-green">
                    ALTA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hall of Fame Modal */}
      {showHallOfFame && (
        <HallOfFameModal
          mode="global"
          onClose={() => setShowHallOfFame(false)}
          onJoinUniverse={(universeId) => {
            setShowHallOfFame(false);
            alert(`Redirigiendo al universo ${universeId}...`);
          }}
        />
      )}
    </>
  );
}