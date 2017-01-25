import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './../templates/signup.html'
})
export class SignUpComponent  {
  user: User;
  showBack: boolean = false;
  action: string = "Next";
  backRoute: string = "";
  nextRoute: string = "/otp";
  title: string = "Create a New Account";
  
  //isLoggedIn: boolean = true;
  isLoggedIn: boolean = false;
  isRegisteredToPFest: boolean = true;
  //isRegisteredToPFest: boolean = false;

  constructor(private router: Router, private userService: UserService) { };
  
  ngOnInit() {
    if(this.isLoggedIn) {
      if(this.isRegisteredToPFest)
        this.router.navigateByUrl('/home');
      else
        this.router.navigateByUrl('/powaifest');
    }
    
    this.user = this.userService.user;
  }
}