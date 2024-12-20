'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CATEGORIES, Project } from '@/app/types/project';

const DOMAINS = [
  { id: 'web', title: 'Web Development' },
  { id: 'mobile', title: 'Mobile Development' },
  { id: 'ai', title: 'AI Solutions' }
];

export default function ProjectsManagement() {
  const { data: _session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: {
      url: '',
      publicId: ''
    },
    tech: [''],
    link: '',
    category: '',
    domainId: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (error) {
      setError('An error occurred while fetching projects: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProjects();
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
            publicId: data.publicId
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

  const handleAddTech = () => {
    setFormData({
      ...formData,
      tech: [...formData.tech, '']
    });
  };

  const handleRemoveTech = (index: number) => {
    setFormData({
      ...formData,
      tech: formData.tech.filter((_, i) => i !== index)
    });
  };

  const handleTechChange = (index: number, value: string) => {
    const newTech = [...formData.tech];
    newTech[index] = value;
    setFormData({
      ...formData,
      tech: newTech
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? '/api/projects' : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...formData, id: selectedProject?._id } : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        fetchProjects();
        setIsEditing(false);
        setSelectedProject(null);
        setFormData({
          title: '',
          description: '',
          image: {
            url: '',
            publicId: ''
          },
          tech: [''],
          link: '',
          category: '',
          domainId: '',
          order: projects.length,
          isActive: true
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError(data.error || 'Failed to save project');
      }
    } catch (error) {
      setError('An error occurred while saving the project: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech,
      link: project.link,
      category: project.category,
      domainId: project.domainId,
      order: project.order,
      isActive: project.isActive
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchProjects();
        if (selectedProject?._id === id) {
          setSelectedProject(null);
          setIsEditing(false);
        }
      } else {
        setError(data.error || 'Failed to delete project');
      }
    } catch (error) {
      setError('An error occurred while deleting the project: ' + error);
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
          <h1 className="text-3xl font-bold text-white">Projects Management</h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 text-red-200 rounded border border-red-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects List */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">All Projects</h2>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEditing(false);
                    setFormData({
                      title: '',
                      description: '',
                      image: {
                        url: '',
                        publicId: ''
                      },
                      tech: [''],
                      link: '',
                      category: '',
                      domainId: '',
                      order: projects.length,
                      isActive: true
                    });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Add New Project
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <motion.div
                    key={project._id}
                    className={`p-4 bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors ${
                      selectedProject?._id === project._id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => handleEdit(project)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={project.image.url}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{project.title}</h3>
                          <p className="text-sm text-gray-400">{project.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-sm rounded ${
                          project.isActive 
                            ? 'bg-green-900/30 text-green-400 border border-green-900'
                            : 'bg-red-900/30 text-red-400 border border-red-900'
                        }`}>
                          {project.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(project._id);
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

          {/* Project Form */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                {isEditing ? 'Edit Project' : 'Add New Project'}
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
                    Project Image
                  </label>
                  <div className="space-y-4">
                    {formData.image.url && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image.url}
                          alt="Project preview"
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
                    Technologies
                  </label>
                  {formData.tech.map((tech, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => handleTechChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(index)}
                        className="px-3 py-2 bg-red-600/30 text-red-200 rounded hover:bg-red-600/50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors"
                  >
                    Add Technology
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Link
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Domain
                  </label>
                  <select
                    value={formData.domainId}
                    onChange={(e) => setFormData({ ...formData, domainId: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    required
                  >
                    <option value="">Select a domain</option>
                    {DOMAINS.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.title}
                      </option>
                    ))}
                  </select>
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
                    setSelectedProject(null);
                    setIsEditing(false);
                    setFormData({
                      title: '',
                      description: '',
                      image: {
                        url: '',
                        publicId: ''
                      },
                      tech: [''],
                      link: '',
                      category: '',
                      domainId: '',
                      order: projects.length,
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
                  {loading ? 'Saving...' : (isEditing ? 'Update Project' : 'Add Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 