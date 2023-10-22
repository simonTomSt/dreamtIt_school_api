import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  Coordinator = 'Coordinator',
  Teacher = 'Teacher',
  Student = 'Student',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  surname: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
  })
  role: UserRole;

  @Column({ type: 'text', nullable: true, default: null })
  bio: string | null;
}
