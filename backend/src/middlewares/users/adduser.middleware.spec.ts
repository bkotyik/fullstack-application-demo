/// <reference path="../../../tsd.d.ts" />

import AddUserMiddleware from "./adduser.middleware";
import * as sinon from "sinon";
import {expect} from "chai";
import WebError from "../../models/weberror.model";

describe("AddUserMiddleware", function () {
    let addUserMiddleware: Function = null;
    let mockRequest: any = null;
    let mockResponse: any = null;
    let next: sinon.SinonSpy = null;

    before(function () {
        addUserMiddleware = AddUserMiddleware();
        mockRequest = {};
        mockResponse = {};
        next = sinon.spy();
    });

    after(function() {
       next.reset();
    });

    describe("when a valid User model is posted in the request", function () {
        let jsonSpy: sinon.SinonSpy = null;

        let fakeValidUser: any = {
            name: "Fake name",
            birthday: "1990.12.31",
            email: "fake@email.com"
        };

        before(function () {
            jsonSpy = sinon.spy();
            mockRequest.body = fakeValidUser;
            mockResponse.json = jsonSpy;
            addUserMiddleware(mockRequest, mockResponse, next);
        });

        after(function() {
           jsonSpy.reset();
        });

        it("returns a polite message that informs the the application was successful", function() {
            expect(jsonSpy.withArgs({message: "Thank you for your application. We will contact you soon."}).calledOnce).be.true;
        });

        it("ends communication, does not invoke next middleware", function() {
            expect(next.notCalled).be.true;
        });

    });

    describe("when an invalid User model is posted in the request", function () {
        let fakeInvalidUser: any = {
            birthday: "1990.12.31",
            email: "notAnEmailSadly"
        };

        before(function () {
            mockRequest.body = fakeInvalidUser;
            addUserMiddleware(mockRequest, mockResponse, next);
        });

        after(function() {
            next.reset();
        });

        it("invokes the next middleware", function() {
           expect(next.calledOnce).to.be.true;
        });

        it("creates an error object which will be passed to the error handler", function() {
           expect(next.args.length).to.eq(1);
        });

        it("raises a validation error", function() {
           expect((<WebError>next.args[0][0]).Status).eq(400);
        });

    });

});