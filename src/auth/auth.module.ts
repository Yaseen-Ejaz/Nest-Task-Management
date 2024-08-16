import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // Import JwtStrategy

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51', // Consider using ConfigService for better secret management
      signOptions: {
        expiresIn: '1h', // Change to '1h' for readability
      },
    }),
    TypeOrmModule.forFeature([AuthRepository]),
  ],
  providers: [AuthService, AuthRepository, JwtService], // Add JwtStrategy here
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
