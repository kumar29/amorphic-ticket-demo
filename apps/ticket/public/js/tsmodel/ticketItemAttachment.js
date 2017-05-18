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
var ticketItem_1 = require("./ticketItem");
console.log("Compiling TicketItemAttachment");
var TicketItemAttachment = (function (_super) {
    __extends(TicketItemAttachment, _super);
    // Only called on the server
    function TicketItemAttachment(ticketItem, name, data) {
        var _this = _super.call(this) || this;
        _this.ticketItem = ticketItem || null;
        _this.name = name || null;
        _this.data = data || null;
        _this.created = new Date();
        return _this;
    }
    return TicketItemAttachment;
}(amorphic_1.Remoteable(amorphic_1.Persistable(amorphic_1.Supertype))));
__decorate([
    amorphic_1.property(),
    __metadata("design:type", String)
], TicketItemAttachment.prototype, "data", void 0);
__decorate([
    amorphic_1.property(),
    __metadata("design:type", String)
], TicketItemAttachment.prototype, "name", void 0);
__decorate([
    amorphic_1.property(),
    __metadata("design:type", Date)
], TicketItemAttachment.prototype, "created", void 0);
__decorate([
    amorphic_1.property(),
    __metadata("design:type", ticketItem_1.TicketItem)
], TicketItemAttachment.prototype, "ticketItem", void 0);
TicketItemAttachment = __decorate([
    amorphic_1.supertypeClass,
    __metadata("design:paramtypes", [Object, Object, Object])
], TicketItemAttachment);
exports.TicketItemAttachment = TicketItemAttachment;
;
//# sourceMappingURL=ticketItemAttachment.js.map