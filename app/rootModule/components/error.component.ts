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
    showBackAndText: boolean = false;
    action: string = "Try Again";
    heading: string = "Server Error";
    backRoute: string = "/home";
    nextRoute: string = "/home";
    title: string = "Error";
    content: string = "Sorry! Something went wrong.";

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit() {
        let pageId = +this.route.snapshot.params['pageId'];
        switch(pageId) {
            case 1:
                this.heading = "OTP Error";
                this.backRoute = "/signup";
                this.nextRoute = "/signup";
                break;
            case 2:
                this.heading = "Verification Error";
                this.backRoute = "/otp";
                this.nextRoute = "/otp";                
                break;
            case 3:
                this.heading = "Registration Error";
                this.backRoute = "/powaifest";
                this.nextRoute = "/powaifest";
                break;
            default:
                break;
        }
    }
}