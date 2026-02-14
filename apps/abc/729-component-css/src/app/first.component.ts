import { Component } from '@angular/core';

@Component({
  selector: 'app-first',
  template: `
    <div class="outline-box">First Component</div>
    <style>
      .outline-box {
        border: 3px solid var(--abc-category-1-color);
      }
    </style>
  `
})
export class FirstComponent {}
