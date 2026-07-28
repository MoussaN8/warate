import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import{provideFirebaseApp,initializeApp} from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     providePrimeNG({
            /* Configuration */
        }),
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
     provideFirestore(() => getFirestore()),
  ]
};
