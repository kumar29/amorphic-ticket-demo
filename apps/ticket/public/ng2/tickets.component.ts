import {Component, OnInit} from '@angular/core';
import {TicketItemComment} from '../js/tsmodel/ticketItemComment';
import {Ticket} from '../js/tsmodel/ticket';

@Component({
    selector: 'tickets',
    //templateUrl: '../html_templates/tickets.component.html'
    template: `
    <div class="page-header">
        Tickets
    </div>
    `
})

export class TicketsComponent implements OnInit {

    ngOnInit(): void {
    }
}