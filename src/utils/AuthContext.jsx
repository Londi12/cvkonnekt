import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase, signUp, signIn, signOut as supabaseSignOut } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
        setError(null);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user || null);
      setError(null);
      setLoading(false);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    signUp: async (email, password) => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await signUp(email, password);
        if (error) throw error;
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