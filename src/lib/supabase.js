import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dbhkdtavxurjiatnymij.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiaGtkdGF2eHVyamlhdG55bWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0Njk3NTQsImV4cCI6MjA2NDA0NTc1NH0.7912j_fXraikvJFQTmg47UfOKejEFs3evG44vflvtLU'

export const supabase = createClient(supabaseUrl, supabaseKey)

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