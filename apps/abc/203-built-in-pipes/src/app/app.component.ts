import {
  UpperCasePipe,
  JsonPipe,
  DecimalPipe,
  PercentPipe,
  CurrencyPipe,
  DatePipe
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

// prettier-ignore
const salesData = [
  { name: 'Cynthia Cunningham', units:    75.2987, revenue:    467.8278,  percent:  0.026 },
  { name: 'Peter Clark',        units:   100,      revenue:     86.30,    percent:  0.004 },
  { name: 'Theresa Soto',       units:    10.89,   revenue: 674398.3498,  percent: 38.430 },
  { name: 'Russell Fisher',     units:     0.3892, revenue:  57892.9843,  percent:  3.298 },
  { name: 'Elizabeth Hudson',   units:    89.297,  revenue:   7897.498,   percent:  0.450 },
  { name: 'Heather Spencer',    units: 14098,      revenue:  98798.40598, percent:  5.630 },
  { name: 'Barbara Tran',       units:  1038.6829, revenue: 908553.2987,  percent: 51.773 },
  { name: 'Julia Anderson',     units: 83928.593,  revenue:   6780.998,   percent:  0.386 }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    UpperCasePipe,
    JsonPipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly reportDate = signal(new Date('Dec 25, 2058'));
  protected readonly expirationDate = signal(
    new Date('Jan 01, 2059')
  );
  protected readonly sales = signal(salesData);
  protected readonly showJSON = signal(false);
}
