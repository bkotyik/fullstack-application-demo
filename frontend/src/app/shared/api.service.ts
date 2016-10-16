import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export default class ValidationService {
    config: any = null;

    constructor(private http: Http) {
        try {
            this.config = JSON.parse(sessionStorage.getItem('AppConfig'));
        } catch (error: any) {

        }
    }

    getOccupations(): Observable<[{id: number, name: string, description: string}]> {
        let obs = new Observable<[{id: number, name: string, description: string}]>(
            (subscriber) => {
                this.http.get(`${this.config.BACKEND_URL}/occupations`)
                    .share()
                    .subscribe(
                        (response) => subscriber.next(response.json()),
                        (error) => subscriber.error({message: 'Error loading occupations'})
                    );
            }
        );
        return obs;
    }

}
