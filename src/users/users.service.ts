import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(username: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    return await newUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async updatePassword(username: string, newPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await this.userModel.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      { new: true }
    ).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
