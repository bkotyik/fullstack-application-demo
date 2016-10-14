import Occupation from "./occupation.model";
import * as Joi from "joi";

/**
 * Describes a User with all his/her important properties
 */
export default class User {
    private id: number;
    private name: string;
    private email: string;
    private occupation: Occupation;
    private birthday: Date;

    private schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        birthday: Joi.date()
    });

    constructor(obj?: any) {
        // TODO: Implement parsing of User

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

    public set Name(value: string){
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
            Joi.validate(this, this.schema, (err: Joi.ValidationError, value: Joi.ValidationResult<User>) => {
               if (err != null) {
                   reject(err);
               } else {
                   resolve(value);
               }
            });
        });

        return promise;
    }

}