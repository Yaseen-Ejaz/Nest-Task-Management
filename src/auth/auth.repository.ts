import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async register(registerUserDto: RegisterUserDto): Promise<void> {
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
    });

    try {
      await this.save(profile);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async Login(loginUserDto: RegisterUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.findOne({
      where: { email: email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username: user.username };
      const accessToken = await this.jwtservice.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check credentials');
    }
  }
}
