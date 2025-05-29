import { supabase, signUp, signIn, signOut, getCurrentUser, saveResume, getResumes, updateResume, deleteResume } from '../supabase';

// Helper to create a chainable mock
const chainable = (returnValue) => {
  const fn = jest.fn(() => fn);
  Object.assign(fn, returnValue);
  return fn;
};

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => {
  const insert = jest.fn();
  const eq = jest.fn();
  const select = jest.fn(() => ({ eq }));
  const from = jest.fn(() => ({ insert, select, eq }));
  const update = jest.fn(() => ({ eq }));
  const delete = jest.fn(() => ({ eq }));
  const upload = jest.fn();
  const getPublicUrl = jest.fn();
  const remove = jest.fn();
  
  return {
    createClient: jest.fn(() => ({
      auth: {
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
        signOut: jest.fn(),
        getUser: jest.fn()
      },
      from,
      storage: {
        from: jest.fn(() => ({
          upload,
          getPublicUrl,
          remove
        }))
      }
    }))
  };
});

describe('Supabase Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signUp should call supabase.auth.signUp', async () => {
    const mockData = { user: { id: '123' } };
    const mockError = null;
    supabase.auth.signUp.mockResolvedValue({ data: mockData, error: mockError });

    const result = await signUp('test@example.com', 'password123');
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  test('signIn should call supabase.auth.signInWithPassword', async () => {
    const mockData = { user: { id: '123' } };
    const mockError = null;
    supabase.auth.signInWithPassword.mockResolvedValue({ data: mockData, error: mockError });

    const result = await signIn('test@example.com', 'password123');
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  test('saveResume should call supabase.from().insert()', async () => {
    const mockData = { id: '123' };
    const mockError = null;
    supabase.from().insert.mockResolvedValue({ data: mockData, error: mockError });

    const resumeData = { title: 'Test Resume', content: {} };
    const result = await saveResume(resumeData);
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  test('getResumes should call supabase.from().select().eq()', async () => {
    const mockData = [{ id: '123', title: 'Test Resume' }];
    const mockError = null;
    supabase.from().select().eq.mockResolvedValue({ data: mockData, error: mockError });

    const result = await getResumes('user123');
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  test('updateResume should call supabase.from().update().eq()', async () => {
    const mockData = { id: '123', title: 'Updated Resume' };
    const mockError = null;
    supabase.from().update().eq.mockResolvedValue({ data: mockData, error: mockError });

    const result = await updateResume('123', { title: 'Updated Resume' });
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  test('deleteResume should call supabase.from().delete().eq()', async () => {
    const mockData = { id: '123' };
    const mockError = null;
    supabase.from().delete().eq.mockResolvedValue({ data: mockData, error: mockError });

    const result = await deleteResume('123');
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });
}); 