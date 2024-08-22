import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserProfile(id: string): Promise<User> {
    const userInfo = await this.findOne({
      where: { id: id },
    });
    return userInfo;
  }

}
