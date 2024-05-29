import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { createLogger, format } from 'winston';
import LokiTransport from 'winston-loki';
const { combine, timestamp, printf, colorize, errors } = format;

import { ConfigService } from '../config/config/config.service';

export class WinstonLogger {
  static getInstance(config: ConfigService) {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: combine(
          errors({ stack: true }),
          timestamp(),
          colorize({ all: true }),
          printf(({ level, message, timestamp, context, stack }) => {
            return `${timestamp} [${context || 'Application'}] ${level}: ${message} ${stack || ''}`;
          }),
        ),
      }),
    ];

    if (config.env.LOKI_HOST) {
      transports.push(
        new LokiTransport({
          format: combine(
            errors({ stack: true }),
            timestamp(),
            printf(({ message, context, stack }) => {
              return `[${context || 'Application'}]: ${message} ${stack || ''}`;
            }),
          ),
          host: config.env.LOKI_HOST,
          labels: {
            job: config.env.APP_NAME,
            env: config.env.NODE_ENV,
          },
          onConnectionError: (err) => console.error(err),
        }),
      );
    }

    // createLogger of Winston
    const instance = createLogger({
      level: config.env.LOG_LEVEL || 'info',
      transports,
    });

    return WinstonModule.createLogger({
      instance,
    });
  }
}
