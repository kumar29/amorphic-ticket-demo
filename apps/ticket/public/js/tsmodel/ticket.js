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
var project_1 = require("./project");
var ticketItemComment_1 = require("./ticketItemComment");
var ticketItem_1 = require("./ticketItem");
var created_1 = require("./created");
console.log("Compiling Ticket");
var Ticket = (function (_super) {
    __extends(Ticket, _super);
    function Ticket(title, description, projectName, projectDescription) {
        var _this = _super.call(this) || this;
        _this.ticketItems = [];
        _this.title = title || null;
        _this.created = new Date();
        _this.description = description || null;
        if (projectName)
            _this.project = new project_1.Project(projectName, projectDescription);
        return _this;
    }
    ;
    Ticket.prototype.addComment = function (comment, creator) {
        comment = new ticketItemComment_1.TicketItemComment(this, comment, creator);
        this.ticketItems.push(comment);
        return comment;
    };
    Ticket.prototype.remove = function () {
        for (var ix = 0; ix < this.ticketItems.length; ++ix)
            this.ticketItems[ix].remove();
        if (this.project) {
            for (var ix = 0; ix < this.project.tickets.length; ++ix)
                if (this.project.tickets[ix] == this)
                    this.project.tickets.splice(ix, 1);
            this.project.save();
        }
        return this.persistDelete();
    };
    ;
    Ticket.prototype.save = function () {
        if (!this.created)
            this.created = new Date();
        /*
             if (!this.creator)
             this.creator = this.getSecurityContext().principal;
        */
        return this.persistSave();
    };
    return Ticket;
}(created_1.Created(amorphic_1.Remoteable(amorphic_1.Persistable(amorphic_1.Supertype)))));
__decorate([
    amorphic_1.property({ rule: ['required'] }),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    amorphic_1.property(),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    amorphic_1.property({ toServer: false, fetch: true }),
    __metadata("design:type", project_1.Project)
], Ticket.prototype, "project", void 0);
__decorate([
    amorphic_1.property({ type: ticketItem_1.TicketItem, fetch: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "ticketItems", void 0);
__decorate([
    amorphic_1.remote({ validate: function () { return this.validate(); } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", ticketItem_1.TicketItem)
], Ticket.prototype, "addComment", null);
__decorate([
    amorphic_1.remote(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ticket.prototype, "remove", null);
__decorate([
    amorphic_1.remote({ validate: function () { return this.validate(); } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ticket.prototype, "save", null);
Ticket = __decorate([
    amorphic_1.supertypeClass,
    __metadata("design:paramtypes", [String, String, String, String])
], Ticket);
exports.Ticket = Ticket;
;
//# sourceMappingURL=ticket.js.map