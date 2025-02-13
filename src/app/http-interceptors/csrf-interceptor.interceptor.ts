import {  inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { APP_MODEL_KEY } from '../constants/constants';
import { AppModel } from '../model/app-model';
import { ModelSrvService } from '../srv/model-srv.service';

@Injectable({
  providedIn: 'root',
})
export class CsrfInterceptor implements HttpInterceptor {
  modelService: ModelSrvService = inject(ModelSrvService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
//debugger;
    // const xsrfToken = this.getXsrfTokenFromCookie();

    const xsrfToken = this.getXsrfTokenFromModel();

    if (xsrfToken) {
      req = req.clone({
        setHeaders: {
          'X-CSRF-TOKEN': xsrfToken,
        },
      });
    } else {
      console.log('[CSRF Interceptor] XSRF-TOKEN NOT FOUND');
    }

    return next.handle(req);
  }

  private getXsrfTokenFromCookie(): string | null {
    console.log('[CSRF Interceptor] Cookies:', document.cookie);
    // Aquí debes acceder a la cookie XSRF-TOKEN
    const xsrfCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('XSRF-TOKEN='));
    return xsrfCookie ? xsrfCookie.split('=')[1] : null;
  }

    private getXsrfTokenFromModel(): string | null {
      /*
      const model = this.modelService.loadModel();
      if ((model.csrfToken != null )
        && (model.csrfToken.token != null))
          return model.csrfToken.token;
      else
        return null;
      */
      // const data = localStorage.getItem(APP_MODEL_KEY);
      // const parsedData = data ? JSON.parse(data) : JSON.parse('{}');
      // return parsedData.csrfToken;

      const model: AppModel = this.modelService.loadModel();
      return (model && model.csrfToken && model.csrfToken.token) ? model.csrfToken.token : null;
    }

    // private loadModel(): AppModel {
    //     const data = localStorage.getItem(APP_MODEL_KEY);
    //     return data ? new AppModel(JSON.parse(data)) : new AppModel({});
    //   }


}
