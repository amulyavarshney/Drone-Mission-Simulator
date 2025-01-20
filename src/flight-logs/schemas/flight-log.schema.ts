import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FlightLog extends Document {
  @Prop({ required: true, unique: true })
  flight_id: string;

  @Prop({ required: true })
  drone_id: string;

  @Prop({ required: true })
  mission_name: string;

  @Prop({ type: Array, required: true })
  waypoints: Array<{ time: number; alt: number; lat: number; lng: number }>;

  @Prop({ required: true })
  speed: number;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  execution_start: Date;

  @Prop()
  execution_end: Date;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const FlightLogSchema = SchemaFactory.createForClass(FlightLog);

// FlightLogSchema.pre<FlightLog>('save', function (next) {
//   if (!this.flight_id) {
//     this.flight_id = this._id.toString();
//   }
//   next();
// });