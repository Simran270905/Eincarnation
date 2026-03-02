import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2, RefreshCw, Download } from 'lucide-react';
import api from '../../utils/api';
import ImageUpload from './ImageUpload';

const EPRPageManagerNew = () => {
  const [eprData, setEprData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    fetchEprData();
  }, []);

  const fetchEprData = async () => {
    try {
      const response = await api.get('/epr-page');
      if (response.success) {
        setEprData(response.data);
      }
    } catch (error) {
      console.error('Error fetching EPR data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMain = async (e) => {
    e.preventDefault();
    try {
      await api.put('/epr-page', eprData);
      alert('EPR Page updated successfully!');
      fetchEprData();
    } catch (error) {
      console.error('Error updating EPR page:', error);
      alert('Failed to update page');
    }
  };

  // Services CRUD
  const handleAddService = async () => {
    const newService = {
      title: '',
      description: '',
      icon: 'Shield',
      order: eprData.services?.length || 0
    };
    try {
      await api.post('/epr-page/services', newService);
      fetchEprData();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleUpdateService = async (serviceId, updatedData) => {
    try {
      await api.put(`/epr-page/services/${serviceId}`, updatedData);
      fetchEprData();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/epr-page/services/${serviceId}`);
      fetchEprData();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Coverage CRUD
  const handleAddCoverage = async () => {
    const newItem = {
      item: 'New Coverage Item',
      order: eprData.coverage?.length || 0
    };
    try {
      await api.post('/epr-page/coverage', newItem);
      fetchEprData();
    } catch (error) {
      console.error('Error adding coverage:', error);
    }
  };

  const handleUpdateCoverage = async (itemId, updatedData) => {
    try {
      await api.put(`/epr-page/coverage/${itemId}`, updatedData);
      fetchEprData();
    } catch (error) {
      console.error('Error updating coverage:', error);
    }
  };

  const handleDeleteCoverage = async (itemId) => {
    if (!confirm('Delete this coverage item?')) return;
    try {
      await api.delete(`/epr-page/coverage/${itemId}`);
      fetchEprData();
    } catch (error) {
      console.error('Error deleting coverage:', error);
    }
  };

  // Compliance Steps CRUD
  const handleAddComplianceStep = async () => {
    const newStep = {
      step: String((eprData.complianceSteps?.length || 0) + 1).padStart(2, '0'),
      title: 'New Step',
      description: 'Step description',
      order: eprData.complianceSteps?.length || 0
    };
    try {
      await api.post('/epr-page/compliance-steps', newStep);
      fetchEprData();
    } catch (error) {
      console.error('Error adding compliance step:', error);
    }
  };

  const handleUpdateComplianceStep = async (stepId, updatedData) => {
    try {
      await api.put(`/epr-page/compliance-steps/${stepId}`, updatedData);
      fetchEprData();
    } catch (error) {
      console.error('Error updating compliance step:', error);
    }
  };

  const handleDeleteComplianceStep = async (stepId) => {
    if (!confirm('Delete this compliance step?')) return;
    try {
      await api.delete(`/epr-page/compliance-steps/${stepId}`);
      fetchEprData();
    } catch (error) {
      console.error('Error deleting compliance step:', error);
    }
  };

  // Why Choose Us CRUD
  const handleAddWhyChooseUsReason = async () => {
    const newReason = {
      text: 'New reason',
      order: eprData.whyChooseUs?.reasons?.length || 0
    };
    try {
      await api.post('/epr-page/why-choose-us/reasons', newReason);
      fetchEprData();
    } catch (error) {
      console.error('Error adding reason:', error);
    }
  };

  const handleUpdateWhyChooseUsReason = async (reasonId, updatedData) => {
    try {
      await api.put(`/epr-page/why-choose-us/reasons/${reasonId}`, updatedData);
      fetchEprData();
    } catch (error) {
      console.error('Error updating reason:', error);
    }
  };

  const handleDeleteWhyChooseUsReason = async (reasonId) => {
    if (!confirm('Delete this reason?')) return;
    try {
      await api.delete(`/epr-page/why-choose-us/reasons/${reasonId}`);
      fetchEprData();
    } catch (error) {
      console.error('Error deleting reason:', error);
    }
  };

  // Benefits CRUD
  const handleAddBenefit = async () => {
    const newBenefit = {
      benefit: 'New Benefit',
      order: eprData.benefits?.length || 0
    };
    try {
      await api.post('/epr-page/benefits', newBenefit);
      fetchEprData();
    } catch (error) {
      console.error('Error adding benefit:', error);
    }
  };

  const handleUpdateBenefit = async (benefitId, updatedData) => {
    try {
      await api.put(`/epr-page/benefits/${benefitId}`, updatedData);
      fetchEprData();
    } catch (error) {
      console.error('Error updating benefit:', error);
    }
  };

  const handleDeleteBenefit = async (benefitId) => {
    if (!confirm('Delete this benefit?')) return;
    try {
      await api.delete(`/epr-page/benefits/${benefitId}`);
      fetchEprData();
    } catch (error) {
      console.error('Error deleting benefit:', error);
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
          <h2 className="text-2xl font-black text-gray-900">EPR Page Manager</h2>
          <p className="text-gray-600 mt-1">Manage all EPR page content</p>
        </div>
        <button onClick={fetchEprData} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b overflow-x-auto">
        {['hero', 'whatIsEpr', 'coverage', 'services', 'complianceSteps', 'benefits', 'whyChooseUs', 'brochure'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-2 border-[#1A0185] text-[#1A0185]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>

      {/* Hero Section Tab */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Hero Section</h3>
          <form onSubmit={handleUpdateMain} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Hero Title</label>
              <textarea
                value={eprData?.hero?.title || ''}
                onChange={(e) => setEprData({
                  ...eprData,
                  hero: { ...eprData.hero, title: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                rows="2"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Hero Subtitle</label>
              <textarea
                value={eprData?.hero?.subtitle || ''}
                onChange={(e) => setEprData({
                  ...eprData,
                  hero: { ...eprData.hero, subtitle: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Hero Image</label>
              <ImageUpload
                currentImage={eprData?.hero?.image}
                onImageChange={(imageData) => {
                  setEprData({
                    ...eprData,
                    hero: {
                      ...eprData.hero,
                      image: imageData ? imageData.url : '',
                      imagePublicId: imageData ? imageData.publicId : ''
                    }
                  });
                }}
                folder="eincarnation/epr/hero"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-[#1A0185] text-white rounded-lg font-bold hover:bg-[#3451A3] flex items-center gap-2">
              <Save size={18} /> Save Hero Section
            </button>
          </form>
        </div>
      )}

      {/* What is EPR Tab */}
      {activeTab === 'whatIsEpr' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">What is EPR Section</h3>
          <form onSubmit={handleUpdateMain} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Section Title</label>
              <input
                type="text"
                value={eprData?.whatIsEpr?.title || ''}
                onChange={(e) => setEprData({
                  ...eprData,
                  whatIsEpr: { ...eprData.whatIsEpr, title: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Paragraphs (one per line)</label>
              <textarea
                value={eprData?.whatIsEpr?.paragraphs?.join('\n') || ''}
                onChange={(e) => setEprData({
                  ...eprData,
                  whatIsEpr: {
                    ...eprData.whatIsEpr,
                    paragraphs: e.target.value.split('\n').filter(p => p.trim())
                  }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                rows="6"
                placeholder="Enter each paragraph on a new line"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-[#1A0185] text-white rounded-lg font-bold hover:bg-[#3451A3] flex items-center gap-2">
              <Save size={18} /> Save What is EPR
            </button>
          </form>
        </div>
      )}

      {/* Coverage Tab */}
      {activeTab === 'coverage' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Coverage Items</h3>
            <button onClick={handleAddCoverage} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Plus size={18} /> Add Item
            </button>
          </div>
          <div className="space-y-3">
            {eprData?.coverage?.sort((a, b) => a.order - b.order).map((item, index) => (
              <div key={item._id} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl">
                <span className="font-bold text-gray-400">{index + 1}.</span>
                <input
                  type="text"
                  value={item.item}
                  onChange={(e) => handleUpdateCoverage(item._id, { ...item, item: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => handleDeleteCoverage(item._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">EPR Services</h3>
            <button onClick={handleAddService} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Plus size={18} /> Add Service
            </button>
          </div>
          <div className="grid gap-6">
            {eprData?.services?.sort((a, b) => a.order - b.order).map((service) => (
              <div key={service._id} className="border-2 border-gray-200 rounded-xl p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleUpdateService(service._id, { ...service, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-bold"
                    placeholder="Service Title"
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) => handleUpdateService(service._id, { ...service, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="Service Description"
                  />
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      value={service.order}
                      onChange={(e) => handleUpdateService(service._id, { ...service, order: parseInt(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Order"
                    />
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Steps Tab */}
      {activeTab === 'complianceSteps' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Compliance Process Steps</h3>
            <button onClick={handleAddComplianceStep} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Plus size={18} /> Add Step
            </button>
          </div>
          <div className="grid gap-6">
            {eprData?.complianceSteps?.sort((a, b) => a.order - b.order).map((step) => (
              <div key={step._id} className="border-2 border-gray-200 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={step.step}
                      onChange={(e) => handleUpdateComplianceStep(step._id, { ...step, step: e.target.value })}
                      className="w-20 px-4 py-2 border border-gray-300 rounded-lg font-bold text-center"
                      placeholder="01"
                    />
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleUpdateComplianceStep(step._id, { ...step, title: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-bold"
                      placeholder="Step Title"
                    />
                  </div>
                  <textarea
                    value={step.description}
                    onChange={(e) => handleUpdateComplianceStep(step._id, { ...step, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="Step Description"
                  />
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      value={step.order}
                      onChange={(e) => handleUpdateComplianceStep(step._id, { ...step, order: parseInt(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Order"
                    />
                    <button
                      onClick={() => handleDeleteComplianceStep(step._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits Tab */}
      {activeTab === 'benefits' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Benefits</h3>
            <button onClick={handleAddBenefit} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Plus size={18} /> Add Benefit
            </button>
          </div>
          <div className="space-y-3">
            {eprData?.benefits?.sort((a, b) => a.order - b.order).map((benefit, index) => (
              <div key={benefit._id} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl">
                <span className="font-bold text-gray-400">{index + 1}.</span>
                <input
                  type="text"
                  value={benefit.benefit}
                  onChange={(e) => handleUpdateBenefit(benefit._id, { ...benefit, benefit: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => handleDeleteBenefit(benefit._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Why Choose Us Tab */}
      {activeTab === 'whyChooseUs' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Why Choose Us for EPR?</h3>
          <form onSubmit={handleUpdateMain} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Section Title</label>
              <input
                type="text"
                value={eprData?.whyChooseUs?.title || 'Why Choose Us for EPR?'}
                onChange={(e) => setEprData({
                  ...eprData,
                  whyChooseUs: { ...eprData.whyChooseUs, title: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Section Image</label>
              <ImageUpload
                currentImage={eprData?.whyChooseUs?.image}
                onImageChange={(imageData) => {
                  setEprData({
                    ...eprData,
                    whyChooseUs: {
                      ...eprData.whyChooseUs,
                      image: imageData ? imageData.url : '',
                      imagePublicId: imageData ? imageData.publicId : ''
                    }
                  });
                }}
                folder="eincarnation/epr/why-choose-us"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-[#1A0185] text-white rounded-lg font-bold hover:bg-[#3451A3] flex items-center gap-2">
              <Save size={18} /> Save Why Choose Us Section
            </button>
          </form>

          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">Reasons</h4>
              <button onClick={handleAddWhyChooseUsReason} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                <Plus size={18} /> Add Reason
              </button>
            </div>
            <div className="space-y-3">
              {(eprData?.whyChooseUs?.reasons || []).length === 0 ? (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                  <p>No reasons added yet. Click "Add Reason" to get started.</p>
                </div>
              ) : (
                (eprData?.whyChooseUs?.reasons || []).sort((a, b) => (a.order || 0) - (b.order || 0)).map((reason, index) => (
                  <div key={reason._id} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl">
                    <span className="font-bold text-gray-400">{index + 1}.</span>
                    <input
                      type="text"
                      value={reason.text}
                      onChange={(e) => handleUpdateWhyChooseUsReason(reason._id, { ...reason, text: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter reason text"
                    />
                    <input
                      type="number"
                      value={reason.order || 0}
                      onChange={(e) => handleUpdateWhyChooseUsReason(reason._id, { ...reason, order: parseInt(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Order"
                    />
                    <button
                      onClick={() => handleDeleteWhyChooseUsReason(reason._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Brochure Tab */}
      {activeTab === 'brochure' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Brochure Download Link</h3>
          <form onSubmit={handleUpdateMain} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">
                <Download size={18} className="inline mr-2" />
                Google Drive Link (PDF)
              </label>
              <input
                type="url"
                value={eprData?.brochureLink || ''}
                onChange={(e) => setEprData({ ...eprData, brochureLink: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="https://drive.google.com/file/d/..."
              />
              <p className="text-sm text-gray-600 mt-2">
                Paste the shareable Google Drive link for the EPR brochure PDF. Make sure the link is set to "Anyone with the link can view".
              </p>
            </div>
            <button type="submit" className="px-6 py-3 bg-[#1A0185] text-white rounded-lg font-bold hover:bg-[#3451A3] flex items-center gap-2">
              <Save size={18} /> Save Brochure Link
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EPRPageManagerNew;
