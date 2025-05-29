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
  if (typeof import !== 'undefined' && import.meta && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  return '';
};

let supabase;
export function getSupabase() {
  if (!supabase) {
    const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
    const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}

// Auth helper functions
export const signUp = async (email, password) => {
  const { data, error } = await getSupabase().auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await getSupabase().auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await getSupabase().auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await getSupabase().auth.getUser()
  return { user, error }
}

// Resume data helper functions
export const saveResume = async (resumeData) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .insert([resumeData])
  return { data, error }
}

export const getResumes = async (userId) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}

export const updateResume = async (id, resumeData) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .update(resumeData)
    .eq('id', id)
  return { data, error }
}

export const deleteResume = async (id) => {
  const { data, error } = await getSupabase()
    .from('resumes')
    .delete()
    .eq('id', id)
  return { data, error }
}

// Storage helper functions
export const uploadResumeFile = async (file, userId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  const { data, error } = await getSupabase().storage
    .from('resumes')
    .upload(fileName, file)
  return { data, error }
}

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