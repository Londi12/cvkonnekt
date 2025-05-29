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

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Resume data helper functions
export const saveResume = async (resumeData) => {
  const { data, error } = await supabase
    .from('resumes')
    .insert([resumeData])
  return { data, error }
}

export const getResumes = async (userId) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}

export const updateResume = async (id, resumeData) => {
  const { data, error } = await supabase
    .from('resumes')
    .update(resumeData)
    .eq('id', id)
  return { data, error }
}

export const deleteResume = async (id) => {
  const { data, error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id)
  return { data, error }
}

// Storage helper functions
export const uploadResumeFile = async (file, userId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file)
  return { data, error }
}

export const getResumeFileUrl = async (path) => {
  const { data } = await supabase.storage
    .from('resumes')
    .getPublicUrl(path)
  return data.publicUrl
}

export const deleteResumeFile = async (path) => {
  const { error } = await supabase.storage
    .from('resumes')
    .remove([path])
  return { error }
} 