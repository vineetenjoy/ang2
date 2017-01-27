import { Router } from '@angular/router';
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
  submit: boolean = true;
  showBack: boolean = true;
  action: string = "Register";
  backRoute: string = "/home";
  nextRoute: string = "";
  title: string = "Powai Fest";

  constructor(private router: Router, private userService: UserService) { };
  
  onSubmit() {
    if(!this.user.bollywoodRegister)
      this.user.numSeats = 0;
    
    this.user.powaiFestRegister = true;
    let success = this.userService.registerForPowaiFest(this.user);
      //.then(success => this.act(success))
    
    this.act(success);
  }

  act(success: boolean) {
    if(success) {
      this.userService.setUser(this.user);
      this.router.navigateByUrl('/registered');
    }
    else {
      this.user.powaiFestRegister = false;
      this.router.navigateByUrl('/error/3');
    }
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    if(!this.user.powaiFestRegister)
      this.user.numSeats = 1;
  }
}