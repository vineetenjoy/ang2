import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { ClientContext } from './../models/clientcontext';

@Injectable()
export class UtilsService {
  private _context: ClientContext;
  private _ch: number;
  private _publishNums: number = 5
  private _observeInterval: number = 1000

  constructor() {    
    this._context = new ClientContext("", false, "", "", "", false);
    this._ch = this._publishNums;
  }

  getContext():Observable<ClientContext> {
    let me = this;
    return Observable
        .interval(this._observeInterval)
        .filter(function () {
            return me._ch > 0;
        })
        .map(() => {
            this._ch--;
            return this._context;
        });
  }

  setContext(ctxt:ClientContext) {
    this._ch = this._publishNums;
    this._context = ctxt;
  }
}