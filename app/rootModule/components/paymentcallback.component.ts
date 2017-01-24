import { Component } from '@angular/core';

import { UtilsService } from './../../services/utils';
import { ClientContext } from './../../models/clientcontext';

@Component({
  moduleId: module.id,
  selector: 'paymentcallback',
  templateUrl: './../templates/paymentcallback.html'
})
export class PaymentCallbackComponent  {
  constructor(private utilsService: UtilsService) { };
  
  ngOnInit() {
    this.utilsService.setContext(new ClientContext("Done", true, "/merchants", "/merchants", "Find Merchants", true));
  }
}