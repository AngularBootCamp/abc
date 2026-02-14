import { registerLocaleData } from '@angular/common';
// load data for any additional locales you may need
import localeDe from '@angular/common/locales/de'; // Germany
import localeRu from '@angular/common/locales/ru'; // Russia
import localeZh from '@angular/common/locales/zh'; // China
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// register locale data
registerLocaleData(localeDe);
registerLocaleData(localeRu);
registerLocaleData(localeZh);

bootstrapApplication(AppComponent, appConfig).catch(err =>
  console.error(err)
);
