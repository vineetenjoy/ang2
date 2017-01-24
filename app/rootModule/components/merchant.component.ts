import { Component, Input } from '@angular/core';

import { Merchant } from './../../models/merchant';

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

    if(this.merchant && this.merchant.name) {
        let spl = this.merchant.name.split(' ');
        if(spl.length > 0 && spl[0].length > 0)
          this.initials = spl[0][0];
        
        if(spl.length > 1 && spl[spl.length-1].length > 0)
          this.initials += spl[spl.length-1][0]

        this.initials = this.initials.toUpperCase();
    }
  }
}