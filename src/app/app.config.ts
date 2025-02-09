import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations'; // Importa provideAnimations
import { provideToastr } from 'ngx-toastr'; // Importa provideToastr

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserModule),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
};
