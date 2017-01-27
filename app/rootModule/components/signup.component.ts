import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';
import { SignUpService } from './../../services/signup';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './../templates/signup.html'
})
export class SignUpComponent  {
  user: User;
  submit: boolean = true;
  showBack: boolean = false;
  action: string = "Next";
  backRoute: string = "";
  nextRoute: string = "/otp";
  title: string = "Create a New Account";
  
  //isLoggedIn: boolean = true;
  isLoggedIn: boolean = false;
  isRegisteredToPFest: boolean = true;
  //isRegisteredToPFest: boolean = false;

  constructor(private router: Router, private userService: UserService, private signupService: SignUpService) { };

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
  
  ngOnInit() {
    if(this.userService.isLoggedIn()) {
      if(this.isRegisteredToPFest)
        this.router.navigateByUrl('/home');
      else
        this.router.navigateByUrl('/powaifest');
    }
    
    this.user = this.userService.getUser();
  }
}