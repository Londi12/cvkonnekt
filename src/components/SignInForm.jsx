import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // First, sign in the user
      const { data: { user: signedInUser }, error: signInError } = await signIn(email, password);
      
      if (signInError) {
        throw signInError;
      }
      
      // Check if user is admin
      if (!signedInUser?.isAdmin) {
        // Sign out non-admin users
        await signOut();
        throw new Error('Access denied. Please contact an administrator for access.');
      }
      
      // Redirect to dashboard on successful admin login
      navigate('/dashboard');
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
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
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm; 