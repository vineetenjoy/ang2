import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  private _uname: string;
  private _headers: Headers;
  private _baseURL: string = 'http://52.7.181.77:8080/';

  constructor() {
    this.refreshHeader();
  }

  refreshHeader() {
    let beNOWut = JSON.parse(localStorage.getItem('beNOWut'));
    if(beNOWut && beNOWut.token && beNOWut.username) {
      this._uname = beNOWut.username.toString();
      this._headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + beNOWut.token
      });
    }
    else {
      this._uname = '';
      this._headers = new Headers({
        'Content-Type': 'application/json'
      });      
    }    
  }

  hasToken(): boolean {
    if(this._uname && this._headers)
      return true;

    return false;
  }

  getBaseURL(): string {
    return this._baseURL;
  }

  getHeaders(): Headers {
    return this._headers;
  }

  getUName(): string {
    return this._uname;
  }

  getInitials(name: string): string {
    let initials = '';
    let spl = name.split(' ');    
    if(spl.length > 0 && spl[0].length > 0)
      initials = spl[0][0];

    if(spl.length > 1 && spl[spl.length-1].length > 0)
      initials += spl[spl.length-1][0];

    return initials.toUpperCase();
  }
}