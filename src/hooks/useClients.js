import { useState, useEffect } from 'react';

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/clients');
        const data = await response.json();
        
        if (data.success) {
          setClients(data.data);
        } else {
          setError('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
}
