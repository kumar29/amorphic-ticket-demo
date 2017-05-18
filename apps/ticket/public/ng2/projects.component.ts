import {Component, OnInit, NgZone} from '@angular/core';
import {AmorphicService} from './amorphic.service';
import {Controller} from '../js/controller';
import {Observable} from 'rxjs/Observable';
import {RouterModule, Router} from '@angular/router';


import {Project} from "../js/tsmodel/project";

@Component({
    selector: 'projects',
    //templateUrl: '../html_templates/projects.component.html'
    template: `
    <div class="container">
        projects
        <div>Data available ? {{isDataAvailable}}</div>
       <div *ngIf="!isDataAvailable"> 
            <img src="img/loading-icon.gif">
       </div>
       
       <div *ngIf="isDataAvailable">
            <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Created</th>
                    <th>By</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let project of controller.projects">
                    <td><a (click)="controller.project=project; router.navigate(['/project']);">{{project.name || 'unnamed'}}</a></td>
                    <td>{{project.created}}</td>
                    <td>{{project.creator ? project.creator.getFullName() : ''}}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
    `
})

export class ProjectsComponent implements OnInit {

    controller: Controller;
    isDataAvailable: boolean = false;

    constructor(private zone: NgZone, private amorphic: AmorphicService, private router: Router) {
        this.controller = this.amorphic.controller;
    }

    ngOnInit(): void {
        this.controller.projectsFetch().then(() => {
            this.zone.run(() => this.isDataAvailable = true);
            //this.isDataAvailable = true;
        })
    }
}