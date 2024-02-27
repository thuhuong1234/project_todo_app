import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register';
import { LoginUserDto } from './dto/login';
import { Public } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from './guard/auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '@prisma/client';
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() RegisterUserDto: RegisterUserDto) {
    return this.authService.register(RegisterUserDto);
  }

  @Public()
  @Post('login')
  signIn(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async findOne(@AuthUser() user: User) {
    return user;
  }
}
