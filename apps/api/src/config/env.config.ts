import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number('Invalid port number').default(3000),
  DATABASE_URL: z.url('Invalid database URL'),
  CORS_ORIGIN: z.url('Invalid CORS origin'),
  JWT_ACCESS_SECRET: z
    .string('JWT access secret is required')
    .min(32, 'JWT access secret must be at least 32 characters long'),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(z.prettifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
