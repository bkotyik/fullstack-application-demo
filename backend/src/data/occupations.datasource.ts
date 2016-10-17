import {Occupation} from "../models";
import IDataSource from "./IDataSource";

/**
 * Sample Datasource implementation.
 */
export default class OccupationsDataSource implements IDataSource<Occupation> {
    private data: Array<Occupation>;

    constructor() {
        // Demo data
        this.data = [
            new Occupation({id: 0, name: "Developer", description: "Creates awesome applications"}),
            new Occupation({id: 1, name: "Shef", description: "Cookes as nobody else."}),
            new Occupation({id: 2, name: "Teacher", description: "Knows how to teach."})
        ];
    }

    /**
     * Returns the occupations that are stored by this datasource
     * @returns {Array<Occupation>}
     */
    getAll(): Array<Occupation> {
        return this.data;
    }
}