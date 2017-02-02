import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Payment } from './../models/payment';

import { UtilsService } from './utils';

@Injectable()
export class PaymentService {
  constructor(private http: Http, private utilsService: UtilsService) { }

  getPayment(txnId: string): Promise<Payment> {
    return this.http
      .post(this.utilsService.getTxnDetailsURL(), 
        JSON.stringify({ "txnId": txnId }), { headers: this.utilsService.getHeaders() })
      .toPromise()
      .then(res => this.fillPayment(res.json()))
      .catch(res => null);    
  }

  fillPayment(res: any): Payment {
    if(!res || res.success === false)
      return null;

    return new Payment(res.txnId, res.amount, res.merchantName, res.cardNumber, res.paymentType);
  }
}