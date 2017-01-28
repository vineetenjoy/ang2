import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../models/user';

import { UtilsService } from './utils';

@Injectable()
export class UserService {
  private _uname: string;
  private _baseURL: string;
  private _user: User;  
  private _headers: Headers;

  constructor(private http: Http, private utilsService: UtilsService) {
    this._baseURL = this.utilsService.getBaseURL();
    this._uname = this.utilsService.getUName();
    this._headers = this.utilsService.getHeaders();
    this._user = new User(this._uname, null, null, null, null, null, null, null, null);
  }

  getUser() {
    return this._user;
  }

  setUser(usr:User) {
    this._user = usr;
  }

  isRegisteredToPFest(): Promise<boolean> {
    //DUMMY AS OF NOW
    return this.http
      .post(this._baseURL + 'payments/registration/checkWebUserId', JSON.stringify({ "username": this._uname }), 
        { headers: this._headers })
      .toPromise()
      .then(res => this._user.powaiFestRegister)
      .catch(res => this._user.powaiFestRegister);    
  }

  isLoggedIn(): Promise<boolean> {
    //DUMMY AS OF NOW
    return this.http
      .post(this._baseURL + 'payments/registration/checkWebUserId', JSON.stringify({ "username": this._uname }), 
        { headers: this._headers })
      .toPromise()
      .then(res => this._user.id ? true : false)
      .catch(res => this._user.id ? true : false);
  }

  registerForPowaiFest(usr: User): Promise<boolean> {
    //DUMMY AS OF NOW
    this._user.powaiFestRegister = true;
    return this.http
      .post(this._baseURL + 'payments/registration/checkWebUserId', JSON.stringify({ "username": this._uname }), 
        { headers: this._headers })
      .toPromise()
      .then(res => this._user.powaiFestRegister)
      .catch(res => this._user.powaiFestRegister);    
  }
}