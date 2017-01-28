import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';
import { Merchant } from './../../models/merchant';

import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
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
  user: User;
  merchant: Merchant;
  submit: boolean = false;
  debitSupport: boolean = false;
  creditSupport: boolean = false;
  amount: number = 0.00;
  debitType: number = 2;
  creditType: number = 1;
  action: string = "Pay Now";
  title: string = "Secure Payment";
  selectedColor: string = '#FFF496';
  nextRoute: string = "/paymentcallback";
  unselectedColor: string = 'transparent';

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private router: Router, 
    private merchantsService: MerchantsService, private utilsService: UtilsService, private userService: UserService) { 
    this.creditColor = this.unselectedColor;
    this.debitColor = this.unselectedColor;
  };

  back() {
    this.router.navigateByUrl(this.merchantsService.getLastRoute());    
  }

  selectPaymentType(pType:number) {
    this.paymentType = pType;
    this.creditColor = this.unselectedColor;
    this.debitColor = this.unselectedColor;
    if(pType === this.creditType)
      this.creditColor = this.selectedColor;
    else if (pType === this.debitType)
      this.debitColor = this.selectedColor;

    this.paymentService.setPaymentDetails(this.amount, this.merchant.displayName, 
      '/payment/' + this.merchant.merchantId + '/' + this.color);
  }

  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res))    
  }

  init(usr: User) {
    this.user = usr;
    if(!this.user || !this.user.id)
      this.router.navigateByUrl('signup');
    else {
      let merchantId = this.route.snapshot.params['merchantId'];
      this.color = '#' + this.route.snapshot.params['color'];
      this.merchant = this.merchantsService.getMerchant(merchantId);
      if(this.merchant) {
        if(this.merchant.displayName)
          this.initials = this.utilsService.getInitials(this.merchant.displayName);
        
        if(this.merchant.paymentModes && this.merchant.paymentModes.toUpperCase().indexOf('DEBIT CARD') >= 0)
          this.debitSupport = true;

        if(this.merchant.paymentModes && this.merchant.paymentModes.toUpperCase().indexOf('CREDIT CARD') >= 0)
          this.creditSupport = true;

        if(!this.debitSupport && !this.creditSupport) {
          this.nextRoute = '/merchants/0';
          this.action = 'More Merchants';
        }
        else {
          if(this.creditSupport) {
            this.paymentType = this.creditType;
            this.creditColor = this.selectedColor;
          }
          else {
            this.paymentType = this.debitType;
            this.debitColor = this.selectedColor;        
          }
        }
      }
      else
        this.router.navigateByUrl('/merchants/0');
    }
  }
}