import { NgModule } from '@angular/core';

import { NonStandaloneComponent } from './non-standalone.component';

@NgModule({
  declarations: [NonStandaloneComponent],
  exports: [NonStandaloneComponent]
})
export class NonStandaloneModule {}
