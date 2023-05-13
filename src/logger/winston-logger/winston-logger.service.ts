import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLoggerService implements LoggerService {
  protected readonly logger: Logger;

  constructor(appName: string, options?: any) {
    const opt = Object.assign(
      {
        level: 'info',
        format: format.combine(
          format.label({ label: appName }),
          format.timestamp(),
          format.printf(
            (info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
          ),
          format.colorize({ all: true }),
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
