import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'otperror',
  templateUrl: './../templates/otperror.html'
})
export class OTPErrorComponent  {
  //hasError: boolean = true;
  hasError: boolean = false;
  showBack: boolean = false;
  showActionBar: boolean = false;
  action: string = "";
  backRoute: string = "";
  nextRoute: string = "";
  title: string = "Verifying";

  constructor(private router: Router) { };
  
  ngOnInit() {
    if(!this.hasError) {
      let me = this;
      setTimeout(function() {
        me.router.navigateByUrl('/powaifest');
      }, 2000);
    }
    else {
      this.showBack = true;
      this.showActionBar = true;
      this.action = "Try Again";
      this.backRoute = "/signup";
      this.nextRoute = "/signup";
      this.title = "Verification Error";
    }
  }
}