import { Component, OnInit }    from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UtilsService } from './../../services/utils';
import { PaymentService } from './../../services/payment';
import { Merchant } from './../../models/merchant';
import { ClientContext } from './../../models/clientcontext';
import { MerchantsService } from './../../services/merchants';


@Component({
  moduleId: module.id,
  selector: 'payment',
  templateUrl: './../templates/payment.html'
})
export class PaymentComponent  {
  merchant: Merchant;
  initials: string;
  color: string;
  amount: number = 0.00;
  paymentType: number;
  creditColor: string = 'transparent';
  debitColor: string = 'transparent';

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private router: Router, private utilsService: UtilsService, private merchantsService: MerchantsService) { };

  selectPaymentType(pType:number) {
    this.paymentType = pType;
    this.creditColor = 'transparent';
    this.debitColor = 'transparent';
    if(pType === 1)
      this.creditColor = '#FFF496';
    else if (pType === 2)
      this.debitColor = '#FFF496';

    this.paymentService.setPaymentDetails(this.amount, this.merchant.name, '/payment/' + this.merchant.id + '/' + this.color);
  }

  ngOnInit() {
    this.utilsService.setContext(new ClientContext("Secure Payment", true, "/merchants", "/paymentcallback", "Pay Now", true));
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