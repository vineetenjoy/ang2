import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { UtilsService } from './../../services/utils';
import { TopNavComponent } from './topnav.component';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'benow',
  templateUrl: './../templates/benow.html'
})
export class AppComponent  {
  context: ClientContext;

  constructor(private router: Router, private utilsService: UtilsService) {  
    this.context = new ClientContext("", false, "", "", "", false);
  }
  
  ngOnInit() {
    this.utilsService.getContext().subscribe(val => this.context = val);

    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        document.body.scrollTop = 0;
    });
  }
}