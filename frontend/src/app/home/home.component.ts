import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import ValidationService from '../shared/validation.service';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    private occupations = [];
    form: FormGroup = null;

    constructor(private formBuilder: FormBuilder,
                private validationService: ValidationService) {
    }

    ngOnInit(): void {
        this.validationService.getUserValidators()
            .subscribe(
                (validators) => this.createForm(validators),
                (error) => this.createForm()
            );
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

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : this.occupations.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));


}
