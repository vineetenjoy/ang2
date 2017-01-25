import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './../templates/home.html'
})
export class HomeComponent  {
  showBack: boolean = false;
  backRoute: string = "";
  title: string = "Be Now";
}