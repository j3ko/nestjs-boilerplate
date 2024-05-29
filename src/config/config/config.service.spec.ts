import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';

import { ConfigService } from './config.service';
import { ConfigModuleOptions } from '../config.module';

describe('ConfigService', () => {
  let service: ConfigService;

  const configServiceProviderFactory = (options?: ConfigModuleOptions) => {
    return {
      provide: 'CONFIG_OPTIONS',
      useValue: {
        appName: options?.appName,
        filePath: path.join(process.cwd(), `config/.env.${process.env.NODE_ENV || 'development'}`),
      },
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [configServiceProviderFactory(), ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
