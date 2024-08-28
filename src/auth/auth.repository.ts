import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/user/user-role.enum';
import { StoreActivityLogDto } from 'src/activitylog/dto/store-activity-log.dto';
@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtservice: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async Register(registerUserDto: RegisterUserDto, ip: string): Promise<void> {
    const { username, email, password, profilePicture } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const today = new Date();

    const profile = this.create({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      createdAt: today,
      updatedAt: today,
      role: UserRole.USER,
    });

    try {
      await this.save(profile);
      const activityLogDto = new StoreActivityLogDto();
      activityLogDto.user = profile;
      activityLogDto.ipAddress = String(ip);
      activityLogDto.action = 'Profile Picture Updated';
      activityLogDto.timestamp = new Date();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
