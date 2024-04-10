import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { StudySetDevService } from './services/study-set-dev.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { StudySetService } from './services/study-set.service';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { UserInfoService } from './services/user-info.service';
import { UserInfoFakeService } from './services/user-info-fake.service';
import { AuthService } from './services/auth.service';
import { AuthDevService } from './services/auth-dev.service';
import { AuthFirebaseService } from './services/auth-firebase.service';
import { StudySetFirebaseService } from './services/study-set-firebase.service';
import { UserInfoFirebaseService } from './services/user-info-firebase.service';
import {
  SearchStudySetService,
  SearchStudySetTypesenseService,
  SearchStudySetDevService } from './services/search-study-set/search-study-set-module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore( () => {
        const firestore= getFirestore();
        if (!environment.production) {
          connectFirestoreEmulator(firestore, 'localhost', 8080);
          console.log("Development Firestore being used...");
        }
        return firestore;
      }),
      provideStorage(() => {
        const storage = getStorage();
        if(!environment.production) {
          connectStorageEmulator(storage, 'localhost', 9199);
        }
        return storage;
      })
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideStorage(() => getStorage())),
    StudySetDevService,
    { provide: StudySetService,
      useClass: environment.useFirebase ? StudySetFirebaseService : StudySetDevService
    },
    UserInfoFakeService,
    { provide: UserInfoService,
      useClass: environment.useFirebase ? UserInfoFirebaseService : UserInfoFakeService
    },
    AuthDevService,
    { provide: AuthService,
      useClass: environment.useFirebase ? AuthFirebaseService : AuthDevService
    },
    {
      provide: SearchStudySetService,
      useClass: environment.useTypesense ? SearchStudySetTypesenseService : SearchStudySetDevService
    },
    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
  ]
};
