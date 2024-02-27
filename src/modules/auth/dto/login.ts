import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginUserDto extends PartialType(RegisterUserDto) {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  @Transform(({ value }) => value.trim())
  readonly password: string;
}
