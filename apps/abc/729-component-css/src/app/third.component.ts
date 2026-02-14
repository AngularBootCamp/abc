import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-third',
  template: `
    <div class="outline-box">Third Component</div>
  `,
  styleUrl: './third.component.scss',
  encapsulation: ViewEncapsulation.Emulated // this is the default
  // encapsulation: ViewEncapsulation.None
})
export class ThirdComponent {}
