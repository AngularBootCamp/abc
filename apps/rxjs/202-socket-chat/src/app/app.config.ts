import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:8085',
  options: {}
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
};
