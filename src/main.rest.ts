import 'reflect-metadata';
import {Logger, PinoLogger} from './shared/libs/logger/index.js';
import {RestApplication} from './rest/index.js';
import {RestConfig} from './shared/libs/config/rest.config.js';
import {Container} from 'inversify';
import {Component} from './shared/consts/index.js';
import {Config} from './shared/libs/config/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);

  await application.init();
}

bootstrap();
