'use client';

import { useCallback } from 'react';
import { useAuth } from '../auth-context';
import { loginUser, logoutUser, User, LoginCredentials } from '../auth';
import { useAppNavigation } from './use-app-navigation';
import { ROUTES } from '../routes';

// Create a custom event for auth errors
const dispatchAuthError = (error: string) => {
  const event = new CustomEvent('auth-error', { detail: error });
  window.dispatchEvent(event);
};

export const useAppAuth = () => {
  const { user, setUser, isLoading } = useAuth();
  const { navigate } = useAppNavigation();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const result = await loginUser(credentials);
      if (result.success && result.data) {
        setUser(result.data);
        navigate(ROUTES.DASHBOARD);
        return { success: true };
      }
      dispatchAuthError(result.error || 'Login failed');
      return { success: false };
    } catch (error) {
      dispatchAuthError('An unexpected error occurred');
      return { success: false };
    }
  }, [setUser, navigate]);

  const logout = useCallback(async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
        setUser(null);
        navigate(ROUTES.LOGIN);
        return { success: true };
      }
      dispatchAuthError(result.error || 'Logout failed');
      return { success: false };
    } catch (error) {
      dispatchAuthError('An unexpected error occurred');
      return { success: false };
    }
  }, [setUser, navigate]);

  const isAuthenticated = Boolean(user);

  return {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated,
  };
}; 