import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { ValidationPipe } from '../../common/pipes';
import { AuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';
import { AuthService } from './auth.service';
import { RegisterDto, RegisterSchema } from './dtos/register.dto';
import { LoginDto, LoginSchema } from './dtos/login.dto';
import { AUTH_SUCCESS_MSG } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(new ValidationPipe(RegisterSchema)) body: RegisterDto) {
    const data = await this.authService.register(body);
    return { data, message: AUTH_SUCCESS_MSG.REGISTER };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ValidationPipe(LoginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(body, res);
    return { message: AUTH_SUCCESS_MSG.LOGIN };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async profile(@CurrentUser('id') userId: string) {
    const data = await this.authService.profile(userId);
    return { data };
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.logout(res);
    return { message: AUTH_SUCCESS_MSG.LOGOUT };
  }
}
