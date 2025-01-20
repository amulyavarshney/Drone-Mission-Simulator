import { Injectable, NotFoundException } from '@nestjs/common';
import { Mission } from './schemas/mission.schema';
import { FlightLog } from '../flight-logs/schemas/flight-log.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { calculateDistance } from '../utils/calculation';

@Injectable()
export class MissionsService {
  private simulationInterval: NodeJS.Timeout | null = null;

  constructor(
    @InjectModel(Mission.name) private missionModel: Model<Mission>,
    @InjectModel(FlightLog.name) private flightLogModel: Model<FlightLog>,
  ) {}

  async create(mission: Mission, username: string): Promise<Mission> {
    const newMission = new this.missionModel({
      ...mission,
      created_by: username,
    });
    return await newMission.save();
  }
  async findAll(): Promise<Mission[]> {
    return await this.missionModel.find().exec();
  }

  async findOne(id: string): Promise<Mission> {
    return await this.missionModel.findById(id).exec();
  }

  async getUserMissions(userName: string) {
    return await this.missionModel.find({ created_by: userName }).exec();
  }

  async update(id: string, mission: Mission): Promise<Mission> {
    return await this.missionModel
      .findByIdAndUpdate(
        id,
        { ...mission, updated_at: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<Mission> {
    return await this.missionModel.findByIdAndDelete(id).exec();
  }

  async startMission(missionId: string, droneId: string) {
    const mission = await this.findOne(missionId);
    if (!mission) {
      throw new NotFoundException('Mission not found');
    }

    // const flightId = this.generateUniqueFlightId();

    const flightLog = new this.flightLogModel({
      flight_id: this.generateUniqueFlightId(),
      drone_id: droneId,
      mission_name: mission.name,
      waypoints: [],
      speed: mission.speed,
      distance: 0,
      execution_start: new Date(),
      execution_end: null,
      created_at: new Date(),
    });
    flightLog.waypoints.push({
      time: 0,
      lat: mission.waypoints[0].lat,
      lng: mission.waypoints[0].lng,
      alt: mission.waypoints[0].alt,
    });

    await flightLog.save();

    console.log('Starting mission:', flightLog);

    // Start the simulation
    this.simulateMission(mission, flightLog);

    return {
      flight_id: flightLog.flight_id,
    };
  }

  private async simulateMission(
    mission: Mission,
    flightLog: FlightLog,
  ): Promise<FlightLog> {
    const waypoints = mission.waypoints;
    let nextIndex = 1;
    const totalWaypoints = waypoints.length;
    let isProcessingWaypoint = false;

    const startTime = Date.now();

    const updateFlightLog = async (updates) => {
      await this.flightLogModel
        .findByIdAndUpdate(flightLog._id, { $set: updates })
        .exec();
    };

    const moveToNextWaypoint = async (elapsedTime: number) => {
      if (nextIndex >= totalWaypoints || isProcessingWaypoint) return;

      isProcessingWaypoint = true;

      const currentWaypoint = waypoints[nextIndex - 1];
      const nextWaypoint = waypoints[nextIndex];

      if (!nextWaypoint) {
        console.error(`Waypoint at index ${nextIndex} is undefined.`);
        isProcessingWaypoint = false;
        return;
      }

      const distance = calculateDistance(currentWaypoint, nextWaypoint);

      const timeToNextWaypoint = distance / mission.speed;

      await this.delay(timeToNextWaypoint * 1000); // Wait for the drone to reach the next waypoint

      // Move to the next waypoint
      flightLog.waypoints.push({
        time: elapsedTime,
        lat: nextWaypoint.lat,
        lng: nextWaypoint.lng,
        alt: nextWaypoint.alt,
      });
      flightLog.distance += distance;

      await updateFlightLog({
        distance: flightLog.distance,
        waypoints: flightLog.waypoints,
      });

      nextIndex++;
      isProcessingWaypoint = false;
    };

    // Begin simulation loop
    this.simulationInterval = setInterval(async () => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // time in seconds

      if (nextIndex < totalWaypoints) {
        await moveToNextWaypoint(elapsedTime);
      } else {
        // If we've reached the last waypoint
        flightLog.execution_end = new Date();
        await updateFlightLog({ execution_end: flightLog.execution_end });
        this.stopMission(); // Stop the simulation
        console.log('Mission completed:', flightLog);
      }
    }, 1000); // Update every second

    return flightLog;
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async stopMission() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  private generateUniqueFlightId(): Types.ObjectId {
    return new Types.ObjectId();
  }
}
