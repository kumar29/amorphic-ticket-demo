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
console.log("Compiling Person");
var amorphic_userman_1 = require("amorphic-userman");
var Person = (function (_super) {
    __extends(Person, _super);
    function Person(email, first, middle, last) {
        var _this = _super.call(this) || this;
        _this.firstName = "";
        _this.middleName = "";
        _this.lastName = ""; //value: "", length: 40, rule: ["name", "required"]},
        // Secure data elements never transmitted in both directions
        _this.email = "";
        _this.city = '';
        _this.state = '';
        // Relationships
        _this.ticketItems = [];
        _this.firstName = first || "";
        _this.middleName = middle || "";
        _this.lastName = last || "";
        _this.email = email || "";
        return _this;
    }
    Person.prototype.dobTrigger = function () {
        function getAge(date) {
            var today = new Date();
            var birthDate = date;
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        this.age = getAge(this.dob);
    };
    ;
    Person.prototype.getFullName = function () {
        return this.firstName + (this.middleName ? " " + this.middleName + " " : " ") + this.lastName;
    };
    ;
    Person.prototype.save = function () {
        return this.persistorSave();
    };
    ;
    Person.prototype.remove = function () {
        //if (this.getSecurityContext().isAdmin())
        return this.persistDelete();
        //else
        //    return Q(false);
    };
    ;
    return Person;
}(amorphic_userman_1.AuthenticatedPrincipal));
__decorate([
    amorphic_1.property({ length: 40, rule: ["name", "required"] }),
    __metadata("design:type", String)
], Person.prototype, "firstName", void 0);
__decorate([
    amorphic_1.property({ length: 40, rule: ["name", "required"] }),
    __metadata("design:type", String)
], Person.prototype, "middleName", void 0);
__decorate([
    amorphic_1.property({ length: 40, rule: ["name", "required"] }),
    __metadata("design:type", String)
], Person.prototype, "lastName", void 0);
__decorate([
    amorphic_1.property({ toServer: false, length: 200 }),
    __metadata("design:type", String)
], Person.prototype, "email", void 0);
__decorate([
    amorphic_1.property({ length: 1, rule: ["required"], values: ['male', 'female'],
        descriptions: {
            'male': 'male',
            'female': 'female'
        } }),
    __metadata("design:type", String)
], Person.prototype, "gender", void 0);
__decorate([
    amorphic_1.property({ rule: ["required"] }),
    __metadata("design:type", Date)
], Person.prototype, "dob", void 0);
__decorate([
    amorphic_1.property({ rule: ["required"] }),
    __metadata("design:type", Number)
], Person.prototype, "age", void 0);
__decorate([
    amorphic_1.property({ rule: ["required"] }),
    __metadata("design:type", Boolean)
], Person.prototype, "smoker", void 0);
__decorate([
    amorphic_1.property({ length: 5, rule: ["required"] }),
    __metadata("design:type", Number)
], Person.prototype, "zip", void 0);
__decorate([
    amorphic_1.property({ length: 40, rule: ["required"] }),
    __metadata("design:type", String)
], Person.prototype, "city", void 0);
__decorate([
    amorphic_1.property({ length: 2, rule: ["name", "required"] }),
    __metadata("design:type", String)
], Person.prototype, "state", void 0);
__decorate([
    amorphic_1.property({ length: 40, rule: ["name", "required"] }),
    __metadata("design:type", Number)
], Person.prototype, "face", void 0);
__decorate([
    amorphic_1.property({ length: 40, rule: ["name", "required"] }),
    __metadata("design:type", Number)
], Person.prototype, "term", void 0);
__decorate([
    amorphic_1.property({ type: ticketItem_1.TicketItem }),
    __metadata("design:type", Array)
], Person.prototype, "ticketItems", void 0);
__decorate([
    amorphic_1.remote(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Person.prototype, "save", null);
Person = __decorate([
    amorphic_1.supertypeClass,
    __metadata("design:paramtypes", [String, String, String, String])
], Person);
exports.Person = Person;
;
//# sourceMappingURL=person.js.map