import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payroll-report',
  templateUrl: './payroll-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PayrollReportComponent {}
