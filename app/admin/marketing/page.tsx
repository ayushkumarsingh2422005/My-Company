'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

interface MarketingBanner {
  _id: string;
  imageUrl: string;
  publicId: string;
  link?: string;
  isActive: boolean;
}

export default function MarketingDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [banners, setBanners] = useState<MarketingBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBanner, setSelectedBanner] = useState<MarketingBanner | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    imageUrl: '',
    publicId: '',
    link: '',
    isActive: true
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/marketing');
      const data = await response.json();

      if (data.success) {
        setBanners(data.data);
      } else {
        setError('Failed to fetch banners');
      }
    } catch (error) {
      setError('An error occurred while fetching banners: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchBanners();
    }
  }, [status]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload response:', data);

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          imageUrl: data.url,
          publicId: data.publicId
        }));
      } else {
        setError(data.error || 'Failed to upload image');
        console.error('Upload error:', data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('An error occurred while uploading the image: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...formData, id: selectedBanner?._id } : formData;

      console.log('Submitting banner data:', body);

      const response = await fetch('/api/marketing', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        fetchBanners();
        setIsEditing(false);
        setSelectedBanner(null);
        setFormData({
          imageUrl: '',
          publicId: '',
          link: '',
          isActive: true
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError(data.error || 'Failed to save banner');
        if (data.details) {
          console.error('Error details:', data.details);
        }
      }
    } catch (error) {
      console.error('Error submitting banner:', error);
      setError('An error occurred while saving the banner: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner: MarketingBanner) => {
    setSelectedBanner(banner);
    setFormData({
      imageUrl: banner.imageUrl,
      publicId: banner.publicId,
      link: banner.link || '',
      isActive: banner.isActive
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const response = await fetch(`/api/marketing?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchBanners();
        if (selectedBanner?._id === id) {
          setSelectedBanner(null);
          setIsEditing(false);
        }
      } else {
        setError(data.error || 'Failed to delete banner');
      }
    } catch (error) {
      setError('An error occurred while deleting the banner: ' + error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Marketing Banners</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 text-red-200 rounded border border-red-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Banners List */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">All Banners</h2>
                <button
                  onClick={() => {
                    setSelectedBanner(null);
                    setIsEditing(false);
                    setFormData({
                      imageUrl: '',
                      publicId: '',
                      link: '',
                      isActive: true
                    });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Add New Banner
                </button>
              </div>

              <div className="space-y-4">
                {banners.map((banner) => (
                  <div
                    key={banner._id}
                    className={`p-4 bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors ${
                      selectedBanner?._id === banner._id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => handleEdit(banner)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={banner.imageUrl}
                            alt="Banner"
                            fill
                            className="object-cover"
                          />
                        </div>
                        {banner.link && (
                          <div className="text-sm text-gray-400 truncate max-w-[200px]">
                            {banner.link}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-sm rounded ${
                          banner.isActive 
                            ? 'bg-green-900/30 text-green-400 border border-green-900'
                            : 'bg-red-900/30 text-red-400 border border-red-900'
                        }`}>
                          {banner.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(banner._id);
                          }}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Banner Form */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                {isEditing ? 'Edit Banner' : 'Add New Banner'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Banner Image
                  </label>
                  <div className="space-y-4">
                    {formData.imageUrl && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                          src={formData.imageUrl}
                          alt="Banner preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer"
                      required={!isEditing}
                    />
                    {uploadingImage && (
                      <p className="text-sm text-purple-400">Uploading image...</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 bg-[#2a2a2a] border border-gray-700 rounded text-purple-500 focus:ring-purple-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-300">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBanner(null);
                    setIsEditing(false);
                    setFormData({
                      imageUrl: '',
                      publicId: '',
                      link: '',
                      isActive: true
                    });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (isEditing ? 'Update Banner' : 'Add Banner')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 