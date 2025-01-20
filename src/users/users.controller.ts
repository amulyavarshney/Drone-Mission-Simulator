import { Controller, Get, Put, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: { username: string; password: string }): Promise<User> {
    return this.usersService.create(user.username, user.password);
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put('update-password')
  async updatePassword(@Body() user: { username: string; password: string }): Promise<User> {
    return this.usersService.updatePassword(user.username, user.password);
  }
}
