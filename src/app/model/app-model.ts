export class AppModel {
  authenticated: boolean;
  jsessionid: string;

  constructor() {
    this.authenticated = false;
    this.jsessionid = '';
  }
}
