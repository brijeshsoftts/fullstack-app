import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { COOKIES_NAME, MESSAGES } from '../constants';
import { JWTTokenPayload } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const accessToken = req.cookies[COOKIES_NAME.ACCESS_TOKEN];

    if (!accessToken) throw new UnauthorizedException(MESSAGES.UNAUTHENTICATED);

    try {
      const payload: JWTTokenPayload = await this.jwt.verifyAsync(accessToken);
      req['user'] = {
        id: payload.sub,
        email: payload.email,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.UNAUTHENTICATED);
    }
  }
}
