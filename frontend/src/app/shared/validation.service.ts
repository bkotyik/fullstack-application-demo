import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {Response} from '@angular/http';
import {Validators} from '@angular/forms';
import {MinAgeValidator} from '../shared/validators';
import {ApiService} from './api.service';

@Injectable()
export class ValidationService {
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

    private formatRegex(unformatted: any) {
        let formatted = unformatted.toString();
        if (formatted.startsWith('/')) {
            let lastSlash = formatted.lastIndexOf('/');
            formatted = formatted.substring(1, lastSlash);
        }
        console.log(formatted);
        return formatted;
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
                .filter((test: any) => test.name === 'regex')
                .map((test) => {
                    return this.knownValidators[test.name](this.formatRegex(test.arg));
                });
            validators = [...validators, ...tests];
        }
        return validators;
    }
}
