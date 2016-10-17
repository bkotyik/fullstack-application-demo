import Occupation from './occupation.model';

/**
 * Describes a User with all his/her important properties
 */
export default class User {

    private id: number;
    private name: string;
    private email: string;
    private occupation: Occupation;
    private birthday: Date;

    constructor(obj?: any) {
        if (obj != null) {
            this.id = obj.id != null ? obj.id : undefined;
            this.name = obj.name || undefined;
            this.birthday = obj.birthday ? new Date(`${obj.birthday.year}-${obj.birthday.month}-${obj.birthday.day}`) : undefined;
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

    public toDTO(): any {
        return {
            name: this.Name,
            email: this.Email,
            birthday: this.Birthday,
            occupation: this.Occupation != null ? this.Occupation.toDTO() : undefined
        };
    }

}
