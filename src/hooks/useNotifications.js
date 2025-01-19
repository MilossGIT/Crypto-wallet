import { useState, useEffect } from 'react';
import { websocketService } from '../services/websocket';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = websocketService.subscribe((data) => {
      if (data.type === 'PRICE_ALERT') {
        setNotifications((prev) => [data, ...prev].slice(0, 5));
      }
    });

    return () => unsubscribe();
  }, []);

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return { notifications, clearNotification };
};
