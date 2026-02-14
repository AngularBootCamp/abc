import {
  Controller,
  Get,
  Header,
  Sse,
  MessageEvent
} from '@nestjs/common';
import { Observable } from 'rxjs';

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
