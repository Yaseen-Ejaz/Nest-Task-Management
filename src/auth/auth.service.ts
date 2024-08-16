import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    return this.authRepository.Register(registerUserDto);
  }

  async Login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { id, email, password } = loginUserDto;
    const user = await this.authRepository.findOne({
      where: { email: email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id, email, password };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check credentials');
    }
  }
}
