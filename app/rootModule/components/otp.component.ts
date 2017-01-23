import { Component } from '@angular/core';

import { User } from './../../models/user';
import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { SignUpService } from './../../services/signup';

@Component({
  moduleId: module.id,
  selector: 'otp',
  templateUrl: './../templates/otp.html'
})
export class OTPComponent  {    
  constructor(private utilsService: UtilsService, private userService: UserService) { };
  
  ngOnInit() {
    this.utilsService.setTitle("Verify Account");
  }
}