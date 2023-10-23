import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../users.entity';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf((o) => o.role === UserRole.Teacher)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bio: string | null;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
