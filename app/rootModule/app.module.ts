import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MaterializeDirective } from "angular2-materialize";

import { OTPComponent } from './components/otp.component';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { TopNavComponent } from './components/topnav.component';
import { SignUpComponent } from './components/signup.component';
import { PaymentComponent } from './components/payment.component';
import { MerchantComponent } from './components/merchant.component';
import { OTPErrorComponent } from './components/otperror.component';
import { ActionBarComponent } from './components/actionbar.component';
import { PowaiFestComponent } from './components/powaifest.component';
import { MerchantsComponent } from './components/merchants.component';
import { RegisteredComponent } from './components/registered.component';
import { PaymentSuccessComponent } from './components/paymentsuccess.component';

import { UserService } from './../services/user';
import { UtilsService } from './../services/utils';
import { SignUpService } from './../services/signup';
import { PaymentService } from './../services/payment';
import { MerchantsService } from './../services/merchants';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpModule, 
    RouterModule.forRoot([
    {
      path: 'error/:pageId',
      component: ErrorComponent
    },
    {
      path: 'payment/:merchantCode/:color',
      component: PaymentComponent
    },
    {
      path: 'paymentsuccess/:tNum',
      component: PaymentSuccessComponent
    },
    {
      path: 'registered',
      component: RegisteredComponent
    },
    {
      path: 'merchants/:page',
      component: MerchantsComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'powaifest',
      component: PowaiFestComponent
    },
    {
      path: 'otperror',
      component: OTPErrorComponent
    },
    {
      path: 'otp',
      component: OTPComponent
    },
    {
      path: 'signup',
      component: SignUpComponent
    },
    { 
      path: '**', 
      redirectTo: '/signup', 
      pathMatch: 'full' 
    }
    ], { useHash: true })
  ],
  declarations: [ AppComponent, TopNavComponent, SignUpComponent, OTPComponent, 
    OTPErrorComponent, PowaiFestComponent, MaterializeDirective, ActionBarComponent,
    HomeComponent, MerchantsComponent, RegisteredComponent, PaymentComponent,
    MerchantComponent, ErrorComponent, PaymentSuccessComponent ],
  providers: [UtilsService, SignUpService, MerchantsService, UserService, PaymentService/*,
    {provide: APP_BASE_HREF, useValue: 'powaifest17'}*/],
  bootstrap: [ AppComponent ]
})
export class AppModule { }