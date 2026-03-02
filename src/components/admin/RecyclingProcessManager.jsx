import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Save, Plus, Edit2, Trash2, Recycle, ArrowUp, ArrowDown } from 'lucide-react';

const RecyclingProcessManager = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [processInfo, setProcessInfo] = useState({
    title: '',
    description: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/services-page');
      setServicesData(response.data);
      
      if (response.data?.recyclingProcess) {
        setProcessInfo({
          title: response.data.recyclingProcess.title || '',
          description: response.data.recyclingProcess.description || ''
        });
      }
    } catch (error) {
      console.error('Error fetching services page data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      order: 0
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleUpdateProcessInfo = async (e) => {
    e.preventDefault();
    try {
      const existingSteps = servicesData?.recyclingProcess?.steps || [];
      await api.put('/services-page/recycling-process', {
        title: processInfo.title,
        description: processInfo.description,
        steps: existingSteps
      });
      alert('Process info updated successfully!');
      fetchData();
    } catch (error) {
      console.error('Error updating process info:', error);
      alert('Failed to update process info');
    }
  };

  const handleAddStep = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services-page/recycling-process/steps', formData);
      alert('Process step added successfully!');
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error adding process step:', error);
      alert('Failed to add process step');
    }
  };

  const handleUpdateStep = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/services-page/recycling-process/steps/${editingId}`, formData);
      alert('Process step updated successfully!');
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error updating process step:', error);
      alert('Failed to update process step');
    }
  };

  const handleDeleteStep = async (stepId) => {
    if (!window.confirm('Are you sure you want to delete this process step?')) return;
    
    try {
      await api.delete(`/services-page/recycling-process/steps/${stepId}`);
      alert('Process step deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting process step:', error);
      alert('Failed to delete process step');
    }
  };

  const startEdit = (step) => {
    setEditingId(step._id);
    setFormData({
      title: step.title || '',
      description: step.description || '',
      order: step.order || 0
    });
  };

  const processSteps = servicesData?.recyclingProcess?.steps || [];
  const sortedSteps = [...processSteps].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* PROCESS INFO SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Recycle size={28} className="text-[#1A0185]" />
          <h2 className="text-2xl font-bold text-[#1A0185]">Recycling Process Info</h2>
        </div>

        <form onSubmit={handleUpdateProcessInfo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Section Title</label>
            <input
              type="text"
              value={processInfo.title}
              onChange={(e) => setProcessInfo({...processInfo, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Our Recycling Process"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Section Description</label>
            <textarea
              value={processInfo.description}
              onChange={(e) => setProcessInfo({...processInfo, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows="2"
              placeholder="Brief description of the recycling process..."
            />
          </div>

          <button
            type="submit"
            className="bg-[#1A0185] text-white px-6 py-2 rounded-lg hover:bg-[#3451A3] flex items-center gap-2 transition-colors"
          >
            <Save size={18} /> Save Process Info
          </button>
        </form>
      </div>

      {/* PROCESS STEPS SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1A0185]">
            <Recycle size={28} /> Process Steps
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            <Plus size={18} /> Add Step
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAddStep} className="mb-6 p-4 border-2 border-green-500 rounded-lg bg-green-50">
            <h3 className="text-lg font-bold mb-4 text-green-800">Add New Process Step</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Step Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Collection and Pickup"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="3"
                  placeholder="Describe this step..."
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

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus size={18} /> Add Step
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Steps List */}
        {sortedSteps.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No process steps added yet.</p>
        ) : (
          <div className="space-y-4">
            {sortedSteps.map((step) => (
              <div key={step._id} className="border rounded-lg p-4 bg-gray-50">
                {editingId === step._id ? (
                  <form onSubmit={handleUpdateStep} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Step Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows="3"
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

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Save size={18} /> Save
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#1A0185] text-white text-xs px-2 py-1 rounded">
                            Order: {step.order}
                          </span>
                          <h3 className="text-lg font-bold text-[#1A0185]">{step.title}</h3>
                        </div>
                        <p className="text-gray-700 text-sm">{step.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(step)}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteStep(step._id)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecyclingProcessManager;
