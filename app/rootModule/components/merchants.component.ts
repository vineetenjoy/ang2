import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { User } from './../../models/user';
import { Merchant } from './../../models/merchant';

import { UserService } from './../../services/user';
import { MerchantsService } from './../../services/merchants';

@Component({
  moduleId: module.id,
  selector: 'merchants',
  templateUrl: './../templates/merchants.html'
})
export class MerchantsComponent  {
  page: number;
  user: User;
  merchants: Merchant[];
  submit: boolean = false;
  svcError: boolean = false;
  processing: boolean = false;
  invalidForm: boolean = false;
  hasMorePages: boolean = false;
  showBackAndText: boolean = false;
  search: string = "";
  nextRoute: string = "";
  prevSearch: string = "";
  action: string = "More";
  backRoute: string = "/home";
  title: string = "Pay Merchant";

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private merchantsService: MerchantsService) { };
  
  fillMerchants(svcMerchantsStr: string) {
    if(svcMerchantsStr) {
      let svcMerchants = JSON.parse(svcMerchantsStr);
      this.hasMorePages = false;
      this.backRoute = this.merchantsService.getBackRoute();
      this.page = this.merchantsService.getCurrentPage();
      this.search = this.merchantsService.getCurrentTerm();
      if(svcMerchants == null)
        this.svcError = true;

      this.merchants = svcMerchants;
      this.prevSearch = this.search;
      this.processing = false;
      if(this.merchantsService.getTotalPages() > this.page + 1) {
        this.hasMorePages = true;
        let nextPage: number = this.page + 1;
        this.nextRoute = '/merchants/' + nextPage.toString() + ';search=' + this.search;
      }
    }
  }

  back() {
    this.processing = true;
    this.router.navigateByUrl(this.backRoute);    
  }

  more() {
    this.processing = true;
    this.router.navigateByUrl(this.nextRoute);
  }

  enter() {
    if(this.search != this.prevSearch) {
      this.processing = true;
      this.router.navigateByUrl('/merchants/0;search=' + this.search);    
    }
  }

  ngOnInit() {
    this.userService.getUser()
      .then(res => this.init(res))
  }

  init(usr: User) {
    if(!usr || !usr.id)
        this.router.navigateByUrl('signup');
    else {
      this.user = usr;
      this.merchantsService.resetSearches();
      this.route.params
        .switchMap((params: Params) => this.merchantsService.getMerchants(params['search'], +params['page'], this.user))
        .subscribe(res => this.fillMerchants(res ? JSON.stringify(res): null));
    }
  }
}