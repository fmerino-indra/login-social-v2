import { Injectable } from '@angular/core';
import { APP_MODEL_KEY, PROFILE_URI } from '../constants/constants';
import { AppModel } from '../model/app-model';
import { UserData } from '../model/user-data';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root',
})
export class ModelSrvService {

  constructor() {}
  existModel():boolean {
    const data = localStorage.getItem(APP_MODEL_KEY);
    return (data != null);
  }
  emptyModel():boolean {
    const data = localStorage.getItem(APP_MODEL_KEY);
    let dataModel: AppModel;
    if (data) {
     dataModel = JSON.parse(data);
     return (dataModel.csrfToken != null && dataModel.user != null);
    }
    return (data != null);
  }
  isUserAuthenticated(): boolean {
    return this.loadModel().isAuthenticated();
  }

  cleanModel(): AppModel {
    localStorage.removeItem(APP_MODEL_KEY);
    const newModel = new AppModel({});
    this.saveModel(newModel);
    return newModel;
  }

  saveModel(model: AppModel) {
    localStorage.setItem(APP_MODEL_KEY, JSON.stringify(model));
  }

  loadModel(): AppModel {
    const data = localStorage.getItem(APP_MODEL_KEY);
    return data ? new AppModel(JSON.parse(data)) : this.cleanModel();
  }
}
