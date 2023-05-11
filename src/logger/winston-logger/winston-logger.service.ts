import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { createLogger, format, LoggerOptions, transports } from 'winston';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  protected readonly logger;

  constructor(options?: any) {
    const opt = options || {
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()],
    };

    this.logger = createLogger(opt);
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
