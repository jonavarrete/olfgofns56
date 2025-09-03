import { useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { AdminNotification } from '../../types/admin';

export function useAdminNotifications() {
  const { notifications, addNotification, loadNotifications } = useAdmin();

  // Auto-load notifications on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  // Auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(loadNotifications, 120000);
    return () => clearInterval(interval);
  }, [loadNotifications]);

  const showSecurityAlert = (title: string, message: string, relatedId?: string, metadata?: any) => {
    addNotification({
      title,
      message,
      type: 'security',
      priority: 'high',
      read: false,
      actionRequired: true,
      relatedId,
      metadata
    });
  };

  const showUserAlert = (title: string, message: string, relatedId?: string, metadata?: any) => {
    addNotification({
      title,
      message,
      type: 'user_action',
      priority: 'medium',
      read: false,
      actionRequired: false,
      relatedId,
      metadata
    });
  };

  const showSystemAlert = (title: string, message: string, priority: AdminNotification['priority'] = 'medium', metadata?: any) => {
    addNotification({
      title,
      message,
      type: 'system',
      priority,
      read: false,
      actionRequired: priority === 'critical' || priority === 'high',
      metadata
    });
  };

  const showViolationAlert = (title: string, message: string, relatedId?: string, metadata?: any) => {
    addNotification({
      title,
      message,
      type: 'violation',
      priority: 'high',
      read: false,
      actionRequired: true,
      relatedId,
      metadata
    });
  };

  const showMaintenanceAlert = (title: string, message: string, metadata?: any) => {
    addNotification({
      title,
      message,
      type: 'maintenance',
      priority: 'medium',
      read: false,
      actionRequired: false,
      metadata
    });
  };

  const showPerformanceAlert = (title: string, message: string, priority: AdminNotification['priority'] = 'medium', metadata?: any) => {
    addNotification({
      title,
      message,
      type: 'performance',
      priority,
      read: false,
      actionRequired: priority === 'critical' || priority === 'high',
      metadata
    });
  };

  // Simulate real-time notifications
  useEffect(() => {
    const simulateNotifications = () => {
      const notificationTypes = [
        () => showSecurityAlert(
          'Intento de Acceso Sospechoso',
          `IP ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)} realizó múltiples intentos fallidos`,
          undefined,
          { attempts: Math.floor(Math.random() * 20) + 5 }
        ),
        () => showUserAlert(
          'Nuevo Usuario Registrado',
          `Usuario "Commander${Math.floor(Math.random() * 1000)}" se registró en Galaxia Prima`,
          undefined,
          { universe: 'universe_1' }
        ),
        () => showSystemAlert(
          'Backup Completado',
          'Backup automático de la base de datos completado exitosamente',
          'low',
          { size: `${(Math.random() * 2 + 1).toFixed(1)}GB` }
        ),
        () => showPerformanceAlert(
          'Carga del Sistema',
          `Carga del CPU: ${(Math.random() * 30 + 60).toFixed(1)}%`,
          Math.random() > 0.7 ? 'high' : 'medium',
          { cpuLoad: Math.random() * 30 + 60 }
        )
      ];

      // Random notification every 2-5 minutes
      const randomDelay = Math.random() * 180000 + 120000; // 2-5 minutes
      setTimeout(() => {
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        randomNotification();
        simulateNotifications(); // Schedule next notification
      }, randomDelay);
    };

    // Start simulation after 10 seconds
    const initialTimeout = setTimeout(simulateNotifications, 10000);
    
    return () => clearTimeout(initialTimeout);
  }, []);

  return {
    notifications: notifications.notifications,
    unreadCount: notifications.unreadCount,
    loading: notifications.loading,
    showSecurityAlert,
    showUserAlert,
    showSystemAlert,
    showViolationAlert,
    showMaintenanceAlert,
    showPerformanceAlert,
  };
}