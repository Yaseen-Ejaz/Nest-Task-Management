import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/user-role.enum'; // Assuming UserRole is defined in a separate file

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[] | undefined>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { role: UserRole };

    if (!user) {
      // Handle unauthenticated users (e.g., allow access to public routes)
      return requiredRoles.includes(UserRole.USER);
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
