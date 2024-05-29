import { DynamicModule, Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import * as path from 'path';

import { ConfigService } from './config/config.service';

export interface ConfigModuleOptions {
  appName?: string;
}

const configServiceProviderFactory = (options?: ConfigModuleOptions) => {
  return {
    provide: 'CONFIG_OPTIONS',
    useValue: {
      appName: options?.appName,
      filePath: path.join(process.cwd(), `config/.env.${process.env.NODE_ENV || 'development'}`),
    },
  };
};

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [configServiceProviderFactory(options), ConfigService],
      exports: [ConfigService],
    };
  }
}
