/* eslint-disable @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SearchModule } from '../search/search.module';

import { HrFilesSearchComponent } from './hr-files-search.component';

@NgModule({
  declarations: [HrFilesSearchComponent],
  exports: [HrFilesSearchComponent], // export COMPONENTS, directives, pipes
  imports: [CommonModule, SearchModule], // import MODULES
})
export class HrModule {}
