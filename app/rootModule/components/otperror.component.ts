import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';

@Component({
  moduleId: module.id,
  selector: 'otperror',
  templateUrl: './../templates/otperror.html'
})
export class OTPErrorComponent  {
  user: User;  
  submit: boolean = false;
  showBack: boolean = true;
  invalidForm: boolean = false;
  showActionBar: boolean = true;
  action: string = "Try Again";
  backRoute: string = "/signup";
  nextRoute: string = "/signup";
  title: string = "Verification Error";  

  constructor(private router: Router, private userService: UserService) { };

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