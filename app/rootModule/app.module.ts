import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";

import { UserService } from './../services/user';
import { UtilsService } from './../services/utils';
import { MerchantsService } from './../services/merchants';
import { AppComponent } from './components/app.component';
import { TopNavComponent } from './components/topnav.component';
import { SignUpComponent } from './components/signup.component';
import { SignUpService } from './../services/signup';
import { ActionBarComponent } from './components/actionbar.component';
import { OTPComponent } from './components/otp.component';
import { OTPErrorComponent } from './components/otperror.component';
import { PowaiFestComponent } from './components/powaifest.component';
import { HomeComponent } from './components/home.component';
import { MerchantsComponent } from './components/merchants.component';
import { RegisteredComponent } from './components/registered.component';
import { MerchantComponent } from './components/merchant.component';
import { PaymentComponent } from './components/payment.component';
import { PaymentCallbackComponent } from './components/paymentcallback.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    RouterModule.forRoot([
    {
      path: 'payment',
      component: PaymentComponent
    },
    {
      path: 'paymentcallback',
      component: PaymentCallbackComponent
    },
    {
      path: 'registered',
      component: RegisteredComponent
    },
    {
      path: 'merchants',
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
    ])
  ],
  declarations: [ AppComponent, TopNavComponent, SignUpComponent, OTPComponent, 
    OTPErrorComponent, PowaiFestComponent, MaterializeDirective, ActionBarComponent,
    HomeComponent, MerchantsComponent, RegisteredComponent, PaymentComponent,
    PaymentCallbackComponent, MerchantComponent ],
  providers: [UtilsService, SignUpService, MerchantsService, UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }