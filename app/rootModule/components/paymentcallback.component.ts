import { Component } from '@angular/core';

import { UtilsService } from './../../services/utils';
import { PaymentService } from './../../services/payment';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'paymentcallback',
  templateUrl: './../templates/paymentcallback.html'
})
export class PaymentCallbackComponent  {
  merchant: string;
  amount: number;
  backURL: string;
  success: boolean = true;
  //success: boolean = false;

  constructor(private utilsService: UtilsService, private paymentService: PaymentService) { };
  
  ngOnInit() {
    let pd = this.paymentService.getPaymentDetails();
    this.merchant = pd.merchant;
    this.amount = pd.amount;
    this.backURL = pd.backURL;

    if(this.success)
      this.utilsService.setContext(new ClientContext("Done", true, "/merchants", "/merchants", "Find More Merchants", true));
    else
      this.utilsService.setContext(new ClientContext("Payment Gateway Error", true, this.backURL, this.backURL, "Try Again", true));
  }
}