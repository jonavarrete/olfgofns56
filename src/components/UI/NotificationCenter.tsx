import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useNotifications } from '../../hooks/useNotifications';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  Building,
  FlaskConical,
  Rocket,
  Sword,
  Users
} from 'lucide-react';
import { Notification } from '../../types/game';

export default function NotificationCenter() {
  const { state, markNotificationAsRead, clearAllNotifications } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = state.notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'building': return Building;
      case 'research': return FlaskConical;
      case 'fleet': return Rocket;
      case 'attack': return Sword;
      case 'alliance': return Users;
      default: return Info;
    }
  };

  const getNotificationColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'critical': return 'text-neon-red border-neon-red/30 bg-neon-red/10';
      case 'high': return 'text-neon-orange border-neon-orange/30 bg-neon-orange/10';
      case 'medium': return 'text-neon-blue border-neon-blue/30 bg-neon-blue/10';
      case 'low': return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      default: return 'text-gray-400 border-space-600 bg-space-700/30';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Ahora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return `${Math.floor(diff / 86400000)}d`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon-red rounded-full flex items-center justify-center text-xs font-rajdhani font-bold text-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 lg:w-96 max-w-[90vw] bg-card-gradient border border-space-600 rounded-lg shadow-xl z-50 backdrop-blur-sm max-h-96 overflow-hidden">
            <div className="relative p-4 border-b border-space-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-orbitron font-semibold text-white">
                  Notificaciones
                </h3>
                <div className="flex items-center space-x-2">
                  {state.notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-gray-400 hover:text-white transition-colors touch-manipulation"
                    >
                      Limpiar todo
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative max-h-80 overflow-y-auto">
              {state.notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay notificaciones</p>
                </div>
              ) : (
                state.notifications
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationAsRead(notification.id)}
                        className={`p-4 border-b border-space-600 cursor-pointer hover:bg-space-600/30 transition-colors touch-manipulation ${
                          !notification.read ? 'bg-space-700/20' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg border ${getNotificationColor(notification.priority)}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className={`text-sm font-rajdhani font-semibold ${
                                !notification.read ? 'text-white' : 'text-gray-300'
                              }`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-400">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}