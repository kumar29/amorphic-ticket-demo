import {Supertype, supertypeClass, property, Remoteable, Persistable, remote} from 'amorphic';
import {TicketItem} from './ticketItem';
console.log("Compiling Person");
import {AuthenticatedPrincipal} from "amorphic-userman";

@supertypeClass
export class Person extends AuthenticatedPrincipal {

    @property({length: 40, rule: ["name", "required"]})
    firstName:          string = "";

    @property({length: 40, rule: ["name", "required"]})
    middleName:         string = "";

    @property({length: 40, rule: ["name", "required"]})
    lastName:           string = "";     //value: "", length: 40, rule: ["name", "required"]},

    // Secure data elements never transmitted in both directions
    @property({toServer: false, length: 200})
    email:              string = "";

    @property({length: 1, rule: ["required"], values: ['male', 'female'],
        descriptions: {
            'male': 'male',
            'female': 'female'
        }})
    gender: string;

    @property({rule: [ "required"]})
    dob: Date;
    dobTrigger () {
        function getAge(date)
        {
            var today = new Date();
            var birthDate = date;
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
            {
                age--;
            }
            return age;
        }

        this.age = getAge(this.dob);
    }

    @property({rule: [ "required"]})
    age: Number;

    @property({rule: [ "required"]})
    smoker: boolean;

    @property({length: 5, rule: ["required"]})
    zip: Number;

    @property({length: 40, rule: ["required"]})
    city: string = '';

    @property({length: 2, rule: ["name", "required"]})
    state: string = '';

    @property({length: 40, rule: ["name", "required"]})
    face: Number;

    @property({length: 40, rule: ["name", "required"]})
    term: Number;

    // Relationships
    @property({type: TicketItem})
    ticketItems:        Array<TicketItem> = [];

    constructor  (email: string, first: string, middle: string, last: string) {
        super();
        this.firstName = first || "";
        this.middleName = middle || "";
        this.lastName = last || ""
        this.email = email || "";
    };

    getFullName () {
        return this.firstName + (this.middleName ? " " + this.middleName  + " ": " ") + this.lastName;
    };

    @remote()
    save () {
        return this.persistorSave();
    };

    remove () {
        //if (this.getSecurityContext().isAdmin())
            return this.persistDelete();
        //else
        //    return Q(false);
    };

};

