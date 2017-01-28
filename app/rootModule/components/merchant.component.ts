import { Component, Input } from '@angular/core';

import { Merchant } from './../../models/merchant';

import { UtilsService } from './../../services/utils';

@Component({
  moduleId: module.id,
  selector: 'merchant',
  templateUrl: './../templates/merchant.html'
})
export class MerchantComponent  {
  @Input() merchant: Merchant;
  @Input('index') index: number;
  initials: string;
  color: string;
  colornohash: string;

  constructor(private utilsService: UtilsService) { };

  ngOnInit() {
    this.index++;
    if(this.index % 4 == 0)
      this.color = "#73716C";
    else if(this.index % 3 == 0)
      this.color = "#00A5F3";
    else if(this.index % 2 == 0)
      this.color = "#00A694";
    else
      this.color = "#FFAD00";
    
    this.colornohash = this.color.substring(1);

    if(this.merchant && this.merchant.displayName)
        this.initials = this.utilsService.getInitials(this.merchant.displayName);
  }
}