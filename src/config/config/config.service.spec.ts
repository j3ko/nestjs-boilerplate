import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(
            path.join(process.cwd(), `config/.env.${process.env.NODE_ENV || 'development'}`),
          ),
        },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
