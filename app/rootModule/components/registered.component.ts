import { Component } from '@angular/core';

import { UtilsService } from './../../services/utils';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'registered',
  templateUrl: './../templates/registered.html'
})
export class RegisteredComponent  {
  //erroredOut: boolean = true;
  erroredOut: boolean = false;
  success: boolean = true;
  //success: boolean = false;
  //processing: boolean = true;
  processing: boolean = false;

  constructor(private utilsService: UtilsService) { };
  
  ngOnInit() {
    if(this.success)
      this.utilsService.setContext(new ClientContext("Registered", true, "/home", "/merchants", "Find Merchants", true));
    else if(this.erroredOut)
      this.utilsService.setContext(new ClientContext("Registration Error", true, "/powaifest", "/powaifest", "Try Again", true));
    else
      this.utilsService.setContext(new ClientContext("Registering", false, "", "", "", false));
  }
}