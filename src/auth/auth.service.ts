import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthRepository } from './auth.repository';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    return this.authRepository.register(registerUserDto);
  }

  async Login(loginUserDto: RegisterUserDto): Promise<{ accessToken: string }> {
    return this.authRepository.Login(loginUserDto);
  }
}
