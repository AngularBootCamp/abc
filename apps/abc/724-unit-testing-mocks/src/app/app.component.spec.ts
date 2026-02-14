import { Spy, createSpyFromClass } from 'jest-auto-spies';

import { AppComponent } from './app.component';
import { HelloService } from './hello.service';

/**
 * Testing a component class without the DOM (same as a service test)
 */
describe('App Component', () => {
  let appComponent: AppComponent;
  let helloService: Spy<HelloService>;

  beforeEach(() => {
    helloService = createSpyFromClass(HelloService);
  });

  it('should calculate greeting during initialization', () => {
    // setup and preconditions
    helloService.calculateHello.mockReturnValue('Hello, Joe!');

    appComponent = new AppComponent(helloService);

    // assert postconditions
    expect(appComponent.greeting).toBe('Hello, Joe!');

    // verify mocks
    expect(helloService.calculateHello).toHaveBeenCalledWith('Hello');
  });
});
