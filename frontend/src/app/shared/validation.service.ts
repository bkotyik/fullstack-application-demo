import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {Response} from '@angular/http';
import {Validators} from '@angular/forms';
import {MinAgeValidator} from '../shared/validators';
import ApiService from './api.service';

@Injectable()
export default class ValidationService {
    knownValidators = {
        presence: () => Validators.required,
        minAge: MinAgeValidator,
        regex: Validators.pattern
    };

    constructor(private apiService: ApiService) {
    }

    getUserValidators(): Observable<{key: string, value: Array<string>}> {
        let obs: Observable<{key: string, value: Array<string>}> = new Observable<{key: string, value: Array<string>}>(
            (subscriber: Subscriber<{key: string, value: Array<string>}>) => {
                this.apiService.getUserMetadata()
                    .subscribe(
                        (response: Response) => {
                            let metadata: any = response.json();
                            let rules: any = {};
                            metadata.forEach((item: any) => rules[item.key] = this.translateValidators(item.schema));
                            subscriber.next(rules);
                        },
                        (error: any) => {
                            subscriber.error(error);
                        }
                    );
            }
        );
        return obs;
    }

    private translateValidators(schema: any) {
        let validators = [];
        if (schema != null && schema._flags != null) {
            let flags = Object.keys(schema._flags)
                .filter((name) => this.knownValidators[name] != null)
                .map((name) => this.knownValidators[name](schema._flags[name]));
            validators = [...validators, ...flags];
        }

        if (schema != null && schema._tests != null) {
            let tests = schema._tests
                .filter((test: any) => this.knownValidators[test.name] != null)
                .map((test) => {
                    // TODO: Ensure in a more elegant way that PatternValidator receives the regex in the expected format
                    return this.knownValidators[test.name](test.arg.toString().substring(1,test.arg.length - 3));
                });
            validators = [...validators, ...tests];
        }
        return validators;
    }
}
