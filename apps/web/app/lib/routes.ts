interface RouteConfig {
  path: string;
  title: string;
  description: string;
  requireAuth: boolean;
  isAuthPage?: boolean;
}

interface Routes {
  readonly HOME: '/';
  readonly AUTH: '/auth';
  readonly LOGIN: '/auth/login';
  readonly SIGNUP: '/auth/signup';
  readonly DASHBOARD: '/dashboard';
  readonly ABOUT: '/about';
}

export const ROUTES: Routes = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  DASHBOARD: '/dashboard',
  ABOUT: '/about',
};

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

// Route configuration with metadata and auth requirements
export const ROUTE_CONFIG: Record<AppRoute, RouteConfig> = {
  [ROUTES.HOME]: {
    path: ROUTES.HOME,
    title: 'Warhammer App',
    description: 'Your ultimate companion for managing Warhammer armies and battles',
    requireAuth: false,
  },
  [ROUTES.AUTH]: {
    path: ROUTES.AUTH,
    title: 'Authentication - Warhammer App',
    description: 'Sign in or create an account',
    requireAuth: false,
    isAuthPage: true,
  },
  [ROUTES.LOGIN]: {
    path: ROUTES.LOGIN,
    title: 'Login - Warhammer App',
    description: 'Sign in to your Warhammer App account',
    requireAuth: false,
    isAuthPage: true,
  },
  [ROUTES.SIGNUP]: {
    path: ROUTES.SIGNUP,
    title: 'Sign Up - Warhammer App',
    description: 'Create your Warhammer App account',
    requireAuth: false,
    isAuthPage: true,
  },
  [ROUTES.DASHBOARD]: {
    path: ROUTES.DASHBOARD,
    title: 'Dashboard - Warhammer App',
    description: 'Manage your Warhammer collection and battles',
    requireAuth: true,
  },
  [ROUTES.ABOUT]: {
    path: ROUTES.ABOUT,
    title: 'About - Warhammer App',
    description: 'Learn more about Warhammer App',
    requireAuth: false,
  },
};

// Helper functions for route handling
export const isAuthRoute = (path: string): boolean => {
  const route = Object.values(ROUTE_CONFIG).find(route => route.path === path);
  return route?.isAuthPage ?? false;
};

export const requiresAuth = (path: string): boolean => {
  const route = Object.values(ROUTE_CONFIG).find(route => route.path === path);
  return route?.requireAuth ?? false;
};

export const getRouteMetadata = (path: string) => {
  const route = Object.values(ROUTE_CONFIG).find(route => route.path === path);
  if (!route) return null;

  return {
    title: route.title,
    description: route.description,
  };
}; 