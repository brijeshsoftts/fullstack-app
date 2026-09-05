import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import {
  clearCookies,
  comparePassword,
  hashPassword,
  setCookies,
} from '../../common/helpers';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ProfileResponse, RegisterResponse } from './auth.types';
import { AUTH_ERROR_MSG } from './auth.constant';
import { JWTTokenPayload } from '../../common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    const isUserExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (isUserExists) {
      throw new ConflictException(AUTH_ERROR_MSG.CONFLICT_EMAIL);
    }

    const passwordHash = await hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async login(dto: LoginDto, res: Response): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await comparePassword(
      dto.password,
      user.passwordHash as string,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_CREDENTIALS);
    }

    const payload: JWTTokenPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwt.signAsync(payload);

    setCookies(res, accessToken);
  }

  async profile(userId: string): Promise<ProfileResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(AUTH_ERROR_MSG.NOT_FOUND);
    }

    return user;
  }

  async logout(res: Response): Promise<void> {
    clearCookies(res);
  }
}
