import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ZodSchema } from 'zod';

import { MESSAGES } from '../constants';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  async transform(value: unknown) {
    const result = await this.schema.safeParseAsync(value);
    if (result.error) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
        code: issue.code,
      }));
      const formattedErrors = {};
      errors.forEach((error) => {
        formattedErrors[error.field] = {
          message: error.message,
          code: error.code,
        };
      });
      throw new BadRequestException({
        message: MESSAGES.VALIDATION,
        errors: formattedErrors,
        statusCode: 400,
      });
    }
    return result.data;
  }
}
