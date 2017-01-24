import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from './../../services/utils';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'otperror',
  templateUrl: './../templates/otperror.html'
})
export class OTPErrorComponent  {
  hasError: boolean;

  constructor(private router: Router, private utilsService: UtilsService) { 
      //this.hasError = true;
      this.hasError = false;
  };
  
  ngOnInit() {
    if(this.hasError)
      this.utilsService.setContext(new ClientContext("OTP Error", true, "/signup", "/signup", "Sign Up", true));
    else
      this.utilsService.setContext(new ClientContext("Verifying", false, "", "", "", false));

    if(!this.hasError) {
      let me = this;
      setTimeout(function() {
        me.router.navigateByUrl('/powaifest');
      }, 2000);
    }
    //this.utilsService.setContext(new ClientContext("Verification Error", true, "/signup", "/signup", "Sign Up", true));
  }
}