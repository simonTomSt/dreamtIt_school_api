import { UserRole } from '../users.entity';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  bio: string | null;
}
