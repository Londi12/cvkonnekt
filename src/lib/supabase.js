import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const getSupabase = () => {
  const isTest = process.env.MODE === 'test';
  if (isTest) {
    return getMockSupabaseClient();
  }
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Mock users database
const mockUsers = {
  'test@example.com': {
    id: 'test-user-1',
    email: 'test@example.com',
    password: 'test123',
    created_at: new Date().toISOString()
  },
  'admin@example.com': {
    id: 'test-user-2',
    email: 'admin@example.com',
    password: 'admin123',
    created_at: new Date().toISOString()
  }
};

// Mock resume data storage
const mockResumes = new Map();

export function getMockSupabaseClient() {
  return {
    auth: {
      getUser: async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return { data: { user: null }, error: null };
        const user = JSON.parse(userStr);
        return { data: { user }, error: null };
      },
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async ({ email, password }) => {
        if (mockUsers[email]) {
          return { 
            data: { user: null }, 
            error: { message: 'User already exists' } 
          };
        }
        const newUser = {
          id: `user-${Date.now()}`,
          email,
          created_at: new Date().toISOString()
        };
        mockUsers[email] = { ...newUser, password };
        return { data: { user: newUser }, error: null };
      },
      signInWithPassword: async ({ email, password }) => {
        const user = mockUsers[email];
        if (!user || user.password !== password) {
          return { 
            data: { user: null }, 
            error: { message: 'Invalid login credentials' } 
          };
        }
        const { password: _, ...userWithoutPassword } = user;
        return { data: { user: userWithoutPassword }, error: null };
      },
      signOut: async () => {
        localStorage.removeItem('user');
        return { error: null };
      },
      getSession: async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return { data: { session: null }, error: null };
        const user = JSON.parse(userStr);
        return { 
          data: { 
            session: { 
              user,
              access_token: 'mock-token',
              refresh_token: 'mock-refresh-token'
            } 
          }, 
          error: null 
        };
      }
    },
    from: (table) => ({
      select: () => ({
        eq: (field, value) => {
          if (table === 'resumes') {
            const resumes = Array.from(mockResumes.values())
              .filter(resume => resume[field] === value);
            return { data: resumes, error: null };
          }
          return { data: [], error: null };
        }
      }),
      insert: (data) => {
        if (table === 'resumes') {
          const id = `resume-${Date.now()}`;
          const resume = { ...data, id };
          mockResumes.set(id, resume);
          return { data: [resume], error: null };
        }
        return { data: [], error: null };
      },
      update: (data) => ({
        eq: (field, value) => {
          if (table === 'resumes') {
            const resume = mockResumes.get(value);
            if (resume) {
              const updatedResume = { ...resume, ...data };
              mockResumes.set(value, updatedResume);
              return { data: [updatedResume], error: null };
            }
          }
          return { data: [], error: null };
        }
      }),
      delete: () => ({
        eq: (field, value) => {
          if (table === 'resumes') {
            mockResumes.delete(value);
          }
          return { data: null, error: null };
        }
      })
    }),
    storage: {
      from: () => ({
        upload: async (path, file) => {
          // Mock file upload - store in localStorage
          const reader = new FileReader();
          return new Promise((resolve) => {
            reader.onload = () => {
              localStorage.setItem(`file_${path}`, reader.result);
              resolve({ data: { path }, error: null });
            };
            reader.readAsDataURL(file);
          });
        },
        getPublicUrl: (path) => {
          // Return a mock URL for the file
          const fileData = localStorage.getItem(`file_${path}`);
          return { 
            data: { 
              publicUrl: fileData || `mock://storage/${path}` 
            } 
          };
        },
        remove: async (paths) => {
          // Remove files from localStorage
          paths.forEach(path => localStorage.removeItem(`file_${path}`));
          return { error: null };
        }
      })
    }
  };
}

// Resume data helper functions
export const saveResume = async (resume) => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('resumes')
    .insert(resume)
    .select(); // Add select() to return the inserted data
  if (error) throw error;
  return data?.[0] || null;
};

export const getResumes = async () => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('resumes')
    .select();
  if (error) throw error;
  return data;
};

export const updateResume = async (id, resume) => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('resumes')
    .update(resume)
    .eq('id', id)
    .select(); // Add select() to return the updated data
  if (error) throw error;
  return data?.[0] || null;
};

export const deleteResume = async (id) => {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Storage helper functions
export const uploadResumeFile = async (file, userId) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  const supabase = getSupabase();
  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file);
  return { data, error };
};

export const getResumeFileUrl = async (path) => {
  const supabase = getSupabase();
  const { data } = await supabase.storage
    .from('resumes')
    .getPublicUrl(path);
  return data.publicUrl;
};

export const deleteResumeFile = async (path) => {
  const supabase = getSupabase();
  const { error } = await supabase.storage
    .from('resumes')
    .remove([path]);
  return { error };
};

// New functions for authentication
export const signUp = async (email, password) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const signIn = async (email, password) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const supabase = getSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}; 