import User from "./user.model";
import {ValidationError, ValidationResult} from "joi";
import {expect} from "chai";

describe("User model", function () {
    let user: User;

    beforeEach(function () {
        user = new User({
            id: 0,
            name: "Test User",
            email: "test@fake.com",
            birthday: "1990.12.31"
        });
    });

    it("requires name to be set", function (done: Function) {
        user.Name = undefined;

        user.validate().then(
            (value: ValidationResult<User>) => {
                done(Error("Validation should fail when Name is not defined."));
            },
            (error: ValidationError) => {
                expect(error.details.length).to.eq(1);
                expect(error.details[0].path).to.eq("name");
                done();
            }
        );
    });

});