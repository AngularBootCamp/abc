import { Module } from '@nestjs/common';

import { ClicksController } from './clicks.controller';
import { ClicksGateway } from './clicks.gateway';

@Module({
  providers: [ClicksGateway],
  controllers: [ClicksController]
})
export class ClicksModule {}
