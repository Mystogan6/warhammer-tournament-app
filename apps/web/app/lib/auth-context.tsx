'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from './types';
import { userApi } from './api/users';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token refresh interval (5 minutes)
const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  // Function to refresh the token
  const refreshToken = async () => {
    try {
      const result = await userApi.refreshToken();
      if (!result.success) {
        // If refresh fails, clear the session
        setUser(null);
        userApi.removeToken();
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setUser(null);
      userApi.removeToken();
    }
  };

  // Function to check auth status and get current user
  const checkAuth = async () => {
    try {
      const token = userApi.getToken();
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const result = await userApi.getCurrentUser();
      if (result.success && result.data) {
        setUser(result.data);
        // Start token refresh interval
        const interval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
        setRefreshInterval(interval);
      } else {
        setUser(null);
        userApi.removeToken();
      }
    } catch (error) {
      console.error('Failed to check auth status:', error);
      setUser(null);
      userApi.removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Cleanup function to clear the refresh interval
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 