import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class UtilsService {
  private _title: string;
  private _ch: boolean;

  constructor() {
    this._title = "";
    this._ch = true;
  }

  getTitle():Observable<string> {
    let ch = this._ch;
    return Observable
        .interval(1000)
        .filter(function () {
            return ch;
        })
        .map(() => {
            this._ch = false;
            return this._title;
        });
  }

  setTitle(ttl:string){
    this._ch = true;
    this._title = ttl;
  }
}