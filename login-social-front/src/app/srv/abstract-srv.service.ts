import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AbstractSrvService {
  constructor() {}
  protected log(message: string) {
    console.log(`LogService(${this.constructor.name}): ${message}`);
  }
}
