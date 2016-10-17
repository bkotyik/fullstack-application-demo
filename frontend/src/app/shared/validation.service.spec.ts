import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {ValidationService} from './validation.service';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Response} from '@angular/http';
import {Validators} from '@angular/forms';
import {MinAgeValidator} from './validators/index';

/* tslint:disable:quotemark */
let fakeSchema = [{
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

let apiServiceStub = {
    getUserMetadata: function () {
        let obs = new Observable<Response>(
            (subscriber) => subscriber.next({json: () => fakeSchema})
        );
        return obs;
    }
};


describe("Service: ValidationService", function () {
    describe("getUserValidators", function () {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [],
                providers: [
                    {
                        provide: ApiService,
                        useValue: apiServiceStub
                    },
                    ValidationService
                ]
            });
        });

        it("creates the corresponding angular validators", inject([ValidationService], fakeAsync(function (validationService: ValidationService) {
            validationService.getUserValidators()
                .subscribe(
                    (validators: any) => {
                        console.dir(validators.birthday);
                        expect(validators.name).toBeDefined;
                        expect(validators.email).toBeDefined;
                        expect(validators.birthday).toBeDefined;
                        expect(validators.occupation).not.toBeDefined;

                        expect(validators.name.length).toEqual(1);
                        expect(validators.name[0]).toBe(Validators.required);

                        expect(validators.birthday.length).toEqual(1);

                        expect(validators.email.length).toEqual(2);
                        expect(validators.email[0]).toBe(Validators.required);

                    }
                );
        })));
    });
});
