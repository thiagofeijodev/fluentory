import { renderHook, waitFor } from '@testing-library/react';
import { useQuery } from './useQuery';

jest.mock('./useAuth');
jest.mock('../hooks/useAuth');

const mockUseAuth = require('./useAuth').useAuth;

describe('useQuery Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return initial loading state', () => {
    mockUseAuth.mockReturnValue({ user: { uid: 'user123' } });

    const mockService = jest.fn();
    const { result } = renderHook(() => useQuery(mockService, []));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  test('should return initial data', () => {
    mockUseAuth.mockReturnValue({ user: null });

    const mockService = jest.fn();
    const initialData = [{ id: 1, name: 'Test' }];
    const { result } = renderHook(() => useQuery(mockService, initialData));

    expect(result.current.data).toEqual(initialData);
  });

  test('should not call service when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({ user: null });

    const mockService = jest.fn();
    renderHook(() => useQuery(mockService, []));

    expect(mockService).not.toHaveBeenCalled();
  });

  test('should call service with user uid when user exists', () => {
    mockUseAuth.mockReturnValue({ user: { uid: 'user123' } });

    const mockService = jest.fn((uid, callback) => {
      callback([]);
    });

    renderHook(() => useQuery(mockService, []));

    expect(mockService).toHaveBeenCalledWith('user123', expect.any(Function));
  });

  test('should update data when service returns results', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    mockUseAuth.mockReturnValue({ user: { uid: 'user123' } });

    const mockService = jest.fn((uid, callback) => {
      setTimeout(() => callback(mockData), 0);
    });

    const { result } = renderHook(() => useQuery(mockService, []));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });

  test('should set loading to false after data is received', async () => {
    mockUseAuth.mockReturnValue({ user: { uid: 'user123' } });

    const mockService = jest.fn((uid, callback) => {
      setTimeout(() => callback([{ id: 1 }]), 0);
    });

    const { result } = renderHook(() => useQuery(mockService, []));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  test('should handle service cleanup function', () => {
    const mockUnsubscribe = jest.fn();
    mockUseAuth.mockReturnValue({ user: { uid: 'user123' } });

    const mockService = jest.fn((uid, callback) => {
      callback([]);
      return mockUnsubscribe;
    });

    const { unmount } = renderHook(() => useQuery(mockService, []));

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  test('should handle service with no cleanup function', () => {
    mockUseAuth.mockReturnValue({ user: { uid: 'user123' } });

    const mockService = jest.fn((uid, callback) => {
      callback([]);
    });

    const { unmount } = renderHook(() => useQuery(mockService, []));

    expect(() => unmount()).not.toThrow();
  });
});
