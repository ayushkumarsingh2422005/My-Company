'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Subscriber {
  _id: string;
  email: string;
  subscribed: boolean;
  subscribedAt: string;
  unsubscribeToken: string;
}

interface AddResult {
  email: string;
  status: 'created' | 'reactivated';
}

export default function NewsletterManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [addResults, setAddResults] = useState<{
    added: AddResult[];
    errors: string[];
  } | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter');
      const data = await response.json();

      if (data.success) {
        setSubscribers(data.data);
      } else {
        setError('Failed to fetch subscribers');
      }
    } catch (error) {
      setError('An error occurred while fetching subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSubscribers();
    }
  }, [status]);

  const copyUnsubscribeLink = (token: string) => {
    const link = `${window.location.origin}/unsubscribe?token=${token}`;
    navigator.clipboard.writeText(link);
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddResults(null);
    try {
      const response = await fetch('/api/newsletter/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', email: newEmail }),
      });

      const data = await response.json();

      if (data.success) {
        setAddResults(data.data);
        if (data.data.added.length > 0) {
          setNewEmail('');
          fetchSubscribers();
        }
      } else {
        setError(data.error || 'Failed to add subscriber(s)');
      }
    } catch (error) {
      setError('An error occurred while adding subscriber(s)');
    }
  };

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      const response = await fetch('/api/newsletter/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', subscriberId }),
      });

      if (response.ok) {
        fetchSubscribers();
      } else {
        setError('Failed to delete subscriber');
      }
    } catch (error) {
      setError('An error occurred while deleting subscriber');
    }
  };

  const handleToggleSubscription = async (subscriberId: string) => {
    try {
      const response = await fetch('/api/newsletter/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', subscriberId }),
      });

      if (response.ok) {
        fetchSubscribers();
      } else {
        setError('Failed to toggle subscription');
      }
    } catch (error) {
      setError('An error occurred while toggling subscription');
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Newsletter Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              {showAddForm ? 'Cancel' : 'Add Subscriber(s)'}
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 text-red-200 rounded border border-red-800">
            {error}
          </div>
        )}

        {showAddForm && (
          <div className="mb-6 p-6 bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Subscriber(s)</h2>
            <p className="text-gray-400 mb-4">
              Enter one or multiple email addresses separated by commas.
            </p>
            <form onSubmit={handleAddSubscriber} className="space-y-4">
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="email1@example.com, email2@example.com, ..."
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </form>

            {addResults && (
              <div className="mt-4 space-y-4">
                {addResults.added.length > 0 && (
                  <div className="p-4 bg-green-900/30 text-green-400 rounded border border-green-900">
                    <h3 className="font-semibold mb-2">Successfully Added:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {addResults.added.map((result, index) => (
                        <li key={index}>
                          {result.email} - {result.status === 'created' ? 'New Subscription' : 'Reactivated'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {addResults.errors.length > 0 && (
                  <div className="p-4 bg-red-900/30 text-red-400 rounded border border-red-900">
                    <h3 className="font-semibold mb-2">Errors:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {addResults.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-800 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Subscribers ({subscribers.filter(s => s.subscribed).length} active)
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="pb-3 text-gray-400">Email</th>
                    <th className="pb-3 text-gray-400">Status</th>
                    <th className="pb-3 text-gray-400">Subscribed At</th>
                    <th className="pb-3 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber._id} className="border-b border-gray-800">
                      <td className="py-4 text-white">{subscriber.email}</td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            subscriber.subscribed
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-red-900/30 text-red-400'
                          }`}
                        >
                          {subscriber.subscribed ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleSubscription(subscriber._id)}
                            className="px-3 py-1 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors text-sm"
                          >
                            {subscriber.subscribed ? 'Unsubscribe' : 'Resubscribe'}
                          </button>
                          <button
                            onClick={() => copyUnsubscribeLink(subscriber.unsubscribeToken)}
                            className="px-3 py-1 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition-colors text-sm"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => handleDeleteSubscriber(subscriber._id)}
                            className="px-3 py-1 bg-red-600/30 text-red-200 rounded hover:bg-red-600/50 transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 