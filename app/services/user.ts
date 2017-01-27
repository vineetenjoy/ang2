import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../models/user';

import { UtilsService } from './utils';

@Injectable()
export class UserService {
  private _user:User;
  private _baseURL: string;
  private _headers: Headers;
  private _loggedIn: boolean = false;

  constructor(private http: Http, private utilsService: UtilsService) {
    this._user = new User(null, null, null, null, null, null, null, null, null);
    this._baseURL = this.utilsService.getBaseURL();
  }

  getUser() {
    return this._user;
  }

  setUser(usr:User) {
    this._user = usr;
  }

  resetUser() {
    this._user = new User(null, null, null, null, null, null, null, null, null);
  }

  getRequestHeaders() {
    return this._headers;
  }

  checkUser(uname: string): Promise<string> {
    return this.http
      .post(this._baseURL + 'payments/registration/checkWebUserId', JSON.stringify({ "username": uname }), 
        { headers: this._headers })
      .toPromise()
      .then(res => JSON.stringify(res.json()))
      .catch(res => JSON.stringify(res.json()));
  }

  registerForPowaiFest(usr: User): boolean {
    return false;
  }

  isLoggedIn() {
    let beNOWut = JSON.parse(localStorage.getItem('beNOWut'));
    if(beNOWut && beNOWut.token) {
      this._headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + beNOWut.token
      });

      this.checkUser(beNOWut.username.toString())
        .then(success => console.log(success))
    }

    return this._loggedIn;
  }
}