import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { StudySetDevService } from './services/study-set-dev.service';
import { StudySetService } from './services/study-set.service';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    StudySetDevService,
    {provide: StudySetService, useClass: StudySetDevService},
    {provide: MATERIAL_SANITY_CHECKS, useValue: false}
  ]
};
