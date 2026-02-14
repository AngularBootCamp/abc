import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';

import { AppComponent } from './app.component';
import { ConfigService } from './config.service';

const title = 'Initial title';

describe('AppComponent', () => {
  let component: AppComponent;
  let configSvc: Spy<ConfigService>;

  beforeEach(() => {
    configSvc = createSpyFromClass(ConfigService, {
      observablePropsToSpyOn: ['title']
    });
    configSvc.title.nextWith(title);

    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        {
          provide: ConfigService,
          useValue: configSvc
        }
      ]
    });

    component = TestBed.inject(AppComponent);
  });

  describe('title', () => {
    it('should be initialized', () => {
      component.ngOnInit();
      expect(component.title.value).toBe(title);
    });
  });
});
