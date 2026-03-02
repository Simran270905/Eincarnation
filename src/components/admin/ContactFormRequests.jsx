import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, Eye, CheckCircle, MessageSquare, FileText } from 'lucide-react';
import api from '../../utils/api';

const ContactFormRequests = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/contact-forms');
      if (response.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Error fetching contact form requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/contact-forms/${id}/mark-read`);
      fetchRequests();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    try {
      await api.delete(`/contact-forms/${id}`);
      fetchRequests();
      if (selectedRequest?._id === id) {
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    if (!request.isRead) {
      handleMarkAsRead(request._id);
    }
  };

  const getFilteredRequests = () => {
    if (activeTab === 'all') return requests;
    if (activeTab === 'contact_page') return requests.filter(r => r.source === 'contact_page');
    if (activeTab === 'footer_form') return requests.filter(r => r.source === 'footer_form');
    return requests;
  };

  const getTabCounts = () => {
    return {
      all: requests.length,
      contact_page: requests.filter(r => r.source === 'contact_page').length,
      footer_form: requests.filter(r => r.source === 'footer_form').length,
      allUnread: requests.filter(r => !r.isRead).length,
      contactPageUnread: requests.filter(r => r.source === 'contact_page' && !r.isRead).length,
      footerFormUnread: requests.filter(r => r.source === 'footer_form' && !r.isRead).length,
    };
  };

  const getSourceLabel = (source) => {
    return source === 'contact_page' ? 'Contact Us Page' : 'Footer – Let\'s Talk';
  };

  const getSourceBadgeColor = (source) => {
    return source === 'contact_page' 
      ? 'bg-blue-100 text-blue-700 border-blue-300'
      : 'bg-purple-100 text-purple-700 border-purple-300';
  };

  const getCardBorderColor = (request) => {
    if (selectedRequest?._id === request._id) return 'ring-2 ring-[#1A0185]';
    if (!request.isRead) {
      return request.source === 'contact_page'
        ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
        : 'border-purple-500 bg-purple-50 hover:bg-purple-100';
    }
    return 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';
  };

  const getNewBadgeColor = (source) => {
    return source === 'contact_page' ? 'bg-blue-500' : 'bg-purple-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1A0185]"></div>
      </div>
    );
  }

  const filteredRequests = getFilteredRequests();
  const counts = getTabCounts();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Contact Form Requests</h2>
          <p className="text-gray-600 mt-1">Manage all contact submissions from your website</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg">
          <MessageSquare size={18} />
          <span className="font-bold">{counts.allUnread} Unread</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-3 font-bold transition-all relative ${
            activeTab === 'all'
              ? 'text-[#1A0185] border-b-2 border-[#1A0185]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All Requests
          <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
            {counts.all}
          </span>
          {counts.allUnread > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {counts.allUnread}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('contact_page')}
          className={`px-6 py-3 font-bold transition-all relative ${
            activeTab === 'contact_page'
              ? 'text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText size={16} className="inline mr-2" />
          Contact Us Page
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
            {counts.contact_page}
          </span>
          {counts.contactPageUnread > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
              {counts.contactPageUnread}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('footer_form')}
          className={`px-6 py-3 font-bold transition-all relative ${
            activeTab === 'footer_form'
              ? 'text-purple-700 border-b-2 border-purple-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageSquare size={16} className="inline mr-2" />
          Let's Talk (Footer)
          <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
            {counts.footer_form}
          </span>
          {counts.footerFormUnread > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
              {counts.footerFormUnread}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>No {activeTab === 'all' ? '' : activeTab === 'contact_page' ? 'Contact Page' : 'Footer Form'} requests yet</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request._id}
                onClick={() => handleViewDetails(request)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${getCardBorderColor(request)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-gray-900">
                        {request.name}
                      </h3>
                      {!request.isRead && (
                        <span className={`px-2 py-1 ${getNewBadgeColor(request.source)} text-white text-xs rounded-full`}>
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${getSourceBadgeColor(request.source)}`}>
                        {getSourceLabel(request.source)}
                      </span>
                    </div>
                    {request.companyName && (
                      <p className="text-sm text-gray-600">{request.companyName}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(request._id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>{request.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>{request.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(request.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-700 line-clamp-2">
                  {request.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Request Details */}
        <div className="bg-gray-50 rounded-xl p-6 sticky top-0">
          {selectedRequest ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                {selectedRequest.isRead ? (
                  <span className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <CheckCircle size={16} />
                    Read
                  </span>
                ) : (
                  <span className={`px-3 py-1 ${getNewBadgeColor(selectedRequest.source)} text-white text-sm rounded-full font-bold`}>
                    NEW
                  </span>
                )}
              </div>

              <div className={`p-4 rounded-lg border-2 ${getSourceBadgeColor(selectedRequest.source)}`}>
                <p className="text-xs font-bold uppercase mb-1">Source</p>
                <p className="text-sm font-semibold">{getSourceLabel(selectedRequest.source)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRequest.name}</p>
                </div>

                {selectedRequest.companyName && (
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Company</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedRequest.companyName}</p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                  <p className="text-gray-900">{selectedRequest.email}</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                  <p className="text-gray-900">{selectedRequest.phone}</p>
                </div>

                {(selectedRequest.city || selectedRequest.state) && (
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                    <p className="text-gray-900">
                      {[selectedRequest.city, selectedRequest.state].filter(Boolean).join(', ')}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {selectedRequest.message}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Received</label>
                  <p className="text-gray-900">
                    {new Date(selectedRequest.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-3">
                <a
                  href={`mailto:${selectedRequest.email}`}
                  className="flex-1 px-4 py-3 bg-[#1A0185] text-white rounded-lg font-bold text-center hover:bg-[#3451A3] transition"
                >
                  Reply via Email
                </a>
                <a
                  href={`tel:${selectedRequest.phone}`}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold text-center hover:bg-green-700 transition"
                >
                  Call
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Eye size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a request to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormRequests;
