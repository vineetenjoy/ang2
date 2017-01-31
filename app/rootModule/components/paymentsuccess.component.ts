import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';

import { UserService } from './../../services/user'

@Component({
  moduleId: module.id,
  selector: 'paymentsuccess',
  templateUrl: './../templates/paymentsuccess.html'
})
export class PaymentSuccessComponent  {
  amount: number;
  pType: string;
  merchantName: string;
  backURL: string;
  user: User;
  submit: boolean = false;
  useLogo: boolean = true;
  showBack: boolean = false;
  invalidForm: boolean = false;
  showBackAndText: boolean = true;
  action: string = "Done";
  backRoute: string = "";
  nextRoute: string = "/merchants/0";
  title: string = "Payment Successful";

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
      this.amount = 100;
      this.merchantName = 'Paras Stores';
      this.pType = 'Credit Card';
    }
  }
}