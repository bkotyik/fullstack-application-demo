import * as request from "supertest";
import app from "../app";
import {expect} from "chai";

describe("Occupations api", function () {
    describe("GET /occupations/ is and endpoint for getting possible opccupations", function () {
        let response: any;

        before(function (done) {
            request(app)
                .get("/occupations")
                .set("Accept", "application/json")
                .end(function (err: any, res: any) {
                    if (err != null) {
                        throw err;
                    }
                    response = res;
                    done();
                });
        });

        it("should respond HTTP 200", function () {
            expect(response.status).to.eq(200);
        });

        it("should respond an array of occupations", function () {
            expect(Array.isArray(response.body)).to.be.true;
        });
    });
});