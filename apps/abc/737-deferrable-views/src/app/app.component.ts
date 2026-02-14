import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { HoverComponent } from './hover/hover.component';
import { IdleComponent } from './idle/idle.component';
import { ImmediateComponent } from './immediate/immediate.component';
import { InteractionComponent } from './interaction/interaction.component';
import { MultipleComponent } from './multiple/multiple.component';
import { NonStandaloneModule } from './non-standalone/non-standalone.module';
import { PrefetchedComponent } from './prefetched/prefetched.component';
import { TimerComponent } from './timer/timer.component';
import { ViewportComponent } from './viewport/viewport.component';
import { WhenComponent } from './when/when.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HoverComponent,
    IdleComponent,
    ImmediateComponent,
    InteractionComponent,
    MultipleComponent,
    NonStandaloneModule,
    PrefetchedComponent,
    ReactiveFormsModule,
    TimerComponent,
    ViewportComponent,
    WhenComponent
  ]
})
export class AppComponent {
  protected readonly triggers = signal([
    'Idle',
    'Viewport',
    'Interaction',
    'Hover',
    'Immediate',
    'Timer',
    'When',
    'Multiple',
    'Prefetched'
  ] as const);

  protected readonly currentTab =
    signal<ReturnType<typeof this.triggers>[number]>('Idle');

  protected readonly whenCondition = new FormControl(1, {
    nonNullable: true
  });
  protected readonly whenConditionMultiple = new FormControl(1, {
    nonNullable: true
  });
}
