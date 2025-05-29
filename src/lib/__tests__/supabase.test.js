// Set environment variables before any imports
process.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key';

// Mock import.meta.env for Vite environment
global.import = {
  meta: {
    env: {
      VITE_SUPABASE_URL: 'https://test.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'test-anon-key'
    }
  }
};

// Mock window.__ENV__ for browser environment
global.window = {
  __ENV__: {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-anon-key'
  }
};

// Import after setting environment variables
import { supabase, signUp, signIn, signOut, getCurrentUser, saveResume, getResumes, updateResume, deleteResume } from '../supabase';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => {
  const mockSupabase = {
    auth: {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      getUser: jest.fn()
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [],
          error: null
        }))
      })),
      insert: jest.fn(() => ({
        data: [],
        error: null
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [],
          error: null
        }))
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [],
          error: null
        }))
      }))
    })),
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(() => ({
          data: { path: 'test-path' },
          error: null
        })),
        download: jest.fn(() => ({
          data: new Blob(['test']),
          error: null
        })),
        remove: jest.fn(() => ({
          data: null,
          error: null
        }))
      }))
    }
  };
  return {
    createClient: jest.fn(() => mockSupabase)
  };
});

describe('Supabase Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create Supabase client with correct configuration', () => {
    expect(supabase).toBeDefined();
  });

  test('should handle sign up', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    supabase.auth.signUp.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

    const result = await signUp('test@example.com', 'password');
    expect(result).toEqual(mockUser);
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });
  });

  test('should handle sign in', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    supabase.auth.signIn.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

    const result = await signIn('test@example.com', 'password');
    expect(result).toEqual(mockUser);
    expect(supabase.auth.signIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });
  });

  test('should handle sign out', async () => {
    supabase.auth.signOut.mockResolvedValueOnce({ error: null });

    await signOut();
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  test('should get current user', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    supabase.auth.getUser.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

    const result = await getCurrentUser();
    expect(result).toEqual(mockUser);
    expect(supabase.auth.getUser).toHaveBeenCalled();
  });

  test('should save resume', async () => {
    const mockResume = { id: '123', title: 'Test Resume' };
    supabase.from.mockReturnValueOnce({
      insert: jest.fn().mockResolvedValueOnce({ data: [mockResume], error: null })
    });

    const result = await saveResume(mockResume);
    expect(result).toEqual(mockResume);
  });

  test('should get resumes', async () => {
    const mockResumes = [{ id: '123', title: 'Test Resume' }];
    supabase.from.mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({
        eq: jest.fn().mockResolvedValueOnce({ data: mockResumes, error: null })
      })
    });

    const result = await getResumes('user123');
    expect(result).toEqual(mockResumes);
  });

  test('should update resume', async () => {
    const mockResume = { id: '123', title: 'Updated Resume' };
    supabase.from.mockReturnValueOnce({
      update: jest.fn().mockReturnValueOnce({
        eq: jest.fn().mockResolvedValueOnce({ data: [mockResume], error: null })
      })
    });

    const result = await updateResume('123', mockResume);
    expect(result).toEqual(mockResume);
  });

  test('should delete resume', async () => {
    supabase.from.mockReturnValueOnce({
      delete: jest.fn().mockReturnValueOnce({
        eq: jest.fn().mockResolvedValueOnce({ data: null, error: null })
      })
    });

    await deleteResume('123');
    expect(supabase.from).toHaveBeenCalledWith('resumes');
  });
}); 