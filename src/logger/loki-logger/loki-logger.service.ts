import { Injectable, Scope } from '@nestjs/common';
import { format } from 'winston';
import LokiTransport from 'winston-loki';

import { WinstonLoggerService } from '@/logger/winston-logger/winston-logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LokiLoggerService extends WinstonLoggerService {
  constructor(host?: string) {
    const opt = {
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new LokiTransport({ 
        host: host || 'http://127.0.0.1:3100',
        labels: { job: 'nestjs-boilerplate' } 
      })],
    };
    super(opt);
  }
}
