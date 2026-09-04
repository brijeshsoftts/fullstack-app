import { Injectable, Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../generated/prisma/client';
import { env } from '../../config';

@Injectable()
export class PrismaService extends PrismaClient {
  private logger: Logger;

  constructor() {
    const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
    super({ adapter });
    this.logger = new Logger();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log(`Connected to the database.`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log(`Disconnected from the database.`);
  }
}
