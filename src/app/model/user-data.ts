import { v4 as uuidv4 } from 'uuid';
export class UserData {
  id: string;
  uuid: string;
  constructor(id:string, uuid:string) {
    this.id = id;
    this.uuid = uuid;
  }
}

