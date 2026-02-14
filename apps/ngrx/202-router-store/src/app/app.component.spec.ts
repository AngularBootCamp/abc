import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';

const title = 'Initial title';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        provideMockStore({
          initialState: {
            config: {
              title
            }
          }
        })
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
