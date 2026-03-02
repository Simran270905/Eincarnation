import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Save, Plus, Edit2, Trash2, Award, Download } from 'lucide-react';
import ImageUpload from './ImageUpload';

const CertificationsManager = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    logo: '',
    logoPublicId: '',
    description: '',
    text: '',
    downloadUrl: '',
    order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/about-page');
      setAboutData(response.data);
    } catch (error) {
      console.error('Error fetching about page data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      logo: '',
      logoPublicId: '',
      description: '',
      text: '',
      downloadUrl: '',
      order: 0
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/about-page/certifications', formData);
      alert('Certification added successfully!');
      setShowAddForm(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error adding certification:', error);
      alert('Failed to add certification');
    }
  };

  const handleUpdate = async (certId, e) => {
    e.preventDefault();
    try {
      await api.put(`/about-page/certifications/${certId}`, formData);
      alert('Certification updated successfully!');
      setEditingId(null);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error updating certification:', error);
      alert('Failed to update certification');
    }
  };

  const handleDelete = async (certId) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;
    
    try {
      await api.delete(`/about-page/certifications/${certId}`);
      alert('Certification deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting certification:', error);
      alert('Failed to delete certification');
    }
  };

  const startEdit = (cert) => {
    setEditingId(cert._id);
    setFormData({
      id: cert.id || '',
      name: cert.name || '',
      logo: cert.logo || '',
      logoPublicId: cert.logoPublicId || '',
      description: cert.description || '',
      text: cert.text || '',
      downloadUrl: cert.downloadUrl || '',
      order: cert.order || 0
    });
  };

  const certifications = aboutData?.certifications || [];
  const sortedCerts = [...certifications].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1A0185]">
            <Award size={28} /> Certifications Management
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            <Plus size={18} /> Add Certification
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-6 p-6 border-2 border-[#1A0185] rounded-lg bg-blue-50">
            <h3 className="text-lg font-bold mb-4">Add New Certification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Certification ID/Code *</label>
                <input
                  type="text"
                  placeholder="e.g., ISO 9001, MPCB, SEEPZ"
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Short identifier displayed as the title</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., International Organization for Standardization 9001"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <ImageUpload
                  label="Certification Logo *"
                  currentImage={formData.logo}
                  onImageChange={(imageData) => {
                    setFormData({ 
                      ...formData, 
                      logo: imageData ? imageData.url : '',
                      logoPublicId: imageData ? imageData.publicId : ''
                    });
                  }}
                  folder="eincarnation/about/certifications"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: Square logo (200x200px or larger)</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  placeholder="Describe what this certification means and its benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Download URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/certificate.pdf"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Link to downloadable certificate PDF</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border rounded-lg"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                  Add Certification
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedCerts.length === 0 ? (
            <p className="text-gray-500 text-center py-8 col-span-2">No certifications added yet.</p>
          ) : (
            sortedCerts.map((cert) => (
              <div key={cert._id} className="border rounded-lg p-4 bg-gray-50">
                {editingId === cert._id ? (
                  <form onSubmit={(e) => handleUpdate(cert._id, e)} className="space-y-4">
                    <input
                      type="text"
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Certification ID"
                      required
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Full Name"
                    />
                    <ImageUpload
                      label="Certification Logo"
                      currentImage={formData.logo}
                      onImageChange={(imageData) => {
                        setFormData({ 
                          ...formData, 
                          logo: imageData ? imageData.url : '',
                          logoPublicId: imageData ? imageData.publicId : ''
                        });
                      }}
                      folder="eincarnation/about/certifications"
                    />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      rows="3"
                      placeholder="Description"
                      required
                    />
                    <input
                      type="url"
                      value={formData.downloadUrl}
                      onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Download URL"
                    />
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Display Order"
                      min="0"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-[#1A0185] text-white px-4 py-2 rounded-lg hover:bg-[#3451A3]">
                        <Save size={16} className="inline mr-1" /> Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          resetForm();
                        }}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      {cert.logo && (
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                          <img src={cert.logo} alt={cert.id || cert.name} className="w-12 h-12 object-contain" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-[#2d3e50]">{cert.id || cert.name}</h3>
                          <span className="text-xs bg-gray-300 px-2 py-1 rounded">Order: {cert.order || 0}</span>
                        </div>
                        {cert.name && cert.id !== cert.name && (
                          <p className="text-xs text-gray-500 mb-1">{cert.name}</p>
                        )}
                        <p className="text-sm text-gray-700 line-clamp-2">{cert.description || cert.text}</p>
                        {cert.downloadUrl && (
                          <a 
                            href={cert.downloadUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-2"
                          >
                            <Download size={12} /> Download Certificate
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(cert)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 text-sm"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cert._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 text-sm"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationsManager;
