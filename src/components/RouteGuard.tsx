'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = ['/login', '/signup', '/forgot-password', '/debug'];
const protectedRoutes = ['/reels'];

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to load

    const isPublicRoute = publicRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Redirect authenticated users away from auth pages
    if (isLoggedIn && isPublicRoute) {
      router.replace('/');
      return;
    }

    // Redirect unauthenticated users from protected routes
    if (!isLoggedIn && isProtectedRoute) {
      router.replace('/login');
      return;
    }

    // Handle root route
    if (pathname === '/') {
      if (isLoggedIn) {
        router.replace('/');
      }
      // Allow unauthenticated users to see home page
    }
  }, [isLoggedIn, isLoading, pathname, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;