'use client';

import { JWT_TOKEN_KEY } from '@/lib/constants';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const { manager, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      // Call the logout API route to clear httpOnly cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      clearAuth();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, redirect to login
      router.push('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-lg font-semibold text-gray-900 dark:text-white">HR Dashboard</div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 dark:text-gray-300">Welcome, Manager</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
