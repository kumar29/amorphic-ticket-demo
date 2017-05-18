import {Controller} from '../js/Controller';
import {Component, OnInit} from '@angular/core';
import {TicketItemComment} from '../js/tsmodel/ticketItemComment';
import {Ticket} from '../js/tsmodel/ticket';
import {Project} from "../js/tsmodel/project";

@Component({
    selector: 'ticket',
    //templateUrl: '../html_templates/ticket.component.html'
    template: `
    <div class="page-header">
        ticket
    </div>
    `
})

export class TicketComponent implements OnInit {

    comment: string = '';
    controller: Controller;

    ngOnInit(): void {
    }
}