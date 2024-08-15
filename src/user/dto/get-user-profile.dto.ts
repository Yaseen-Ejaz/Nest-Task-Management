import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class GetUserProfileDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(32)
  password: string;
}
