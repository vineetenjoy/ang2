import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';
import { Payment } from './../../models/payment';

import { UserService } from './../../services/user'
import { PaymentService } from './../../services/payment'

@Component({
  moduleId: module.id,
  selector: 'paymentsuccess',
  templateUrl: './../templates/paymentsuccess.html'
})
export class PaymentSuccessComponent  {
  amount: number;
  tNum: string;
  pType: string;
  merchantName: string;
  backURL: string;
  payment: Payment;
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

  constructor(private route: ActivatedRoute, private router: Router, 
    private userService: UserService, private paymentService: PaymentService) { };
  
  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res));
  }

  init(usr: User) {
    if(!usr || !usr.id)
        this.router.navigateByUrl('/signup');
    else {
      this.user = usr;
      this.tNum = this.route.snapshot.params['tNum'];
      this.paymentService.getPayment(this.tNum)
        .then(res => this.fill(res));
    }
  }

  fill(pay: Payment) {
    if(pay) {
      console.log(pay);
      this.payment = pay;
      this.pType = this.payment.mode === 'CC' ? 'Credit Card' : this.payment.mode === 'DC' ? 'Debit Card' : '';
    }
  }
}