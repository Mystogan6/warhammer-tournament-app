import { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
} 