import apiClient from './api-client';
import { LoginRequest, LoginResponse, RegisterRequest, Manager } from '@/types/auth.d';

export const AuthService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    // Token is stored in httpOnly cookies automatically by the server
    return response.data;
  },

  async register(managerData: RegisterRequest): Promise<Manager> {
    const response = await apiClient.post<Manager>('/auth/register', managerData);
    return response.data;
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  getToken(): string | null {
    // Token is stored in httpOnly cookies, not accessible from JavaScript
    // This method is kept for compatibility but will return null
    return null;
  },
};
