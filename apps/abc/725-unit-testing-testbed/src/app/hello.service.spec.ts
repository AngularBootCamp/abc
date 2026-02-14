import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';

import { HelloService } from './hello.service';
import { UserService } from './user.service';

describe('HelloUserService', () => {
  let helloUserService: HelloService;
  let userService: Spy<UserService>;

  beforeEach(() => {
    userService = createSpyFromClass(UserService);

    // mock dependencies
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    // Always retrieve services from TestBed
    helloUserService = TestBed.inject(HelloService);
  });

  it('should calculate a greeting', () => {
    // program mock
    const user = {
      id: '1',
      firstName: 'Rachel',
      lastName: 'Hardin'
    };
    userService.currentUser.mockReturnValue(user);

    // execute test method and assert result
    expect(helloUserService.calculateHello('Hello')).toBe(
      'Hello, Rachel Hardin!'
    );

    // verify mocks
    expect(userService.currentUser).toHaveBeenCalledTimes(1);
  });
});
