import { Component } from '@angular/core';

import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';
import { ThirdComponent } from './third.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="outline-box">
      <h5>Three components with different styles</h5>
      <app-first />
      <app-second />
      <app-third />
    </div>
  `,
  imports: [FirstComponent, SecondComponent, ThirdComponent]
})
export class AppComponent {}
