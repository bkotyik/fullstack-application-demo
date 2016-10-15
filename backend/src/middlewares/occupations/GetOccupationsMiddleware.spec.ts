import OccupationsMiddleware from "./GetOccupationsMiddleware";
import OccupationsDataSource from "../../data/occupations.datasource";
import * as sinon from "sinon";
import {expect} from "chai";
import * as express from "express";
import MockRequest from "../../test/mocks/MockRequest";
import MockResponse from "../../test/mocks/MockResponse";

describe("GetOccupationsMiddleware", function () {
    describe("when datasource is injected", function () {
        let occupationsMiddleware: Function;
        let occupationsDataSourceStub: sinon.SinonStub;
        let mockRequest: MockRequest = null;
        let mockResponse: MockResponse = null;

        before(function () {
            mockRequest = new MockRequest();
            mockResponse = new MockResponse();
            mockResponse.status = sinon.stub();
            mockResponse.status.returns({json: sinon.spy()});
            occupationsDataSourceStub = sinon.stub(new OccupationsDataSource());
            occupationsMiddleware = OccupationsMiddleware({occupationsDataSource: occupationsDataSourceStub});
        });

        it("it gets all the occupations from the data source", function () {
            let next = sinon.spy();
            occupationsMiddleware(mockRequest, mockResponse, next);
        });
    });
});