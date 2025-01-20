import { Injectable } from '@nestjs/common';
import { Drone } from './schemas/drone.schema';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DronesService {
  constructor(
    @InjectModel(Drone.name) private droneModel: Model<Drone>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(drone: Drone, username: string): Promise<Drone> {
    const newDrone = new this.droneModel({ ...drone, created_by: username });
    const result = await newDrone.save();

    await this.userModel.findOneAndUpdate({ username }, {
      $push: { drones: result._id },
    });

    return result;
  }

  async findAll(): Promise<Drone[]> {
    return await this.droneModel.find().exec();
  }

  async findOne(id: string): Promise<Drone> {
    return await this.droneModel.findById(id).exec();
  }

  async getUserDrones(username: string) {
    return await this.droneModel.find({ created_by: username }).exec();
  }

  async update(id: string, drone: Drone): Promise<Drone> {
    return await this.droneModel.findByIdAndUpdate(id, { ...drone, updated_at: new Date() }, { new: true }).exec();
  }

  async delete(id: string): Promise<Drone> {
    return await this.droneModel.findByIdAndDelete(id).exec();
  }
}
