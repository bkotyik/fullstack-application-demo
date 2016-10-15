/// <reference path="../../../tsd.d.ts" />

import ErrorHandlerMiddleware from "./errorhandler.middleware";
import * as sinon from "sinon";
import {expect} from "chai";
import {WebError} from "../../models";

describe("ErrorHandlerMiddleware", function () {
    let errorHandlerMiddleware: Function = null;
    let mockRequest: any = null;
    let mockResponse: any = null;
    let next: sinon.SinonSpy = null;
    let statusStub: sinon.SinonStub = null;
    let jsonSpy: sinon.SinonSpy = null;

    let fakeStatus: number = null;
    let fakeErrorCode: string = null;

    before(function () {
        errorHandlerMiddleware = ErrorHandlerMiddleware();
        mockRequest = {};
        mockResponse = {};
        next = sinon.spy();
        statusStub = sinon.stub();
        jsonSpy = sinon.spy();

        mockResponse.status = statusStub;
        statusStub.returns({json: jsonSpy});

        fakeStatus = 404;
        fakeErrorCode = "NOT_FOUND";

        errorHandlerMiddleware(new WebError(null, fakeStatus, fakeErrorCode), mockRequest, mockResponse, next);
    });

    after(function() {
       next.reset();
    });

    it("sets response status according to the status defined in WebError", function() {
        expect(statusStub.withArgs(fakeStatus).calledOnce).to.be.true;
    });

    it("responses a json formatted error message", function() {
        expect(jsonSpy.calledOnce).to.be.true;
    });

    it("response an error object which contains the error code", function() {
        let errorResponse: any = jsonSpy.args[0][0];
        expect(errorResponse.code).to.eq(fakeErrorCode);
    });

});