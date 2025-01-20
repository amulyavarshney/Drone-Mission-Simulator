import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DronesModule } from './drones/drones.module';
import { MissionsModule } from './missions/missions.module';
import { FlightLogsModule } from './flight-logs/flight-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    DronesModule,
    MissionsModule,
    FlightLogsModule,
  ],
})
export class AppModule {}
