import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import ImageUpload from './ImageUpload';

const ServicesPageManager = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    features: [''],
    order: 0
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const data = await api.get('/services-page');
      setPageData(data.data);
    } catch (error) {
      console.error('Error fetching services page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePage = async (e) => {
    e.preventDefault();
    try {
      const { pageTitle, pageDescription, heroImage, heroImagePublicId } = pageData;
      await api.put('/services-page', { pageTitle, pageDescription, heroImage, heroImagePublicId });
      alert('Page settings updated successfully!');
      fetchPageData();
    } catch (error) {
      console.error('Error updating page:', error);
      alert('Failed to update page settings');
    }
  };

  const handleHeroImageChange = (imageData) => {
    if (imageData) {
      setPageData({
        ...pageData,
        heroImage: imageData.url,
        heroImagePublicId: imageData.publicId
      });
    } else {
      setPageData({
        ...pageData,
        heroImage: '',
        heroImagePublicId: ''
      });
    }
  };

  const handleAddSection = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services-page/sections', formData);
      alert('Section added successfully!');
      setShowAddSection(false);
      setFormData({ title: '', description: '', image: '', features: [''], order: 0 });
      fetchPageData();
    } catch (error) {
      console.error('Error adding section:', error);
      alert('Failed to add section');
    }
  };

  const handleUpdateSection = async (sectionId, e) => {
    e.preventDefault();
    try {
      await api.put(`/services-page/sections/${sectionId}`, formData);
      alert('Section updated successfully!');
      setEditingSection(null);
      fetchPageData();
    } catch (error) {
      console.error('Error updating section:', error);
      alert('Failed to update section');
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;
    
    try {
      await api.delete(`/services-page/sections/${sectionId}`);
      alert('Section deleted successfully!');
      fetchPageData();
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Failed to delete section');
    }
  };

  const startEdit = (section) => {
    setEditingSection(section._id);
    setFormData({
      title: section.title,
      description: section.description,
      image: section.image,
      features: section.features || [''],
      order: section.order
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Page Settings</h2>
        <form onSubmit={handleUpdatePage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Page Title</label>
            <input
              type="text"
              value={pageData?.pageTitle || ''}
              onChange={(e) => setPageData({...pageData, pageTitle: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Page Description</label>
            <textarea
              value={pageData?.pageDescription || ''}
              onChange={(e) => setPageData({...pageData, pageDescription: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            />
          </div>
          <ImageUpload
            label="Hero Image"
            currentImage={pageData?.heroImage}
            onImageChange={handleHeroImageChange}
            folder="eincarnation/services"
            maxSize={2}
          />
          <button
            type="submit"
            className="bg-[#1A0185] text-white px-6 py-2 rounded-lg hover:bg-[#3451A3] flex items-center gap-2"
          >
            <Save size={18} /> Save Page Settings
          </button>
        </form>
      </div>

      {/* Sections List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Service Sections</h2>
          <button
            onClick={() => setShowAddSection(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={18} /> Add Section
          </button>
        </div>

        {/* Add Section Form */}
        {showAddSection && (
          <form onSubmit={handleAddSection} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Section Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Section Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows="3"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Add Section
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSection(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Sections Grid */}
        <div className="grid gap-4">
          {pageData?.sections?.map((section) => (
            <div key={section._id} className="border rounded-lg p-4">
              {editingSection === section._id ? (
                <form onSubmit={(e) => handleUpdateSection(section._id, e)} className="space-y-4">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-[#1A0185] text-white px-4 py-2 rounded-lg">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(section)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPageManager;
