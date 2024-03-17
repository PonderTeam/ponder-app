import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { StudySetDevService } from './services/study-set-dev.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { StudySetService } from './services/study-set.service';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { UserInfoService } from './services/user-info.service';
import { UserInfoFakeService } from './services/user-info-fake.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    StudySetDevService,
    { provide: StudySetService, useClass: StudySetDevService },   // change useClass to use firebase
    UserInfoFakeService,
    { provide: UserInfoService, useClass: UserInfoFakeService },  // change useClass to use firebase
    { provide: MATERIAL_SANITY_CHECKS, useValue: false }
  ]
};
