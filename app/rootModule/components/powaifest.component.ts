import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';

@Component({
  moduleId: module.id,
  selector: 'powai-fest',
  templateUrl: './../templates/powaifest.html'
})
export class PowaiFestComponent  {
  user: User;
  showBack: boolean = true;
  action: string = "Register";
  backRoute: string = "/home";
  nextRoute: string = "/registered";
  title: string = "Powai Fest";

  constructor(private userService: UserService) { };
  
  ngOnInit() {
    this.user = this.userService.user;
  }
}