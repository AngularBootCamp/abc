import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HrModule } from './hr-files/hr.module';
import { PayrollModule } from './payroll/payroll.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HrModule, PayrollModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
