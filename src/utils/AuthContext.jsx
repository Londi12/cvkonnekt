import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMockSupabaseClient } from '../lib/supabase';

// List of admin emails (in a real app, this would be stored in a database)
const ADMIN_EMAILS = [
  'admin@example.com',
  // Add more admin emails as needed
];

const AuthContext = createContext(null);

// Helper function to check if a user is an admin
const checkIsAdmin = (email) => {
  return ADMIN_EMAILS.includes(email?.toLowerCase());
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;
    
    const parsedUser = JSON.parse(savedUser);
    // Ensure the user object has isAdmin property
    return {
      ...parsedUser,
      isAdmin: checkIsAdmin(parsedUser?.email)
    };
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = getMockSupabaseClient();
    
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        
        if (user) {
          const userWithAdmin = {
            ...user,
            isAdmin: checkIsAdmin(user.email)
          };
          setUser(userWithAdmin);
          localStorage.setItem('user', JSON.stringify(userWithAdmin));
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
        const userWithAdmin = {
          ...session.user,
          isAdmin: checkIsAdmin(session.user.email)
        };
        setUser(userWithAdmin);
        localStorage.setItem('user', JSON.stringify(userWithAdmin));
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