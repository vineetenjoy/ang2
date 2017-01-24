import { Component } from '@angular/core';

import { UtilsService } from './../../services/utils';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'payment',
  templateUrl: './../templates/payment.html'
})
export class PaymentComponent  {
  constructor(private utilsService: UtilsService) { };
  
  ngOnInit() {
    this.utilsService.setContext(new ClientContext("Secure Payment", true, "/merchants", "/paymentcallback", "Pay Now", true));
  }
}