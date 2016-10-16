import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidationService} from '../shared/validation.service';
import {ApiService} from '../shared/api.service';
import User from '../shared/models/user.model';
import {Router} from "@angular/router";
import Occupation from "../shared/models/occupation.model";

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private occupations: Array<Occupation> = [];
    form: FormGroup = null;

    constructor(private formBuilder: FormBuilder,
                private validationService: ValidationService,
                private apiService: ApiService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.validationService.getUserValidators()
            .subscribe(
                (validators) => this.createForm(validators),
                (error) => this.createForm()
            );

        this.apiService.getOccupations().subscribe((occupations) => {
            this.occupations = occupations;
        });
    }


    private createForm(validators?: {key: string, value: Validators[]}) {
        if (validators != null) {
            this.form = this.formBuilder.group({
                name: new FormControl('', validators['name'] || []),
                email: new FormControl('', validators['email'] || []),
                birthday: new FormControl('', validators['birthday'] || []),
                occupation: new FormControl('', validators['occupation'] || [])
            });
        }
    }

    occupationFormatter(occupation: Occupation): string {
        return occupation.Name;
    }

    onFormSubmit($event) {
        // TODO: Select Occupation from the occupations list and attach to the user
        this.apiService.addUser(new User(this.form.value))
            .subscribe(
                (response) => {
                    this.router.navigate(['thankyou']);
                },
                (error) => console.log(error.json())
            );
    }

    /**
     * Workaround for a bug in ng-bootstrap: Typeahead is not clearable.
     * Refs: https://github.com/ng-bootstrap/ng-bootstrap/issues/829
     * @param $event
     */
    clearOccupationIfEmpty($event) {
        if ($event.target.value == "") {
            this.form.patchValue({occupation: ''});
        }
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 1 ? []
                : this.occupations.filter(v => new RegExp(term, 'gi').test(v.Name)).splice(0, 10));


}
