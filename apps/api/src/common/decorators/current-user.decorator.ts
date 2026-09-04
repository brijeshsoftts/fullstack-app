import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { User } from '../../types';
import { MESSAGES } from '../constants';

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req['user'] as User;

    if (!user) {
      throw new UnauthorizedException(MESSAGES.UNAUTHENTICATED);
    }

    return data ? user[data] : user;
  },
);
