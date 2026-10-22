import { Service } from '@angular/core';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

@Service()
export class UserService {
  private user = {
    id: 'bb8',
    firstName: 'John',
    lastName: 'Smith',
  };

  currentUser(): User {
    return this.user;
  }
}
