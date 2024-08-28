import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Ip,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('profile')
export class UserController {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  @Get()
  getUserProfile(@Req() request: Request): Promise<User> {
    const extractToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    const id = this.userService.decryptToken(extractToken);
    return this.userService.getUserProfile(id);
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('profilePicture', { storage: memoryStorage() }),
  )
  updateUserProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
    @Ip() ip: string,
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

      updateProfileDto.profilePicture = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }

    const extractToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const id = this.userService.decryptToken(extractToken);
    return this.userService.updatetUserProfile(id, updateProfileDto, ip);
  }
}
