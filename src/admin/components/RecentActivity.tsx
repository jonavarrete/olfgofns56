import React, { useState, useEffect } from 'react';
import AdminCard from './AdminCard';
import { 
  Activity, 
  Users, 
  Shield, 
  MessageSquare,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Ban,
  UserX
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'user_action' | 'security' | 'system' | 'admin_action';
  description: string;
  user?: string;
  admin?: string;
  timestamp: number;
  severity: 'info' | 'warning' | 'error' | 'success';
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivity();
    
    // Refresh every minute
    const interval = setInterval(loadRecentActivity, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadRecentActivity = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'security',
          description: 'Usuario "SpaceHacker" reportado por uso de bots',
          user: 'SpaceHacker',
          timestamp: Date.now() - 300000,
          severity: 'warning'
        },
        {
          id: '2',
          type: 'admin_action',
          description: 'Mensaje global enviado sobre mantenimiento programado',
          admin: 'SuperAdmin',
          timestamp: Date.now() - 600000,
          severity: 'info'
        },
        {
          id: '3',
          type: 'user_action',
          description: 'Nueva cuenta creada: "GalacticNewbie"',
          user: 'GalacticNewbie',
          timestamp: Date.now() - 900000,
          severity: 'success'
        },
        {
          id: '4',
          type: 'security',
          description: 'IP 192.168.1.100 bloqueada por múltiples intentos fallidos',
          timestamp: Date.now() - 1200000,
          severity: 'error'
        },
        {
          id: '5',
          type: 'system',
          description: 'Backup automático completado exitosamente',
          timestamp: Date.now() - 1500000,
          severity: 'success'
        },
        {
          id: '6',
          type: 'admin_action',
          description: 'Usuario "ViolentPlayer" suspendido por 24 horas',
          admin: 'ModeratorX',
          user: 'ViolentPlayer',
          timestamp: Date.now() - 1800000,
          severity: 'warning'
        }
      ];
      
      setActivities(mockActivities);
    } catch (error) {
      console.error('Error loading activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'user_action': return Users;
      case 'security': return Shield;
      case 'system': return Activity;
      case 'admin_action': return Eye;
      default: return Activity;
    }
  };

  const getSeverityColor = (severity: ActivityItem['severity']) => {
    switch (severity) {
      case 'success': return 'text-neon-green';
      case 'warning': return 'text-neon-orange';
      case 'error': return 'text-neon-red';
      case 'info': return 'text-neon-blue';
      default: return 'text-gray-400';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  return (
    <AdminCard title="Actividad Reciente" icon={Activity} color="neon-purple">
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-space-600 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-space-600 rounded w-3/4"></div>
                    <div className="h-2 bg-space-600 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-space-700/30 rounded border border-space-600 hover:border-neon-blue/30 transition-colors"
              >
                <div className={`p-1.5 rounded border ${getSeverityColor(activity.severity)} bg-current/10 border-current/30`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                    {activity.user && (
                      <span className="text-xs text-neon-blue">
                        @{activity.user}
                      </span>
                    )}
                    {activity.admin && (
                      <span className="text-xs text-neon-purple">
                        por {activity.admin}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminCard>
  );
}