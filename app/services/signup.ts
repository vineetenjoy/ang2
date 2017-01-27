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

  sendOTP(phone: string): Promise<boolean> {
    return this.http
            .post(this._baseURL + 'payments/registration/sendWebOTP', JSON.stringify({ "mobileNumber": phone }), 
              { headers: this._headers })
            .toPromise()
            .then(res => res.json().responseFromAPI)
            .catch(res => false);
  }

  validateUser(user:User, otp:string): Promise<string> {
      let obj = { 
                  "appUserReg": {
                      "username": user.phone.toString(), 
                      "fullName": user.firstName + ' ' + user.lastName, 
                      "mobileNumber": user.phone.toString()
                    },
                    "registrationOTP": {
                      "mobileNumber": user.phone.toString(), 
                      "otp" : otp.toString()
                    }
                  };
                        
      return this.http
              .post(this._baseURL + 'payments/registration/registerWebBenowUser', JSON.stringify(obj), 
                { headers: this._headers })
              .toPromise()
              .then(res => JSON.stringify(res.json()))
              .catch(res => JSON.stringify(res.json()));
  }
}