import { Controller, Post, Body, UseGuards, Get, Headers, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

interface LoginDto {
  username: string;
  password: string;
}

interface LogoutDto {
  userId: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const user = await this.authService.validateUser(
      credentials.username,
      credentials.password,
    );
    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshToken(@Headers('refresh-token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() body: LogoutDto) {
    return this.authService.logout(body.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
} 