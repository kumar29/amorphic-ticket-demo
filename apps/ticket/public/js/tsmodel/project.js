"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var amorphic_1 = require("amorphic");
var person_1 = require("./person");
var ticket_1 = require("./ticket");
console.log("Compiling Project");
var Project = (function (_super) {
    __extends(Project, _super);
    function Project(name, description) {
        var _this = _super.call(this) || this;
        _this.tickets = [];
        _this.name = name;
        _this.description = description;
        return _this;
    }
    ;
    Project.prototype.addNewTicket = function (title, description) {
        var ticket = new ticket_1.Ticket(title, description);
        ticket.project = this;
        this.tickets.push(ticket);
    };
    /*
        validateServerCall () {
            return this.getSecurityContext().principal ? true : false;
        };
    */
    Project.prototype.save = function (authenticatedPerson) {
        /*
        if (!this.creator) {
            this.creator = this.getSecurityContext().principal;
            this.created = new Date();
        }
        */
        this.creator = authenticatedPerson;
        return this.persistSave();
    };
    Project.prototype.remove = function () {
        return this.persistorDelete();
    };
    return Project;
}(amorphic_1.Remoteable(amorphic_1.Persistable(amorphic_1.Supertype))));
__decorate([
    amorphic_1.property({ length: 40, rule: ["name", "required"] }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    amorphic_1.property({ rule: ["datetime"] }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    amorphic_1.property(),
    __metadata("design:type", Date)
], Project.prototype, "created", void 0);
__decorate([
    amorphic_1.property({ toServer: false, fetch: true }),
    __metadata("design:type", person_1.Person)
], Project.prototype, "creator", void 0);
__decorate([
    amorphic_1.property({ toServer: false, fetch: true }),
    __metadata("design:type", person_1.Person)
], Project.prototype, "owner", void 0);
__decorate([
    amorphic_1.property({ getType: function () { return ticket_1.Ticket; }, fetch: true }),
    __metadata("design:type", Array)
], Project.prototype, "tickets", void 0);
Project = __decorate([
    amorphic_1.supertypeClass,
    __metadata("design:paramtypes", [String, String])
], Project);
exports.Project = Project;
;
//# sourceMappingURL=project.js.map