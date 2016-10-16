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
        minAge: MinAgeValidator
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
                            metadata.forEach((item: any) =>  rules[item.key] = this.translateValidators(item.schema));
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
        if (schema != null && schema._flags != null) {
            return Object.keys(schema._flags)
                .filter((name) => this.knownValidators[name] != null)
                .map((name) => this.knownValidators[name](schema._flags[name]));
        }
    }
}
