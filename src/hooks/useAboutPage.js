import { useState, useEffect } from 'react';

export function useAboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/about-page');
        const data = await response.json();
        
        if (data.success) {
          setAboutData(data.data);
        } else {
          setError('Failed to fetch about page data');
        }
      } catch (error) {
        console.error('Error fetching about page:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  return { aboutData, loading, error };
}
