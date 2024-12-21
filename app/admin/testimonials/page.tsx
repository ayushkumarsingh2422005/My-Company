'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface Client {
  _id: string;
  name: string;
  role: string;
  image: {
    url: string;
    publicId: string;
  };
  testimonial: string;
  project: {
    title: string;
    link: string;
    description: string;
  };
  rating: number;
  location: string;
  order: number;
  isActive: boolean;
}

export default function TestimonialsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: {
      url: '',
      publicId: ''
    },
    testimonial: '',
    project: {
      title: '',
      link: '',
      description: ''
    },
    rating: 5,
    location: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();

      if (data.success) {
        setClients(data.data);
      } else {
        setError('Failed to fetch clients');
      }
    } catch (error) {
      setError('An error occurred while fetching clients: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchClients();
    }
  }, [status]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          image: {
            url: data.url,
            publicId: data.publicId || data.url.split('/').pop()?.split('.')[0] || ''
          }
        }));
      } else {
        setError('Failed to upload image');
      }
    } catch (error) {
      setError('An error occurred while uploading the image: ' + error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.role || !formData.image || !formData.testimonial || 
          !formData.project.title || !formData.project.link || !formData.project.description || 
          !formData.location) {
        toast.error('Please fill in all required fields');
        return;
      }

      const method = isEditing ? 'PUT' : 'POST';
      const payload = {
        ...formData,
        rating: Number(formData.rating),
        order: Number(formData.order),
      };

      const response = await fetch('/api/clients', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isEditing ? { ...payload, id: selectedClient?._id } : payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(isEditing ? 'Testimonial updated successfully' : 'Testimonial added successfully');
        fetchClients();
        setIsEditing(false);
        setSelectedClient(null);
        setFormData({
          name: '',
          role: '',
          image: {
            url: '',
            publicId: ''
          },
          testimonial: '',
          project: {
            title: '',
            link: '',
            description: ''
          },
          rating: 5,
          location: '',
          order: clients.length,
          isActive: true
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(data.error || 'Failed to save testimonial');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred: ' + (error.message || 'Failed to save testimonial'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      role: client.role,
      image: client.image,
      testimonial: client.testimonial,
      project: {
        title: client.project.title,
        link: client.project.link,
        description: client.project.description
      },
      rating: client.rating,
      location: client.location,
      order: client.order,
      isActive: client.isActive
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const response = await fetch(`/api/clients?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Client deleted successfully');
        fetchClients();
        if (selectedClient?._id === id) {
          setSelectedClient(null);
          setIsEditing(false);
        }
      } else {
        throw new Error(data.error || 'Failed to delete client');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the client: ' + error);
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
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Manage Testimonials</h1>
            <button
              onClick={() => {
                setSelectedClient(null);
                setIsEditing(false);
                setFormData({
                  name: '',
                  role: '',
                  image: {
                    url: '',
                    publicId: ''
                  },
                  testimonial: '',
                  project: {
                    title: '',
                    link: '',
                    description: ''
                  },
                  rating: 5,
                  location: '',
                  order: clients.length,
                  isActive: true
                });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Add New Testimonial
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Client List */}
            <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">All Testimonials</h2>
              <div className="space-y-4">
                {clients.map((client) => (
                  <motion.div
                    key={client._id}
                    className={`p-4 bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors ${
                      selectedClient?._id === client._id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => handleEdit(client)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={client.image.url}
                            alt={client.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{client.name}</h3>
                          <p className="text-sm text-gray-400">{client.role}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-3 h-3 ${
                                  i < client.rating ? 'text-yellow-400' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          client.isActive 
                            ? 'bg-green-900/30 text-green-400 border border-green-900'
                            : 'bg-red-900/30 text-red-400 border border-red-900'
                        }`}>
                          {client.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(client._id);
                          }}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Client Form */}
            <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role / Company
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client Image
                  </label>
                  <div className="space-y-4">
                    {formData.image.url && (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src={formData.image.url}
                          alt="Client preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
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
                    Testimonial
                  </label>
                  <textarea
                    value={formData.testimonial}
                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.project.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      project: { ...formData.project, title: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                    placeholder="e.g., Cloud Management Dashboard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={formData.project.link}
                    onChange={(e) => setFormData({
                      ...formData,
                      project: { ...formData.project, link: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                    placeholder="e.g., https://cloudtech.in"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Description
                  </label>
                  <textarea
                    value={formData.project.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      project: { ...formData.project, description: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500 resize-none"
                    required
                    placeholder="e.g., Enterprise cloud resource management and monitoring system."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                    placeholder="e.g., Mumbai, India"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        className="focus:outline-none"
                      >
                        <FaStar
                          className={`w-6 h-6 ${
                            rating <= formData.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
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

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClient(null);
                      setIsEditing(false);
                      setFormData({
                        name: '',
                        role: '',
                        image: {
                          url: '',
                          publicId: ''
                        },
                        testimonial: '',
                        project: {
                          title: '',
                          link: '',
                          description: ''
                        },
                        rating: 5,
                        location: '',
                        order: clients.length,
                        isActive: true
                      });
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
                    {loading ? 'Saving...' : (isEditing ? 'Update Testimonial' : 'Add Testimonial')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 