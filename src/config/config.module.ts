import { Module } from '@nestjs/common';
import * as path from 'path';

import { ConfigService } from './config/config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        path.join(process.cwd(), `config/.env.${process.env.NODE_ENV || 'development'}`),
      ),
    },
  ],
})
export class ConfigModule {}
