import { Component } from '@angular/core';

import { User } from './../../models/user';
import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'powai-fest',
  templateUrl: './../templates/powaifest.html'
})
export class PowaiFestComponent  {
  user: User;

  constructor(private utilsService: UtilsService, private userService: UserService) { };
  
  ngOnInit() {
    this.utilsService.setContext(new ClientContext("Powai Fest", true, "/home", "/registered", "Register", true));
    this.user = this.userService.user;
  }
}