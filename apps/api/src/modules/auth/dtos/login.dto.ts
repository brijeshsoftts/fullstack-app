import { createZodDto } from 'nestjs-zod';
import z from 'zod';

import { email, password } from './register.dto';

export const LoginSchema = z
  .object({
    email,
    password,
  })
  .strict();

export class LoginDto extends createZodDto(LoginSchema) {}
