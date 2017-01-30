import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../models/user';

import { UtilsService } from './utils';

@Injectable()
export class UserService {
  private _uname: string;
  private _user: User;  

  constructor(private http: Http, private utilsService: UtilsService) {  }

  isLoggedIn(): Promise<User> {
    return this.http
      .post(this.utilsService.getValidateUserURL(), JSON.stringify({ "username": this._user.id.toString() }), 
        { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.fillUser(res.json()))
      .catch(res => new User(null, null, null, null, null, null, null, null, null, null));
  }

  fillUser(res: any) {
    if(res && res.success !== false) {
      this._user.phone = res.mobileNumber;
      this._user.email = res.email;
      if(res.fullName) {
        let n = res.fullName.split(' ');
        if(n.length > 1) {
          this._user.lastName = n[n.length - 1];
          this._user.firstName = res.fullName.substring(0, res.fullName.length - this._user.lastName.length - 1);
        }
        else {
          this._user.firstName = res.fullName;
          this._user.lastName = '';
        }
      }
    }
    else
      return new User(null, null, null, null, null, null, null, null, null, null);

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
    if(!user || !res || res.success === false)
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
      .post(this.utilsService.getPFRegDetailsURL(), 
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
      .post(this.utilsService.getNumAvailableSeatsURL(), 
        JSON.stringify({ "eventId": 1 }), { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.getAvailableSeats(res.json()))
      .catch(res => null);    
  }

  registrationOutput(usr: User, res: any): User {
    if(!res || res.success === false)
      return null;
      
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
      .post(this.utilsService.getRegisterInPowaiFestURL(), JSON.stringify(reqObj), { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.registrationOutput(usr, res.json()))
      .catch(res => null);
  }
}