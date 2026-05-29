export * from './employee.types';
export * from './analytics.types';

export interface UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}
