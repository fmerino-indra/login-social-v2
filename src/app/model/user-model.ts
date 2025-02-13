import { UserData } from "./user-data";

export class UserModel {
  userData: UserData;

  constructor(data:any) {
    this.userData = new UserData(data);
  }
}
