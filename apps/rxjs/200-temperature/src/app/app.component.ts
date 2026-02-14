import { Component } from '@angular/core';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { TemperatureGraphComponent } from './temperature/temperature-graph/temperature-graph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, TemperatureGraphComponent]
})
export class AppComponent {}
