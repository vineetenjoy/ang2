import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../models/user';
import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { SignUpService } from './../../services/signup';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './../templates/signup.html'
})
export class SignUpComponent  {
  user: User;
  isLoggedIn: boolean = true;
  //isLoggedIn: boolean = false;
  //isRegisteredToPFest: boolean = true;
  isRegisteredToPFest: boolean = false;

  constructor(private router: Router, private utilsService: UtilsService, private userService: UserService) { };
  
  ngOnInit() {
    if(this.isLoggedIn) {
      this.utilsService.setContext(new ClientContext("", false, "", "", "", false));
      if(this.isRegisteredToPFest)
        this.router.navigateByUrl('/home');
      else
        this.router.navigateByUrl('/powaifest');
    }
    else
      this.utilsService.setContext(new ClientContext("Create a New Account", false, "", "/otp", "Next", true));
    
    this.user = this.userService.user;
  }
}