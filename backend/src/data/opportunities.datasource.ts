import OccupationModel from "../models/occupation.model";

export default class OccupationsDataSource {
    private data: Array<OccupationModel>;

    constructor() {
        this.data = [
            new OccupationModel({id: 0, name: "Developer", description: "Creates awesome applications"}),
            new OccupationModel({id: 1, name: "Shef", description: "Cookes as nobody else."}),
            new OccupationModel({id: 3, name: "Teacher", description: "Knows how to teach."})
        ];
    }

    getAll(): Array<OccupationModel> {
        return this.data;
    }
}