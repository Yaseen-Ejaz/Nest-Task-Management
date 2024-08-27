import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { ActivityLogService } from '../activitylog/activitylog.service';
import { StoreActivityLogDto } from 'src/activitylog/dto/store-activity-log.dto';
import * as requestIp from 'request-ip';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private activityLogService: ActivityLogService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    return this.authRepository.Register(registerUserDto);
  }

  async Login(
    loginUserDto: LoginUserDto,
    ip: string,
  ): Promise<{ accessToken: string }> {
    const { id, email, password } = loginUserDto;
    const user = await this.authRepository.findOne({
      where: { email: email },
    });
    const activityLogDto = new StoreActivityLogDto();
    activityLogDto.user = user;
    activityLogDto.ipAddress = String(ip);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id, email, password };
      const secret = 'topSecret51'; // Define the secret variable and assign it a value
      const accessToken = this.jwtService.sign(payload, { secret });
      activityLogDto.action = 'Login Successful';
      activityLogDto.timestamp = new Date();
      await this.activityLogService.logActivity(activityLogDto);

      return { accessToken };
    } else {
      activityLogDto.action = 'Login Failed';
      activityLogDto.timestamp = new Date();
      await this.activityLogService.logActivity(activityLogDto);
      throw new UnauthorizedException('Please check credentials');
    }
  }
}
