import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register';
import { LoginUserDto } from './dto/login';
import { PrismaService } from 'prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignTokenPayload } from 'src/common/types';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  async register(RegisterUserDto: RegisterUserDto) {
    const { password, ...arg } = RegisterUserDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email: RegisterUserDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists!');
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        password: hashPassword,
        ...arg,
      },
    });

    const userId = newUser.id;
    const payload = { userId };
    const accessToken = await this.generateToken(payload);
    return { newUser, accessToken };
  }
  async login(LoginUserDto: LoginUserDto) {
    const { email, password } = LoginUserDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { userId: user.id };
    const accessToken = await this.generateToken(payload);
    return {
      accessToken,
    };
  }
  async generateToken(payload: SignTokenPayload) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');

    const option = {
      secret,
      expiresIn,
    };
    const token = await this.jwtService.sign(payload, option);
    return token;
  }
}
