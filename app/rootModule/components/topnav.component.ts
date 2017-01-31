import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'topnav',
  templateUrl: './../templates/topnav.html'
})
export class TopNavComponent  {
  @Input('useLogo') useLogo: boolean;
  @Input('showBack') showBack: boolean;
  @Input('showBackAndText') showBackAndText: boolean;
  @Input('title') title: string;
  @Input('backRoute') backRoute: string;
}