import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { ClicksModule } from './clicks/clicks.module';
import { CrudModule } from './crud/crud.module';
import { FxModule } from './fx/fx.module';
import { SportModule } from './sport/sport.module';
import { VisitCountModule } from './visit-count/visit-count.module';

@Module({
  imports: [
    CrudModule,
    ChatModule,
    VisitCountModule,
    FxModule,
    SportModule,
    ClicksModule
  ],
  controllers: [AppController]
})
export class AppModule {}
