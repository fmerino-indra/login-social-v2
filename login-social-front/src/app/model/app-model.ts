import { CsrfTokenModel } from "./csrf-token-model";
import { UserModel } from "./user-model";

export class AppModel {
  jsessionid: string;
  private _csrfToken: CsrfTokenModel;
  private _user: UserModel;

  constructor(data: any) {
    this.jsessionid = data.jsessionid;
    this._csrfToken = data._csrfToken;
    this._user = data._user;
  }

  set csrfToken(token: CsrfTokenModel) {
    this._csrfToken = token;
  }

  get csrfToken(): CsrfTokenModel {
    return this._csrfToken;
  }

  set user(user: UserModel) {
    this._user = user;
  }

  get user(): UserModel {
    return this._user;
  }

  isAuthenticated(): boolean {
    return !(this._csrfToken == null
      || Object.keys(this._csrfToken).length == 0
      || this._user == null
      || Object.keys(this._user).length == 0);
  }
}
