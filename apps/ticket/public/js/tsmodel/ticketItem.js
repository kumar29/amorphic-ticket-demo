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
var ticketItemComment_1 = require("./ticketItemComment");
var created_1 = require("./created");
console.log("Compiling TicketItem");
var TicketItem = (function (_super) {
    __extends(TicketItem, _super);
    // Only called on the server
    function TicketItem(ticket, creator) {
        var _this = _super.call(this) || this;
        _this.ticket = ticket;
        _this.creator = creator;
        _this.created = new Date();
        return _this;
    }
    TicketItem.prototype.isComment = function () {
        return this instanceof ticketItemComment_1.TicketItemComment;
    };
    TicketItem.prototype.remove = function () {
        return this.persistDelete();
    };
    return TicketItem;
}(created_1.Created(amorphic_1.Remoteable(amorphic_1.Persistable(amorphic_1.Supertype)))));
__decorate([
    amorphic_1.property({ getType: function () { return person_1.Person; } }),
    __metadata("design:type", person_1.Person)
], TicketItem.prototype, "creator", void 0);
__decorate([
    amorphic_1.property(),
    __metadata("design:type", Date)
], TicketItem.prototype, "created", void 0);
__decorate([
    amorphic_1.property({ getType: function () { return ticket_1.Ticket; } }),
    __metadata("design:type", ticket_1.Ticket)
], TicketItem.prototype, "ticket", void 0);
TicketItem = __decorate([
    amorphic_1.supertypeClass,
    __metadata("design:paramtypes", [ticket_1.Ticket, person_1.Person])
], TicketItem);
exports.TicketItem = TicketItem;
;
//# sourceMappingURL=ticketItem.js.map