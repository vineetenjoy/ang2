import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  private _uname: string;
  private _headers: Headers;
/*  private _baseURL: string = 'http://52.7.181.77:8080/';
  private _processPaymentURL: string = 'http://localhost:9090/benow/processPayment';*/
  private _baseURL: string = 'http://localhost:9090/';
  private _processPaymentURL: string = 'benow/processPayment';
  
/*  private _sendOTPURL: string = 'payments/registration/sendWebOTP';
  private _signUpURL: string = 'payments/registration/registerWebBenowUser';
  private _listMerchantsURL: string = 'payments/merchantpayment/listWebMerchants';
  private _searchMerchantsURL: string = 'payments/merchantpayment/searchWebMerchants';
  private _pFRegDetailsURL: string = 'payments/registration/checWebkUserRegForEvent';
  private _numAvailableSeatsURL: string = 'payments/registration/fecthWebNoOfAvailableSeats';
  private _registerInPowaiFestURL: string = 'payments/registration/updateWebUserEventDtl';
  private _validateUserURL: string = 'payments/registration/checkWebUserId';*/

  private _sendOTPURL: string = 'benow/sendOTP';//
  private _signUpURL: string = 'benow/signUp';//
  private _listMerchantsURL: string = 'benow/listMerchants';//
  private _searchMerchantsURL: string = 'benow/searchMerchants';//
  private _pFRegDetailsURL: string = 'benow/pFRegDetails';//
  private _numAvailableSeatsURL: string = 'benow/numAvailableSeats';
  private _registerInPowaiFestURL: string = 'benow/registerInPF';
  private _validateUserURL: string = 'benow/validateUser';//

  constructor() {
    this.refreshHeader();
  }

  getProcessPaymentURL(): string {
    return this._baseURL + this._processPaymentURL;
  }

  getRegisterInPowaiFestURL() {
    return this._baseURL + this._registerInPowaiFestURL;        
  }

  getNumAvailableSeatsURL() {
    return this._baseURL + this._numAvailableSeatsURL;        
  }

  getPFRegDetailsURL() {
    return this._baseURL + this._pFRegDetailsURL;        
  }

  getValidateUserURL() {
    return this._baseURL + this._validateUserURL;        
  }

  getSignUpURL() {
    return this._baseURL + this._signUpURL;        
  }

  getSendOTPURL() {
    return this._baseURL + this._sendOTPURL;    
  }

  getListMerchantsURL() {
    return this._baseURL + this._listMerchantsURL;
  }

  getSearchMerchantsURL() {
    return this._baseURL + this._searchMerchantsURL;
  }

  refreshHeader() {
    let beNOWut = JSON.parse(localStorage.getItem('beNOWut'));
    if(beNOWut && beNOWut.token && beNOWut.username) {
      this._uname = beNOWut.username.toString();
      this._headers = new Headers({
        'content-type': 'application/json',
        'X-AUTHORIZATION': beNOWut.token
      });
    }
    else {
      this._uname = '';
      this._headers = new Headers({
        'content-type': 'application/json'
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
      initials += ' ' + spl[spl.length-1][0];

    return initials.toUpperCase();
  }
}