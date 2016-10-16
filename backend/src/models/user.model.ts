import Occupation from "./occupation.model";
import * as Joi from "joi";
import MinAgeValidator from "./validators/minage.joi.validators";

const extendedJoi = Joi.extend(new MinAgeValidator());


/**
 * Describes a User with all his/her important properties
 */
export default class User {
    private id: number;
    private name: string;
    private email: string;
    private occupation: Occupation;
    private birthday: Date;

    private static schema: Joi.Schema = extendedJoi.object().keys({
        name: extendedJoi.string().required().invalid(null),
        email: extendedJoi.string().email()
            .regex(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)
            .required(),
        birthday: extendedJoi.date().minAge(18)
    });

    constructor(obj?: any) {
        if (obj != null) {
            this.id = obj.id != null ? obj.id : undefined;
            this.name = obj.name || undefined;
            this.birthday = obj.birthday ? new Date(obj.birthday) : undefined;
            this.email = obj.email || undefined;
            this.occupation = obj.occupation ? new Occupation(obj.occupation) : undefined;
        }
    }

    public get Id(): number {
        return this.id;
    }

    public set Id(value: number) {
        this.id = value;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(value: string) {
        this.name = value;
    }

    public get Email(): string {
        return this.email;
    }

    public set Email(value: string) {
        this.email = value;
    }

    public get Occupation(): Occupation {
        return this.occupation;
    }

    public set Occupation(value: Occupation) {
        this.occupation = value;
    }

    public get Birthday(): Date {
        return this.birthday;
    }

    public set Birthday(value: Date) {
        this.birthday = value;
    }

    public validate(): Promise<any> {
        let promise = new Promise<any>((resolve: Function, reject: Function) => {
            Joi.validate(this, User.Schema, {allowUnknown: true}, (err: Joi.ValidationError, value: User) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });

        return promise;
    }

    public static get Schema(): Joi.Schema {
        return this.schema;
    }

}