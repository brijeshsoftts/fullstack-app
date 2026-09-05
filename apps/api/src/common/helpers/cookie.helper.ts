import type { CookieOptions, Response } from 'express';

import { COOKIES_EXPIRATION, COOKIES_NAME } from '../constants';
import { env } from '../../config';

const isProd = env.NODE_ENV == 'production';

const baseConfig: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  path: '/',
};

export function setCookies(response: Response, accessToken: string) {
  response.cookie(COOKIES_NAME.ACCESS_TOKEN, accessToken, {
    ...baseConfig,
    maxAge: COOKIES_EXPIRATION.ACCESS_TOKEN,
  });

  // add refresh token same as access token
}

export function clearCookies(response: Response) {
  response.clearCookie(COOKIES_NAME.ACCESS_TOKEN, {
    ...baseConfig,
  });

  // clear refresh token same as access token
}
