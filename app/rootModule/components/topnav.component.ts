import { Component } from '@angular/core';

import { User } from './../../models/user';
import { UserService } from './../../services/user';
import { UtilsService } from './../../services/utils';

@Component({
  moduleId: module.id,
  selector: 'topnav',
  templateUrl: './../templates/topnav.html'
})
export class TopNavComponent  {
  title: string;

  constructor(private utilsService: UtilsService, private userService: UserService) { };

  ngOnInit() {
    this.utilsService.getTitle().subscribe(val => this.title = val);
  }
}