import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Ip,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('profilePicture', { storage: memoryStorage() }),
  )
  async register(
    @Ip() ip: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<void> {
    if (file) {
      const maxFileSize = 1048576; // 1MB
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (file.size > maxFileSize) {
        throw new BadRequestException(
          `Image size must be less than ${maxFileSize} bytes`,
        );
      }

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          `Image type must be one of ${allowedMimeTypes.join(', ')}`,
        );
      }

      registerUserDto.profilePicture = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }
    return this.authService.register(registerUserDto, ip);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Ip() ip: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.Login(loginUserDto, ip);
  }
}
