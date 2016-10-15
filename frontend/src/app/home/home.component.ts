import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private occupations = [];

    form: FormGroup = null;

    constructor(private formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            birthday: new FormControl('', []),
            occupation: new FormControl('', [])
        });
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : this.occupations.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));


}
