import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'actionbar',
  templateUrl: './../templates/actionbar.html'
})
export class ActionBarComponent  {    
  @Input('nextRoute') nextRoute: string;
  @Input('action') action: string;
}