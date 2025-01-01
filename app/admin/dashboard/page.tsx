'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen p-8 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>
        <div className="bg-[#1a1a1a] text-white p-6 rounded-lg shadow-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name}</h2>
          <p className="text-gray-400">This is your admin dashboard where you can manage your content.</p>
          
          {/* Navigation Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleNavigation('/admin/products')}
              className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:bg-[#3a3a3a] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">Manage Products</h3>
              <p className="text-gray-400 text-sm relative z-10">Add, edit, or remove products from your portfolio</p>
            </button>

            <button 
              onClick={() => handleNavigation('/admin/projects')}
              className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:bg-[#3a3a3a] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">Manage Projects</h3>
              <p className="text-gray-400 text-sm relative z-10">Add, edit, or remove projects from your portfolio</p>
            </button>
            
            <button 
              onClick={() => handleNavigation('/admin/services')}
              className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:bg-[#3a3a3a] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">Manage Services</h3>
              <p className="text-gray-400 text-sm relative z-10">Update your service offerings and descriptions</p>
            </button>
            
            <button 
              onClick={() => handleNavigation('/admin/testimonials')}
              className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:bg-[#3a3a3a] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">Testimonials</h3>
              <p className="text-gray-400 text-sm relative z-10">Manage client testimonials and reviews</p>
            </button>

            <button 
              onClick={() => handleNavigation('/admin/marketing')}
              className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:bg-[#3a3a3a] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">Marketing</h3>
              <p className="text-gray-400 text-sm relative z-10">Manage promotional banners and marketing content</p>
            </button>
            
            <button 
              onClick={() => handleNavigation('/admin/newsletter')}
              className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:bg-[#3a3a3a] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">Newsletter</h3>
              <p className="text-gray-400 text-sm relative z-10">Manage newsletter subscribers and settings</p>
            </button>

            <button 
              onClick={() => handleNavigation('/admin/inquiries')}
              className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:bg-[#3a3a3a] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">Client Inquiries</h3>
              <p className="text-gray-400 text-sm relative z-10">Manage and respond to project inquiries</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 