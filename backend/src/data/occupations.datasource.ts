import {Occupation} from "../models";
import IDataSource from "./IDataSource";

export default class OccupationsDataSource implements IDataSource<Occupation> {
    private data: Array<Occupation>;

    constructor() {
        this.data = [
            new Occupation({id: 0, name: "Developer", description: "Creates awesome applications"}),
            new Occupation({id: 1, name: "Shef", description: "Cookes as nobody else."}),
            new Occupation({id: 2, name: "Teacher", description: "Knows how to teach."})
        ];
    }

    getAll(): Array<Occupation> {
        return this.data;
    }
}