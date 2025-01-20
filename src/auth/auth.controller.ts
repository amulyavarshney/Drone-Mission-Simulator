import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.usersService.create(body.username, body.password);
  }

  @Post('login')
  async login(@Body() user: { username: string; password: string }) {
    const validatedUser = await this.authService.validateUser(user.username, user.password);
    if (!validatedUser) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(validatedUser);
  }
}