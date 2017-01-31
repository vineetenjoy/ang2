import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';

import { UserService } from './../../services/user'

@Component({
  moduleId: module.id,
  selector: 'paymentcallback',
  templateUrl: './../templates/paymentsuccess.html'
})
export class PaymentSuccessComponent  {
  amount: number;
  merchant: string;
  backURL: string;
  user: User;
  //success: boolean = true;
  success: boolean = false;
  showBack: boolean = true;
  showBackAndText: boolean = false;
  action: string = "Find More Merchants";
  backRoute: string = "/merchants/0";
  nextRoute: string = "/merchants/0";
  title: string = "Done";

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { };
  
  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res))
  }

  init(usr: User) {
    if(!usr || !usr.id)
        this.router.navigateByUrl('/signup');
    else {
      this.user = usr;
      /*let pd = this.paymentService.getPaymentDetails();
      this.merchant = pd.merchant;
      this.amount = pd.amount;
      this.backURL = pd.backURL;*/

      if(!this.success) {
        this.action = "Try Again";
        this.title = "Payment Gateway Error";
        this.backRoute = this.backURL;
        this.nextRoute = this.backURL;
      }
    }
  }
}