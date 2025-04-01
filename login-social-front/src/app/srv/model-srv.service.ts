import { Injectable } from '@angular/core';
import { APP_MODEL_KEY, PROFILE_URI } from '../constants/constants';
import { AppModel } from '../model/app-model';
import { UserData } from '../model/user-data';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root',
})
export class ModelSrvService {
  private appModelSubject = new BehaviorSubject<AppModel | null>(null);
  appModel$ = this.appModelSubject.asObservable(); // Para que los componentes puedan subscribirse

  // Método para actualizar el modelo
  setAppModel(newModel: AppModel) {
    this.saveModel(newModel);
    const aux = new AppModel({...newModel});
    this.appModelSubject.next(aux);
  }

  // Método para obtener el modeloo actual
  getAppModel(): AppModel  {
    if (this.appModelSubject.value != null)
      return this.appModelSubject.value;
    else {
      return this.cleanPrivateModel();
    }
  }

  /**
   * Nos aseguramos de que el modelo nunca sea nulo
   */
  constructor() {
    const aux = this.loadModel();
    this.setAppModel(aux);
  }
  existModel(): boolean {
    const data = localStorage.getItem(APP_MODEL_KEY);
    return data != null;
  }
  emptyModel(): boolean {
    const data = localStorage.getItem(APP_MODEL_KEY);
    let dataModel: AppModel;
    if (data) {
      dataModel = JSON.parse(data);
      return dataModel.csrfToken != null && dataModel.user != null;
    }
    return data != null;
  }
  isUserAuthenticated(): boolean {
    return this.getAppModel().isAuthenticated();
  }

  private cleanPrivateModel():AppModel {
    localStorage.removeItem(APP_MODEL_KEY);

    const newModel = this.loadModel();
    this.setAppModel(newModel);
    return newModel;
  }

  cleanModel() {
    this.cleanPrivateModel();
  }

  private saveModel(model: AppModel) {
    localStorage.setItem(APP_MODEL_KEY, JSON.stringify(model));
  }

  /**
   * Lo carga del localStorage o lo crea
   * @returns El modelo
   */
  private loadModel(): AppModel {
    const data = localStorage.getItem(APP_MODEL_KEY);
    return data ? new AppModel(JSON.parse(data)) : new AppModel({});
  }
}
