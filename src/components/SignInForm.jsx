import React, { useState } from 'react';

const SignInForm = ({ onNav }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Add authentication logic here
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // Simulate successful sign-in
    if (onNav) onNav('home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => onNav && onNav('signup')}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm; 