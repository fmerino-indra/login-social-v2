//import { v4 as uuidv4 } from 'uuid';

export class UserData {
  _id: string;
  _name: string;
  _email: string;
  _imageUrl: string;
  _emailVerified: boolean;
  _attributes: object;

  constructor(data: any) {
    this._id = data.id;
    this._name = data.name;
    this._email = data.email;
    this._imageUrl = data.imageUrl;
    this._emailVerified = data.emailVerified;
    this._attributes = data.attributes;
  }

  get id():string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name():string {
    return this._name;
  }
  set name(name:string) {
    this._name=name;
  }

  get email():string {
    return this._email;
  }
  set email(email:string) {
    this._email=email;
  }

  get imageUrl():string {
    return this._imageUrl;
  }
  set imageUrl(imageUrl:string) {
    this._imageUrl=imageUrl;
  }

  get emailVerified():boolean {
    return this._emailVerified;
  }
  set emailVerified(emailVerified:boolean) {
    this._emailVerified;
  }

  get attributes(): object {
    return this._attributes;
  }
  set attributes(attributes:object) {
    this._attributes=attributes;
  }

}

