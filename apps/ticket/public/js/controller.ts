import {Supertype, supertypeClass, property, remote} from 'amorphic';
import {TicketItemComment} from './tsmodel/ticketItemComment';
import {Ticket} from './tsmodel/ticket';
import * as Q from 'Q';
import * as _ from 'underscore';
import {Person} from "./tsmodel/person";
import {Project} from "./tsmodel/project";
import {BaseController} from './baseController';


var forceImport = TicketItemComment;

declare var AmorphicRouter : any;
declare var ticketRoutes : any;

@supertypeClass
export class Controller extends BaseController {

     // Global properties

    @property()
    page: string = '';

    @property()
    file: string = '';

    @property()
    error: string = '';

    @property()
    status: string = '';

    router: any;
    route: any;

    // References to the model

    @property()
    ticket: Ticket = null;  // unlike with supertype properties are not 'ownProperty'

    @property({autoFetch: true, type: Ticket})
    tickets: Array<Ticket>;

    @remote()
    ticketsFetch () {
        this['ticketsPersistor'] = {isFetching: false, isFetched: true};
        return Ticket.getFromPersistWithQuery({}).then(function (tickets) {
            this.tickets = tickets;
        }.bind(this));
    };

    @property()
    person: Person = null;

    @property()
    loggedInPerson: Person = null;

    @property({type: Person, autoFetch: true})
    people: Array<Person>;

    @remote()
    peopleFetch () {
        this['peoplePersistor'] = {isFetching: false, isFetched: true};
        return Person.getFromPersistWithQuery({}).then(function (people) {
            this.people = people;
        }.bind(this));
    };

    @property()
    project: Project = null;

    @property({type: Project, autoFetch: true})
    projects: Array<Project>;

    @remote()
    projectsFetch () {
        this['projectsPersistor'] = {isFetching: false, isFetched: true};
        return Q.delay(5000)
            .then(Project.getFromPersistWithQuery.bind({}))
            .then(function (projects) {
                this.projects = projects;
                return projects;
            }.bind(this));
    };

    // Temporary fields
    @property()
    comment:  string = '';                     // When adding a comment to a ticket

    /*
     * -------  Ticket functions ----------------------------------------------------------------
     */

    // Create a new ticket and make it current
    newTicket () {
        if (!this.ticket || this.ticket.created) {
            this.ticket = new Ticket();
            if (_.indexOf(this.tickets, this.ticket) < 0) // Add to list
                this.tickets.splice(0, 0, this.ticket);
            this.error = null;
        }
        this.route.private.ticket();
    };

    @remote()
    addComment () {
        return this.ticket.addComment(this.comment, this.loggedInPerson).persistSave()
            .then(function () {
                this.comment = '';
            }.bind(this));
    }

    // Ask the ticket to save itself and update our list of tickets
    @remote({validate: function () {return this.validate()}})
    saveTicket ()
    {
        if (this.ticket)

            return this.ticket.save().then(function(error)
            {
                    this.status = "Ticket Saved at " + this.getDisplayTime();
                    this.error = null;

            }.bind(this));
    };

    // Ask the ticket to remove itself and update our list of tickets
    @remote()
    deleteTicket () {
        if (this.ticket)

            return this.ticket.remove().then(function ()
            {
                var ix = _.indexOf(this.tickets, this.ticket); // Remove from list
                if (ix >= 0)
                    this.tickets.splice(ix, 1);
                this.ticket = null;

            }.bind(this));
    };

    /*
     * -------  Project functions ----------------------------------------------------------------
     */
    @remote()
    deletePerson (person) {
        //if (this.isAdmin()) {
            person.remove().then(function () {
                this.createAdmin();
                if (this.loggedInPerson == person)
                    this.logout('');
            }.bind(this));
        //}
    };

    /*
     * -------  General Functions ----------------------------------------------------------------
     */
    @remote()
    deleteAll () {
        // This could start a lot of asynchronous activity.  In the real world you would not do this
        // but in the real world you would not have a deleteAll() :-)
        //if (this.isAdmin()) {
            this.projectsFetch().then (function () {
                _.map(this.projects, function (project) {
                    this.project = project;
                    this.deleteProject();
                }.bind(this));
                return this.ticketsFetch();
            }.bind(this)).then(function () {
                _.map(this.tickets, function (ticket) {
                    this.ticket = ticket;
                    this.deleteTicket();
                }.bind(this));
                return this.personsFetch();
            }.bind(this)).then(function () {
                _.map(this.person, function (person) {
                    if (person != this.person)
                        this.deletePerson(person);
                }.bind(this));
                this.logout('');
            }.bind(this));
        //}
    };
    /**
     * If no admin's present create one
     */
    @remote()
    publicInitAll ()
    {
        //this.createAdmin();
    };

    // create a new project to be saved later
    newProject ()
    {
        if (!this.project || this.project.created) {
            this.project = new Project("","");
            if (_.indexOf(this.projects, this.project) < 0)
                this.projects.splice(0, 0, this.project);
            this.error = null;
        }
        this.route.private.project();
    }

    @remote()
    saveProject ()  {
        if (this.project)

            return this.project.save(this.person).then(function()
            {
                this.status = "Project saved at " + this.getDisplayTime();
                this.error = "";

            }.bind(this));
    };

    deleteProject ()
    {
        if (this.project)

            return this.project.remove().then(function ()
            {
                var ix = _.indexOf(this.projects, this.project);
                if (ix >= 0)
                    this.projects.splice(ix, 1);
                console.log("Deleting " + this.project.__id__ + " " + this.project.name);
                this.project = null;

            }.bind(this));
    };
        /*
         * -------  Housekeeping ----------------------------------------------------------------------
         */

    clientInit ()
    {
        BaseController.prototype.clientInit.call(this);

        //this.router = AmorphicRouter;
        //this.route = AmorphicRouter.route(this, ticketRoutes);
        this.email = 'kumar@havenlife.com';
        this.password = 'test1234';
    }

    login ()
    {
        this.publicLogin().then(function () {
            if (this.loggedIn) {
                this.setPage('home');
            }
        }.bind(this));
    }
    registerPrincipal(principal) {
        this.loggedInPerson = principal;
    }

    logout ()
    {
        // Ideally for security purposes and to prevent leaks there should be a controller reset capability
        this.people = null;
        this.project = null;
        this.projects = null;
        this.ticket = null;
        this.tickets = null;
        //this.publicLogout('home');
    };

    /**
     * Called if an error thrown on server call that is not handled
     */
    handleRemoteError (error) {
        //this.error = this.getErrorMessage(error);
    };

    /**
     * Setup the controller to display a given file
     * @param page
     * @param file
     */
    pageInit (file) {
        //this.password = "";
        //this.newPassword = "";
        //this.confirmPassword = "";
        //this.error = "";
    };

    /**
     * Set the current page
     *
     * @param page (router path but without the initial slash needed)
     */
    @remote({on: 'client'})
    setPage(page)
    {
        this.router.goTo(page);
    };

    isPage (name) {
        return this.page == name;
    };

    log (level, text) {
        //(this.__template__.objectTemplate).log(level, text);
    };

    getDisplayTime () {
        var date = new Date();
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " +
            date.toTimeString().replace(/ .*/, '');
    };

    /**
     * Security check on remote calls is execute from semotus before executing a call on the server
     *
     * @param functionName
     * @returns {Boolean} - whether to proceed with call
    validateServerCall (functionName)
    {
        if (functionName.match(/^public/))
            return true;
        return this.loggedIn ? true : false;
    }
     */
}

