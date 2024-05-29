import { Optional, Required, ValidOptions } from 'joi-typescript-validator';

export class EnvConfig {
  @Required()
  @ValidOptions('test', 'development', 'production')
  NODE_ENV: 'test' | 'development' | 'production';

  @Optional()
  @ValidOptions('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

  @Required()
  APP_NAME: string;

  @Required()
  APP_VERSION: string;

  @Optional()
  LOKI_HOST: string;

  constructor(...values) {
    Object.assign(this, ...values);
  }
}
