import {NgModule} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Router} from '@angular/router';
import {HttpModule} from '@angular/http';

import {AmorphicService} from './amorphic.service';
import {LoginComponent} from './login.component';
import {MenuComponent} from './menu.component';
import {PeopleComponent} from './people.component';
import {ProjectComponent} from './project.component';
import {ProjectsComponent} from './projects.component';
import {RegisterComponent} from './register.component';
import {TicketComponent} from './ticket.component';
import {TicketsComponent} from './tickets.component';

//import {Controller} from '../js/controller';
import {WindowService} from './window.service';
import {ZipLookupService} from './zip.service';
import {QuoteService} from './quote.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/tickets',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'tickets',
                component: TicketsComponent
            },
            {
                path: 'people',
                component: PeopleComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'project',
                component: ProjectComponent
            },
            {
                path: 'registration',
                component: RegisterComponent
            }
        ])
    ],
    declarations: [
        //Controller,
        MenuComponent,
        LoginComponent,
        TicketComponent,
        TicketsComponent,
        PeopleComponent,
        ProjectComponent,
        ProjectsComponent,
        RegisterComponent
    ],
    providers: [
        WindowService,
        AmorphicService,
        ZipLookupService,
        QuoteService
    ],
    bootstrap: [
        MenuComponent
    ]
})
export class AppModule {
}
