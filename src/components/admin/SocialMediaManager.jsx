import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Plus, Edit2, Trash2, Save, X, ExternalLink, Eye, EyeOff } from 'lucide-react';

const SocialMediaManager = () => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'facebook',
    url: '',
    icon: '',
    isActive: true,
    order: 0
  });

  const platformOptions = [
    { value: 'facebook', label: 'Facebook', icon: 'facebook' },
    { value: 'instagram', label: 'Instagram', icon: 'instagram' },
    { value: 'twitter', label: 'Twitter', icon: 'twitter' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
    { value: 'youtube', label: 'YouTube', icon: 'youtube' },
    { value: 'whatsapp', label: 'WhatsApp', icon: 'message-circle' },
    { value: 'other', label: 'Other', icon: 'link' }
  ];

  useEffect(() => {
    fetchSocialMedia();
  }, []);

  const fetchSocialMedia = async () => {
    try {
      const data = await api.get('/social-media');
      setSocialMedia(data.data);
    } catch (error) {
      console.error('Error fetching social media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/social-media/${editing}`, formData);
        alert('Social media platform updated successfully!');
      } else {
        await api.post('/social-media', formData);
        alert('Social media platform added successfully!');
      }
      resetForm();
      fetchSocialMedia();
    } catch (error) {
      console.error('Error saving social media:', error);
      alert('Failed to save social media platform');
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setFormData({
      name: item.name,
      platform: item.platform,
      url: item.url,
      icon: item.icon || '',
      isActive: item.isActive,
      order: item.order
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this social media platform?')) return;
    
    try {
      await api.delete(`/social-media/${id}`);
      alert('Social media platform deleted successfully!');
      fetchSocialMedia();
    } catch (error) {
      console.error('Error deleting social media:', error);
      alert('Failed to delete social media platform');
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await api.put(`/social-media/${item._id}`, {
        ...item,
        isActive: !item.isActive
      });
      fetchSocialMedia();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to update status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      platform: 'facebook',
      url: '',
      icon: '',
      isActive: true,
      order: 0
    });
    setEditing(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Social Media Platforms</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={18} /> Add Platform
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">
              {editing ? 'Edit Platform' : 'Add New Platform'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Platform Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Facebook"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Platform Type</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  {platformOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                  min="0"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 text-[#1A0185] border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Active (Show on website)
                </label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-[#1A0185] text-white px-6 py-2 rounded-lg hover:bg-[#3451A3] flex items-center gap-2"
              >
                <Save size={18} /> {editing ? 'Update' : 'Add'} Platform
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 flex items-center gap-2"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        )}

        {/* Platforms List */}
        <div className="space-y-3">
          {socialMedia.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No social media platforms added yet.</p>
          ) : (
            socialMedia.map((item) => (
              <div
                key={item._id}
                className={`border rounded-lg p-4 flex items-center justify-between ${
                  !item.isActive ? 'bg-gray-50 opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl capitalize">{item.platform}</span>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {item.url.substring(0, 50)}... <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 mr-2">Order: {item.order}</span>
                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`p-2 rounded ${
                      item.isActive
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={item.isActive ? 'Disable' : 'Enable'}
                  >
                    {item.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaManager;
