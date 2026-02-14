import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchModule } from '../search/search.module';

import { PayrollSearchComponent } from './payroll-search.component';

@NgModule({
  declarations: [PayrollSearchComponent],
  exports: [PayrollSearchComponent],
  imports: [CommonModule, SearchModule]
})
export class PayrollModule {}
