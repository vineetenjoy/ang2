import { Component } from '@angular/core';

import { UtilsService } from './../../services/utils';
import { MerchantsService } from './../../services/merchants';
import { Merchant } from './../../models/merchant';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'merchants',
  templateUrl: './../templates/merchants.html'
})
export class MerchantsComponent  {
  merchants: Merchant[];

  constructor(private utilsService: UtilsService, private merchantsService: MerchantsService) { };
  
  ngOnInit() {
    this.utilsService.setContext(new ClientContext("Pay Merchants", true, "/home", "", "", false));
    this.merchants = this.merchantsService.getMerchants();
  }
}