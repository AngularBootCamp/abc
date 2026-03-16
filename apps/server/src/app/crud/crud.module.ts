import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
const pause = require('connect-pause');

import { JsonServerService } from '../json-server.service';

@Module({
  providers: [JsonServerService],
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
          'increment(.*)',
        )
        .forRoutes('/');
    }
  }
}
