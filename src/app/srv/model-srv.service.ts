import { Injectable } from '@angular/core';
import { APP_MODEL_KEY, PROFILE_URI } from '../constants/constants';
import { AppModel } from '../model/app-model';
import { UserData } from '../model/user-data';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelSrvService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getProfile(): Observable<string|UserData> {
    return this.http.get<UserData>(PROFILE_URI)
      .pipe(
        tap(_ => {
          this.log('getting profile');
        }),
        catchError(this.handleError<string>('KyberService: Say Hello', ''))
      );
  }

  isUserAuthenticated() {
    let jsonModel: string = localStorage.getItem(APP_MODEL_KEY)!;
    let appModel: AppModel;// = { authenticated:false};
    if (jsonModel) {
      appModel = JSON.parse(jsonModel);
    }
    return (jsonModel != null && appModel!.authenticated);
  }

  cleanModel (): AppModel {
    localStorage.removeItem(APP_MODEL_KEY);
    const newModel = new AppModel();

    localStorage.setItem(APP_MODEL_KEY, JSON.stringify(newModel));

    return newModel;
  }

  async getUserAuthenticated(): Promise<object|undefined> {
    const uri = API_BASE_URL + "/user";
    // debugger;
    console.log(uri);
    const data = fetch(uri);
    console.log(data);
    return (await data) ?? {};
  }

    private log(message: string) {
        console.log(`KyberService: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
debugger;
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
