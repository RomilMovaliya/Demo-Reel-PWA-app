'use client';

// Helper functions to manage auth state in cookies for middleware
export const AUTH_COOKIE_NAME = 'auth-status';

export const setAuthCookie = (isAuthenticated: boolean) => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
  
  document.cookie = `${AUTH_COOKIE_NAME}=${isAuthenticated ? 'true' : 'false'}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

export const clearAuthCookie = () => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};