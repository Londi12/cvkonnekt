import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMockSupabaseClient } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = getMockSupabaseClient();
    
    const fetchUser = async () => {
      try {
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
        localStorage.removeItem('user');
        setUser(null);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem('user', JSON.stringify(session.user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setError(null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    error,
    isAuthenticated: !!user,
    signUp: async (email, password) => {
      try {
        setError(null);
        const supabase = getMockSupabaseClient();
        const { data, error } = await supabase.auth.signUp({ email, password });
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
      }
    },
    signIn: async (email, password) => {
      try {
        setError(null);
        const supabase = getMockSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
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
      }
    },
    signOut: async () => {
      try {
        setError(null);
        const supabase = getMockSupabaseClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        localStorage.removeItem('user');
        return { error: null };
      } catch (error) {
        console.error('Error signing out:', error);
        setError(error.message);
        return { error };
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