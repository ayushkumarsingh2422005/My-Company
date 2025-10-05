'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fi';
import { IconType } from 'react-icons';
import React from 'react';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
  order: number;
  slug: string;
  isActive: boolean;
}

export default function ServicesManagement() {
  const { status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: [''],
    color: '',
    order: 0,
    isActive: true,
    slug: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();

      if (data.success) {
        setServices(data.data);
      } else {
        setError('Failed to fetch services');
      }
    } catch (error) {
      setError('An error occurred while fetching services: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchServices();
    }
  }, [status]);

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? '/api/services' : '/api/services';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...formData, id: selectedService?._id } : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        fetchServices();
        setIsEditing(false);
        setSelectedService(null);
        setFormData({
          title: '',
          description: '',
          icon: '',
          features: [''],
          color: '',
          order: 0,
          isActive: true,
          slug: ''
        });
      } else {
        setError(data.error || 'Failed to save service');
      }
    } catch (error) {
      setError('An error occurred while saving the service: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features,
      color: service.color,
      order: service.order,
      isActive: service.isActive,
      slug: service.slug
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchServices();
        if (selectedService?._id === id) {
          setSelectedService(null);
          setIsEditing(false);
        }
      } else {
        setError(data.error || 'Failed to delete service');
      }
    } catch (error) {
      setError('An error occurred while deleting the service: ' + error);
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
          <h1 className="text-3xl font-bold text-white">Services Management</h1>
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
          {/* Services List */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">All Services</h2>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setIsEditing(false);
                    setFormData({
                      title: '',
                      description: '',
                      icon: '',
                      features: [''],
                      color: '',
                      order: services.length,
                      isActive: true,
                      slug: ''
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Add New Service
                </button>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <motion.div
                    key={service._id}
                    className={`p-4 bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors ${
                      selectedService?._id === service._id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => handleEdit(service)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl text-purple-500">
                          {Icons[service.icon as keyof typeof Icons] && 
                            React.createElement(Icons[service.icon as keyof typeof Icons] as IconType)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{service.title}</h3>
                          <p className="text-sm text-gray-400">Order: {service.order}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-sm rounded ${
                          service.isActive 
                            ? 'bg-green-900/30 text-green-400 border border-green-900'
                            : 'bg-red-900/30 text-red-400 border border-red-900'
                        }`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(service._id);
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
          </div>

          {/* Service Form */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                {isEditing ? 'Edit Service' : 'Add New Service'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon (from react-icons/fi)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., FiMonitor"
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Features
                  </label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="px-3 py-2 bg-red-600/30 text-red-200 rounded hover:bg-red-600/50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors"
                  >
                    Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color Gradient
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="e.g., from-purple-500 to-pink-500"
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., web-development"
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  />
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
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(null);
                    setIsEditing(false);
                    setFormData({
                      title: '',
                      description: '',
                      icon: '',
                      features: [''],
                      color: '',
                      order: services.length,
                      isActive: true,
                      slug: ''
                    });
                  }}
                  className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (isEditing ? 'Update Service' : 'Add Service')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 