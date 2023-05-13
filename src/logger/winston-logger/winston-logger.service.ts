import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLoggerService implements LoggerService {
  protected readonly logger: Logger;

  constructor(appName: string, options?: any) {
    const opt = Object.assign(
      {
        level: 'silly',
        format: format.combine(
          format.label({ label: appName }),
          format.errors({ stack: true }),
          format.colorize({ message: true }),
          format.timestamp(),
          format.printf(({ level, message, timestamp, stack }) => {
            if (stack) {
              return `${timestamp} ${level}: ${message} - ${stack}`;
            }
            return `${timestamp} ${level}: ${message}`;
          }),
        ),
        transports: [new transports.Console()],
      },
      options,
    );

    this.logger = createLogger(opt);
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, error: Error) {
    this.logger.error(error || message);
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
