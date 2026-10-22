import { Service } from '@angular/core';

@Service()
export class ModalService {
  confirm(message: string): boolean {
    return window.confirm(message);
  }
}
