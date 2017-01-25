import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../models/user';
import { UtilsService } from './utils';

@Injectable()
export class SignUpService {
  private _baseURL: string;
  private _headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private utilsService: UtilsService) { 
    this._baseURL = this.utilsService.getBaseURL();
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  sendOTP(phone: string): Promise<string> {
    return this.http
            .post(this._baseURL + 'payments/registration/sendWebOTP', JSON.stringify({ "mobileNumber": phone }), { headers: this._headers })
            .toPromise()
            .then(res => JSON.stringify(res.json().data))
            .catch(this.handleError);
  }

  isUNameAvailable(uname:string) {
    return true;
  }

  createUser(user:User) {
    return { isSuccess: true, uerId: 'abcd' };
  }

  validateUser(userId:string, oTP:string) {
      return { isSuccess: true, errMsg: '' };
  }
}