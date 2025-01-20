import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Schema()
export class Mission {
  @Prop({ required: true })
  alt: number;

  @Prop({ required: true })
  speed: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Array })
  waypoints: Array<{ alt: number; lat: number; lng: number }>;

  @Prop({ type: String, ref: 'User' })
  created_by: string;
  
  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const MissionSchema = SchemaFactory.createForClass(Mission);