import { Logger, Module } from '@nestjs/common';
import { LokiLoggerService } from './loki-logger/loki-logger.service';

import { WinstonLoggerService } from './winston-logger/winston-logger.service';

@Module({
  providers: [
    {
      provide: WinstonLoggerService,
      useFactory: async () => new WinstonLoggerService(),
    },
    {
      provide: LokiLoggerService,
      useFactory: async () => {
        if (process.env.NODE_ENV === 'test') {
          return new Logger();
        }
        return new LokiLoggerService()
      },
    },
    {
      provide: Logger,
      useExisting: WinstonLoggerService,
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
