import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { User } from './user.entity';
import { GetUser } from 'src/auth/auth-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class UserController {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  @Get()
  getUserProfile(@Req() request: Request): Promise<User> {
    const extractToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!extractToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(extractToken, {
        secret: 'topSecret51',
      });

      // Assign the payload to the request object
      const { id } = payload;

      return this.userService.getUserProfile(id);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Put()
  updateUserProfile(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    let pfp;
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

      pfp = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }

    const extractToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!extractToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(extractToken, {
        secret: 'topSecret51',
      });

      // Assign the payload to the request object
      const { id } = payload;

      return this.userService.updatetUserProfile(id, pfp);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
