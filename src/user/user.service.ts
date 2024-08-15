import { Injectable } from '@nestjs/common';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepsitory: UserRepository) {} //private userRepository: UserRepository) {}

  getUserProfile(getUserProfileDto: GetUserProfileDto): Promise<User> {
    return this.userRepsitory.getUserProfile(getUserProfileDto);
  }
}
