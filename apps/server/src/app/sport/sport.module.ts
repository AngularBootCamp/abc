/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

import {
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';

import { JsonServerService } from '../json-server.service';

import { SportController } from './sport.controller';

const pause = require('connect-pause');

@Module({
  imports: [],
  controllers: [SportController],
  providers: [JsonServerService]
})
export class SportModule implements NestModule {
  constructor(private jss: JsonServerService) {}

  configure(consumer: MiddlewareConsumer): void {
    this.jss.loadDataFile('apps/server/rest-data/soccer.json');
    if (this.jss.middlewares && this.jss.router) {
      consumer
        .apply(...this.jss.middlewares, this.jss.router, pause(200))
        .exclude(
          'soccer/hello(.*)',
          'soccer/reset(.*)',
          'soccer/remove-e2e(.*)'
        )
        .forRoutes('soccer');
    }
  }
}
