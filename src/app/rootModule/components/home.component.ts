import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';

import { UserService } from './../../services/user'

@Component({
  
  selector: 'home',
  templateUrl: './../templates/home.html'
})
export class HomeComponent  {
  user: User
  showBack: boolean = false;
  showBackAndText: boolean = false;
  backRoute: string = "";
  title: string = "Be Now";

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res))
  }

  init(usr: User) {
    if(!usr || !usr.id)
        this.router.navigateByUrl('/signup');
  }
}