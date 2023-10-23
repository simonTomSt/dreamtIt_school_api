import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { SignUpDto } from './dtos/sign-up.dto';
import { UsersService } from './users.service';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signUpDto: SignUpDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException('Provided email is in use');
    }

    const passwordHash = await this.hashPassword(signUpDto.password);

    return this.usersService.create({
      ...signUpDto,
      password: passwordHash,
    });
  }

  async signin(signInDto: SignInDto): Promise<User> {
    const user = await this.usersService.getUserWithPasswordByEmail(
      signInDto.email,
    );

    if (!user) {
      throw new BadRequestException('Bad credentials');
    }

    const isMatch = await this.compareHash(signInDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Bad credentials');
    }

    return user;
  }

  compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  hashPassword(password: string) {
    const rounds = 12;
    return bcrypt.hash(password, rounds);
  }
}
