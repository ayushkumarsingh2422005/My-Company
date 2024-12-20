'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Note {
  content: string;
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  serviceType: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements: string;
  status: 'new' | 'in_progress' | 'resolved' | 'cancelled';
  notes: Note[];
  submittedAt: string;
  lastUpdated: string;
}

export default function InquiriesManagement() {
  const { status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newNote, setNewNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [debouncedSearch] = useState(() => {
    const debounce = <T extends (value: string) => void>(fn: T, ms: number) => {
      let timeoutId: NodeJS.Timeout;
      return function (this: unknown, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      };
    };
    return debounce((value: string) => {
      fetchContacts(value, sortBy, sortOrder, statusFilter);
    }, 300);
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const fetchContacts = async (
    search: string = searchTerm,
    sort: string = sortBy,
    order: string = sortOrder,
    status: string = statusFilter
  ) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (sort) params.append('sortBy', sort);
      if (order) params.append('sortOrder', order);
      if (status) params.append('status', status);

      const response = await fetch(`/api/contact?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setContacts(data.data);
      } else {
        setError('Failed to fetch inquiries');
        console.error('Failed to fetch inquiries:', data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching inquiries';
      setError(errorMessage);
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContacts();
    }
  }, [status, fetchContacts]);

  const handleStatusChange = async (contactId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/contact/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          contactId,
          data: { status: newStatus }
        }),
      });

      if (response.ok) {
        fetchContacts();
      } else {
        const errorData = await response.json();
        setError('Failed to update status');
        console.error('Failed to update status:', errorData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating status';
      setError(errorMessage);
      console.error('Error updating status:', err);
    }
  };

  const handleAddNote = async (contactId: string) => {
    if (!newNote.trim()) return;

    try {
      const response = await fetch('/api/contact/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_note',
          contactId,
          data: { note: newNote }
        }),
      });

      if (response.ok) {
        setNewNote('');
        fetchContacts();
      } else {
        const errorData = await response.json();
        setError('Failed to add note');
        console.error('Failed to add note:', errorData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while adding note';
      setError(errorMessage);
      console.error('Error adding note:', err);
    }
  };

  const handleDeleteInquiry = async (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch('/api/contact/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          contactId
        }),
      });

      if (response.ok) {
        setSelectedContact(null);
        fetchContacts();
      } else {
        const errorData = await response.json();
        setError('Failed to delete inquiry');
        console.error('Failed to delete inquiry:', errorData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while deleting inquiry';
      setError(errorMessage);
      console.error('Error deleting inquiry:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-900/30 text-blue-400 border-blue-900';
      case 'in_progress':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-900';
      case 'resolved':
        return 'bg-green-900/30 text-green-400 border-green-900';
      case 'cancelled':
        return 'bg-red-900/30 text-red-400 border-red-900';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-900';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSort = (field: string) => {
    const newOrder = field === sortBy && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(field);
    setSortOrder(newOrder);
    fetchContacts(searchTerm, field, newOrder, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    fetchContacts(searchTerm, sortBy, sortOrder, status);
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
          <h1 className="text-3xl font-bold text-white">Inquiries Management</h1>
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
          {/* Inquiries List */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="mb-6 space-y-4">
                {/* Search and Filters */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSort('submittedAt')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'submittedAt'
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                    }`}
                  >
                    Date {sortBy === 'submittedAt' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => handleSort('status')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'status'
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                    }`}
                  >
                    Status {sortBy === 'status' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white mb-4">
                All Inquiries ({contacts.length})
              </h2>
              
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact._id}
                    className={`p-4 bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors ${
                      selectedContact?._id === contact._id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedContact(contact)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{contact.name}</h3>
                        <p className="text-sm text-gray-400">{contact.email}</p>
                        {contact.phone && (
                          <p className="text-sm text-gray-400">{contact.phone}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 text-sm rounded border ${getStatusColor(contact.status)}`}>
                        {contact.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {contact.serviceType} - {contact.projectType}
                    </p>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(contact.submittedAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail View */}
          {selectedContact ? (
            <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-semibold text-white">Inquiry Details</h2>
                  <button
                    onClick={() => handleDeleteInquiry(selectedContact._id)}
                    className="px-3 py-1 bg-red-600/30 text-red-200 rounded hover:bg-red-600/50 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                      className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="new" className="bg-[#1a1a1a]">New</option>
                      <option value="in_progress" className="bg-[#1a1a1a]">In Progress</option>
                      <option value="resolved" className="bg-[#1a1a1a]">Resolved</option>
                      <option value="cancelled" className="bg-[#1a1a1a]">Cancelled</option>
                    </select>
                  </div>

                  {/* Contact Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Service</label>
                      <p className="text-white">{selectedContact.serviceType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Project Type</label>
                      <p className="text-white">{selectedContact.projectType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Budget</label>
                      <p className="text-white">{selectedContact.budget}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Timeline</label>
                      <p className="text-white">{selectedContact.timeline}</p>
                    </div>
                    {selectedContact.phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                        <p className="text-white">{selectedContact.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <p className="text-white bg-[#2a2a2a] p-3 rounded">{selectedContact.description}</p>
                  </div>

                  {/* Requirements */}
                  {selectedContact.requirements && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Requirements</label>
                      <p className="text-white bg-[#2a2a2a] p-3 rounded">{selectedContact.requirements}</p>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                    <div className="space-y-2 mb-4">
                      {selectedContact.notes.map((note, index) => (
                        <div key={index} className="bg-[#2a2a2a] p-3 rounded">
                          <p className="text-white">{note.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note..."
                        className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => handleAddNote(selectedContact._id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
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
              Select an inquiry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 