import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent, provideMockStore({})]
    });

    component = TestBed.inject(AppComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
