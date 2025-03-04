'use client';

import { useRouter } from 'next/navigation';
import { ROUTES, requiresAuth } from './routes';
import { useAuth } from './auth-context';

export const useAppNavigation = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const navigate = (path: string) => {
    if (requiresAuth(path) && !user) {
      // Redirect to login if trying to access protected route
      router.push(ROUTES.LOGIN);
      return;
    }
    router.push(path);
  };

  const navigateBack = () => {
    router.back();
  };

  const redirectAfterAuth = () => {
    // You can implement more complex redirect logic here
    router.push(ROUTES.DASHBOARD);
  };

  return {
    navigate,
    navigateBack,
    redirectAfterAuth,
    isLoading,
  };
}; 