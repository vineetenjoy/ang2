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

  constructor(private http: Http, private utilsService: UtilsService) {
    this._baseURL = this.utilsService.getBaseURL();
  }

  isLoggedIn(): Promise<User> {
    //DUMMY AS OF NOW
    return this.http
      .post(this._baseURL + 'payments/registration/checkWebUserId', JSON.stringify({ "username": this._user.id.toString() }), 
        { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.fillUser(res.json()))
      .catch(res => null);
  }

  fillUser(res: any) {
    //TODO: handle errors here, for null return empty user.
    return this._user;
  }

  getUser(): Promise<User> {
    if(!this._user) {
      if(this.utilsService.hasToken()) {
        this._user = new User(this.utilsService.getUName(), null, null, null, null, null, null, null, null, null);
        this.isLoggedIn().then(res => this._user)
      }
      else
        this._user = new User(null, null, null, null, null, null, null, null, null, null);
    }

    return Promise.resolve(this._user);
  }

  setUser(usr:User) {
    this._user = usr;
  }

  fillRegistrationDetails(user: User, res: any): User {
    if(!user || !res)
      return null;

    user.email = res.email;
    user.address = res.address;
    user.powaiFestRegister = res.isRegistered;
    if(user.powaiFestRegister) {
      user.numSeats = res.noOfSeatsBooked;
      if(user.numSeats > 0)
        user.bollywoodRegister = true;
    }

    this._user = user;
    return user;
  }

  getPFRegistrationDetails(user: User): Promise<User> {
    return this.http
      .post(this._baseURL + 'payments/registration/checWebkUserRegForEvent', 
        JSON.stringify({ "username": user.id.toString(), "eventId": 1 }), 
        { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.fillRegistrationDetails(user, res.json()))
      .catch(res => null);    
  }

  getAvailableSeats(res: any): number {
    if(!res || res.noOfAvailableSeats == undefined)
      return null;

    return res.noOfAvailableSeats;
  }

  numAvailableSeatsInPF(): Promise<number> {
    return this.http
      .post(this._baseURL + 'payments/registration/fecthWebNoOfAvailableSeats', 
        JSON.stringify({ "eventId": 1 }), { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.getAvailableSeats(res.json()))
      .catch(res => null);    
  }

  registrationOutput(usr: User, res: any): User {
    usr.powaiFestRegister = true;
    usr.numSeats = res.noOfSeats;
    if(usr.numSeats > 0)
      usr.bollywoodRegister = true;

    this._user = usr;
    return usr;
  }

  registerForPowaiFest(usr: User): Promise<User> {
    this._user.numSeatsRequested = +this._user.numSeats;
    let reqObj = { 
          "username": this._user.id.toString(),
          "email": this._user.email,
          "address": this._user.address,
          "eventId": 1,
          "noOfSeats": this._user.numSeats
        };

    return this.http
      .post(this._baseURL + 'payments/registration/updateWebUserEventDtl', JSON.stringify(reqObj), { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.registrationOutput(usr, res.json()))
      .catch(res => null);
  }
}