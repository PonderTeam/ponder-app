import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  AuthService,
  AuthDevService,
  AuthFirebaseService } from './services/auth/auth-module';
import {
  StudySetService,
  StudySetDevService,
  StudySetFirebaseService } from './services/study-set/study-set-module';
import {
  UserInfoService,
  UserInfoFakeService,
  UserInfoFirebaseService } from './services/user/user-info-module';
import {
  SearchStudySetService,
  SearchStudySetTypesenseService,
  SearchStudySetFakeService } from './services/search-study-set/search-study-set-module';
import {
  QuerySuggestionFakeService,
  QuerySuggestionService,
  QuerySuggestionTypesenseService } from './services/query-suggestions/query-suggestion-module';
import {
  ImageService,
  ImageDevService,
  ImageFirebaseService} from './services/image/image-service-module';

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
      useClass: environment.useTypesense ? SearchStudySetTypesenseService : SearchStudySetFakeService
    },
    {
      provide: QuerySuggestionService,
      useClass: environment.useTypesense ? QuerySuggestionTypesenseService : QuerySuggestionFakeService
    },
    {
      provide: ImageService,
      useClass: environment.useFirebase ? ImageFirebaseService : ImageFirebaseService
    },
    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
  ]
};
