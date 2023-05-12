import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger
  ) {}

  getHello(): string {
    this.logger.log('foo');
    return 'Hello World!';
  }
}
