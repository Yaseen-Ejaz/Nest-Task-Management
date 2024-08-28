import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from './user-role.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { AdminService } from './admin.service';
import { User } from 'src/user/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { ActivityLog } from 'src/activitylog/activity-log.entity';
import { ActivityLogRepository } from 'src/activitylog/activity-log.repository';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private activityLogRepository: ActivityLogRepository,
  ) {}

  @Get('users')
  @Roles(UserRole.ADMIN)
  getUsers(): Promise<User[]> {
    return this.adminService.getUsers();
  }

  @Delete('users/:id')
  @Roles(UserRole.ADMIN)
  deleteUser(@Param() id: string): Promise<void> {
    return this.adminService.deleteUser(id);
  }

  @Get('logs')
  @Roles(UserRole.ADMIN)
  getLogs(): Promise<ActivityLog[]> {
    return this.activityLogRepository.getLogs();
  }
}
