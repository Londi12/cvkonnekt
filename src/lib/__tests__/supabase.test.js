// Mock environment variables before imports
process.env.VITE_SUPABASE_URL = 'test-url';
process.env.VITE_SUPABASE_ANON_KEY = 'test-key';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      getUser: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
      data: [],
    })),
  })),
}));

// Import after mocking
import { supabase, signUp, signIn, signOut, getCurrentUser, saveResume, getResumes, updateResume, deleteResume } from '../supabase';

describe('Supabase Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create Supabase client with environment variables', () => {
    expect(supabase).toBeDefined();
  });

  test('signUp should call Supabase auth.signUp', async () => {
    const mockUser = { email: 'test@example.com', password: 'password123' };
    await signUp(mockUser.email, mockUser.password);
    expect(supabase.auth.signUp).toHaveBeenCalledWith(mockUser);
  });

  test('signIn should call Supabase auth.signInWithPassword', async () => {
    const mockCredentials = { email: 'test@example.com', password: 'password123' };
    await signIn(mockCredentials.email, mockCredentials.password);
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith(mockCredentials);
  });

  test('signOut should call Supabase auth.signOut', async () => {
    await signOut();
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  test('getCurrentUser should call Supabase auth.getUser', async () => {
    await getCurrentUser();
    expect(supabase.auth.getUser).toHaveBeenCalled();
  });

  test('saveResume should call Supabase from().insert', async () => {
    const mockResume = { title: 'Test Resume', content: {} };
    await saveResume(mockResume);
    expect(supabase.from).toHaveBeenCalledWith('resumes');
    expect(supabase.from().insert).toHaveBeenCalledWith(mockResume);
  });

  test('getResumes should call Supabase from().select', async () => {
    await getResumes();
    expect(supabase.from).toHaveBeenCalledWith('resumes');
    expect(supabase.from().select).toHaveBeenCalled();
  });

  test('updateResume should call Supabase from().update', async () => {
    const mockResume = { id: 1, title: 'Updated Resume', content: {} };
    await updateResume(mockResume.id, mockResume);
    expect(supabase.from).toHaveBeenCalledWith('resumes');
    expect(supabase.from().update).toHaveBeenCalledWith(mockResume);
    expect(supabase.from().eq).toHaveBeenCalledWith('id', mockResume.id);
  });

  test('deleteResume should call Supabase from().delete', async () => {
    const resumeId = 1;
    await deleteResume(resumeId);
    expect(supabase.from).toHaveBeenCalledWith('resumes');
    expect(supabase.from().delete).toHaveBeenCalled();
    expect(supabase.from().eq).toHaveBeenCalledWith('id', resumeId);
  });
}); 