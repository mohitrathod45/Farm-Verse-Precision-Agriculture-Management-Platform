import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import { generateNotificationsFromData } from '../utils/notificationGenerator';

const NotificationContext = createContext(null);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }) {
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
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    // ONLY fetch when a valid token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setNotifications([]);
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
        farms:       Array.isArray(farmRes.data) ? farmRes.data : [],
        crops:       Array.isArray(cropRes.data) ? cropRes.data : [],
        irrigations: Array.isArray(irrRes.data)  ? irrRes.data  : [],
        fertilizers: Array.isArray(fertRes.data) ? fertRes.data : [],
        reports:     Array.isArray(repRes.data)  ? repRes.data  : [],
      });

      setNotifications(
        raw.map(n => ({ ...n, read: readIds.includes(n.id) }))
      );
    } catch (error) {
      console.error('Notification fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [readIds]);

  // Re-fetch on route change — token check inside fetchNotifications guards it
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
      const next = [...readIds, id];
      setReadIds(next);
      localStorage.setItem('read_notification_ids', JSON.stringify(next));
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
}
