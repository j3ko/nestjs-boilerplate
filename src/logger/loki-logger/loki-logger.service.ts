import { Injectable, Scope } from '@nestjs/common';
import { transports } from 'winston';
import LokiTransport from 'winston-loki';

import { WinstonLoggerService } from '@/logger/winston-logger/winston-logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LokiLoggerService extends WinstonLoggerService {
  constructor(job: string, env: string, host: string) {
    const opt = {
      transports: [
        new transports.Console(),
        new LokiTransport({
          host,
          labels: { job, env },
          onConnectionError: (err) => console.error(err),
        }),
      ],
    };
    super(job, opt);
  }

  error(messageOrError: string | Error, error?: Error) {
    if (typeof messageOrError === 'string') {
      this.logger.error(`${messageOrError}\n\n${this.serializeError(error)}`);
    } else {
      this.logger.error(`${this.serializeError(messageOrError as Error)}`);
    }
  }

  private serializeError(error: Error) {
    if (!error) return;
    const { message, name, stack } = error;
    return JSON.stringify({ message, name, stack }, null, 2);
  }
}
