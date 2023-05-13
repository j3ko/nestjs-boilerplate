import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from './config/config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger, private readonly config: ConfigService) {}

  getHello(): string {
    this.logger.log(`Running: ${this.config.env.NODE_ENV}`);
    return 'Hello World!';
  }
}
