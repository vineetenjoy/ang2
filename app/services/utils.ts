import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  private _baseURL: string = 'http://52.7.181.77:8080/';

  getBaseURL():string {
    return this._baseURL;
  }
}