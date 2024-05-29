import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from './config/config/config.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly config: ConfigService) {}

  getHello(): string {
    this.logger.log(`Running: ${this.config.env.NODE_ENV}`);
    return 'Hello World!';
  }
}
