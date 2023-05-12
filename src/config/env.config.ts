import { Required, ValidOptions } from 'joi-typescript-validator';

export class EnvConfig {
  @Required()
  @ValidOptions('test', 'development', 'production')
  public NODE_ENV: 'test' | 'development' | 'production';

  constructor(...values) {
    Object.assign(this, ...values);
  }
}
