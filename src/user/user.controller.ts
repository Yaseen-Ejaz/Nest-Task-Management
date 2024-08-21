import {
  Body,
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
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
  getUserProfile(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<User> {
    const extractToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!extractToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(extractToken, {
        secret: 'topSecret51',
      });

      // Assign the payload to the request object
      request['id'] = payload;

      return this.userService.getUserProfile(id);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
