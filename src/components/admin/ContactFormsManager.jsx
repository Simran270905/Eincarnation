import React, { useState, useEffect } from 'react';
import { RefreshCw, Trash2, Eye, Filter, Search, Download, Mail, Phone, Building, MapPin } from 'lucide-react';
import { api } from '../../utils/api';

const ContactFormsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/contact-forms');
      if (response.success) {
        setContacts(response.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await api.put(`/contact-forms/${id}`, { status });
      if (response.success) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact form?')) return;
    
    try {
      const response = await api.delete(`/contact-forms/${id}`);
      if (response.success) {
        fetchContacts();
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' ? true : contact.status === filter;
    const matchesSearch = searchTerm === '' || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      (contact.companyName && contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'City', 'State', 'Message', 'Status', 'Date'];
    const csvData = filteredContacts.map(contact => [
      contact.name,
      contact.email,
      contact.phone,
      contact.companyName || '',
      contact.city || '',
      contact.state || '',
      contact.message.replace(/\n/g, ' '),
      contact.status,
      new Date(contact.createdAt).toLocaleString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-forms-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'read': return 'bg-yellow-100 text-yellow-700';
      case 'responded': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Contact Form Submissions</h2>
            <p className="text-gray-600 mt-1">
              {filteredContacts.length} of {contacts.length} submissions
              {searchTerm && ' (filtered)'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchContacts}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">New</p>
            <p className="text-2xl font-black text-blue-700">
              {contacts.filter(c => c.status === 'new').length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-medium">Read</p>
            <p className="text-2xl font-black text-yellow-700">
              {contacts.filter(c => c.status === 'read').length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Responded</p>
            <p className="text-2xl font-black text-green-700">
              {contacts.filter(c => c.status === 'responded').length}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">Archived</p>
            <p className="text-2xl font-black text-gray-700">
              {contacts.filter(c => c.status === 'archived').length}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, phone, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#1A0185] focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#1A0185] focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#1A0185]"></div>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No contact forms found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Company/Location</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Message Preview</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {contact.companyName && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building size={14} />
                          <span>{contact.companyName}</span>
                        </div>
                      )}
                      {(contact.city || contact.state) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          <span>{[contact.city, contact.state].filter(Boolean).join(', ')}</span>
                        </div>
                      )}
                      {!contact.companyName && !contact.city && !contact.state && (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-600 truncate">
                      {contact.message.substring(0, 80)}
                      {contact.message.length > 80 && '...'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={contact.status}
                      onChange={(e) => updateStatus(contact._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(contact.status)} cursor-pointer`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{new Date(contact.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => deleteContact(contact._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedContact(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1A0185] to-[#3451A3] text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-black mb-2">Contact Form Submission</h3>
              <p className="text-sm opacity-90">
                Received on {new Date(selectedContact.createdAt).toLocaleDateString()} at {new Date(selectedContact.createdAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</p>
                  <p className="text-lg font-bold text-gray-900">{selectedContact.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="text-[#1A0185]" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{selectedContact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="text-[#1A0185]" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{selectedContact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company & Location */}
              {(selectedContact.companyName || selectedContact.city || selectedContact.state) && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Company & Location</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedContact.companyName && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Building className="text-[#1A0185]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Company</p>
                          <p className="text-sm font-medium text-gray-900">{selectedContact.companyName}</p>
                        </div>
                      </div>
                    )}
                    {(selectedContact.city || selectedContact.state) && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="text-[#1A0185]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-medium text-gray-900">
                            {[selectedContact.city, selectedContact.state].filter(Boolean).join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{selectedContact.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-6 flex gap-3">
                <button
                  onClick={() => {
                    if (selectedContact.status === 'new') {
                      updateStatus(selectedContact._id, 'read');
                    }
                    setSelectedContact(null);
                  }}
                  className="flex-1 py-3 bg-[#1A0185] text-white rounded-xl font-bold hover:bg-[#3451A3] transition-colors"
                >
                  {selectedContact.status === 'new' ? 'Mark as Read & Close' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    deleteContact(selectedContact._id);
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactFormsManager;
