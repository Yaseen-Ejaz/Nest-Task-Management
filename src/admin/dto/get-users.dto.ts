import { IsEmail, IsString } from 'class-validator';

export class GetUsersDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}
