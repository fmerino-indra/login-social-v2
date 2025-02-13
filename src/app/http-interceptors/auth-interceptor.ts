import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root' //Se registra automáticamente en el inyector
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      debugger;
      return next.handle(req).pipe(
        tap({
          next: (event) => {
            debugger;
            console.log('Intercepción', event);
            if (event instanceof HttpResponse) {
              console.log('Respuesta HTTP:', event);
            }
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              console.error('Error en la respuesta HTTP:', error);
            }
          }
        })
      );
  }

}
