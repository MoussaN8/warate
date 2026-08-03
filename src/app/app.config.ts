import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import{provideFirebaseApp,initializeApp} from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import Aura from '@primeng/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     providePrimeNG({
        theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark', // Ou '.dark'
        }
      }
        }),
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
     provideFirestore(() => getFirestore()),
  ]
};
