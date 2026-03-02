import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';
import api from '../../utils/api';
import ImageUpload from './ImageUpload';

const ClientsManager = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({ name: '', logo: '', order: 0, isActive: true });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      if (response.success) {
        setClients(response.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await api.put(`/clients/${editingClient._id}`, formData);
      } else {
        await api.post('/clients', formData);
      }
      fetchClients();
      resetForm();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const deleteClient = async (id) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      await api.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const editClient = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      logo: client.logo,
      order: client.order,
      isActive: client.isActive
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', logo: '', order: 0, isActive: true });
    setEditingClient(null);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Client Logos</h2>
          <p className="text-gray-600 mt-1">{clients.length} clients</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchClients} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <RefreshCw size={18} />
            Refresh
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1A0185] to-[#3451A3] text-white rounded-lg font-bold">
            <Plus size={18} />
            Add Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client._id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1A0185] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${client.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {client.isActive ? 'Active' : 'Inactive'}
              </span>
              <div className="flex gap-2">
                <button onClick={() => editClient(client)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => deleteClient(client._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
              {client.logo ? (
                <img src={client.logo} alt={client.name} className="max-h-20 max-w-full object-contain" />
              ) : (
                <div className="text-gray-400">No logo</div>
              )}
            </div>
            <p className="font-bold text-gray-900 text-center">{client.name}</p>
            <p className="text-sm text-gray-600 text-center mt-1">Order: {client.order}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-black mb-6">{editingClient ? 'Edit Client' : 'Add Client'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                  required
                />
              </div>
              <div>
                <ImageUpload
                  label="Client Logo"
                  currentImage={formData.logo}
                  onImageChange={(imageData) => {
                    setFormData({ 
                      ...formData, 
                      logo: imageData ? imageData.url : '',
                      logoPublicId: imageData ? imageData.publicId : ''
                    });
                  }}
                  folder="eincarnation/clients"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor="isActive" className="text-sm font-bold text-gray-700">Active</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={resetForm} className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-[#1A0185] to-[#3451A3] text-white rounded-xl font-bold">
                  {editingClient ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManager;
