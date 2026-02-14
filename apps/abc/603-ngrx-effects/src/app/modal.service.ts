import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  confirm(message: string): boolean {
    return window.confirm(message);
  }
}
