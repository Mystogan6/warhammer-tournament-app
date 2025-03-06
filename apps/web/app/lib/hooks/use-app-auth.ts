'use client';

import { useCallback } from 'react';
import { useAuth } from '../auth-context';
import { userApi } from '../api/users';
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

  const login = useCallback(async (credentials: { username: string; password: string }) => {
    try {
      const result = await userApi.login(credentials);
      if (result.success && result.data) {
        setUser(result.data.user);
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
      const result = await userApi.logout();
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