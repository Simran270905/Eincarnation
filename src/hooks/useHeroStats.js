import { useState, useEffect } from 'react';

export function useHeroStats() {
  const [stats, setStats] = useState({
    recycling: 0,
    reuse: 0,
    forecast2026: 0,
    heroTitle: 'Breathing Life Into A Greener Future',
    heroDescription: 'Join the movement to reduce waste and protect our planet for future generations through circular economy solutions.',
    heroButtonText: 'Know More'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/hero-stats');
        const data = await response.json();
        
        if (data.success && data.data) {
          const newStats = {
            recycling: Number(data.data.recycling) || 0,
            reuse: Number(data.data.reuse) || 0,
            forecast2026: Number(data.data.forecast2026) || 0,
            heroTitle: data.data.heroTitle || 'Breathing Life Into A Greener Future',
            heroDescription: data.data.heroDescription || 'Join the movement to reduce waste and protect our planet for future generations through circular economy solutions.',
            heroButtonText: data.data.heroButtonText || 'Know More'
          };
          setStats(newStats);
        }
      } catch (error) {
        console.error('Error fetching hero stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
