import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './config/config/config.service';
import { WinstonLogger } from './logger/winston-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const config = app.get(ConfigService);
  app.useLogger(WinstonLogger.getInstance(config));
  await app.listen(3000);
}
bootstrap();
