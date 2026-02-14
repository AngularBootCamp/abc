import { Module } from '@nestjs/common';

import { FxController } from './fx.controller';

@Module({
  imports: [],
  controllers: [FxController]
})
export class FxModule {}
