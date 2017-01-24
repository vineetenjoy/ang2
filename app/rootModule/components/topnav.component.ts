import { Component } from '@angular/core';

import { User } from './../../models/user';
import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'topnav',
  templateUrl: './../templates/topnav.html'
})
export class TopNavComponent  {
  context: ClientContext;

  constructor(private utilsService: UtilsService, private userService: UserService) { 
    this.context = new ClientContext("", false, "", "", "", false);
  };

  ngOnInit() {
    this.utilsService.getContext().subscribe(val => this.context = val);
  }
}