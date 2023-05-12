import { Logger, Module } from '@nestjs/common';
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
    {
      provide: Logger,
      useExisting: WinstonLoggerService,
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
