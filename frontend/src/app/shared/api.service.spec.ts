import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {ApiService} from './api.service';
import {XHRBackend, RequestMethod, ResponseOptions, Response, HttpModule} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing/mock_backend';
import Occupation from './models/occupation.model';
import User from "./models/user.model";


describe("Service: ApiService", function () {
    describe("getOccupations method", function() {
        /* tslint:disable:quotemark */
        const mockResponse = [{id: 0, name: "Test", description: "Test occupation"}];
        /* tslint:enable:quotemark */

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule],
                providers: [
                    {
                        provide: XHRBackend,
                        useClass: MockBackend
                    },
                    ApiService
                ]
            });
        });

        it('should get the occupations', fakeAsync(
            inject([
                XHRBackend,
                ApiService
            ], (mockBackend: MockBackend, apiService: ApiService) => {

                const expectedUrl = 'http://localhost:3000/occupations';

                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {
                        expect(connection.request.method).toBe(RequestMethod.Get);
                        expect(connection.request.url).toBe(expectedUrl);

                        connection.mockRespond(new Response(
                            new ResponseOptions({body: mockResponse})
                        ));
                    });


                apiService.getOccupations()
                    .subscribe(
                        (result) => {
                            expect(result).toEqual(mockResponse.map((o) => new Occupation(o)));
                        }
                    );
            })
        ));
    });

    describe("getUserMetadata", function() {
        /* tslint:disable:quotemark */
        const mockResponse = [{
            "key": "name",
            "schema": {
                "_flags": {"presence": "required"},
            }
        }, {
            "key": "email",
            "schema": {
                "_tests": [{"name": "email"}, {
                    "name": "regex",
                    "arg": "/^TLDR$/i"
                }],
                "_flags": {"presence": "required"},
            }
        }, {
            "key": "birthday",
            "schema": {
                "_tests": [{
                    "name": "minAge",
                    "arg": {"ageLimit": 18},
                }],
                "_flags": {"minAge": 18},
            }
        }];
        /* tslint:enable:quotemark */

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule],
                providers: [
                    {
                        provide: XHRBackend,
                        useClass: MockBackend
                    },
                    ApiService
                ]
            });
        });

        it('should get user metadata', fakeAsync(
            inject([
                XHRBackend,
                ApiService
            ], (mockBackend: MockBackend, apiService: ApiService) => {

                const expectedUrl = 'http://localhost:3000/users/metadata';

                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {
                        expect(connection.request.method).toBe(RequestMethod.Get);
                        expect(connection.request.url).toBe(expectedUrl);

                        connection.mockRespond(new Response(
                            new ResponseOptions({body: mockResponse})
                        ));
                    });


                apiService.getUserMetadata()
                    .subscribe(
                        (result) => {
                            expect(result.json()).toBe(mockResponse);
                        }
                    );
            })
        ));
    });

    describe("addUser", function() {
        /* tslint:disable:quotemark */
        const mockResponse = {};
        const mockRequest = {name: 'test', email:'test@me.com', birthday: undefined, occupation: {id: 0}};
        /* tslint:enable:quotemark */

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule],
                providers: [
                    {
                        provide: XHRBackend,
                        useClass: MockBackend
                    },
                    ApiService
                ]
            });
        });

        it('should post user to backend', fakeAsync(
            inject([
                XHRBackend,
                ApiService
            ], (mockBackend: MockBackend, apiService: ApiService) => {

                const expectedUrl = 'http://localhost:3000/users';

                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {
                        expect(connection.request.method).toBe(RequestMethod.Post);
                        expect(connection.request.url).toBe(expectedUrl);

                        expect(connection.request.json().name).toBe(mockRequest.name);
                        expect(connection.request.json().email).toBe(mockRequest.email);
                        expect(connection.request.json().birthday).toBe(mockRequest.birthday);
                        expect(connection.request.json().occupation.id).toBe(mockRequest.occupation.id);

                        connection.mockRespond(new Response(
                            new ResponseOptions({body: mockResponse})
                        ));
                    });


                apiService.addUser(new User(mockRequest));
            })
        ));
    });
});
