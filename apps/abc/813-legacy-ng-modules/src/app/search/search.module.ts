import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchBoxComponent } from './search-box.component';

@NgModule({
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent],
  imports: [CommonModule]
})
export class SearchModule {}
