import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import User from './models/user.model';
import Occupation from './models/occupation.model';

/**
 * Maps each http endpoint to one service method.
 * Basically a communication layer between the components and the backend
 */
@Injectable()
export class ApiService {
    config: any = null;

    constructor(private http: Http) {
        this.parseConfig();
    }

    /**
     * Parses frontend configuration data
     */
    private parseConfig() {
        let configString = sessionStorage.getItem('AppConfig');
        if (configString != null) {
            try {
                this.config = JSON.parse(sessionStorage.getItem('AppConfig'));
            } catch (error) {

            }
        } else {
            // fallback if no or invalid config found
            this.config = {
                BACKEND_URL: 'http://localhost:3000'
            };
        }
    }

    /**
     * Returns occupations that are stored on the backend
     * @returns {Observable<Array<Occupation>>|"../../Observable".Observable<Array<Occupation>>|"../../../Observable".Observable<Array<Occupation>>}
     */
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

    /**
     * Returns User model metadata
     * @returns {Observable<Response>}
     */
    getUserMetadata(): Observable<Response> {
        return this.http.get(`${this.config.BACKEND_URL}/users/metadata`).share();
    }

    /**
     * Submits a User form to the backend
     * @param user
     * @returns {Observable<Response>}
     */
    addUser(user: User): Observable<Response> {
        return this.http.post(`${this.config.BACKEND_URL}/users`, user.toDTO()).share();
    }

}
