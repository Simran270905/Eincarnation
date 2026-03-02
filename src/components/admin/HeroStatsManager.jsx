import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import api from '../../utils/api';

const HeroStatsManager = () => {
  const [stats, setStats] = useState({
    recycling: 10000,
    reuse: 10000,
    forecast2026: 10000,
    heroTitle: '',
    heroDescription: '',
    heroButtonText: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setInitialLoading(true);
      const response = await api.get('/hero-stats');
      if (response.success) {
        setStats(response.data);
        setMessage({ type: '', text: '' });
      } else {
        setMessage({ type: 'error', text: 'Failed to load stats. Please check backend connection.' });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setMessage({ 
        type: 'error', 
        text: 'Cannot connect to backend server. Please ensure the server is running on port 5001.' 
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/hero-stats', stats);
      if (response.success) {
        setMessage({ type: 'success', text: 'Stats updated successfully! Changes are now live.' });
        fetchStats();
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to update stats' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating stats' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Hero Section Statistics</h2>
          <p className="text-gray-600 mt-1">Real-time editable stats displayed on homepage</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={initialLoading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={initialLoading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {initialLoading && !message.text && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
          Loading hero stats...
        </div>
      )}

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Recycling (MT)
            </label>
            <input
              type="number"
              value={stats.recycling}
              onChange={(e) => setStats({ ...stats, recycling: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Reuse (MT)
            </label>
            <input
              type="number"
              value={stats.reuse}
              onChange={(e) => setStats({ ...stats, reuse: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Forecast 2026 (MT)
            </label>
            <input
              type="number"
              value={stats.forecast2026}
              onChange={(e) => setStats({ ...stats, forecast2026: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Hero Content</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={stats.heroTitle}
                onChange={(e) => setStats({ ...stats, heroTitle: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Breathing Life Into A Greener Future"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Hero Description
              </label>
              <textarea
                value={stats.heroDescription}
                onChange={(e) => setStats({ ...stats, heroDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Join the movement to reduce waste..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={stats.heroButtonText}
                onChange={(e) => setStats({ ...stats, heroButtonText: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Know More"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#1A0185] to-[#3451A3] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroStatsManager;
