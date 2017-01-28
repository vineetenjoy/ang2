import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { SignUpService } from './../../services/signup';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './../templates/signup.html'
})
export class SignUpComponent  {
  user: User;
  submit: boolean = true;
  loaded: boolean = false;
  showBack: boolean = false;
  action: string = "Next";
  backRoute: string = "";
  nextRoute: string = "/otp";
  title: string = "Create a New Account";
  
  constructor(private router: Router, private utilsService: UtilsService, private userService: UserService, 
    private signupService: SignUpService) { };

  onSubmit() {
    this.userService.setUser(this.user);
    this.signupService.sendOTP(this.user.phone)
      .then(success => this.act(success))
  }

  act(success: boolean) {
    if(success)
      this.router.navigateByUrl('/otp');
    else
      this.router.navigateByUrl('/error/1');
  }

  redirect(success: boolean) {
    if(success)
      this.router.navigateByUrl('/home');
    else
      this.router.navigateByUrl('/powaifest');
  }

  init(success: boolean) {
    if(success)
      this.userService.isRegisteredToPFest()
        .then(res => this.redirect(res))
    else
      this.loaded = true;
  }
  
  ngOnInit() {
    this.user = this.userService.getUser();
    if(!this.utilsService.hasToken()) 
      this.loaded = true;
    else
      this.userService.isLoggedIn()
        .then(res => this.init(res))
  }
}