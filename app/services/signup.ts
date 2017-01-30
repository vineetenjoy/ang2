import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../models/user';

import { UtilsService } from './utils';

@Injectable()
export class SignUpService {
  constructor(private http: Http, private utilsService: UtilsService) {  }

  sendOTP(phone: string): Promise<boolean> {
    return this.http
            .post(this.utilsService.getSendOTPURL(), JSON.stringify({ "mobileNumber": phone }), 
              { headers: this.utilsService.getHeaders() })
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
              .post(this.utilsService.getSignUpURL(), JSON.stringify(obj), 
                { headers: this.utilsService.getHeaders() })
              .toPromise()
              .then(res => JSON.stringify(res.json()))
              .catch(res => JSON.stringify(res.json()));
  }
}