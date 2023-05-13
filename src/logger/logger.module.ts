import { Logger, LoggerService, Module } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';
import { ConfigService } from '@/config/config/config.service';

import { LokiLoggerService } from './loki-logger/loki-logger.service';
import { WinstonLoggerService } from './winston-logger/winston-logger.service';

const getLogger = async (config: ConfigService) => {
  let result: LoggerService = new WinstonLoggerService(config.env.APP_NAME);
  if (config.env.NODE_ENV === 'test') {
    result = new Logger();
  }
  if (config.env.LOKI_HOST) {
    result = new LokiLoggerService(
      config.env.APP_NAME,
      config.env.NODE_ENV,
      config.env.LOKI_HOST || 'http://127.0.0.1:3100',
    );
  }
  return result;
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Logger,
      useFactory: getLogger,
      inject: [ConfigService],
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
