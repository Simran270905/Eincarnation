import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Save, Plus, Edit2, Trash2, Users } from 'lucide-react';
import ImageUpload from './ImageUpload';

const AboutPageManager = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    linkedin: ''
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const data = await api.get('/about-page');
      console.log('Fetched about page data:', data.data);
      // Initialize intro section with frontend default text if not exists
      if (!data.data.intro || (!data.data.intro.description1 && !data.data.intro.description2)) {
        data.data.intro = {
          title: data.data.intro?.title || 'Trusted Partner for Secure & Sustainable E-Waste Recycling',
          description1: data.data.intro?.description1 || 'E-Incarnation Recycling Pvt. Ltd. is an authorized e-waste recycler providing secure, compliant, and sustainable recycling solutions across India. We ensure safe e-waste disposal with strong data security, regulatory compliance, full traceability, and zero landfill practices.',
          description2: data.data.intro?.description2 || 'Our structured processes, certified data destruction, and circular economy approach help organizations reduce environmental impact while managing e-waste responsibly and transparently.',
          image: data.data.intro?.image || '',
          imagePublicId: data.data.intro?.imagePublicId || ''
        };
      }
      setPageData(data.data);
    } catch (error) {
      console.error('Error fetching About page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePage = async (e) => {
    e.preventDefault();
    try {
      console.log('Saving pageData:', pageData);
      const response = await api.put('/about-page', pageData);
      console.log('Save response:', response);
      alert('About Page updated successfully!');
      fetchPageData();
    } catch (error) {
      console.error('Error updating page:', error);
      alert('Failed to update page');
    }
  };

  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    try {
      await api.post('/about-page/team', memberForm);
      alert('Team member added successfully!');
      setShowAddMember(false);
      setMemberForm({ name: '', position: '', bio: '', image: '', linkedin: '' });
      fetchPageData();
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('Failed to add team member');
    }
  };

  const handleUpdateTeamMember = async (memberId, e) => {
    e.preventDefault();
    try {
      await api.put(`/about-page/team/${memberId}`, memberForm);
      alert('Team member updated successfully!');
      setEditingMember(null);
      fetchPageData();
    } catch (error) {
      console.error('Error updating team member:', error);
      alert('Failed to update team member');
    }
  };

  const handleDeleteTeamMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await api.delete(`/about-page/team/${memberId}`);
      alert('Team member deleted successfully!');
      fetchPageData();
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member');
    }
  };

  const startEditMember = (member) => {
    setEditingMember(member._id);
    setMemberForm({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image,
      linkedin: member.linkedin
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero Section - Background Image Only */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Hero Section</h2>
        <form onSubmit={handleUpdatePage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Background Image</label>
            <p className="text-sm text-gray-600 mb-3">Upload the hero background image for the About page</p>
            <ImageUpload
              currentImage={pageData?.heroSection?.image}
              onImageChange={(imageData) => {
                setPageData({
                  ...pageData,
                  heroSection: {
                    ...pageData?.heroSection,
                    image: imageData ? imageData.url : '',
                    imagePublicId: imageData ? imageData.publicId : ''
                  }
                });
              }}
              folder="eincarnation/about/hero"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1A0185] text-white px-6 py-2 rounded-lg hover:bg-[#3451A3] flex items-center gap-2"
          >
            <Save size={18} /> Save Hero Section
          </button>
        </form>
      </div>

      {/* Intro Card Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Intro Card Section</h2>
        <form onSubmit={handleUpdatePage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={pageData?.intro?.title || ''}
              onChange={(e) => setPageData({
                ...pageData,
                intro: {...pageData?.intro, title: e.target.value}
              })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Trusted Partner for Secure & Sustainable E-Waste Recycling"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description 1 (Left Column)</label>
            <textarea
              value={pageData?.intro?.description1 || ''}
              onChange={(e) => setPageData({
                ...pageData,
                intro: {...pageData?.intro, description1: e.target.value}
              })}
              className="w-full px-4 py-2 border rounded-lg"
              rows="5"
              placeholder="First paragraph of description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description 2 (Right Column)</label>
            <textarea
              value={pageData?.intro?.description2 || ''}
              onChange={(e) => setPageData({
                ...pageData,
                intro: {...pageData?.intro, description2: e.target.value}
              })}
              className="w-full px-4 py-2 border rounded-lg"
              rows="5"
              placeholder="Second paragraph of description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Side Image</label>
            <p className="text-sm text-gray-600 mb-3">Upload the image that appears on the left side of the intro card</p>
            <ImageUpload
              currentImage={pageData?.intro?.image}
              onImageChange={(imageData) => {
                setPageData({
                  ...pageData,
                  intro: {
                    ...pageData?.intro,
                    image: imageData ? imageData.url : '',
                    imagePublicId: imageData ? imageData.publicId : ''
                  }
                });
              }}
              folder="eincarnation/about/intro"
            />
          </div>

          <button
            type="submit"
            className="bg-[#1A0185] text-white px-6 py-2 rounded-lg hover:bg-[#3451A3] flex items-center gap-2"
          >
            <Save size={18} /> Save Intro Section
          </button>
        </form>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users size={24} /> Team Members
          </h2>
          <button
            onClick={() => setShowAddMember(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={18} /> Add Team Member
          </button>
        </div>

        {/* Add Team Member Form */}
        {showAddMember && (
          <form onSubmit={handleAddTeamMember} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={memberForm.name}
                onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Position"
                value={memberForm.position}
                onChange={(e) => setMemberForm({...memberForm, position: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Bio"
                value={memberForm.bio}
                onChange={(e) => setMemberForm({...memberForm, bio: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows="3"
              />
              <ImageUpload
                label="Team Member Photo"
                currentImage={memberForm.image}
                onImageChange={(imageData) => {
                  setMemberForm({ 
                    ...memberForm, 
                    image: imageData ? imageData.url : '',
                    imagePublicId: imageData ? imageData.publicId : ''
                  });
                }}
                folder="eincarnation/team"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={memberForm.linkedin}
                onChange={(e) => setMemberForm({...memberForm, linkedin: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  Add Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Team Members Grid */}
        <div className="grid gap-4">
          {pageData?.teamSection?.members?.map((member) => (
            <div key={member._id} className="border rounded-lg p-4">
              {editingMember === member._id ? (
                <form onSubmit={(e) => handleUpdateTeamMember(member._id, e)} className="space-y-4">
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    value={memberForm.position}
                    onChange={(e) => setMemberForm({...memberForm, position: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    value={memberForm.bio}
                    onChange={(e) => setMemberForm({...memberForm, bio: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="3"
                  />
                  <ImageUpload
                    label="Team Member Photo"
                    currentImage={memberForm.image}
                    onImageChange={(imageData) => {
                      setMemberForm({ 
                        ...memberForm, 
                        image: imageData ? imageData.url : '',
                        imagePublicId: imageData ? imageData.publicId : ''
                      });
                    }}
                    folder="eincarnation/team"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-[#1A0185] text-white px-4 py-2 rounded-lg">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingMember(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.position}</p>
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditMember(member)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeamMember(member._id)}
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

export default AboutPageManager;
