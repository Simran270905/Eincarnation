import React, { useState, useEffect } from 'react';
import { Save, MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import api from '../../utils/api';

const ContactPageSettings = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await api.get('/contact-page');
      if (response.success) {
        setPageData(response.data);
      }
    } catch (error) {
      console.error('Error fetching contact page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/contact-page', pageData);
      alert('Contact page settings updated successfully!');
      fetchPageData();
    } catch (error) {
      console.error('Error updating contact page:', error);
      alert('Failed to update contact page settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Contact Page Settings</h2>
          <p className="text-gray-600 mt-1">Manage Google Map and hero section content</p>
        </div>
        <button onClick={fetchPageData} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Section */}
        <div className="border-b pb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-[#1A0185]" />
            Hero Section
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hero Subtitle</label>
              <input
                type="text"
                value={pageData?.heroSubtitle || ''}
                onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="CONTACT US"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title</label>
              <input
                type="text"
                value={pageData?.heroTitle || ''}
                onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Start a Conversation"
              />
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="border-b pb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-[#1A0185]" />
            Contact Addresses
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Main Address
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Primary address displayed on the Contact Us page
              </p>
              <textarea
                value={pageData?.mainAddress || ''}
                onChange={(e) => setPageData({ ...pageData, mainAddress: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                rows="3"
                placeholder="Enter the main address here..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Head Office Address (Optional)
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Additional head office address (leave empty to hide)
              </p>
              <textarea
                value={pageData?.headOfficeAddress || ''}
                onChange={(e) => setPageData({ ...pageData, headOfficeAddress: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                rows="3"
                placeholder="Enter the head office address here..."
              />
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="border-b pb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-[#1A0185]" />
            Google Map Settings
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Google Map Embed URL
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Get this from Google Maps → Share → Embed a map → Copy HTML (use the src URL)
              </p>
              <textarea
                value={pageData?.googleMapEmbedUrl || ''}
                onChange={(e) => setPageData({ ...pageData, googleMapEmbedUrl: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none font-mono text-sm"
                rows="4"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <ExternalLink size={14} />
                <span>This URL will be displayed in the iframe on the Contact page</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Google Maps Direct Link (Optional)
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Direct link that opens when users click the map (e.g., https://maps.google.com/?cid=...)
              </p>
              <input
                type="url"
                value={pageData?.googleMapDirectUrl || ''}
                onChange={(e) => setPageData({ ...pageData, googleMapDirectUrl: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="https://maps.google.com/?cid=..."
              />
            </div>

            {/* Preview */}
            {pageData?.googleMapEmbedUrl && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Map Preview</label>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    title="Map Preview"
                    src={pageData.googleMapEmbedUrl}
                    className="w-full h-64"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 mb-3">📍 How to Get Google Map URLs:</h4>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span>Go to <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="underline">Google Maps</a> and search for your location</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span>Click <strong>Share</strong> button</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span>For <strong>Embed URL</strong>: Click "Embed a map" tab → Copy the URL from the iframe src attribute</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              <span>For <strong>Direct Link</strong>: Click "Share link" tab → Copy the shortened URL</span>
            </li>
          </ol>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex items-center gap-2 px-8 py-3 bg-[#1A0185] text-white rounded-lg font-bold hover:bg-[#3451A3] transition ${
              saving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPageSettings;
