import { Inject, Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { getSchema, Validate } from 'joi-typescript-validator';
import * as path from 'path';

import pack from '../../../package.json';
import { EnvConfig } from '../env.config';

export interface ConfigServiceOptions {
  appName?: string;
  filePath: string;
}

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  public env: EnvConfig;

  constructor(@Inject('CONFIG_OPTIONS') options: ConfigServiceOptions) {
    const fullPath = path.resolve(__dirname, options.filePath);
    console.debug(`loading config from ${fullPath}`);

    let fromFile: dotenv.DotenvConfigOutput;

    if (!fs.existsSync(fullPath)) {
      this.logger.error(`unable to find config: ${fullPath}`);
    } else {
      fromFile = dotenv.config({ path: fullPath });
    }

    console.debug(JSON.stringify(fromFile.parsed, null, 2));

    const env = new EnvConfig(
      {
        NODE_ENV: 'development',
        APP_NAME: options?.appName || pack.name,
        APP_VERSION: pack.version,
      },
      fromFile.parsed || {},
      this.getEnvironmentVariables(),
    );

    const res = Validate(EnvConfig, env);
    if (res.error) {
      this.logger.error(res.error);
    }
    this.env = res.value;
  }

  private getEnvironmentVariables(): EnvConfig {
    const schema = getSchema(EnvConfig);
    const env: EnvConfig | any = {};
    Object.keys(schema.describe().keys || []).forEach((element) => {
      if (process.env[element] !== undefined) {
        env[element] = process.env[element];
      }
    });

    return env;
  }
}
