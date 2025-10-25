'use client';

import { useAuth } from '@/contexts/AuthContext';
import { authSignOut } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const { user, isLoggedIn, refreshAuth } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await authSignOut();
    
    if (result.success) {
      await refreshAuth();
      router.push('/login');
    }
    
    setIsLoggingOut(false);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Reel App
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user?.email || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition disabled:opacity-50"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;