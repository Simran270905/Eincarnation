import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const [settings, setSettings] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/whatsapp-settings');
        const data = await response.json();
        if (data.success) {
          setSettings(data.data);
          setIsVisible(data.data.isActive);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleClick = () => {
    if (!settings) return;
    const whatsappUrl = `https://wa.me/${settings.phoneNumber}?text=${encodeURIComponent(settings.defaultMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible || !settings) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle 
        size={28} 
        className="transition-transform group-hover:rotate-12" 
        strokeWidth={2}
      />
      
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </button>
  );
};

export default WhatsAppButton;
