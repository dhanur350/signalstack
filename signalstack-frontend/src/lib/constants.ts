export const API_PREFIX = '/api/v1';
export const JWT_TOKEN_KEY = 'jwt_token';

export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  employees: '/employees',
  employeeDetail: (id: string) => `/employees/${id}`,
  analytics: '/analytics',
  aiInsights: '/ai-insights',
  settings: '/settings',
};
