import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '../logger.module';
import { WinstonLoggerService } from './winston-logger.service';

describe('WinstonLoggerService', () => {
  let service: WinstonLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();

    service = module.get<WinstonLoggerService>(WinstonLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
