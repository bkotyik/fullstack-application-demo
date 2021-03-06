/**
 * Describes a User's occupation
 */
export default class Occupation {
    private id: number;
    private name: string;
    private description: string;

    constructor(obj?: any) {
        if (obj != null) {
            this.id = obj.id != null ? obj.id : 0;
            this.name = obj.name || null;
            this.description = obj.description || null;
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

    public get Description(): string {
        return this.description;
    }

    public set Description(value: string) {
        this.description = value;
    }
}