export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
  expiresAt?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
} 