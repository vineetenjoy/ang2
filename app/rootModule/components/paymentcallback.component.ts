import { Component } from '@angular/core';

import { PaymentService } from './../../services/payment';

@Component({
  moduleId: module.id,
  selector: 'paymentcallback',
  templateUrl: './../templates/paymentcallback.html'
})
export class PaymentCallbackComponent  {
  amount: number;
  merchant: string;
  backURL: string;
  //success: boolean = true;
  success: boolean = false;
  showBack: boolean = true;
  action: string = "Find More Merchants";
  backRoute: string = "/merchants/0";
  nextRoute: string = "/merchants/0";
  title: string = "Done";

  constructor(private paymentService: PaymentService) { };
  
  ngOnInit() {
    let pd = this.paymentService.getPaymentDetails();
    this.merchant = pd.merchant;
    this.amount = pd.amount;
    this.backURL = pd.backURL;

    if(!this.success) {
      this.action = "Try Again";
      this.title = "Payment Gateway Error";
      this.backRoute = this.backURL;
      this.nextRoute = this.backURL;
    }
  }
}