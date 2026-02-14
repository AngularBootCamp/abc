import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';

import { AppComponent } from './app.component';
import { ConfigStore } from './config.store';

const title = 'Initial title';

describe('AppComponent', () => {
  let component: AppComponent;
  let configStore: Spy<ConfigStore>;

  beforeEach(() => {
    configStore = createSpyFromClass(ConfigStore);
    configStore.title = signal(title) as any;

    TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        {
          provide: ConfigStore,
          useValue: configStore
        }
      ]
    });

    const fixture = TestBed.createComponent(AppComponent);
    // using the fixture this way is necessary to invoke an effect
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  describe('title', () => {
    it('should be initialized', () => {
      expect(component.title.value).toBe(title);
    });
  });
});
