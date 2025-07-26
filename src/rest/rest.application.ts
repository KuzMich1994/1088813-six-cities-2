import {Logger} from '../shared/libs/logger/index.js';
import {Config} from '../shared/libs/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../shared/consts/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config,
  ) {}

  public async init() {
    this.logger.info('RestApplication initialized');
    this.logger.info(`Get value from env $PORT ${this.config.get('PORT')}`);
  }
}
