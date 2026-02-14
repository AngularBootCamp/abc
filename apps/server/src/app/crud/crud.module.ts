/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

import {
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';

import { JsonServerService } from '../json-server.service';

const pause = require('connect-pause');

@Module({
  providers: [JsonServerService]
})
export class CrudModule implements NestModule {
  constructor(private jss: JsonServerService) {}

  configure(consumer: MiddlewareConsumer): void {
    this.jss.loadDataFile('apps/server/rest-data/data.json');
    if (this.jss.middlewares && this.jss.router) {
      consumer
        .apply(...this.jss.middlewares, this.jss.router, pause(200))
        .exclude(
          'fx(.*)',
          'hello(.*)',
          'soccer(.*)',
          'count(.*)',
          'increment(.*)'
        )
        .forRoutes('/');
    }
  }
}
