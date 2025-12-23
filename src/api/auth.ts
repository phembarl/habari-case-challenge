import { ApiClient } from './client';
import { type LoginRequest, type LoginResponse } from '../models';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return ApiClient.post<LoginResponse>('/auth/login', credentials, false);
  },

  logout: async (): Promise<void> => {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  getCurrentUser: async () => {
    return ApiClient.get('/auth/me');
  },

  refreshToken: async () => {
    return ApiClient.post('/auth/refresh');
  },
};
