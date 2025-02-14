import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppModel } from '../model/app-model';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { API_BASE_URL, LOGOUT_URI, PROFILE_URI } from '../constants/constants';
import { UserData } from '../model/user-data';
import { AbstractSrvService } from './abstract-srv.service';
import { ModelSrvService } from './model-srv.service';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root',
})
export class BackSrvService extends AbstractSrvService {
  modelService: ModelSrvService = inject(ModelSrvService);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    super();
    this.http = http;
  }
  init(): AppModel {
    let model: AppModel;
    model = this.modelService.getAppModel();

    this.getXSRFTOKEN2()
      .pipe(
        switchMap((csrfResponse: any) => {
          // debugger;
          // const csrfToken = (csrfResponse as { token: string }).token;
          const csrfToken = (csrfResponse as { token: string }).token;
          console.log('[GO IN COMPONENT]: Token=', csrfToken);
          model.csrfToken = csrfResponse;
          this.modelService.setAppModel(model);
          return this.postProfile();
        }),
        catchError((error) => {
          console.error('Error:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          // debugger;
          console.log('Profile executed ok', response);
          model.user = new UserModel(response);
          this.modelService.setAppModel(model);
        },
        error: (error) => {
          console.error('Error profile:', error);
        },
      });

    return model;
  }

  getXSRFTOKEN2() {
    return this.http.get('http://localhost:8080/csrf-token2', {
      withCredentials: true,
    });
  }

  postProfile(): Observable<string | UserData> {
    return this.http
      .post<UserData>(PROFILE_URI, {}, { withCredentials: true })
      .pipe(
        tap((_) => {
          this.log('getting profile');
        }),
        catchError(this.handleError<string>('ModelSrv: Error', ''))
      );
  }

  postLogout() {
    this.http
      .post(LOGOUT_URI, {withCredentials: true})
      .subscribe({
        next: (response) => {
          this.modelService.cleanModel();
          this.log('Logged out');
        }
      });
  }

  async getUserAuthenticated(): Promise<object | undefined> {
    const uri = API_BASE_URL + '/user';
    // debugger;
    this.log(uri);
    const data = fetch(uri);
    console.log(data);
    return (await data) ?? {};
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // debugger;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
