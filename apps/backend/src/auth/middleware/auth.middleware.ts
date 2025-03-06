import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../jwt.service';
import { AuthenticatedRequest } from '../interfaces/auth.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        throw new UnauthorizedException('No authorization header');
      }

      const [type, token] = authHeader.split(' ');
      
      if (type !== 'Bearer') {
        throw new UnauthorizedException('Invalid authorization type');
      }

      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // Verify the token and get the payload
      const payload = this.jwtService.verifyToken(token);

      // Attach the user to the request
      (req as AuthenticatedRequest).user = {
        id: payload.sub,
        username: payload.username,
        email: payload.email,
      };

      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
} 