'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function UnsubscribeContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'initial'>('loading');
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const searchParams = useSearchParams();

  const handleSubscriptionChange = async (action: 'unsubscribe' | 'resubscribe') => {
    const token = searchParams.get('token');
    if (!token) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, action }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setIsSubscribed(action === 'resubscribe');
        setMessage(
          action === 'resubscribe'
            ? 'You have been successfully resubscribed to our newsletter.'
            : 'You have been successfully unsubscribed from our newsletter.'
        );
      } else {
        setStatus('error');
        setMessage(data.error || `Failed to ${action}. Please try again.`);
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later: ' + error);
    }
  };

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid unsubscribe link');
      return;
    }
    setStatus('initial');
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] p-8 rounded-lg shadow-xl border border-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Newsletter Subscription</h1>
        
        {status === 'loading' && (
          <div className="text-center text-gray-300">
            Processing your request...
          </div>
        )}
        
        {status === 'initial' && (
          <div className="space-y-6">
            <p className="text-gray-300 text-center">
              Would you like to unsubscribe from our newsletter?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSubscriptionChange('unsubscribe')}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Unsubscribe
              </button>
              <button
                onClick={() => window.close()}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="space-y-6">
            <div className="text-center text-green-400">
              {message}
            </div>
            {!isSubscribed && (
              <div className="text-center">
                <button
                  onClick={() => handleSubscriptionChange('resubscribe')}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Resubscribe
                </button>
              </div>
            )}
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-center text-red-400">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] p-8 rounded-lg shadow-xl border border-gray-800">
        <div className="text-center text-gray-300">
          Loading...
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UnsubscribeContent />
    </Suspense>
  );
} 