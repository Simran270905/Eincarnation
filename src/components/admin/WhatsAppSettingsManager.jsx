import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Save, MessageCircle } from 'lucide-react';

const WhatsAppSettingsManager = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.get('/whatsapp-settings');
      setSettings(data.data);
    } catch (error) {
      console.error('Error fetching WhatsApp settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/whatsapp-settings', settings);
      alert('WhatsApp settings updated successfully!');
      fetchSettings();
    } catch (error) {
      console.error('Error updating WhatsApp settings:', error);
      alert('Failed to update WhatsApp settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="text-[#25D366]" size={28} />
          <h2 className="text-xl font-bold">WhatsApp Configuration</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              WhatsApp Phone Number
              <span className="text-gray-500 text-xs ml-2">(with country code, no + or spaces)</span>
            </label>
            <input
              type="text"
              value={settings?.phoneNumber || ''}
              onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
              placeholder="919876543210"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: 919876543210 (91 for India, followed by 10-digit number)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Default Message
            </label>
            <textarea
              value={settings?.defaultMessage || ''}
              onChange={(e) => setSettings({...settings, defaultMessage: e.target.value})}
              placeholder="Hello! I would like to know more about E Incarnation services."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-transparent"
              rows="3"
            />
            <p className="text-xs text-gray-500 mt-1">
              This message will be pre-filled when users click the WhatsApp button
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={settings?.isActive || false}
              onChange={(e) => setSettings({...settings, isActive: e.target.checked})}
              className="w-4 h-4 text-[#25D366] border-gray-300 rounded focus:ring-[#25D366]"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Enable WhatsApp Button on Website
            </label>
          </div>

          <div className="pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#1A0185] text-white px-6 py-2 rounded-lg hover:bg-[#3451A3] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <span className="animate-spin">⏳</span> Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Settings
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preview Section */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Preview</h3>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-xs text-gray-600 mb-2">WhatsApp Link Preview:</p>
            <code className="text-xs bg-white px-3 py-2 rounded border block overflow-x-auto">
              https://wa.me/{settings?.phoneNumber}?text={encodeURIComponent(settings?.defaultMessage || '')}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSettingsManager;
