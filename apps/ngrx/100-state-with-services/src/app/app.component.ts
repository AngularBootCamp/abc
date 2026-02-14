import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DisplayOrEditComponent } from '@class-materials/shared/ui-display-or-edit';
import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    DisplayOrEditComponent,
    HeaderComponent,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private configService = inject(ConfigService);

  title = new FormControl();
  destroy = new Subject();

  ngOnInit() {
    this.configService.title
      .pipe(takeUntil(this.destroy))
      .subscribe(titleValue => this.title.setValue(titleValue));
  }

  setTitle() {
    this.configService.setTitle(this.title.value);
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
