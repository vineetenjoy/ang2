import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";

import { UserService } from './../services/user';
import { UtilsService } from './../services/utils';
import { AppComponent } from './components/app.component';
import { TopNavComponent } from './components/topnav.component';
import { SignUpComponent } from './components/signup.component';
import { SignUpService } from './../services/signup';
import { ActionBarComponent } from './components/actionbar.component';
import { OTPComponent } from './components/otp.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    RouterModule.forRoot([
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
  declarations: [ AppComponent, TopNavComponent, SignUpComponent, OTPComponent, MaterializeDirective, ActionBarComponent ],
  providers: [UtilsService, SignUpService, UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
