import * as request from "supertest";
import app from "../app";
import {expect} from "chai";

describe("Users api", function () {
    describe("exposes an api for posting users", function () {
        describe("when posting invalid user", function () {
            let invalidUser = {
                name: "Anonymous",
                email: "fake@notvalid"
            };

            let response: any = null;

            before(function(done) {
                request(app)
                    .post("/users")
                    .send(invalidUser)
                    .set("Accept", "application/json")
                    .end(function(err: any, res: any) {
                        if (err != null) {
                            throw err;
                        }
                        response = res;
                        done();
                    });
            });

            it("responds bad request", function () {
                expect(response.status).to.eq(400);
            });

            it("should validation error", function() {
               expect(response.body.code).to.eq("VALIDATION_ERROR");
            });

            it("should expose validation details", function () {
                expect(response.body.details).not.to.be.undefined;
            });

        });

        describe("when a valid user is posted", function() {
            let validUser = {
                name: "Anonymous",
                email: "fake@valid.com"
            };

            let response: any = null;

            before(function(done) {
                request(app)
                    .post("/users")
                    .send(validUser)
                    .set("Accept", "application/json")
                    .end(function(err: any, res: any) {
                        if (err != null) {
                            throw err;
                        }
                        response = res;
                        done();
                    });
            });

            it("responds http 200", function () {
                expect(response.status).to.eq(200);
            });

            it("should response a polite message", function() {
                expect(response.body.message).not.to.be.undefined;
            });

        });

    });
});