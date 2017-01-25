import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'benow',
  templateUrl: './../templates/benow.html'
})
export class AppComponent  {
  constructor(private router: Router) {  }
  
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd))
        return;

      document.body.scrollTop = 0;
    });
  }
}