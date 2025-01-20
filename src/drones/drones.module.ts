import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { Drone, DroneSchema } from './schemas/drone.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drone.name, schema: DroneSchema }]),
    UsersModule,
  ],
  providers: [DronesService],
  controllers: [DronesController],
})
export class DronesModule {}
