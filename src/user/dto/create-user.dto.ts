import { IsEmail, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsString()
  status: string;

  @IsString()
  avatar: string;

  @IsString()
  address: string;

  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
