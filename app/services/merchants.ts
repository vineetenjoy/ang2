import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './../models/User';
import { Merchant } from './../models/merchant';

import { UtilsService } from './utils';

@Injectable()
export class MerchantsService {
  private _curPage: number;
  private _totalPages: number;
  private _term: string;
  private _baseURL: string;
  private _headers: Headers;
  private _searches: string[];
  private _merchants: Merchant[];

  constructor(private http: Http, private utilsService: UtilsService) {
    this._baseURL = this.utilsService.getBaseURL();
    this._headers = this.utilsService.getHeaders();
    this._searches = new Array();
  }

  resetSearches() {
    this._searches = new Array();
  }

  getTotalPages(): number {
    return this._totalPages;
  }

  getCurrentPage(): number {
    return this._curPage;
  }

  getCurrentTerm(): string {
    return this._term;
  }

  fillMerchant(dbMerchant: any): Merchant {
    let modes = '';
    let pms = dbMerchant.paymentMethods;
    if(pms && pms.length > 0) {
      for(let pm of pms) {
        if(pm.trim().toUpperCase() == "CREDIT_CARD") {
          modes += 'Credit Card';
          break;
        }
      }

      for(let pm of pms) {
        if(pm.trim().toUpperCase() == "DEBIT_CARD") {
          if(modes)
            modes += ', Debit Card';
          else
            modes = 'Debit Card';
          break;
        }
      }
    }

    return new Merchant(
      dbMerchant.merchantId,
      dbMerchant.displayName,
      dbMerchant.category ? dbMerchant.category : 'Not Categorized',
      dbMerchant.locality ? dbMerchant.locality : 'NA',
      modes ? modes : 'Android only',
      dbMerchant.imgsrc,
      dbMerchant.averageRating == "NaN" ? null : +dbMerchant.averageRating
    );
  }

  fillMerchants(res: any): Merchant[] {
    let dbMerchants = res.merchantDetailsList;
    this._totalPages = res.totalNoOfPages;
    let merchants: Merchant[] = new Array();
    for(let dbm of dbMerchants)
      merchants.push(this.fillMerchant(dbm));

    this._merchants = merchants;
    return merchants;
  }

  getBackRoute() {
    if(!this._searches || this._searches.length < 2)
      return '/home';
    else
      return this._searches[this._searches.length - 2];
  }

  getLastRoute() {
    if(this._searches && this._searches.length > 0)
      return this._searches[this._searches.length - 1];
    else
      return '/merchants/0;search=';
  }

  pushInSearches(srch: string) {
    if(!this._searches)
      this._searches = new Array();
    
    if(this._searches.length > 1 && this._searches[this._searches.length - 2] == srch)
      this._searches.pop();
    else 
      this._searches.push(srch);
  }

  getMerchants(search: string, page: number, user: User): Promise<Merchant[]> {
    if(!search)
      search = '';
      
    this._curPage = page;
    this._term = search;
    this._merchants = new Array();
    this.pushInSearches('/merchants/' + page.toString() + ';search=' + search);
    let searchObj = {
      "emailAddress":user.phone,
      "lattitude":"0.0",
      "longitude":"0.0",
      "pageNumber":page,
      "sortingOrder":"ASC"
    };

    let url = this._baseURL + 'payments/merchantpayment/listWebMerchants';
    if(search) {
      searchObj["searchParam"] = search
      url = this._baseURL + 'payments/merchantpayment/searchWebMerchants';
    }

    return this.listMerchants(searchObj, url);
  }

  listMerchants(searchObj: any, url: string): Promise<Merchant[]> {
    return this.http
      .post(url, JSON.stringify(searchObj), { headers: this._headers })
      .toPromise()
      .then(res => this.fillMerchants(res.json()))
      .catch(res => null);    
  }  

  getMerchant(id:string):Merchant {
    return this._merchants.find(m => m.merchantId == id);
  }
}