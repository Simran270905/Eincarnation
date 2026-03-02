import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Toast({ type = 'success', message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div 
      className={`fixed top-24 right-4 md:right-8 z-[200] ${styles[type]} px-6 py-4 rounded-lg shadow-2xl max-w-md animate-slide-in`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <p className="flex-1 text-sm font-medium leading-relaxed">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Close notification"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
