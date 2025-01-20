import { Injectable, NotFoundException } from '@nestjs/common';
import { FlightLog } from './schemas/flight-log.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FlightLogsService {
  constructor(
    @InjectModel(FlightLog.name) private flightLogModel: Model<FlightLog>,
  ) {}

  async create(flightLog: FlightLog): Promise<FlightLog> {
    const newFlightLog = new this.flightLogModel(flightLog);
    return await newFlightLog.save();
  }

  async findAll(): Promise<FlightLog[]> {
    return await this.flightLogModel
      .find()
      .populate('drone_id')
      .populate('mission_name')
      .exec();
  }

  // async findByFlightId(flightId: string): Promise<FlightLog> {
  //   return await this.flightLogModel.findOne({flight_id: flightId}).populate('drone_id').populate('mission_name').exec();
  // }

  async findByFlightId(flightId: string) {
    const flightLog = await this.flightLogModel
      .findOne({ flight_id: flightId })
      .populate({
        path: 'drone_id',
        populate: { path: 'drone_details' }
      })
      .populate('mission_name')
      .exec();
    if (!flightLog) {
      throw new NotFoundException('Flight log not found');
    }
    return flightLog;
  }
}
