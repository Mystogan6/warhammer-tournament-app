import { User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Token management
const TOKEN_KEY = 'auth_token';

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const userApi = {
  // Token management
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  async create(userData: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to create user',
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  },

  async login(credentials: { username: string; password: string }): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Invalid credentials',
        };
      }

      const data = await response.json();
      // Store the token
      this.setToken(data.token);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to logout',
        };
      }

      // Remove the token
      this.removeToken();
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to refresh token',
        };
      }

      const data = await response.json();
      // Update the token
      this.setToken(data.token);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to get user',
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  },
}; 