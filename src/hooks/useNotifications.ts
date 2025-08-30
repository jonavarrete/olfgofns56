import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Notification } from '../types/game';

export function useNotifications() {
  const { state, addNotification } = useGame();

  const showNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    addNotification(newNotification);

    // Show browser notification if enabled
    if (state.settings.notifications.desktop && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
        });
      }
    }

    // Play sound if enabled
    if (state.settings.notifications.sound) {
      const audio = new Audio('/sounds/notification.mp3');
      audio.play().catch(() => {
        // Ignore audio play errors
      });
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return { showNotification, notifications: state.notifications };
}