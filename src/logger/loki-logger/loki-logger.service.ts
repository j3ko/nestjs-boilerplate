import { Injectable, Scope } from '@nestjs/common';
import { format } from 'winston';
import LokiTransport from 'winston-loki';

import { WinstonLoggerService } from '@/logger/winston-logger/winston-logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LokiLoggerService extends WinstonLoggerService {
  constructor(appName: string, host: string) {
    const opt = {
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new LokiTransport({
          host,
          labels: { job: appName },
        }),
      ],
    };
    super(appName, opt);
  }
}
