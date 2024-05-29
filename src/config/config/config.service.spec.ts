import { Test, TestingModule } from '@nestjs/testing';
import * as path from 'path';

import { ConfigModuleOptions } from '../config.module';
import { ConfigService } from './config.service';

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
