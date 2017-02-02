import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { User } from './../../models/user';

import { UserService } from './../../services/user';

@Component({
  selector: 'powai-fest',
  templateUrl: './../templates/powaifest.html'
})
export class PowaiFestComponent  {
  user: User;
  submit: boolean = true;
  loaded: boolean = false;
  useLogo: boolean = true;
  showBack: boolean = true;
  showBackAndText: boolean = true;
  availableSeats: number;
  action: string = "Register";
  backRoute: string = "/home";
  nextRoute: string = "";
  title: string = "Powai Fest";

  constructor(private router: Router, private userService: UserService) { };
  
  onSubmit() {
    if(!this.user.bollywoodRegister)
      this.user.numSeats = 0;
    
    this.userService.registerForPowaiFest(this.user)
      .then(success => this.act(success))
  }

  act(success: User) {
    if(success) {
      this.userService.setUser(this.user);
      this.router.navigateByUrl('/registered');
    }
    else {
      this.user.powaiFestRegister = false;
      this.router.navigateByUrl('/error/3');
    }
  }

  showBNRegistration(availability: number) {
    this.availableSeats = availability;
    this.loaded = true;
  }

  init(usr: User) {
    if(!usr) {
      this.user.numSeats = 1;
    }
    else {
      this.user = usr;
      if(!this.user.powaiFestRegister && !this.user.numSeats)
        this.user.numSeats = 1;
    }

    if(!this.user.powaiFestRegister)
      this.userService.numAvailableSeatsInPF()
        .then(res => this.showBNRegistration(res))
    else
      this.loaded = true;
  }

  ngOnInit() {
    this.userService.getUser()
      .then(res => this.initialize(res))
  }

  initialize(usr: User) {
    this.user = usr;
    if(!this.user || !this.user.id)
      this.router.navigateByUrl('/signup');
    else if(!this.user.powaiFestRegister)
      this.userService.getPFRegistrationDetails(this.user)
        .then(res => this.init(res))
    else
      this.loaded = true;
  }
}