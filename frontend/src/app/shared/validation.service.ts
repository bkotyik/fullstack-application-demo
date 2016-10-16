import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {Http, Response} from '@angular/http';
import {Validators} from '@angular/forms';

@Injectable()
export default class ValidationService {
    config: any = null;
    knownValidators = {
        presence: () => Validators.required
    };

    constructor(private http: Http) {
        try {
            this.config = JSON.parse(sessionStorage.getItem("AppConfig"));
        }
        catch (error: any) {

        }
    }

    getUserValidators(): Observable<{key: string, value: Array<string>}> {
        let obs: Observable<{key: string, value: Array<string>}> = new Observable<{key: string, value: Array<string>}>(
            (subscriber: Subscriber<{key: string, value: Array<string>}>) => {
                this.http.get(`${this.config.BACKEND_URL}/users/meta`)
                    .subscribe(
                        (response: Response) => {
                            let metadata: any = response.json();
                            let rules: any = {};
                            metadata.forEach((item: any) => {
                                rules[item.key] = this.translateValidators(item.schema)
                            });
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
            return Object.keys(schema._flags).map( (name) =>  this.knownValidators[name](schema._flags[name]));
        }
    }
}
