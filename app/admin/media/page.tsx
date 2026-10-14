'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Note {
  content: string;
  createdAt: string;
}

interface MediaInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  editType?: string;
  editTypeLabel?: string;
  videoCount?: number;
  packPrice?: number;
  languageAddon?: boolean;
  languageCount?: number;
  languageAddonUnit?: number;
  languages?: string;
  estimatedTotal?: number;
  budget?: string;
  timeline?: string;
  description: string;
  requirements?: string;
  source?: string;
  status: 'new' | 'in_progress' | 'quoted' | 'won' | 'lost';
  notes?: Note[];
  createdAt: string;
  lastUpdated?: string;
}

const formatInr = (amount?: number) => {
  if (!amount || !Number.isFinite(amount)) return '—';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export default function MediaInquiriesManagement() {
  const { status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState<MediaInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<MediaInquiry | null>(null);
  const [newNote, setNewNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const fetchInquiries = useCallback(
    async (
      search: string = searchTerm,
      sort: string = sortBy,
      order: string = sortOrder,
      filterStatus: string = statusFilter
    ) => {
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (sort) params.append('sortBy', sort);
        if (order) params.append('sortOrder', order);
        if (filterStatus) params.append('status', filterStatus);

        const response = await fetch(`/api/media?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setInquiries(data.data);
          setSelected((prev) => {
            if (!prev) return null;
            return data.data.find((item: MediaInquiry) => item._id === prev._id) || null;
          });
        } else {
          setError('Failed to fetch media inquiries');
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while fetching media inquiries'
        );
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, sortBy, sortOrder, statusFilter]
  );

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInquiries();
    }
  }, [status, fetchInquiries]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    const timer = setTimeout(() => {
      fetchInquiries(searchTerm, sortBy, sortOrder, statusFilter);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, status, fetchInquiries, sortBy, sortOrder, statusFilter]);

  const handleStatusChange = async (contactId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/media/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          contactId,
          data: { status: newStatus },
        }),
      });

      if (response.ok) {
        fetchInquiries();
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleAddNote = async (contactId: string) => {
    if (!newNote.trim()) return;

    try {
      const response = await fetch('/api/media/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_note',
          contactId,
          data: { note: newNote },
        }),
      });

      if (response.ok) {
        setNewNote('');
        fetchInquiries();
      } else {
        setError('Failed to add note');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!window.confirm('Delete this media inquiry?')) return;

    try {
      const response = await fetch('/api/media/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          contactId,
        }),
      });

      if (response.ok) {
        setSelected(null);
        fetchInquiries();
      } else {
        setError('Failed to delete inquiry');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete inquiry');
    }
  };

  const getStatusColor = (value: string) => {
    switch (value) {
      case 'new':
        return 'bg-blue-900/30 text-blue-400 border-blue-900';
      case 'in_progress':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-900';
      case 'quoted':
        return 'bg-purple-900/30 text-purple-300 border-purple-900';
      case 'won':
        return 'bg-green-900/30 text-green-400 border-green-900';
      case 'lost':
        return 'bg-red-900/30 text-red-400 border-red-900';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-900';
    }
  };

  const handleSort = (field: string) => {
    const newOrder = field === sortBy && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(field);
    setSortOrder(newOrder);
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
          <div>
            <h1 className="text-3xl font-bold text-white">Media Inquiries</h1>
            <p className="text-sm text-gray-400 mt-1">
              Quotes from media.digicraft.one
            </p>
          </div>
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
            <button
              type="button"
              className="ml-3 underline"
              onClick={() => setError('')}
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="mb-6 space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search media inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-amber-400"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="quoted">Quoted</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'createdAt'
                        ? 'bg-amber-500 text-black'
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                    }`}
                  >
                    Date {sortBy === 'createdAt' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => handleSort('status')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'status'
                        ? 'bg-amber-500 text-black'
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                    }`}
                  >
                    Status {sortBy === 'status' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => handleSort('estimatedTotal')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'estimatedTotal'
                        ? 'bg-amber-500 text-black'
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                    }`}
                  >
                    Amount {sortBy === 'estimatedTotal' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white mb-4">
                All Media Quotes ({inquiries.length})
              </h2>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {inquiries.length === 0 && (
                  <p className="text-gray-500 text-sm">No media inquiries yet.</p>
                )}
                {inquiries.map((item) => (
                  <motion.div
                    key={item._id}
                    className={`p-4 bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors ${
                      selected?._id === item._id ? 'ring-2 ring-amber-400' : ''
                    }`}
                    onClick={() => setSelected(item)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.email}</p>
                        {item.phone && (
                          <p className="text-sm text-gray-400">{item.phone}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded border ${getStatusColor(item.status)}`}
                      >
                        {item.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">
                      {item.editTypeLabel || item.editType || 'Custom'} ·{' '}
                      {item.videoCount || 0} video
                      {(item.videoCount || 0) === 1 ? '' : 's'}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatInr(item.estimatedTotal)}</span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {selected ? (
            <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-semibold text-white">Quote Details</h2>
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="px-3 py-1 bg-red-600/30 text-red-200 rounded hover:bg-red-600/50 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={selected.status}
                      onChange={(e) => handleStatusChange(selected._id, e.target.value)}
                      className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="quoted">Quoted</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Edit style
                      </label>
                      <p className="text-white">
                        {selected.editTypeLabel || selected.editType || '—'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Pack
                      </label>
                      <p className="text-white">
                        {selected.videoCount || 0} video
                        {(selected.videoCount || 0) === 1 ? '' : 's'} (
                        {formatInr(selected.packPrice)})
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Estimated total
                      </label>
                      <p className="text-amber-300 font-semibold">
                        {formatInr(selected.estimatedTotal)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Timeline
                      </label>
                      <p className="text-white">{selected.timeline || '—'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Language add-on
                      </label>
                      <p className="text-white">
                        {selected.languageAddon
                          ? `Yes · ${selected.languageCount || 1} × ${formatInr(selected.languageAddonUnit)}`
                          : 'No'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Languages
                      </label>
                      <p className="text-white">{selected.languages || '—'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Source
                      </label>
                      <p className="text-white capitalize">{selected.source || '—'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Company
                      </label>
                      <p className="text-white">{selected.company || '—'}</p>
                    </div>
                    {selected.phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Phone
                        </label>
                        <p className="text-white">{selected.phone}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Submitted
                      </label>
                      <p className="text-white">
                        {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <p className="text-white bg-[#2a2a2a] p-3 rounded whitespace-pre-wrap">
                      {selected.description}
                    </p>
                  </div>

                  {selected.requirements && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Requirements
                      </label>
                      <p className="text-white bg-[#2a2a2a] p-3 rounded whitespace-pre-wrap">
                        {selected.requirements}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Notes
                    </label>
                    <div className="space-y-2 mb-4">
                      {(selected.notes || []).map((note, index) => (
                        <div key={index} className="bg-[#2a2a2a] p-3 rounded">
                          <p className="text-white">{note.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                      {(selected.notes || []).length === 0 && (
                        <p className="text-sm text-gray-500">No notes yet.</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note..."
                        className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={() => handleAddNote(selected._id)}
                        className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400 transition-colors"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 p-6 flex items-center justify-center text-gray-400">
              Select a media inquiry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
