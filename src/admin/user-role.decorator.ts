import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/user-role.enum'; // Import UserRole enum

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
