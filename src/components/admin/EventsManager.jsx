import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Calendar } from 'lucide-react';
import api from '../../utils/api';
import ImageUpload from './ImageUpload';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    imagePublicId: '',
    order: 0,
    isActive: true,
    carouselImages: []
  });
  const [carouselImage, setCarouselImage] = useState({ url: '', caption: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      if (response.success) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, formData);
      } else {
        await api.post('/events', formData);
      }
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const deleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    const eventDate = new Date(event.date).toISOString().split('T')[0];
    setFormData({
      title: event.title,
      description: event.description,
      date: eventDate,
      location: event.location || '',
      image: event.image || '',
      imagePublicId: event.imagePublicId || '',
      order: event.order,
      isActive: event.isActive,
      carouselImages: event.carouselImages || []
    });
    setShowModal(true);
  };

  const handleAddCarouselImage = () => {
    if (carouselImage.url) {
      setFormData({
        ...formData,
        carouselImages: [...formData.carouselImages, carouselImage]
      });
      setCarouselImage({ url: '', caption: '' });
    }
  };

  const handleRemoveCarouselImage = (index) => {
    setFormData({
      ...formData,
      carouselImages: formData.carouselImages.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      image: '',
      imagePublicId: '',
      order: 0,
      isActive: true,
      carouselImages: []
    });
    setCarouselImage({ url: '', caption: '' });
    setEditingEvent(null);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Events</h2>
          <p className="text-gray-600 mt-1">{events.length} events</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchEvents} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <RefreshCw size={18} />
            Refresh
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1A0185] to-[#3451A3] text-white rounded-lg font-bold">
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#1A0185] transition-colors">
            {event.image && (
              <div className="h-48 bg-gray-100">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {event.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => editEvent(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteEvent(event._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar size={16} />
                {new Date(event.date).toLocaleDateString()}
              </div>
              {event.location && (
                <p className="text-sm text-gray-600">📍 {event.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 my-8">
            <h3 className="text-2xl font-black mb-6">{editingEvent ? 'Edit Event' : 'Add Event'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Image</label>
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={(imageData) => {
                    setFormData({
                      ...formData,
                      image: imageData ? imageData.url : '',
                      imagePublicId: imageData ? imageData.publicId : ''
                    });
                  }}
                  folder="eincarnation/events"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                />
              </div>
              
              {/* Carousel Images Section */}
              <div className="border-t-2 border-gray-200 pt-6 mt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Gallery/Carousel Images (Optional)</h4>
                <p className="text-sm text-gray-600 mb-4">Add images that will appear in the carousel below events</p>
                
                {/* Carousel Image Input */}
                <div className="space-y-3 mb-4">
                  <ImageUpload
                    label="Add Carousel Image"
                    currentImage={carouselImage.url}
                    onImageChange={(imageData) => {
                      setCarouselImage({ 
                        ...carouselImage,
                        url: imageData ? imageData.url : '',
                        publicId: imageData ? imageData.publicId : ''
                      });
                    }}
                    folder="eincarnation/events/carousel"
                  />
                  <input
                    type="text"
                    value={carouselImage.caption}
                    onChange={(e) => setCarouselImage({ ...carouselImage, caption: e.target.value })}
                    placeholder="Image caption (optional)"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCarouselImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold"
                  >
                    Add to Carousel
                  </button>
                </div>

                {/* Carousel Images List */}
                {formData.carouselImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-700">Carousel Images ({formData.carouselImages.length})</p>
                    {formData.carouselImages.map((img, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img src={img.url} alt="Carousel" className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{img.caption || 'No caption'}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCarouselImage(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4">
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
                  {editingEvent ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManager;
