import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Drone {
  @Prop({ required: true })
  drone_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  make_name: string;

  @Prop({ required: true })
  drone_type: string;

  @Prop({ type: String, ref: 'User' })
  created_by: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_by?: string;

  @Prop()
  deleted_at?: Date;
}

export const DroneSchema = SchemaFactory.createForClass(Drone);
