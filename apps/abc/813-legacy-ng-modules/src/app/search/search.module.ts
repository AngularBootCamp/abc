/* eslint-disable @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SearchBoxComponent } from './search-box.component';

@NgModule({
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent],
  imports: [CommonModule],
})
export class SearchModule {}
