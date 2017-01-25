import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Merchant } from './../../models/merchant';

import { PaymentService } from './../../services/payment';
import { MerchantsService } from './../../services/merchants';


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

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private router: Router, private merchantsService: MerchantsService) { 
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
    if(this.merchant && this.merchant.name) {
        let spl = this.merchant.name.split(' ');
        if(spl.length > 0 && spl[0].length > 0)
          this.initials = spl[0][0];
        
        if(spl.length > 1 && spl[spl.length-1].length > 0)
          this.initials += spl[spl.length-1][0];

        this.initials = this.initials.toUpperCase();
    }
  }
}