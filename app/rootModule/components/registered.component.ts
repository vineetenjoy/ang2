import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'registered',
  templateUrl: './../templates/registered.html'
})
export class RegisteredComponent  {
  submit: boolean = false;
  showBack: boolean = true;
  invalidForm: boolean = false;
  showActionBar: boolean = true;
  action: string = "Find Merchants";
  backRoute: string = "/home";
  nextRoute: string = "/merchants";
  title: string = "Registered";  
}