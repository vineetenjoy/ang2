import { Component } from '@angular/core';

import { UtilsService } from './../../services/utils';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './../templates/home.html'
})
export class HomeComponent  {
  constructor(private utilsService: UtilsService) { };
  
  ngOnInit() {
    this.utilsService.setContext(new ClientContext("Be Now", false, "", "", "", false));
  }
}