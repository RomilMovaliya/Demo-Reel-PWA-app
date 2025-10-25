'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UseAuthRedirectOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

export const useAuthRedirect = ({
  redirectTo = '/login',
  redirectIfAuthenticated = false,
}: UseAuthRedirectOptions = {}) => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (redirectIfAuthenticated && isLoggedIn) {
      router.push('/');
    } else if (!redirectIfAuthenticated && !isLoggedIn) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, isLoading, router, redirectTo, redirectIfAuthenticated]);

  return { isLoggedIn, isLoading };
};