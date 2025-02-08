import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AppFuncModel } from '../model/app-func-model';
import { AppFuncModelRezo } from '../model/app-func-model-rezo';
import { FUNC_APP_MODEL_KEY, REZO_URI } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class FuncModelSrvService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getRezo(): Observable<string|AppFuncModelRezo> {
    return this.http.get<AppFuncModelRezo>(REZO_URI)
    .pipe(
      tap(_ => {
        this.log('getting rezo');
      }),
      catchError(this.handleError<string>('RezoService: An error ocurred'))
    );
  }

  cleanModel (): AppFuncModel {
    localStorage.removeItem(FUNC_APP_MODEL_KEY);
    const newModel = new AppFuncModel();

    localStorage.setItem(FUNC_APP_MODEL_KEY, JSON.stringify(newModel));

    return newModel;
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
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
