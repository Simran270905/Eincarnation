import { useState, useEffect } from 'react';

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState({
    total: 0,
    contactPage: 0,
    footerForm: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetch('http://localhost:5001/api/contact-forms/unread-count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setUnreadCount(result.data);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { unreadCount, loading, refreshCount: fetchUnreadCount };
}
