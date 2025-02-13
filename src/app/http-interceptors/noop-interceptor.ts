import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable({
  providedIn: 'root', //Se registra automáticamente en el inyector
})
export class NoopInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers); // Para ver si el XSRF-TOKEN está presente
    return next.handle(req);
  }
}
