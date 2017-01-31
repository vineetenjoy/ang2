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
      this.color = "#747474";
    else if(this.index % 3 == 0)
      this.color = "#ffb200";
    else if(this.index % 2 == 0)
      this.color = "#e53935";
    else
      this.color = "#00abc0";
    
    this.colornohash = this.color.substring(1);

    if(this.merchant && this.merchant.displayName)
        this.initials = this.utilsService.getInitials(this.merchant.displayName);
  }
}