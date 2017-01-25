import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  private _baseURL: string = 'http://52.7.181.77:8080/';

  getBaseURL(): string {
    return this._baseURL;
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