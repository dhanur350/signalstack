'use client';

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // Authentication is handled through httpOnly cookies
  // The server will reject requests without valid auth tokens
  // Client-side auth state can be managed through Zustand if needed
  return <>{children}</>;
}
