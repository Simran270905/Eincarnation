import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { api } from '../../utils/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const ImageUpload = ({ 
  label = "Upload Image", 
  currentImage = null, 
  onImageChange,
  folder = "eincarnation",
  accept = "image/jpeg,image/jpg,image/png,image/webp,image/gif",
  maxSize = 5 // MB
}) => {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Get admin token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setError('Authentication required. Please login again.');
        setUploading(false);
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      // Upload to backend
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => {
          window.location.href = '/adminlogin';
        }, 2000);
        return;
      }

      if (data.success) {
        setPreview(data.data.url);
        onImageChange(data.data);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      {preview ? (
        <div className="relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full max-w-sm h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            id={`file-upload-${label}`}
          />
          <label
            htmlFor={`file-upload-${label}`}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader className="animate-spin text-[#1A0185]" size={40} />
                <p className="mt-2 text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="text-gray-400" size={40} />
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, WEBP up to {maxSize}MB
                </p>
              </div>
            )}
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
