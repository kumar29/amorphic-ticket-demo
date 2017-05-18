import {Component, OnInit} from '@angular/core';
import {Person} from "../js/tsmodel/person";
import {Project} from "../js/tsmodel/project";
import {AmorphicService} from './amorphic.service';
import {Controller} from '../js/controller';
import {RouterModule, Router} from '@angular/router';


@Component({
    selector: 'project',
    //templateUrl: '../html_templates/project.component.html'
    template: `
    <div class="container">
        Project
        
        <form #projectForm="ngForm" class="form-horizontal" role="form">

            <div class="form-group">
                <!--Text field-->
                <label for="name" class="col-md-2 control-label">Name</label>
                <div class="col-md-10">
                    <input [(ngModel)]="controller.project.name" [ngModelOptions]="{standalone: true}" type="text" class="form-control" id="name" placeholder="Name" focus="1"/>
                </div>
            </div>
        </form>
    </div>
    `
})

export class ProjectComponent implements OnInit {

    comment: string = '';
    controller: Controller;

    constructor(private amorphic: AmorphicService, private router: Router) {
        this.controller = this.amorphic.controller;
    }


    ngOnInit(): void {
    }
}