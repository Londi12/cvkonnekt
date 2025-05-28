import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, signUp, signIn, signOut as supabaseSignOut } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUpUser = async (email, password) => {
    try {
      const { data, error } = await signUp(email, password);
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Sign up failed:', error);
      return { success: false, error: error.message };
    }
  };

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      console.error('Sign in failed:', error);
      return { success: false, error: error.message };
    }
  };

  const signOutUser = async () => {
    try {
      const { error } = await supabaseSignOut();
      if (error) throw error;
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Sign out failed:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    signUp: signUpUser,
    signIn: signInUser,
    signOut: signOutUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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