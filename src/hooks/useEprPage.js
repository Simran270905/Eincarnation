import { useState, useEffect } from 'react';

export function useEprPage() {
  const [eprData, setEprData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEprPage = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/epr-page');
        const data = await response.json();
        
        if (data.success) {
          setEprData(data.data);
        } else {
          setError('Failed to fetch EPR page data');
        }
      } catch (error) {
        console.error('Error fetching EPR page:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEprPage();
  }, []);

  return { eprData, loading, error };
}
