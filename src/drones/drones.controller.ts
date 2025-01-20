import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DronesService } from './drones.service';
import { Drone } from './schemas/drone.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('drones')
@UseGuards(JwtAuthGuard) 
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @Post()
  async create(@Body() drone: Drone, @GetUser() username: string) {
    return this.dronesService.create(drone, username);
  }

  @Get()
  async findAll() {
    return this.dronesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dronesService.findOne(id);
  }

  @Get('user/:username')
  async getUserDrones(@Param('username') userName: string) {
    return this.dronesService.getUserDrones(userName);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() drone: Drone) {
    return this.dronesService.update(id, drone);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.dronesService.delete(id);
  }
}
