'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentAuthUser, isAuthenticated } from '@/lib/auth';
import { setAuthCookie, clearAuthCookie } from '@/lib/auth-cookies';

interface User {
  userId: string;
  username: string;
  email?: string;
  given_name?: string;
  family_name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = async () => {
    setIsLoading(true);
    try {
      const authenticated = await isAuthenticated();
      
      if (authenticated) {
        const { success, user: currentUser } = await getCurrentAuthUser();
        if (success && currentUser) {
          setUser({
            userId: currentUser.userId,
            username: currentUser.username,
            email: currentUser.signInDetails?.loginId,
            given_name: currentUser.signInDetails?.loginId, // You might want to fetch from user attributes
            family_name: '', // You might want to fetch from user attributes
          });
          setIsLoggedIn(true);
          setAuthCookie(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
          clearAuthCookie();
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
        clearAuthCookie();
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
      setUser(null);
      setIsLoggedIn(false);
      clearAuthCookie();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Add a small delay to ensure Amplify is configured
    const timer = setTimeout(() => {
      refreshAuth();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isLoggedIn,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};