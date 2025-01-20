import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { Mission } from './schemas/mission.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('missions')
@UseGuards(JwtAuthGuard)
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Post()
  async create(@Body() mission: Mission, @GetUser() username: string) {
    return this.missionsService.create(mission, username);
  }

  @Get()
  async findAll() {
    return this.missionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.missionsService.findOne(id);
  }

  @Get('user/:username')
  async getUserMissions(@Param('username') userName: string) {
    return this.missionsService.getUserMissions(userName);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() mission: Mission) {
    return this.missionsService.update(id, mission);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.missionsService.delete(id);
  }

  @Post(':id/start')
  async startMission(@Param('id') missionId: string, @Body('drone_id') droneId: string) {
    return this.missionsService.startMission(missionId, droneId);
  }

  @Post(':id/stop')
  async stopMission() {
    return this.missionsService.stopMission();
  }
}
