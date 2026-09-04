import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { COOKIES_NAME, MESSAGES } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const accessToken = req.cookies[COOKIES_NAME.ACCESS_TOKEN];

    if (!accessToken) throw new UnauthorizedException(MESSAGES.UNAUTHENTICATED);

    try {
      const payload = new JwtService().verifyAsync(accessToken);
      req['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.UNAUTHENTICATED);
    }
  }
}
