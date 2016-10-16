import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import ValidationService from '../shared/validation.service';
import ApiService from '../shared/api.service';
import User from '../shared/models/user.model';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private occupations = [];
    form: FormGroup = null;

    constructor(private formBuilder: FormBuilder,
                private validationService: ValidationService,
                private apiService: ApiService) {
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

    onFormSubmit($event) {
        this.apiService.addUser(new User(this.form.value))
            .subscribe(
                (response) => console.log(response.json()),
                (error) => console.log(error.json())
            );
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : this.occupations.filter(v => new RegExp(term, 'gi').test(v.name)).map(v => v.name).splice(0, 10));


}
