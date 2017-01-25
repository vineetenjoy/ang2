import { Component } from '@angular/core';

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
  showBack: boolean = false;
  showActionBar: boolean = false;
  action: string = "";
  backRoute: string = "";
  nextRoute: string = "";
  title: string = "Registering";  
  
  ngOnInit() {
    if(this.success) {
      this.showBack = true;
      this.showActionBar = true;
      this.action = "Find Merchants";
      this.backRoute = "/home";
      this.nextRoute = "/merchants";
      this.title = "Registered";  
    }
    else if(this.erroredOut) {
      this.showBack = true;
      this.showActionBar = true;
      this.action = "Try Again";
      this.backRoute = "/powaifest";
      this.nextRoute = "/powaifest";
      this.title = "Registration Error";  
    }
  }
}