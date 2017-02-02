import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { SignUpService } from './../../services/signup';

@Component({
  selector: 'signup',
  templateUrl: './../templates/signup.html'
})
export class SignUpComponent  {
  user: User;
  submit: boolean = true;
  loaded: boolean = false;
  useLogo: boolean = false;
  showBack: boolean = false;
  showBackAndText: boolean = false;  
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

  redirect(usr: User) {
    if(usr) {
      this.user = usr;
      if(this.user.powaiFestRegister)
        this.router.navigateByUrl('/home');
      else
        this.router.navigateByUrl('/powaifest');
    }
    else
      this.router.navigateByUrl('/powaifest');
  }
  
  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res))
  }

  init(usr: User) {
    this.user = usr;
    if(this.user && this.user.id)
      this.userService.getPFRegistrationDetails(this.user)
        .then(res => this.redirect(res));
    else
      this.loaded = true;
  }
}