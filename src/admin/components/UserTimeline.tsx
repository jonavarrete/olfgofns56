import React, { useState, useEffect } from 'react';
import { PlayerAccount, TimelineEvent } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  X, 
  Clock, 
  User, 
  LogIn,
  LogOut,
  Sword,
  Building,
  FlaskConical,
  Package,
  Shield,
  AlertTriangle,
  Activity,
  Globe,
  MessageSquare,
  Eye,
  Filter,
  Calendar,
  Search
} from 'lucide-react';

interface UserTimelineProps {
  user: PlayerAccount;
  onClose: () => void;
}

export default function UserTimeline({ user, onClose }: UserTimelineProps) {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | TimelineEvent['type']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTimeline();
  }, [user.id]);

  const loadTimeline = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock timeline data
      const mockTimeline: TimelineEvent[] = [
        {
          id: '1',
          type: 'login',
          description: 'Inicio de sesión desde IP 192.168.1.100',
          timestamp: Date.now() - 3600000,
          metadata: { ipAddress: '192.168.1.100', userAgent: 'Chrome/120.0' }
        },
        {
          id: '2',
          type: 'building',
          description: 'Construcción completada: Mina de Metal nivel 13',
          timestamp: Date.now() - 7200000,
          metadata: { building: 'metalMine', level: 13, planetId: '1' }
        },
        {
          id: '3',
          type: 'battle',
          description: 'Victoria en combate contra EnemyPlayer en 3:4:5',
          timestamp: Date.now() - 10800000,
          metadata: { result: 'victory', coordinates: '3:4:5', pointsGained: 15000 }
        },
        {
          id: '4',
          type: 'research',
          description: 'Investigación completada: Tecnología de Armas nivel 6',
          timestamp: Date.now() - 14400000,
          metadata: { research: 'weaponsTechnology', level: 6 }
        },
        {
          id: '5',
          type: 'trade',
          description: 'Intercambio comercial: 50K metal por 25K cristal',
          timestamp: Date.now() - 18000000,
          metadata: { offered: { metal: 50000 }, received: { crystal: 25000 } }
        },
        {
          id: '6',
          type: 'violation',
          description: 'Reportado por uso sospechoso de bots',
          timestamp: Date.now() - 86400000 * 3,
          metadata: { violationType: 'cheating', reportedBy: 'AutoDetection' }
        },
        {
          id: '7',
          type: 'logout',
          description: 'Cierre de sesión',
          timestamp: Date.now() - 86400000,
          metadata: { sessionDuration: 7200000 }
        }
      ];
      
      setTimeline(mockTimeline);
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'login': return LogIn;
      case 'logout': return LogOut;
      case 'battle': return Sword;
      case 'building': return Building;
      case 'research': return FlaskConical;
      case 'trade': return Package;
      case 'violation': return AlertTriangle;
      case 'penalty': return Shield;
      default: return Activity;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'login': return 'text-neon-green';
      case 'logout': return 'text-gray-400';
      case 'battle': return 'text-neon-red';
      case 'building': return 'text-neon-blue';
      case 'research': return 'text-neon-purple';
      case 'trade': return 'text-neon-orange';
      case 'violation': return 'text-neon-red';
      case 'penalty': return 'text-neon-red';
      default: return 'text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTimeline = timeline.filter(event => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white">
              Timeline de Usuario
            </h2>
            <p className="text-gray-400 mt-1">
              Historial de actividad: {user.username}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-space-600">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar en timeline..."
                className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            >
              <option value="all">Todos los eventos</option>
              <option value="login">Inicios de sesión</option>
              <option value="battle">Batallas</option>
              <option value="building">Construcciones</option>
              <option value="research">Investigación</option>
              <option value="trade">Comercio</option>
              <option value="violation">Violaciones</option>
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-space-600 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-space-600 rounded w-3/4"></div>
                      <div className="h-3 bg-space-600 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTimeline.map((event, index) => {
                const Icon = getEventIcon(event.type);
                const isLast = index === filteredTimeline.length - 1;
                
                return (
                  <div key={event.id} className="relative">
                    {/* Timeline line */}
                    {!isLast && (
                      <div className="absolute left-4 top-8 w-0.5 h-full bg-space-600"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full border ${getEventColor(event.type)} bg-current/10 border-current/30 relative z-10`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {event.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTimestamp(event.timestamp)}
                            </p>
                          </div>
                          
                          {event.metadata && (
                            <button
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                              title="Ver detalles"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        
                        {/* Metadata preview */}
                        {event.metadata && (
                          <div className="mt-2 p-2 bg-space-800/50 rounded text-xs text-gray-400">
                            {Object.entries(event.metadata).slice(0, 2).map(([key, value]) => (
                              <span key={key} className="mr-3">
                                {key}: {String(value)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredTimeline.length === 0 && (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">
                    {searchTerm || filterType !== 'all' 
                      ? 'No se encontraron eventos que coincidan con los filtros'
                      : 'No hay eventos en el timeline'
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-space-600 p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Mostrando {filteredTimeline.length} de {timeline.length} eventos
            </div>
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}