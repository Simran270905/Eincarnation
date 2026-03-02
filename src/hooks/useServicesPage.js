import { useState, useEffect } from 'react';

export function useServicesPage() {
  const [servicesPageData, setServicesPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesPage = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/services-page');
        const data = await response.json();
        
        if (data.success) {
          setServicesPageData(data.data);
        } else {
          setError('Failed to fetch services page data');
        }
      } catch (error) {
        console.error('Error fetching services page:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesPage();
  }, []);

  return { servicesPageData, loading, error };
}
