import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from '../decorators/serialize.decorator';
import { UserDto } from './dtos/user.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Serialize(UserDto)
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/signup')
  @Serialize(UserDto)
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('/signin')
  @Serialize(UserDto)
  @HttpCode(HttpStatus.OK)
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }
}
