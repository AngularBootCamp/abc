import { Component } from '@angular/core';

@Component({
  selector: 'app-non-standalone',
  template: `
    <p>
      Because I'm not standalone, I was loaded immediately, even
      though my display was deferred.
    </p>
  `,
  standalone: false
})
export class NonStandaloneComponent {}
