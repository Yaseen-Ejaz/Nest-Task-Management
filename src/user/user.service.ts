import { Injectable } from '@nestjs/common';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {} //private userRepository: UserRepository) {}

  getUserProfile(id: string): Promise<User> {
    return this.userRepository.getUserProfile(id);
  }
}
