export class CsrfTokenModel {
  parameterName: string;
  token: string;
  headerName: string;

  constructor(data: any) {
    this.parameterName = data.parameterName;
    this.token = data.token;
    this.headerName = data.headerName;
  }
}
