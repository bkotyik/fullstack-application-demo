import UserModel from "./user.model";

describe("User model", function () {
    let user: UserModel;

    beforeEach(function () {
        user = new UserModel({
            id: 0,
            name: "Test User",
            email: "test@fake.com",
            birthday: "1990.12.31"
        });
    });

    it("requires name to be set", function (done: Function) {
        user.Name = undefined;
    });

});