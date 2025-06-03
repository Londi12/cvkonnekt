import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {user?.email}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Recent Resumes</h3>
              <p className="text-gray-600">You haven't created any resumes yet.</p>
              <Link to="/templates" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                Create your first resume →
              </Link>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/templates" className="block text-green-600 hover:text-green-800">
                  Create New Resume
                </Link>
                <Link to="/profile" className="block text-green-600 hover:text-green-800">
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}