import { Module, forwardRef } from '@nestjs/common';
import { FlightLogsService } from './flight-logs.service';
import { FlightLogsController } from './flight-logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightLog, FlightLogSchema } from './schemas/flight-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FlightLog.name, schema: FlightLogSchema }]),
  ],
  providers: [FlightLogsService],
  controllers: [FlightLogsController],
  exports: [MongooseModule],
})
export class FlightLogsModule {}
