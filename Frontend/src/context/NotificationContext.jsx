import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import { generateNotificationsFromData } from '../utils/notificationGenerator';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState(() => {
    try {
      const stored = localStorage.getItem('read_notification_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [cleared, setCleared] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    // Only fetch when a valid token exists
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [farmRes, cropRes, irrRes, fertRes, repRes] = await Promise.all([
        api.get('/farms/getallfarms').catch(() => ({ data: [] })),
        api.get('/crops/getallcrops').catch(() => ({ data: [] })),
        api.get('/irrigation/getallirrigation').catch(() => ({ data: [] })),
        api.get('/fertilizers/getallfertilizers').catch(() => ({ data: [] })),
        api.get('/reports/getallreports').catch(() => ({ data: [] })),
      ]);

      const raw = generateNotificationsFromData({
        farms:       farmRes.data || [],
        crops:       cropRes.data || [],
        irrigations: irrRes.data || [],
        fertilizers: fertRes.data || [],
        reports:     repRes.data || [],
      });

      // Apply read state
      const processed = raw.map(n => ({
        ...n,
        read: readIds.includes(n.id),
      }));

      setNotifications(processed);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [readIds]);

  // Re-fetch whenever the route changes (catches post-login navigation)
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications, location.pathname]);

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadIds(allIds);
    localStorage.setItem('read_notification_ids', JSON.stringify(allIds));
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const nextRead = [...readIds, id];
      setReadIds(nextRead);
      localStorage.setItem('read_notification_ids', JSON.stringify(nextRead));
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const clearAll = () => {
    setCleared(true);
    setNotifications([]);
  };

  const unreadCount = cleared ? 0 : notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications: cleared ? [] : notifications,
      unreadCount,
      loading,
      markAllAsRead,
      markAsRead,
      clearAll,
      refreshNotifications: fetchNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
