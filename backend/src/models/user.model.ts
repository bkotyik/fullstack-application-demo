/**
 * Describes a User with all his/her important properties
 */
export default class User {
    private name: string;
    private email: string;
    private occupation: string;
    private birthday: Date;

    constructor(obj?: any) {

    }

    public get Name() {
        return this.name;
    }

    public set Name(value: string){
        this.name = value;
    }

    public get Email() {
        return this.email;
    }

    public set Email(value: string) {
        this.email = value;
    }

    public get Occupation(): string {
        return this.occupation;
    }

    public set Occupation(value: string) {
        this.occupation = value;
    }

    public get Birthday() {
        return this.birthday;
    }

    public set Birthday(value: Date) {
        this.birthday = value;
    }

}