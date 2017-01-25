import { Component } from '@angular/core';

import { User } from './../../models/user';
import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { SignUpService } from './../../services/signup';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'otp',
  templateUrl: './../templates/otp.html'
})
export class OTPComponent  {
  phone: string;

  constructor(private utilsService: UtilsService, private userService: UserService, private signupService: SignUpService) { };
  
  ngOnInit() {
    this.utilsService.setContext(new ClientContext("Verify Account", true, "/signup", "/otperror", "Verify", true));
    this.phone = this.userService.getUser().phone;
    this.signupService.sendOTP(this.phone)
      .then(h => console.log(h))
  }
}