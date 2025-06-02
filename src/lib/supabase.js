import { createClient } from '@supabase/supabase-js'

// Get environment variables in a way that works with both Vite and Jest
const getEnvVar = (key) => {
  // Try process.env first (for Jest)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  // Try window.__ENV__ (for browser)
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__[key]) {
    return window.__ENV__[key];
  }
  
  // Try import.meta.env (for Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  return '';
};

// Validate Supabase configuration
const validateSupabaseConfig = () => {
  const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
  const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Please check your .env file.');
    return false;
  }
  
  if (!supabaseUrl.startsWith('https://')) {
    console.warn('Invalid Supabase URL. Must start with https://');
    return false;
  }
  
  if (!supabaseAnonKey.startsWith('eyJ')) {
    console.warn('Invalid Supabase anon key format');
    return false;
  }
  
  return true;
};

// Test Supabase connection
const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to test Supabase connection:', error);
    return false;
  }
};

let supabase = null;

export function getSupabase() {
  if (!supabase) {
    if (!validateSupabaseConfig()) {
      console.warn('Using mock Supabase client due to invalid configuration');
      return getMockSupabaseClient();
    }
    
    const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
    const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');
    
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: window.localStorage
        },
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      });
      
      // Test the connection
      testSupabaseConnection().catch(error => {
        console.error('Failed to connect to Supabase:', error);
      });
    } catch (error) {
      console.error('Error creating Supabase client:', error);
      return getMockSupabaseClient();
    }
  }
  return supabase;
}

// Mock Supabase client for development/testing
function getMockSupabaseClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signIn: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null })
    },
    from: () => ({
      select: () => ({ eq: () => ({ data: [], error: null }) }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ eq: () => ({ data: [], error: null }) }),
      delete: () => ({ eq: () => ({ data: null, error: null }) })
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: { path: '' }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: async () => ({ error: null })
      })
    }
  };
}

// Auth helper functions
export const signUp = async (email, password) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase client not initialized');
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase client not initialized');
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Resume data helper functions
export const saveResume = async (resumeData) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .insert([resumeData]);
  return { data, error };
};

export const getResumes = async (userId) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const updateResume = async (id, resumeData) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .update(resumeData)
    .eq('id', id);
  return { data, error };
};

export const deleteResume = async (id) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .delete()
    .eq('id', id);
  return { data, error };
};

// Storage helper functions
export const uploadResumeFile = async (file, userId) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  const { data, error } = await getSupabase().storage
    .from('resumes')
    .upload(fileName, file);
  return { data, error };
};

export const getResumeFileUrl = async (path) => {
  const { data } = await getSupabase().storage
    .from('resumes')
    .getPublicUrl(path)
  return data.publicUrl
}

export const deleteResumeFile = async (path) => {
  const { error } = await getSupabase().storage
    .from('resumes')
    .remove([path])
  return { error }
} 