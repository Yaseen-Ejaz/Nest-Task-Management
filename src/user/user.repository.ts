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

  async getUserProfile(getUserProfileDto: GetUserProfileDto): Promise<User> {
    const { email, password } = getUserProfileDto;

    const user = await this.findOne({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
      // const payload: JwtPayload = { username };
      // const accessToken = await this.jwtService.sign(payload);
      // return { accessToken };
    } else {
      throw new UnauthorizedException('Please check credentials');
    }
  }
}
