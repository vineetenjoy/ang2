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
  constructor(private utilsService: UtilsService, private userService: UserService) { };
  
  ngOnInit() {
    this.utilsService.setTitle("Create a New Account");
  }
}