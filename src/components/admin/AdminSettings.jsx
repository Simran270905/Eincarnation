import React, { useState, useEffect } from 'react';
import { Save, User, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../../utils/api';

const AdminSettings = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Email update state
  const [emailData, setEmailData] = useState({
    newEmail: '',
    currentPassword: ''
  });

  // Password update state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.success) {
        setAdmin(response.data);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      setMessage({ type: 'error', text: 'Failed to load admin profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    
    if (!emailData.newEmail || !emailData.currentPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(emailData.newEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const response = await api.put('/auth/update-email', {
        newEmail: emailData.newEmail,
        currentPassword: emailData.currentPassword
      });

      if (response.success) {
        setMessage({ type: 'success', text: 'Email updated successfully! Please login again with your new email.' });
        setEmailData({ newEmail: '', currentPassword: '' });
        
        // Logout after 2 seconds
        setTimeout(() => {
          localStorage.removeItem('token');
          window.location.href = '/adminlogin';
        }, 2000);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update email. Please check your password.' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all password fields' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const response = await api.put('/auth/update-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.success) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update password. Please check your current password.' 
      });
    } finally {
      setSaving(false);
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
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900">Admin Settings</h2>
        <p className="text-gray-600 mt-1">Manage your admin account credentials</p>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Current Admin Info */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User size={20} className="text-[#1A0185]" />
          Current Admin Information
        </h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Name:</span> {admin?.name}</p>
          <p><span className="font-semibold">Email:</span> {admin?.email}</p>
          <p><span className="font-semibold">Role:</span> <span className="capitalize">{admin?.role?.replace('_', ' ')}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Update Email Section */}
        <div className="border-2 border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Mail size={20} className="text-[#1A0185]" />
            Update Email
          </h3>

          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                New Email Address
              </label>
              <input
                type="email"
                value={emailData.newEmail}
                onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="admin@example.com"
                disabled={saving}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={emailData.currentPassword}
                onChange={(e) => setEmailData({ ...emailData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Enter current password"
                disabled={saving}
              />
              <p className="text-xs text-gray-500 mt-2">Required for security verification</p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1A0185] text-white rounded-lg font-bold hover:bg-[#3451A3] transition ${
                saving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save size={18} />
              {saving ? 'Updating...' : 'Update Email'}
            </button>

            <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
              ⚠️ You will be logged out after updating your email and need to login with the new email address.
            </p>
          </form>
        </div>

        {/* Update Password Section */}
        <div className="border-2 border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock size={20} className="text-[#1A0185]" />
            Update Password
          </h3>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Enter current password"
                disabled={saving}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Enter new password"
                disabled={saving}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1A0185] focus:outline-none"
                placeholder="Confirm new password"
                disabled={saving}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1A0185] text-white rounded-lg font-bold hover:bg-[#3451A3] transition ${
                saving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save size={18} />
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-blue-900 mb-3">🔒 Security Best Practices</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex gap-2">
            <span>•</span>
            <span>Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Never share your admin credentials with anyone</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Change your password regularly (every 3-6 months)</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Use a unique password that you don't use for other services</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSettings;
