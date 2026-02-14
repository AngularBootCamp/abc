import { Injectable } from '@angular/core';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = {
    id: 'bb8',
    firstName: 'John',
    lastName: 'Smith'
  };

  currentUser(): User {
    return this.user;
  }
}
