import { Component } from '@angular/core';

import { Merchant } from './../../models/merchant';

import { MerchantsService } from './../../services/merchants';

@Component({
  moduleId: module.id,
  selector: 'merchants',
  templateUrl: './../templates/merchants.html'
})
export class MerchantsComponent  {
  merchants: Merchant[];
  showBack: boolean = true;
  backRoute: string = "/home";
  title: string = "Pay Merchants";

  constructor(private merchantsService: MerchantsService) { };
  
  ngOnInit() {
    this.merchants = this.merchantsService.getMerchants();
  }
}