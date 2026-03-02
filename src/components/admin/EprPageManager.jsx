import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Save, Plus, Edit2, Trash2 } from 'lucide-react';

const EprPageManager = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const data = await api.get('/epr-page');
      setPageData(data.data);
    } catch (error) {
      console.error('Error fetching EPR page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePage = async (e) => {
    e.preventDefault();
    try {
      await api.put('/epr-page', pageData);
      alert('EPR Page updated successfully!');
      fetchPageData();
    } catch (error) {
      console.error('Error updating page:', error);
      alert('Failed to update page');
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/epr-page/services', serviceForm);
      alert('Service added successfully!');
      setShowAddService(false);
      setServiceForm({ title: '', description: '', icon: '', order: 0 });
      fetchPageData();
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service');
    }
  };

  const handleUpdateService = async (serviceId, e) => {
    e.preventDefault();
    try {
      await api.put(`/epr-page/services/${serviceId}`, serviceForm);
      alert('Service updated successfully!');
      setEditingService(null);
      fetchPageData();
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service');
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await api.delete(`/epr-page/services/${serviceId}`);
      alert('Service deleted successfully!');
      fetchPageData();
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  const startEditService = (service) => {
    setEditingService(service._id);
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      order: service.order
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Hero Section</h2>
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
            <label className="block text-sm font-medium mb-2">Page Subtitle</label>
            <input
              type="text"
              value={pageData?.pageSubtitle || ''}
              onChange={(e) => setPageData({...pageData, pageSubtitle: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Hero Title</label>
            <input
              type="text"
              value={pageData?.heroSection?.title || ''}
              onChange={(e) => setPageData({
                ...pageData,
                heroSection: {...pageData.heroSection, title: e.target.value}
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Hero Description</label>
            <textarea
              value={pageData?.heroSection?.description || ''}
              onChange={(e) => setPageData({
                ...pageData,
                heroSection: {...pageData.heroSection, description: e.target.value}
              })}
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1A0185] text-white px-6 py-2 rounded-lg hover:bg-[#3451A3] flex items-center gap-2"
          >
            <Save size={18} /> Save Page Content
          </button>
        </form>
      </div>

      {/* EPR Services */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">EPR Services</h2>
          <button
            onClick={() => setShowAddService(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={18} /> Add Service
          </button>
        </div>

        {/* Add Service Form */}
        {showAddService && (
          <form onSubmit={handleAddService} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Title"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Service Description"
                value={serviceForm.description}
                onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows="3"
                required
              />
              <input
                type="text"
                placeholder="Icon Name"
                value={serviceForm.icon}
                onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  Add Service
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddService(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Services Grid */}
        <div className="grid gap-4">
          {pageData?.services?.map((service) => (
            <div key={service._id} className="border rounded-lg p-4">
              {editingService === service._id ? (
                <form onSubmit={(e) => handleUpdateService(service._id, e)} className="space-y-4">
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-[#1A0185] text-white px-4 py-2 rounded-lg">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditService(service)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
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

export default EprPageManager;
