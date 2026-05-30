import { create } from 'zustand';
import { Manager } from '@/types/auth.d';

interface AuthState {
  token: string | null;
  manager: Manager | null;
  isAuthenticated: boolean;
  setAuth: (token: string, manager: Manager) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  manager: null,
  isAuthenticated: false,
  setAuth: (token, manager) => set({
    token,
    manager,
    isAuthenticated: true,
  }),
  clearAuth: () => set({
    token: null,
    manager: null,
    isAuthenticated: false,
  }),
}));

export default useAuthStore;
