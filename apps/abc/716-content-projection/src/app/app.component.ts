import { Component } from '@angular/core';

import { ContentWrapperComponent } from './content-wrapper.component';

@Component({
  selector: 'app-root',
  template: `
    <app-content-wrapper>
      <p>
        This is a p tag. Its only job is to be transcluded into the
        wrapper directive.
      </p>
    </app-content-wrapper>

    <app-content-wrapper>
      Here's another block of transcluded text.
    </app-content-wrapper>
  `,
  imports: [ContentWrapperComponent]
})
export class AppComponent {}
