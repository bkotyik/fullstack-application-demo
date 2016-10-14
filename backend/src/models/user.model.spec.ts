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
        user.Name = null;

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

    it("requires email to be set", function (done: Function) {
        user.Email = null;

        user.validate().then(
            (value: ValidationResult<User>) => {
                done(Error("Validation should fail when Email is not defined."));
            },
            (error: ValidationError) => {
                expect(error.details.length).to.eq(1);
                expect(error.details[0].path).to.eq("email");
                done();
            }
        );
    });

    it("requires to be at least 18 years old", function (done: Function) {
        user.Birthday = new Date("2015.01.01.");

        user.validate().then(
            (value: User) => {
                done(Error("Validation should fail when age is less than 18."));
            },
            (error: ValidationError) => {
                expect(error.details.length).to.eq(1);
                expect(error.details[0].path).to.eq("birthday");
                done();
            }
        );
    });

    it("is valid if the user is more than 18 years old", function (done: Function) {
        var nineteenYearsAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365.25 * 19);
        user.Birthday = nineteenYearsAgo;

        user.validate().then(
            (value: User) => {
                expect(value).to.deep.eq(user);
                done();
            },
            (error: ValidationError) => {
                done(Error("User model should be valid if the user is more than 18 years old."));
            }
        );
    });

    it("is not mandatory to fill the birthday attribute", function() {
        user.Birthday = null;

        user.validate().then(
            (value: User) => {
                expect(value).to.deep.eq(user);
                done();
            },
            (error: ValidationError) => {
                done(Error("Field birthday should not be required."));
            }
        );
    });

});