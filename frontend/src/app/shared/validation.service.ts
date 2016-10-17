import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {Response} from '@angular/http';
import {Validators} from '@angular/forms';
import {MinAgeValidator} from '../shared/validators';
import {ApiService} from './api.service';

/**
 * Handles the creation of Angular Validators based on metadata from backend
 */
@Injectable()
export class ValidationService {
    /**
     * List of known validators. This list should be in sync with validators that are used on the backend.
     * @type {{presence: (()=>(control:AbstractControl)=>{}); minAge: ((value:number)=>(control:AbstractControl)=>{}); regex: ((pattern:string)=>ValidatorFn)}}
     */
    knownValidators = {
        presence: () => Validators.required,
        minAge: MinAgeValidator,
        regex: Validators.pattern
    };

    constructor(private apiService: ApiService) {
    }

    /**
     * Returns a {modelName: [validators]} touples that are defined by the backend.
     * @returns {Observable<{key: string, value: Array<string>}>}
     */
    getUserValidators(): Observable<{key: string, value: Array<string>}> {
        // Wrap logic into an observable to follow the rx pattern
        let obs: Observable<{key: string, value: Array<string>}> = new Observable<{key: string, value: Array<string>}>(
            (subscriber: Subscriber<{key: string, value: Array<string>}>) => {
                // get the user model metadata from the backend
                this.apiService.getUserMetadata()
                    .subscribe(
                        (response: Response) => {
                            let metadata: any = response.json();
                            let rules: any = {};
                            // process metadata
                            metadata.forEach((item: any) => rules[item.key] = this.translateValidators(item.schema));
                            // push to the subscriber
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

    /**
     * Formats regular expression that comes from backend
     * Due to the serialization of the regex it contains starting and ending slashes and flags
     * We need to strip them downm to be able to feed Angular Validator with it.
     * @param unformatted
     * @returns {any}
     */
    private formatRegex(unformatted: any) {
        let formatted = unformatted.toString();
        if (formatted.startsWith('/')) {
            let lastSlash = formatted.lastIndexOf('/');
            formatted = formatted.substring(1, lastSlash);
        }
        return formatted;
    }

    /**
     *
     * @param schema
     * @returns {Array}
     */
    private translateValidators(schema: any) {
        let validators = [];
        // Get flags that are associated to a model property, for example presence: required
        if (schema != null && schema._flags != null) {
            let flags = Object.keys(schema._flags)
                .filter((name) => this.knownValidators[name] != null)
                .map((name) => this.knownValidators[name](schema._flags[name]));
            validators = [...validators, ...flags];
        }
        // Get tests that are associated to a model property for example pattern validation
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
