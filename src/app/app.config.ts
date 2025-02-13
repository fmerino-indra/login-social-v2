import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routeConfig } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi, withXsrfConfiguration } from '@angular/common/http';
import { NoopInterceptor } from './http-interceptors/noop-interceptor';
import { xsrfInterceptor } from './http-interceptors/xsrf-interceptor';
import { CsrfInterceptor } from './http-interceptors/csrf-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig),
    provideHttpClient(
      withInterceptorsFromDi(),
      // withInterceptors([xsrfInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      })
    ),
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
  ]
};
/* No usamos los interceptores csrf y xsrf porque las cookies no las ve desde JS (HttpOnly).
Aunque esto no es del todo cierto, ya que JSESSIONID sí es HttpOnly pero XSRF-TOKEN no.
*/
