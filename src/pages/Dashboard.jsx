import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <style jsx>{`
          button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.375rem;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s;
          }
          button:focus-visible {
            outline: 2px solid #4f46e5;
            outline-offset: 2px;
          }
          button:disabled {
            opacity: 0.5;
            pointer-events: none;
          }
          button.primary {
            background-color: #4f46e5;
            color: white;
          }
          button.primary:hover {
            background-color: #4338ca;
          }
          button.outline {
            border: 1px solid #e5e7eb;
            background-color: white;
            color: #1f2937;
          }
          button.outline:hover {
            background-color: #f9fafb;
            border-color: #d1d5db;
          }
        `}</style>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Resume</h2>
          <p className="text-gray-600 mb-4">Start building a new resume from scratch</p>
          <button className="primary" onClick={() => navigate('/templates')}>
            Create Resume
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Resumes</h2>
          <p className="text-gray-600 mb-4">View and edit your saved resumes</p>
          <button className="outline" onClick={() => navigate('/builder')}>
            View Resumes
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cover Letters</h2>
          <p className="text-gray-600 mb-4">Create or edit your cover letters</p>
          <button className="outline" onClick={() => navigate('/cover-letters')}>
            View Cover Letters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
