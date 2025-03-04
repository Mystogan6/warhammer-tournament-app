export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  data?: User;
  error?: string;
}

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com'
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@example.com'
  }
];

// Storage key
const AUTH_STORAGE_KEY = 'warhammer_auth_session';

// Session storage functions
const setSessionData = (data: AuthResponse) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  }
};

const getSessionData = (): AuthResponse | null => {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

const clearSessionData = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation
  if (!credentials.username || !credentials.password) {
    return { success: false, error: 'Username and password are required' };
  }

  // Find user
  const user = MOCK_USERS.find(u => u.username === credentials.username);
  if (!user) {
    return { success: false, error: 'Invalid credentials' };
  }

  // In a real app, you would:
  // 1. Hash the password
  // 2. Compare with stored hash
  // 3. Create a session
  // 4. Set session cookie

  return { success: true, data: user };
};

export const logoutUser = async (): Promise<AuthResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would:
  // 1. Clear the session
  // 2. Remove session cookie
  // 3. Invalidate token

  return { success: true };
};

export const checkAuthStatus = async (): Promise<{ isAuthenticated: boolean; user?: User }> => {
  // In a real app, you would:
  // 1. Check session cookie
  // 2. Validate token
  // 3. Get user data

  const sessionData = sessionStorage.getItem('auth_session');
  if (!sessionData) {
    return { isAuthenticated: false };
  }

  try {
    const user = JSON.parse(sessionData);
    return { isAuthenticated: true, user };
  } catch {
    return { isAuthenticated: false };
  }
}; 