import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { User } from './user.entity';

@Controller('profile')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserProfile(@Body() getUserProfileDto: GetUserProfileDto): Promise<User> {
    return this.userService.getUserProfile(getUserProfileDto);
  }
}
