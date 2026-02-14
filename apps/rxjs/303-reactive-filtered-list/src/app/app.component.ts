import { Component } from '@angular/core';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { EmployeeListComponent } from './employee-list/employee-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [EmployeeListComponent, HeaderComponent]
})
export class AppComponent {
  title = 'rx105-reactive-filtered-list';
}
