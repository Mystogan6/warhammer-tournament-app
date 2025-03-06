import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    const algorithm = configService.get('jwt.algorithm');
    const secret = configService.get('jwt.secret');
    
    if (!algorithm) throw new Error('JWT algorithm not configured');
    if (!secret) throw new Error('JWT secret not configured');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      algorithms: [algorithm as 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512' | 'PS256' | 'PS384' | 'PS512'],
    });
  }

  async validate(payload: any) {
    try {
      // Verify the token using our JwtService
      const verifiedPayload = this.jwtService.verifyToken(payload);
      
      // Return the user data
      return {
        id: verifiedPayload.sub,
        username: verifiedPayload.username,
        email: verifiedPayload.email,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
} 