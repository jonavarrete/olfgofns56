import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import Button from '../../components/UI/Button';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  Shield,
  Users,
  Activity,
  Server,
  Wrench,
  Eye,
  EyeOff,
  Trash2,
  Settings,
  Filter,
  Search,
  RefreshCw,
  ExternalLink,
  UserX,
  Ban,
  Database,
  Zap,
  Globe,
  Mail,
  MessageSquare
} from 'lucide-react';
import { AdminNotification } from '../../types/admin';

export default function AdminNotificationCenter() {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    clearNotifications,
    loadNotifications 
  } = useAdmin();
  
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | AdminNotification['type']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | AdminNotification['priority']>('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(loadNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isOpen, loadNotifications]);

  const getNotificationIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'security': return Shield;
      case 'user_action': return Users;
      case 'system': return Server;
      case 'violation': return AlertTriangle;
      case 'maintenance': return Wrench;
      case 'performance': return Activity;
      default: return Info;
    }
  };

  const getNotificationColor = (priority: AdminNotification['priority']) => {
    switch (priority) {
      case 'critical': return 'text-neon-red border-neon-red/30 bg-neon-red/10';
      case 'high': return 'text-neon-orange border-neon-orange/30 bg-neon-orange/10';
      case 'medium': return 'text-neon-blue border-neon-blue/30 bg-neon-blue/10';
      case 'low': return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      default: return 'text-gray-400 border-space-600 bg-space-700/30';
    }
  };

  const getTypeColor = (type: AdminNotification['type']) => {
    switch (type) {
      case 'security': return 'text-neon-red';
      case 'user_action': return 'text-neon-blue';
      case 'system': return 'text-neon-green';
      case 'violation': return 'text-neon-orange';
      case 'maintenance': return 'text-neon-purple';
      case 'performance': return 'text-neon-orange';
      default: return 'text-gray-400';
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

  const getTypeText = (type: AdminNotification['type']) => {
    switch (type) {
      case 'security': return 'Seguridad';
      case 'user_action': return 'Usuario';
      case 'system': return 'Sistema';
      case 'violation': return 'Violación';
      case 'maintenance': return 'Mantenimiento';
      case 'performance': return 'Rendimiento';
      default: return type;
    }
  };

  const filteredNotifications = notifications.notifications.filter(notification => {
    if (filter !== 'all' && notification.type !== filter) return false;
    if (priorityFilter !== 'all' && notification.priority !== priorityFilter) return false;
    if (showOnlyUnread && notification.read) return false;
    return true;
  });

  const handleNotificationClick = (notification: AdminNotification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }

    // Handle navigation based on notification type and related data
    if (notification.relatedId) {
      switch (notification.type) {
        case 'security':
        case 'violation':
          // Navigate to security management
          window.location.href = '/admin/security';
          break;
        case 'user_action':
          // Navigate to user management
          window.location.href = '/admin/users';
          break;
        case 'system':
        case 'performance':
          // Navigate to system config
          window.location.href = '/admin/config/platform';
          break;
      }
    }
    
    setIsOpen(false);
  };

  const getActionRequiredCount = () => {
    return notifications.notifications.filter(n => n.actionRequired && !n.read).length;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
        title="Notificaciones de Administración"
      >
        <Bell className="w-5 h-5" />
        {notifications.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon-red rounded-full flex items-center justify-center text-xs font-rajdhani font-bold text-white animate-pulse">
            {notifications.unreadCount > 9 ? '9+' : notifications.unreadCount}
          </span>
        )}
        {getActionRequiredCount() > 0 && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-orange rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-96 max-w-[90vw] bg-card-gradient border border-space-600 rounded-lg shadow-xl z-50 backdrop-blur-sm max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="relative p-4 border-b border-space-600">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-orbitron font-semibold text-white">
                    Notificaciones Admin
                  </h3>
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                    <span>{notifications.unreadCount} sin leer</span>
                    {getActionRequiredCount() > 0 && (
                      <span className="text-neon-orange">
                        {getActionRequiredCount()} requieren acción
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={loadNotifications}
                    disabled={notifications.loading}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Actualizar"
                  >
                    <RefreshCw className={`w-4 h-4 ${notifications.loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="flex-1 px-2 py-1 bg-space-700/50 border border-space-600 rounded text-white text-xs focus:border-neon-blue focus:outline-none"
                  >
                    <option value="all">Todos los tipos</option>
                    <option value="security">Seguridad</option>
                    <option value="user_action">Usuarios</option>
                    <option value="system">Sistema</option>
                    <option value="violation">Violaciones</option>
                    <option value="maintenance">Mantenimiento</option>
                    <option value="performance">Rendimiento</option>
                  </select>
                  
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as any)}
                    className="flex-1 px-2 py-1 bg-space-700/50 border border-space-600 rounded text-white text-xs focus:border-neon-blue focus:outline-none"
                  >
                    <option value="all">Todas las prioridades</option>
                    <option value="critical">Crítica</option>
                    <option value="high">Alta</option>
                    <option value="medium">Media</option>
                    <option value="low">Baja</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnlyUnread}
                      onChange={(e) => setShowOnlyUnread(e.target.checked)}
                      className="rounded border-space-600 bg-space-700 text-neon-blue focus:ring-neon-blue focus:ring-offset-space-800"
                    />
                    <span className="text-xs text-gray-400">Solo sin leer</span>
                  </label>
                  
                  <div className="flex items-center space-x-2">
                    {notifications.unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Marcar todo leído
                      </button>
                    )}
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-gray-400 hover:text-neon-red transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="relative max-h-96 overflow-y-auto">
              {notifications.loading ? (
                <div className="p-8 text-center">
                  <RefreshCw className="w-6 h-6 text-neon-blue animate-spin mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">Cargando notificaciones...</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    {showOnlyUnread ? 'No hay notificaciones sin leer' : 'No hay notificaciones'}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 border-b border-space-600 cursor-pointer hover:bg-space-600/30 transition-colors ${
                        !notification.read ? 'bg-space-700/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg border ${getNotificationColor(notification.priority)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 rounded text-xs font-rajdhani font-medium ${getTypeColor(notification.type)} bg-current/10`}>
                                {getTypeText(notification.type)}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-xs font-rajdhani font-bold ${getNotificationColor(notification.priority)}`}>
                                {notification.priority.toUpperCase()}
                              </span>
                              {notification.actionRequired && (
                                <span className="px-2 py-0.5 bg-neon-orange/20 text-neon-orange rounded text-xs font-rajdhani font-medium">
                                  ACCIÓN REQUERIDA
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                              )}
                            </div>
                          </div>
                          
                          <h4 className={`text-sm font-rajdhani font-semibold mb-1 ${
                            !notification.read ? 'text-white' : 'text-gray-300'
                          }`}>
                            {notification.title}
                          </h4>
                          
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {notification.message}
                          </p>

                          {/* Metadata indicators */}
                          {notification.metadata && (
                            <div className="flex items-center space-x-3 mt-2">
                              {notification.metadata.ipAddress && (
                                <div className="flex items-center space-x-1">
                                  <Globe className="w-3 h-3 text-gray-500" />
                                  <span className="text-xs text-gray-500 font-mono">
                                    {notification.metadata.ipAddress}
                                  </span>
                                </div>
                              )}
                              {notification.metadata.universe && (
                                <div className="flex items-center space-x-1">
                                  <Globe className="w-3 h-3 text-neon-purple" />
                                  <span className="text-xs text-gray-500">
                                    {notification.metadata.universe}
                                  </span>
                                </div>
                              )}
                              {notification.metadata.violationType && (
                                <div className="flex items-center space-x-1">
                                  <AlertTriangle className="w-3 h-3 text-neon-red" />
                                  <span className="text-xs text-gray-500">
                                    {notification.metadata.violationType}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > 0 && (
              <div className="p-4 border-t border-space-600">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    {filteredNotifications.length} notificación{filteredNotifications.length !== 1 ? 'es' : ''}
                    {filter !== 'all' && ` • Filtro: ${getTypeText(filter)}`}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.location.href = '/admin/security'}
                      className="text-xs text-neon-blue hover:text-white transition-colors"
                    >
                      Ver todo en Seguridad
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}