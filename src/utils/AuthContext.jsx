import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase, signUp, signIn, signOut as supabaseSignOut } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setError('Failed to initialize Supabase client');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        // First check localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setLoading(false);
          return;
        }

        // If no saved user, try to get from Supabase
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        
        if (user) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
        // Clear invalid user data
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem('user', JSON.stringify(session.user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setError(null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signUp: async (email, password) => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await signUp(email, password);
        if (error) throw error;
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        return { data, error: null };
      } catch (error) {
        console.error('Error signing up:', error);
        setError(error.message);
        return { data: null, error };
      } finally {
        setLoading(false);
      }
    },
    signIn: async (email, password) => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await signIn(email, password);
        if (error) throw error;
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        return { data, error: null };
      } catch (error) {
        console.error('Error signing in:', error);
        setError(error.message);
        return { data: null, error };
      } finally {
        setLoading(false);
      }
    },
    signOut: async () => {
      try {
        setLoading(true);
        setError(null);
        const { error } = await supabaseSignOut();
        if (error) throw error;
        setUser(null);
        localStorage.removeItem('user');
        return { error: null };
      } catch (error) {
        console.error('Error signing out:', error);
        setError(error.message);
        return { error };
      } finally {
        setLoading(false);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 