import { Optional, Required, ValidOptions } from 'joi-typescript-validator';

export class EnvConfig {
  @Required()
  @ValidOptions('test', 'development', 'production')
  public NODE_ENV: 'test' | 'development' | 'production';

  @Required()
  public APP_NAME: string;

  @Required()
  public APP_VERSION: string;

  @Optional()
  public LOKI_HOST: string;

  constructor(...values) {
    Object.assign(this, ...values);
  }
}
