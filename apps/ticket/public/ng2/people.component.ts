import {Component, OnInit, NgZone, ViewChild} from '@angular/core';
import {Person} from "../js/tsmodel/person";

import {AmorphicService} from './amorphic.service';
import {Controller} from '../js/controller';
import {Observable} from 'rxjs/Observable';
import {RouterModule, Router} from '@angular/router';
import {ZipLookupService} from './zip.service';
import {QuoteService} from './quote.service';

declare var $:any;

@Component({
    selector: 'people',
    templateUrl: '../html_templates/quote.component.html'
})

export class PeopleComponent implements OnInit {

    controller: Controller;

    loggedInPerson: Person;
    premium: Number;
    errorMessage: string='';

    constructor(private zone: NgZone, private amorphic: AmorphicService, private router: Router,
                private zipService: ZipLookupService, private quoteService: QuoteService) {
        this.controller = this.amorphic.controller;
        this.loggedInPerson = this.controller.loggedInPerson;
    }

    get dob(): string {
        return this.loggedInPerson.dob ? this.convertToMdy(this.loggedInPerson.dob) : '';
    }

    set dob(dob) {
        console.log("***SETTER " + dob);
        var parsed = Date.parse(dob);
        if (isNaN(parsed)) {
            this.errorMessage = "Invalid date format";
            return;
        }
        this.errorMessage = "";
        let date =  new Date(parsed);
        this.loggedInPerson.dob = date;
        this.loggedInPerson.dobTrigger();
    }

    ageMorethan30() {
        console.log("Entered");
        return eval("this.loggedInPerson.age && this.loggedInPerson.age > 30");
    }

    convertToMdy(date) {
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();

        if(date<10) {
            dd='0'+dd;
        }

        if(date<10) {
            mm='0'+mm;
        }

        return mm+'/'+dd+'/'+yyyy;
    }


    ngOnInit(): void {

    }

    ngAfterViewInit() {
        $('.date').inputmask('mm/dd/yyyy');
    }

    lookupQuote(): void {

        var quoteService = this.quoteService;
        var person = this.controller.loggedInPerson;
        var queryString = {productIdentifier: 'HavenTerm',
            gender: person.gender,
            isSmoker: person.smoker,
            age: person.age,
            termLength: person.term,
            coverageAmount: person.face,
            healthCategory: 'excellent'
        };

        this.quoteService.getQuote($.param( queryString )).subscribe(
            data => this.premium = data.Quotes[0].monthlyRate,
            error =>  this.errorMessage = <any>error);
    }

    cityState(): String {
        return this.loggedInPerson.city + ' , ' + this.loggedInPerson.state;
    }

    lookupZip(): void {
        this.zipService.getDetails(this.loggedInPerson.zip).subscribe(data => {
            this.loggedInPerson.city = data.city, this.loggedInPerson.state = data.state
        });
    }
}