import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './../../models/user';

import { UserService } from './../../services/user'

@Component({
    moduleId: module.id,
    selector: 'error',
    templateUrl: './../templates/error.html'
})
export class ErrorComponent  {
    user: User;
    submit: boolean = false;
    useLogo: boolean = true;  
    showBack: boolean = true;
    invalidForm: boolean = false;
    action: string = "Home";
    backRoute: string = "/home";
    nextRoute: string = "/home";
    title: string = "Error";
    content: string = "Sorry! Something went wrong.";

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit() {
        let pageId = +this.route.snapshot.params['pageId'];
        switch(pageId) {
            case 1:
                this.action = "Try Again";
                this.backRoute = "/signup";
                this.nextRoute = "/signup";
                this.content = "Sorry, there was an error in sending OTP!";
                break;
            case 2:
                this.action = "Try Again"
                this.backRoute = "/otp";
                this.nextRoute = "/otp";                
                this.content = "Sorry, there was an error in verifying OTP!";
                break;
            case 3:
                this.action = "Try Again"
                this.backRoute = "/powaifest";
                this.nextRoute = "/powaifest";
                this.content = "Sorry, there was an error during registration!";                
                break;
            default:
                break;
        }
    }
}