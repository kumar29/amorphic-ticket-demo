import {Component, OnInit} from '@angular/core';
import {AmorphicService} from './amorphic.service';
import {Controller} from '../js/controller';
import {RouterModule, Router} from '@angular/router';

@Component({
    selector: 'menu',
    //templateUrl: '../html_templates/menu.component.html'
    template: `
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <ul class="nav navbar-nav" *ngIf="!controller.loggedIn">
        <li><a routerLink="/home">Home</a></li>
        <li><a routerLink="/login">Login</a></li>
        <li><a routerLink="/registration">Register</a></li>
    </ul>
    <ul class="nav navbar-nav" *ngIf="controller.loggedIn">
        <li><a routerLink="/home">Home</a></li>
        <li><a routerLink="/tickets">Tickets</a></li>
        <li><a routerLink="/projects">Projects</a></li>
        <li><a routerLink="/people">People</a></li>
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Hello <span>{{controller.loggedInPerson.firstName}}</span><b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a (click)="logout()">Logout</a></li>
                <li><a routerLink="/change_email">Change email</a></li>
                <li><a routerLink="/change_password">Change Password</a></li>
                <li [hidden]="!controller.isAdmin()"><a (click)="deleteAll()">Clear Database</a></li>
            </ul>
        </li>
    </ul>
    </nav>
    <div class="container" id="container" style="margin-top: 50px">

        <!-- HOME PAGE GOES HERE WHERE SEARCH ENGINES WILL SEE IT -->
        <router-outlet></router-outlet>
    </div>
    `
})

export class MenuComponent implements OnInit {

    controller: Controller;

    constructor(private amorphic: AmorphicService, private router: Router) {
        this.controller = this.amorphic.controller;
    }

    ngOnInit(): void {
    }

    logout(): void {
        Promise.resolve()
        .then(this.controller.publicLogout.bind(this.controller, ''))
        .then(function () {
            this.router.navigate(['/']);
        }.bind(this));
    }
}