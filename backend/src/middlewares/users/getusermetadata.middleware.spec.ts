/// <reference path="../../../tsd.d.ts" />

import * as sinon from "sinon";
import {expect} from "chai";
import GetUserMetadataMiddleware from "./getusermetadata.middleware";

describe("GetUserMetadataMiddleware", function () {
    let getUserMetadataMiddleware: Function = null;
    let mockRequest: any = null;
    let mockResponse: any = null;
    let next: sinon.SinonSpy = null;

    before(function () {
        getUserMetadataMiddleware = GetUserMetadataMiddleware();
        mockRequest = {};
        mockResponse = {};
        next = sinon.spy();
    });

    after(function () {
        next.reset();
    });

    describe("when User Schema is present", function () {
        let statusStub: sinon.SinonStub = null;
        let setStub: sinon.SinonStub = null;
        let sendStub: sinon.SinonStub = null;

        before(function () {
            statusStub = sinon.stub();
            setStub = sinon.stub();
            sendStub = sinon.stub();
            statusStub.returns({set: setStub});
            setStub.returns({send: sendStub});
            mockResponse = {
                status: statusStub,
                set: setStub,
                send: sendStub
            };
            getUserMetadataMiddleware(mockRequest, mockResponse, next);
        });

        after(function () {
            statusStub.reset();
            setStub.reset();
            sendStub.reset();
        });

        it("sets status to http 200", function () {
            expect(statusStub.withArgs(200).calledOnce).eq(true);
        });

        it("sets content-type to application/json", function () {
            expect(setStub.withArgs("Content-Type", "application/json").calledOnce).eq(true);
        });

        it("sends the response", function () {
            expect(sendStub.calledOnce).eq(true);
        });
    });
});