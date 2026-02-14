import { HttpHeaders } from '@angular/common/http';

export const jsonRequestHeaders = new HttpHeaders().set(
  'Accept',
  'application/json'
);
