/**
 * Authentication utility functions for cvkonnekt.com
 */

import { supabase } from '../lib/supabase';

/**
 * Get the appropriate redirect URL based on environment
 * @returns {string} The redirect URL
 */
export const getRedirectUrl = () => {
  if (import.meta.env.VITE_REDIRECT_TO) {
    return import.meta.env.VITE_REDIRECT_TO;
  }
  
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  return `${siteUrl}/auth/callback`;
};

/**
 * Handle OAuth sign in with provider
 * @param {string} provider - OAuth provider (e.g., 'google', 'github')
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} The sign in result
 */
export const signInWithOAuth = async (provider, options = {}) => {
  const redirectTo = getRedirectUrl();
  
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      ...options
    }
  });
};

/**
 * Handle email sign up
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Object} userData - Additional user data
 * @returns {Promise<Object>} The sign up result
 */
export const handleSignUp = async (email, password, userData = {}) => {
  const redirectTo = getRedirectUrl();
  
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...userData,
        email_redirect_to: redirectTo
      },
      emailRedirectTo: redirectTo
    }
  });
};

/**
 * Handle password reset
 * @param {string} email - User's email
 * @returns {Promise<Object>} The password reset result
 */
export const handlePasswordReset = async (email) => {
  const redirectTo = `${window.location.origin}/reset-password`;
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo
  });
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} True if user is authenticated
 */
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session?.user;
};

/**
 * Get the current user
 * @returns {Promise<Object|null>} The current user or null if not authenticated
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * Sign out the current user
 * @returns {Promise<Object>} The sign out result
 */
export const signOut = async () => {
  return await supabase.auth.signOut();
};
