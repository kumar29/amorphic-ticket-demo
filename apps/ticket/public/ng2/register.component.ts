import {Component, Input} from '@angular/core';
import {AmorphicService} from './amorphic.service';
import {Controller} from '../js/controller';

@Component({
    selector: 'register',
    //templateUrl: '../html_templates/menu.component.html'
    template: `
    <h1>Please Register</h1>
    <form #registerForm="ngForm" class="form-horizontal" role="form">
        <div class="form-group">
            <!--Text field-->
            <label for="email" class="col-md-2 control-label">Email</label>
            <div class="col-md-4">
                <input [(ngModel)]="controller.email" type="text" class="form-control"
                       name="email" placeholder="email" focus="1" required/>
            </div>
        </div>

        <div class="form-group">
            <!--Text field-->
            <label for="firstName" class="col-md-2 control-label">First Name</label>
            <div class="col-md-4">
                <input [(ngModel)]="controller.firstName" type="text" class="form-control"
                       name="firstName" placeholder="firstName" focus="2" required/>
            </div>

            <!--Text field-->
            <label for="lastName" class="col-md-2 control-label">Last Name</label>
            <div class="col-md-4">
                <input [(ngModel)]="controller.lastName" type="text" class="form-control"
                       name="lastName" placeholder="lastName" focus="3" required/>
            </div>
        </div>

        <div class="form-group">
            <!--Text field-->
            <label for="newPassword" class="col-md-2 control-label">newPassword</label>
            <div class="col-md-4">
                <input [(ngModel)]="controller.newPassword" type="text" class="form-control"
                       name="newPassword" placeholder="newPassword" focus="2" required/>
            </div>

            <!--Text field-->
            <label for="confirmPassword" class="col-md-2 control-label">confirmPassword</label>
            <div class="col-md-4">
                <input [(ngModel)]="controller.confirmPassword" type="text" class="form-control"
                       name="confirmPassword" placeholder="confirmPassword" focus="3" required/>
            </div>
        </div>

    </form>

    <button (click)="controller.publicRegister('http://localhost', '','registration_instructions')" type="submit" class="btn btn-primary btn-lg" [disabled]="!registerForm.form.valid">Register</button>
    `
})

export class RegisterComponent {
    controller: Controller;

    constructor(private amorphic: AmorphicService) {}

    ngOnInit(): void {
        this.controller = this.amorphic.controller;
    }
}