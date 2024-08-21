import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from './user-role.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { AdminService } from './admin.service';
import { User } from 'src/user/user.entity';
import { GetUsersDto } from './dto/get-users.dto';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  @Roles(UserRole.ADMIN)
  getUsers(getUsers: GetUsersDto): Promise<User[]> {
    return this.adminService.getUsers(getUsers);
  }

  @Delete('users/:id')
  @Roles(UserRole.ADMIN)
  deleteUser(@Param() id: string): Promise<void> {
    return this.adminService.deleteUser(id);
  }
}
