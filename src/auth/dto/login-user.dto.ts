import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  id: number;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  password: string;

}
