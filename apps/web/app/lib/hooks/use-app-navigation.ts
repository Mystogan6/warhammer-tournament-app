'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES, requiresAuth, AppRoute } from '../routes';
import { useAuth } from '../auth-context';

export const useAppNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const navigate = useCallback((path: AppRoute | string, options?: { replace?: boolean }) => {
    if (requiresAuth(path) && !user) {
      // Store the intended destination for post-login redirect
      sessionStorage.setItem('redirectAfterAuth', path);
      router.push(ROUTES.LOGIN);
      return;
    }
    if (options?.replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  }, [router, user]);

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const redirectAfterAuth = useCallback(() => {
    const redirectPath = sessionStorage.getItem('redirectAfterAuth');
    sessionStorage.removeItem('redirectAfterAuth');
    navigate(redirectPath || ROUTES.DASHBOARD);
  }, [navigate]);

  const isCurrentRoute = useCallback((path: string) => {
    return pathname === path;
  }, [pathname]);

  return {
    navigate,
    navigateBack,
    redirectAfterAuth,
    isCurrentRoute,
    currentPath: pathname,
    isLoading,
  };
}; 