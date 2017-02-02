import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';
import { Merchant } from './../../models/merchant';

import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { MerchantsService } from './../../services/merchants';

@Component({
  selector: 'payment',
  templateUrl: './../templates/payment.html'
})
export class PaymentComponent  {
  paymentType: number;
  xauth: string;
  color: string;
  initials: string;
  debitColor: string;
  creditColor: string;
  processPaymentURL: string;
  user: User;
  merchant: Merchant;
  submit: boolean = true;
  debitSupport: boolean = false;
  creditSupport: boolean = false;
  showBackAndText: boolean = false;
  amount: number = 0.00;
  debitType: number = 2;
  creditType: number = 1;
  nextRoute: string = "";
  action: string = "Proceed";
  title: string = "Secure Payment";
  selectedColor: string = '#E2E1DD';
  unselectedColor: string = 'transparent';

  constructor(private route: ActivatedRoute, private router: Router, 
    private merchantsService: MerchantsService, private utilsService: UtilsService, private userService: UserService) { 
    this.creditColor = this.unselectedColor;
    this.debitColor = this.unselectedColor;
    this.processPaymentURL = this.utilsService.getProcessPaymentURL();
    this.xauth = this.utilsService.getxauth();
  };

  isValidForm() {
    return this.amount > 0 && (this.paymentType == this.debitType || this.paymentType == this.creditType);
  }

  back() {
    let r = this.merchantsService.getLastRoute();
    this.router.navigateByUrl(r ? r : '/merchants/0;search=');    
  }

selectPaymentType(pType:number) {
    this.paymentType = pType;
    this.creditColor = this.unselectedColor;
    this.debitColor = this.unselectedColor;
    if(pType === this.creditType)
      this.creditColor = this.selectedColor;
    else if (pType === this.debitType)
      this.debitColor = this.selectedColor;
  }  

  ngOnInit() {
    if(this.merchantsService.getLastRoute())
      this.userService.getUser()
        .then(res => this.init(res))
    else
      this.router.navigateByUrl('/merchants/0;search='); 
  }

  init(usr: User) {
    this.user = usr;
    if(!this.user || !this.user.id)
      this.router.navigateByUrl('signup');
    else {
      let merchantCode = this.route.snapshot.params['merchantCode'];
      this.color = '#' + this.route.snapshot.params['color'];
      this.merchant = this.merchantsService.getMerchantByCode(merchantCode);
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