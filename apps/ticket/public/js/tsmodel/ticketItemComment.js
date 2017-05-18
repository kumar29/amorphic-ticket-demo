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
var ticket_1 = require("./ticket");
var ticketItem_1 = require("./ticketItem");
var ticketItemAttachment_1 = require("./ticketItemAttachment");
console.log("Compiling TicketItemComment");
var TicketItemComment = (function (_super) {
    __extends(TicketItemComment, _super);
    // Only called on the server
    function TicketItemComment(ticket, text, creator) {
        var _this = _super.call(this, ticket, creator) || this;
        _this.text = text;
        return _this;
    }
    ;
    TicketItemComment.prototype.addAttachment = function (name, data) {
        var attachment = new ticketItemAttachment_1.TicketItemAttachment(this, name, data);
        this.attachments.push(attachment);
        return attachment;
    };
    ;
    TicketItemComment.prototype.remove = function () {
        for (var ix = 0; ix < this.attachments.length; ++ix)
            this.attachments[ix].persistDelete();
        this.persistDelete();
    };
    ;
    return TicketItemComment;
}(ticketItem_1.TicketItem));
__decorate([
    amorphic_1.property({ rule: ['required'] }),
    __metadata("design:type", String)
], TicketItemComment.prototype, "text", void 0);
__decorate([
    amorphic_1.property({ type: ticketItemAttachment_1.TicketItemAttachment }),
    __metadata("design:type", Array)
], TicketItemComment.prototype, "attachments", void 0);
TicketItemComment = __decorate([
    amorphic_1.supertypeClass,
    __metadata("design:paramtypes", [ticket_1.Ticket, Object, Object])
], TicketItemComment);
exports.TicketItemComment = TicketItemComment;
;
//# sourceMappingURL=ticketItemComment.js.map