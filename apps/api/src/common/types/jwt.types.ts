export interface JWTTokenPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
