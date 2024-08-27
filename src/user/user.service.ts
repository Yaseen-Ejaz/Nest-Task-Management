import { Injectable } from '@nestjs/common';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {} //private userRepository: UserRepository) {}

  getUserProfile(id: string): Promise<User> {
    return this.userRepository.getUserProfile(id);
  }

  async generateVerificationToken(user: User): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;
    return token;
  }

  updatetUserProfile(id: string, pfp: string): Promise<void> {
    return this.userRepository.updateUserProfile(id,pfp);
  }

}
