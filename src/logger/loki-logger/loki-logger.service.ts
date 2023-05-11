import { Injectable } from '@nestjs/common';
import { createLogger, format, LoggerOptions, transports } from 'winston';
import LokiTransport from 'winston-loki';

import { WinstonLoggerService } from '@/logger/winston-logger/winston-logger.service';

@Injectable()
export class LokiLoggerService extends WinstonLoggerService {
  constructor(host?: string) {
    const opt = {
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new LokiTransport({ host: host || 'http://127.0.0.1:3100' })],
    };
    super(opt);
  }
}
