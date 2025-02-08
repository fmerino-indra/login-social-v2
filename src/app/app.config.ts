import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routeConfig } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NoopInterceptor } from './http-interceptors/noop-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi()),{provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true}
  ],
};
