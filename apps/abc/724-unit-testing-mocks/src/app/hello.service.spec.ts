import { Spy, createSpyFromClass } from 'jest-auto-spies';

import { HelloService } from './hello.service';
import { UserService } from './user.service';

describe('HelloUserService', () => {
  let helloService: HelloService;
  let userService: Spy<UserService>;

  beforeEach(() => {
    // mock dependencies
    userService = createSpyFromClass(UserService);

    // manually inject mocks into service under test
    helloService = new HelloService(userService);
  });

  it('should calculate a greeting', () => {
    // program mock
    const user = {
      id: '1',
      firstName: 'Jack',
      lastName: 'Baur'
    };
    userService.currentUser.mockReturnValue(user);

    // execute test method and assert result
    expect(helloService.calculateHello('Hello')).toEqual(
      'Hello, Jack Baur!'
    );

    // various options for verifying mocks
    expect(userService.currentUser).toHaveBeenCalled();
    expect(userService.currentUser).toHaveBeenCalledTimes(1);
    // Unneeded in this case, but shows API options
    // More helpful if your spy is calling through to a real function
    expect(userService.currentUser.mock.results[0].value).toBe(user);
  });
});
