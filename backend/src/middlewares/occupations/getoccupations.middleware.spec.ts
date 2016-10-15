/// <reference path="../../../tsd.d.ts" />

import OccupationsMiddleware from "./getoccupations.middleware";
import {OccupationsDataSource} from "../../data";
import * as sinon from "sinon";
import {expect} from "chai";

describe("GetOccupationsMiddleware", function () {
    let occupationsMiddleware: Function;
    let mockRequest: any = null;
    let mockResponse: any = null;
    let next: Sinon.SinonSpy = null;

    before(function() {
        mockRequest = {};
        mockResponse = {};
        next = sinon.spy();
    });

    after(function() {
       next.reset();
    });

    describe("when datasource is injected", function () {
        let occupationsDataSourceStub: OccupationsDataSource;
        let jsonSpy: sinon.SinonSpy = null;
        let statusStub: sinon.SinonStub = null;

        before(function () {
            // ARRANGE: Set up stubs, spies and mocks
            jsonSpy = sinon.spy();
            statusStub = sinon.stub();

            mockResponse.status = statusStub;
            statusStub.returns({json: jsonSpy});

            occupationsDataSourceStub = new OccupationsDataSource();
            sinon.stub(occupationsDataSourceStub);

            // ACT: Inject mocked dependencies and invoke middleware
            occupationsMiddleware = OccupationsMiddleware({occupationsDataSource: occupationsDataSourceStub});
            occupationsMiddleware(mockRequest, mockResponse, next);
        });

        after(function() {
            jsonSpy.reset();
            statusStub.reset();
        });

        it("it does not call next middleware", function () {
            expect(next.notCalled).be.true;
        });

        it("gets all the occupations from the data source", function() {
            expect((<Sinon.SinonSpy>occupationsDataSourceStub.getAll).called).be.true;
        });

        it("responses in json format", function() {
           expect(jsonSpy.called).be.true;
        });

        it("responses HTTP OK", function() {
           expect(statusStub.withArgs(200).called).be.true;
        });
    });

    describe("when no datasource injected", function() {
        before(function() {
            occupationsMiddleware = OccupationsMiddleware();
            occupationsMiddleware(mockRequest, mockResponse, next);
        });

        after(function() {
            next.reset();
        });

        it("invokes next", function() {
            expect(next.calledOnce).to.be.true;
        });

        it("passes an error to next function", function() {
            expect(next.args[0].length).eq(1);
        });

    });

});