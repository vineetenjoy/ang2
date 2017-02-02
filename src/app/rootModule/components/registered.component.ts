import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';

import { UserService } from './../../services/user'

@Component({
  selector: 'registered',
  templateUrl: './../templates/registered.html'
})
export class RegisteredComponent  {
  user: User
  submit: boolean = false;
  useLogo: boolean = true;
  showBack: boolean = true;
  invalidForm: boolean = false;
  showActionBar: boolean = true;
  showBackAndText: boolean = true;
  action: string = "Find Merchants";
  backRoute: string = "/home";
  nextRoute: string = "/merchants/0";
  title: string = "Registration Successful";  

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res))
  }

  init(usr: User) {
    if(!usr || !usr.id)
        this.router.navigateByUrl('/signup');
    else
      this.user = usr;
  }
}