import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to update user state
  const updateUser = useCallback((userData) => {
    if (!userData) {
      setUser(null);
      return null;
    }
    
    const userWithAdmin = {
      ...userData,
      isAdmin: checkIsAdmin(userData.email)
    };
    
    setUser(userWithAdmin);
    return userWithAdmin;
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          updateUser(session.user);
        } else {
          updateUser(null);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setError(error.message);
        updateUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        updateUser(session?.user || null);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [updateUser]);

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await handleSignUp(email, password, userData);

      if (error) throw error;
      
      if (data?.user) {
        updateUser(data.user);
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      if (data?.user) {
        updateUser(data.user);
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };
  
  const signInWithProvider = async (provider) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await signInWithOAuth(provider);
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      
      updateUser(null);
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session?.user;
  };

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user || null;
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    updateUser,
    resetPassword: handlePasswordReset,
    isAuthenticated: isAuthenticated,
    getCurrentUser: getCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 