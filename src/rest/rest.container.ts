import {ContainerModule} from 'inversify';
import {RestApplication} from './rest.application.js';
import {Component} from '../shared/consts/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer() {
  return new ContainerModule(
    (options) => {
      options.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
      options.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
      options.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
      options.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
    }
  );
}
