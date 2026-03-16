/* eslint-disable @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SearchModule } from '../search/search.module';

import { PayrollSearchComponent } from './payroll-search.component';

@NgModule({
  declarations: [PayrollSearchComponent],
  exports: [PayrollSearchComponent],
  imports: [CommonModule, SearchModule],
})
export class PayrollModule {}
