import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    const healthy = await api.checkHealth();
    setIsConnected(healthy);
    setIsChecking(false);
  };

  if (isChecking && isConnected) return null;

  if (!isConnected) {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-md">
        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-start gap-3 animate-pulse">
          <WifiOff className="flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <div className="font-bold flex items-center gap-2">
              <AlertCircle size={18} />
              Backend Server Not Running
            </div>
            <p className="text-sm mt-1 text-red-100">
              Cannot connect to API server on port 5001.
            </p>
            <button
              onClick={checkConnection}
              className="mt-2 text-xs bg-white text-red-600 px-3 py-1 rounded font-semibold hover:bg-red-50"
            >
              Retry Connection
            </button>
            <div className="mt-2 text-xs text-red-100 border-t border-red-400 pt-2">
              <strong>To fix:</strong> Run <code className="bg-red-600 px-1 py-0.5 rounded">./start-backend.sh</code> in terminal
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
        <Wifi size={16} />
        <span className="font-semibold">Connected</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
