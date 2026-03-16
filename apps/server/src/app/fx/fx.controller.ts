import { Observable } from 'rxjs';

import {
  Controller,
  Get,
  Header,
  MessageEvent,
  Sse,
} from '@nestjs/common';

import { startFxGenerator } from './fx';

@Controller('fx')
export class FxController {
  @Header('X-Accel-Buffering', 'no') // GAE
  @Sse('lowfreq')
  lowfreq(): Observable<MessageEvent> {
    return startFxGenerator(500);
  }

  @Get('highfreq')
  @Header('X-Accel-Buffering', 'no') // GAE
  highfreq(): Observable<MessageEvent> {
    return startFxGenerator(10);
  }
}
