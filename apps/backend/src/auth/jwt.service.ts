import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entities';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  private getAlgorithm() {
    const algorithm = this.configService.get('jwt.algorithm');
    if (!algorithm) throw new Error('JWT algorithm not configured');
    return algorithm;
  }

  generateTokens(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const [accessToken, refreshToken] = [
      this.jwtService.sign(payload, {
        expiresIn: this.configService.get('jwt.accessTokenExpiresIn'),
        secret: this.configService.get('jwt.secret'),
        algorithm: this.getAlgorithm(),
        issuer: this.configService.get('jwt.issuer'),
        audience: this.configService.get('jwt.audience'),
      }),
      this.jwtService.sign(payload, {
        expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
        secret: this.configService.get('jwt.secret'),
        algorithm: this.getAlgorithm(),
        issuer: this.configService.get('jwt.issuer'),
        audience: this.configService.get('jwt.audience'),
      }),
    ];

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('jwt.secret'),
        algorithms: [this.getAlgorithm()],
        issuer: this.configService.get('jwt.issuer'),
        audience: this.configService.get('jwt.audience'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  verifyRefreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('jwt.secret'),
        algorithms: [this.getAlgorithm()],
        issuer: this.configService.get('jwt.issuer'),
        audience: this.configService.get('jwt.audience'),
      });

      // Verify it's a refresh token by checking the expiration time
      const tokenExp = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      const refreshTokenExpiresIn = this.configService.get('jwt.refreshTokenExpiresIn');
      
      // If the token expires in less than the refresh token duration, it's not a refresh token
      if (tokenExp - now < this.parseTimeString(refreshTokenExpiresIn)) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private parseTimeString(timeString: string): number {
    const value = parseInt(timeString);
    const unit = timeString.slice(-1);
    
    switch (unit) {
      case 'd':
        return value * 24 * 60 * 60 * 1000; // days to milliseconds
      case 'h':
        return value * 60 * 60 * 1000; // hours to milliseconds
      case 'm':
        return value * 60 * 1000; // minutes to milliseconds
      case 's':
        return value * 1000; // seconds to milliseconds
      default:
        return value; // assume milliseconds if no unit
    }
  }
} 