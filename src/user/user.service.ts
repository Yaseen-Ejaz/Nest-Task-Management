import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {} //private userRepository: UserRepository) {}

  getUserProfile(id: string): Promise<User> {
    return this.userRepository.getUserProfile(id);
  }

  decryptToken(extractToken: string): string {
    if (!extractToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(extractToken, {
        secret: 'topSecret51',
      });

      // Assign the payload to the request object
      const { id } = payload;

      return id;
    } catch {
      throw new UnauthorizedException();
    }
  }

  updatetUserProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
    ip: string,
  ): Promise<void> {
    return this.userRepository.updateUserProfile(id, updateProfileDto, ip);
  }
}
