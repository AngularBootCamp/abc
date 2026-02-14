/* eslint-disable @angular-eslint/prefer-inject */

import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HelloService {
  constructor(private userService: UserService) {}

  calculateHello(greeting: string): string {
    const user = this.userService.currentUser();
    return `${greeting}, ${user.firstName} ${user.lastName}!`;
  }
}
