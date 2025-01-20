import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mission, MissionSchema } from './schemas/mission.schema';
import { FlightLogsModule } from '../flight-logs/flight-logs.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mission.name, schema: MissionSchema }]),
    FlightLogsModule,
    UsersModule,
  ],
  providers: [MissionsService],
  controllers: [MissionsController],
})
export class MissionsModule {}
