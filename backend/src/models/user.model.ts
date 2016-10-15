import Occupation from "./occupation.model";
import * as Joi from "joi";
import MinAgeValidator from "./validators/minage.joi.validators";

/**
 * Describes a User with all his/her important properties
 */
export default class User {
    private id: number;
    private name: string;
    private email: string;
    private occupation: Occupation;
    private birthday: Date;

    private extendedJoi = Joi.extend(new MinAgeValidator());

    private schema: Joi.Schema = this.extendedJoi.object().keys({
        name: this.extendedJoi.string().required(),
        email: this.extendedJoi.string().email().required(),
        birthday: this.extendedJoi.date().minAge(18)
    });

    constructor(obj?: any) {
        if (obj != null) {
            this.id = obj.id || null;
            this.name = obj.name || null;
            this.birthday = obj.birthday ? new Date(obj.birthday) : null;
            this.email = obj.email || null;
            this.occupation = obj.occupation ? new Occupation(obj.occupation) : null;
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
            Joi.validate(this, this.schema, {allowUnknown: true }, (err: Joi.ValidationError, value: User) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });

        return promise;
    }

    public get Schema(): Joi.Schema {
        return this.schema;
    }

}