import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { type LoginRequest, type LoginResponse, type User } from '../models';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data: LoginResponse) => {
      // Store token and user data in localStorage
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('userData', JSON.stringify(data.data.user));

      // Update query cache
      queryClient.setQueryData(['currentUser'], data.data.user);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      // Trigger auth state change event for same-tab updates
      window.dispatchEvent(new Event('authStateChange'));
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Redirect will be handled by the auth context
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: !!localStorage.getItem('authToken'),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAuthCheck = () => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');

  return {
    isAuthenticated: !!(token && userData),
    token,
    user: userData ? (JSON.parse(userData) as User) : null,
  };
};
