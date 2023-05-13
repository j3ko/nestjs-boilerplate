import { Logger, Module } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';
import { ConfigService } from '@/config/config/config.service';

import { LokiLoggerService } from './loki-logger/loki-logger.service';
import { WinstonLoggerService } from './winston-logger/winston-logger.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: WinstonLoggerService,
      useFactory: async (config: ConfigService) => {
        return new WinstonLoggerService(config.env.APP_NAME);
      },
      inject: [ConfigService],
    },
    {
      provide: LokiLoggerService,
      useFactory: async (config: ConfigService) => {
        if (config.env.NODE_ENV === 'test') {
          return new Logger();
        }
        return new LokiLoggerService(
          config.env.APP_NAME,
          config.env.LOKI_HOST || 'http://127.0.0.1:3100',
        );
      },
      inject: [ConfigService],
    },
    {
      provide: Logger,
      useExisting: WinstonLoggerService,
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
