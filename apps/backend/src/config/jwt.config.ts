import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
  accessTokenExpiresIn: '15m', // Short-lived access token
  refreshTokenExpiresIn: '7d', // Longer-lived refresh token
  algorithm: 'HS256', // HMAC with SHA-256
  issuer: 'warhammer-app',
  audience: 'warhammer-app-users',
})); 