import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { SignUpService } from './../../services/signup';

@Component({
  selector: 'otp',
  templateUrl: './../templates/otp.html'
})
export class OTPComponent  {
  otp: string;
  user: User;  
  submit: boolean = true;
  useLogo: boolean = true;  
  showBack: boolean = true;
  showBackAndText: boolean = false;
  action: string = "verify";
  backRoute: string = "/signup";
  nextRoute: string = "";
  title: string = "Verify Account";

  constructor(private router: Router, private userService: UserService, private utilsService: UtilsService, 
    private signupService: SignUpService) { };

  onSubmit() {
    this.signupService.validateUser(this.user, this.otp).then(res => this.actVerify(res));
  }
  
  resendOTP() {
    this.signupService.sendOTP(this.user.phone).then(success => this.actResend(success));
  }

  actResend(success: boolean) {
    if(!success)
      this.router.navigateByUrl('/error/1');
  }

  verified(token: string) {
    this.user.id = this.user.phone;
    this.userService.setUser(this.user);
    localStorage.setItem('beNOWut', JSON.stringify({ username: this.user.phone, token: token }));
    this.utilsService.refreshHeader();
    this.router.navigateByUrl('/powaifest');
  }

  actVerify(res: string) {
    let result = JSON.parse(res);
    if(result && result.jwtToken)
      this.verified(result.jwtToken);
    else if(result && result.validationErrors) 
      this.router.navigateByUrl('/otperror');
    else
      this.router.navigateByUrl('/otperror');
/*      this.router.navigateByUrl('/error/2');*/
  }

  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res))
  }

  init(usr: User) {
    this.user = usr;
    if(!this.user || !this.user.phone || !this.user.firstName || !this.user.lastName)
      this.router.navigateByUrl('signup');
  }
}