import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Plus, X } from 'lucide-react';
import api from '../../utils/api';

const FooterManager = () => {
  const [footer, setFooter] = useState({
    address: '',
    phone: [''],
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const response = await api.get('/footer');
      if (response.success) {
        setFooter(response.data);
      }
    } catch (error) {
      console.error('Error fetching footer:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/footer', footer);
      if (response.success) {
        setMessage({ type: 'success', text: 'Footer updated successfully! Changes are now live.' });
        fetchFooter();
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to update footer' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating footer' });
    } finally {
      setLoading(false);
    }
  };

  const addPhone = () => {
    setFooter({ ...footer, phone: [...footer.phone, ''] });
  };

  const updatePhone = (index, value) => {
    const newPhones = [...footer.phone];
    newPhones[index] = value;
    setFooter({ ...footer, phone: newPhones });
  };

  const removePhone = (index) => {
    const newPhones = footer.phone.filter((_, i) => i !== index);
    setFooter({ ...footer, phone: newPhones });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Footer Contact Details</h2>
          <p className="text-gray-600 mt-1">Manage contact information displayed in footer</p>
        </div>
        <button
          onClick={fetchFooter}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
          <span>Refresh</span>
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={footer.address}
            onChange={(e) => setFooter({ ...footer, address: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
            placeholder="Unit No. 103, 1st Floor, Bhaveshwar Arcade..."
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-bold text-gray-700">
              Phone Numbers
            </label>
            <button
              type="button"
              onClick={addPhone}
              className="flex items-center gap-1 text-sm text-[#1A0185] hover:text-[#3451A3] font-bold"
            >
              <Plus size={16} />
              Add Phone
            </button>
          </div>
          <div className="space-y-3">
            {footer.phone.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => updatePhone(index, e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                  placeholder="Enter phone number"
                  required
                />
                {footer.phone.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhone(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={footer.email}
            onChange={(e) => setFooter({ ...footer, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
            placeholder="info@e-incarnation.com"
            required
          />
        </div>

        <div className="flex justify-end pt-4 border-t">
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

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-bold text-gray-900 mb-4">Preview</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-bold text-gray-700">Address:</p>
            <p className="text-gray-600">{footer.address || 'Not set'}</p>
          </div>
          <div>
            <p className="font-bold text-gray-700">Phone:</p>
            {footer.phone.map((phone, index) => (
              <p key={index} className="text-gray-600">{phone || 'Not set'}</p>
            ))}
          </div>
          <div>
            <p className="font-bold text-gray-700">Email:</p>
            <p className="text-gray-600">{footer.email || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterManager;
