import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Save, Plus, Edit2, Trash2, Users, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';
import ImageUpload from './ImageUpload';

const CoreTeamManager = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [landscapeData, setLandscapeData] = useState({
    title: '',
    description: '',
    image: '',
    imagePublicId: ''
  });
  const [formData, setFormData] = useState({
    type: 'member',
    name: '',
    role: '',
    position: '',
    description: '',
    bio: '',
    image: '',
    imagePublicId: '',
    linkedin: '',
    reverse: false,
    title: '',
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
      
      // Load landscape image data
      if (response.data?.landscapeImage) {
        setLandscapeData({
          title: response.data.landscapeImage.title || '',
          description: response.data.landscapeImage.description || '',
          image: response.data.landscapeImage.image || '',
          imagePublicId: response.data.landscapeImage.imagePublicId || ''
        });
      }
    } catch (error) {
      console.error('Error fetching about page data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'member',
      name: '',
      role: '',
      position: '',
      description: '',
      bio: '',
      image: '',
      imagePublicId: '',
      linkedin: '',
      reverse: false,
      title: '',
      order: 0
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/about-page/core-team', formData);
      alert('Team member added successfully!');
      setShowAddForm(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('Failed to add team member');
    }
  };

  const handleUpdate = async (teamId, e) => {
    e.preventDefault();
    try {
      await api.put(`/about-page/core-team/${teamId}`, formData);
      alert('Team member updated successfully!');
      setEditingId(null);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error updating team member:', error);
      alert('Failed to update team member');
    }
  };

  const handleDelete = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await api.delete(`/about-page/core-team/${teamId}`);
      alert('Team member deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member');
    }
  };

  const startEdit = (member) => {
    setEditingId(member._id);
    setFormData({
      type: member.type || 'member',
      name: member.name || '',
      role: member.role || '',
      position: member.position || '',
      description: member.description || '',
      bio: member.bio || '',
      image: member.image || '',
      imagePublicId: member.imagePublicId || '',
      linkedin: member.linkedin || '',
      reverse: member.reverse || false,
      title: member.title || '',
      order: member.order || 0
    });
  };

  const handleUpdateLandscape = async (e) => {
    e.preventDefault();
    try {
      await api.put('/about-page/landscape-image', landscapeData);
      alert('Landscape image updated successfully!');
      fetchData();
    } catch (error) {
      console.error('Error updating landscape image:', error);
      alert('Failed to update landscape image');
    }
  };

  const teamMembers = aboutData?.team || [];
  const sortedTeam = [...teamMembers].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* LANDSCAPE IMAGE SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon size={28} className="text-[#1A0185]" />
          <h2 className="text-2xl font-bold text-[#1A0185]">Team Landscape Image</h2>
        </div>

        <p className="text-gray-600 mb-6">
          This image appears after all team members on the About page. Upload a wide landscape photo representing your entire team.
        </p>

        <form onSubmit={handleUpdateLandscape} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Section Title (Optional)</label>
            <input
              type="text"
              value={landscapeData.title}
              onChange={(e) => setLandscapeData({...landscapeData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Our Team Together"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <textarea
              value={landscapeData.description}
              onChange={(e) => setLandscapeData({...landscapeData, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
              placeholder="Add a description for this section..."
            />
          </div>

          <div>
            <ImageUpload
              label="Landscape Image"
              currentImage={landscapeData.image}
              onImageChange={(imageData) => {
                setLandscapeData({ 
                  ...landscapeData, 
                  image: imageData ? imageData.url : '',
                  imagePublicId: imageData ? imageData.publicId : ''
                });
              }}
              folder="eincarnation/about/landscape"
            />
            <p className="text-xs text-gray-500 mt-2">
              Recommended size: 1200x400px or wider for best results.
            </p>
          </div>

          {landscapeData.image && (
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="text-sm font-bold mb-3 text-gray-700">Preview:</h3>
              <div className="w-full h-48 bg-[#EEEBD9] rounded-lg overflow-hidden">
                <img 
                  src={landscapeData.image} 
                  alt="Landscape preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-[#1A0185] text-white px-6 py-3 rounded-lg hover:bg-[#3451A3] flex items-center gap-2 transition-colors"
          >
            <Save size={18} /> Save Landscape Image
          </button>
        </form>
      </div>

      {/* CORE TEAM SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1A0185]">
            <Users size={28} /> Core Team Members
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            <Plus size={18} /> Add Team Member
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-6 p-6 border-2 border-[#1A0185] rounded-lg bg-blue-50">
            <h3 className="text-lg font-bold mb-4">Add New Team Member</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="member">Team Member</option>
                  <option value="feature">Feature Block</option>
                </select>
              </div>

              {formData.type === 'member' ? (
                <>
                  <input
                    type="text"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role/Position *"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Description/Bio *"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="4"
                    required
                  />
                  <ImageUpload
                    label="Team Member Photo"
                    currentImage={formData.image}
                    onImageChange={(imageData) => {
                      setFormData({ 
                        ...formData, 
                        image: imageData ? imageData.url : '',
                        imagePublicId: imageData ? imageData.publicId : ''
                      });
                    }}
                    folder="eincarnation/about/team"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn URL (optional)"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="reverse"
                      checked={formData.reverse}
                      onChange={(e) => setFormData({...formData, reverse: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <label htmlFor="reverse" className="text-sm">Reverse layout (image on right)</label>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Feature Title *"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Feature Description *"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="4"
                    required
                  />
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border rounded-lg"
                  min="0"
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                  Add Member
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

        {/* Team Members List */}
        <div className="space-y-4">
          {sortedTeam.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No team members added yet.</p>
          ) : (
            sortedTeam.map((member) => (
              <div key={member._id} className="border rounded-lg p-4 bg-gray-50">
                {editingId === member._id ? (
                  <form onSubmit={(e) => handleUpdate(member._id, e)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="member">Team Member</option>
                        <option value="feature">Feature Block</option>
                      </select>
                    </div>

                    {formData.type === 'member' ? (
                      <>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Role"
                        />
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows="4"
                          placeholder="Description"
                        />
                        <ImageUpload
                          label="Team Member Photo"
                          currentImage={formData.image}
                          onImageChange={(imageData) => {
                            setFormData({ 
                              ...formData, 
                              image: imageData ? imageData.url : '',
                              imagePublicId: imageData ? imageData.publicId : ''
                            });
                          }}
                          folder="eincarnation/about/team"
                        />
                        <input
                          type="text"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="LinkedIn URL"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`reverse-${member._id}`}
                            checked={formData.reverse}
                            onChange={(e) => setFormData({...formData, reverse: e.target.checked})}
                            className="w-4 h-4"
                          />
                          <label htmlFor={`reverse-${member._id}`} className="text-sm">Reverse layout</label>
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Feature Title"
                        />
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows="4"
                          placeholder="Feature Description"
                        />
                      </>
                    )}

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
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-[#1A0185] text-white px-2 py-1 rounded">
                            {member.type === 'member' ? 'Team Member' : 'Feature Block'}
                          </span>
                          <span className="text-xs bg-gray-300 px-2 py-1 rounded">Order: {member.order || 0}</span>
                          {member.reverse && <span className="text-xs bg-blue-200 px-2 py-1 rounded">Reversed</span>}
                        </div>
                        {member.type === 'member' ? (
                          <>
                            <h3 className="text-lg font-bold text-[#2d3e50]">{member.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{member.role || member.position}</p>
                            <p className="text-sm text-gray-700 line-clamp-2">{member.description || member.bio}</p>
                            {member.image && (
                              <div className="mt-2">
                                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover" />
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <h3 className="text-lg font-bold text-[#1e1494]">{member.title}</h3>
                            <p className="text-sm text-gray-700 line-clamp-2">{member.description}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(member)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 text-sm"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
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

export default CoreTeamManager;
