import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';
import { SignUpService } from './../../services/signup';

@Component({
  moduleId: module.id,
  selector: 'otp',
  templateUrl: './../templates/otp.html'
})
export class OTPComponent  {
  phone: string;
  showBack: boolean = true;
  action: string = "verify";
  backRoute: string = "/signup";
  nextRoute: string = "/otperror";
  title: string = "Verify Account";

  constructor(private userService: UserService, private signupService: SignUpService) { };
  
  ngOnInit() {
    this.phone = this.userService.getUser().phone;
    this.signupService.sendOTP(this.phone)
      .then(h => console.log(h))
  }
}