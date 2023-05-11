import { Module } from '@nestjs/common';
import winston from 'winston';

import { LokiLoggerService } from './loki-logger/loki-logger.service';
import { WinstonLoggerService } from './winston-logger/winston-logger.service';

@Module({
  providers: [
    {
      provide: WinstonLoggerService,
      useFactory: () => new WinstonLoggerService(),
    },
    {
      provide: LokiLoggerService,
      useFactory: () => new LokiLoggerService(),
    },
  ],
  exports: [WinstonLoggerService, LokiLoggerService],
})
export class LoggerModule {}
