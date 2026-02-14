import { Injectable, inject } from '@angular/core';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HelloService {
  private userService = inject(UserService);

  calculateHello(greeting: string): string {
    const user = this.userService.currentUser();
    return `${greeting}, ${user.firstName} ${user.lastName}!`;
  }
}
