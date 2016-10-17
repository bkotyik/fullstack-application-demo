import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import User from './models/user.model';
import Occupation from './models/occupation.model';

@Injectable()
export class ApiService {
    config: any = null;

    constructor(private http: Http) {
        this.parseConfig();
    }

    private parseConfig() {
        let configString = sessionStorage.getItem('AppConfig');
        if (configString != null) {
            try {
                this.config = JSON.parse(sessionStorage.getItem('AppConfig'));
            } catch (error) {

            }
        } else {
            this.config = {
                BACKEND_URL: 'http://localhost:3000'
            };
        }
    }

    getOccupations(): Observable<Array<Occupation>> {
        let obs = new Observable<Array<Occupation>>(
            (subscriber) => {
                this.http.get(`${this.config.BACKEND_URL}/occupations`)
                    .share()
                    .subscribe(
                        (response) => subscriber.next(response.json().map(occupation => new Occupation(occupation))),
                        (error) => subscriber.error({message: 'Error loading occupations'})
                    );
            }
        );
        return obs;
    }

    getUserMetadata(): Observable<Response> {
        return this.http.get(`${this.config.BACKEND_URL}/users/metadata`).share();
    }

    addUser(user: User): Observable<Response> {
        return this.http.post(`${this.config.BACKEND_URL}/users`, user.toDTO()).share();
    }

}
