import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Merchant } from './../../models/merchant';

import { PaymentService } from './../../services/payment';
import { MerchantsService } from './../../services/merchants';
import { UtilsService } from './../../services/utils';

@Component({
  moduleId: module.id,
  selector: 'payment',
  templateUrl: './../templates/payment.html'
})
export class PaymentComponent  {
  paymentType: number;
  color: string;
  initials: string;
  debitColor: string;
  creditColor: string;
  merchant: Merchant;
  showBack: boolean = true;
  amount: number = 0.00;
  debitType: number = 2;
  creditType: number = 1;
  action: string = "Pay Now";
  title: string = "Secure Payment";
  backRoute: string = "/merchants";
  selectedColor: string = '#FFF496';
  nextRoute: string = "/paymentcallback";
  unselectedColor: string = 'transparent';

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private router: Router, 
    private merchantsService: MerchantsService, private utilsService: UtilsService) { 
    this.creditColor = this.unselectedColor;
    this.debitColor = this.unselectedColor;
  };

  selectPaymentType(pType:number) {
    this.paymentType = pType;
    this.creditColor = this.unselectedColor;
    this.debitColor = this.unselectedColor;
    if(pType === this.creditType)
      this.creditColor = this.selectedColor;
    else if (pType === this.debitType)
      this.debitColor = this.selectedColor;

    this.paymentService.setPaymentDetails(this.amount, this.merchant.name, '/payment/' + this.merchant.id + '/' + this.color);
  }

  ngOnInit() {
    let merchantId = this.route.snapshot.params['merchantId'];
    this.color = '#' + this.route.snapshot.params['color'];
    this.merchant = this.merchantsService.getMerchant(merchantId);
    if(this.merchant && this.merchant.name)
        this.initials = this.utilsService.getInitials(this.merchant.name);
  }
}