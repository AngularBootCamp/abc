import {
  ApplicationConfig,
  importProvidersFrom
} from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:8085',
  options: {}
};

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(SocketIoModule.forRoot(config))]
};
