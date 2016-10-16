import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import ValidationService from '../shared/validation.service';
import ApiService from '../shared/api.service';

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

    private getValidatorErrorMessage(validatorName: string, validationResult: any) {
        let message: string = null;
        switch (validatorName) {
            case 'required':
                message = `This field is required.`;
                break;
            case 'minAge':
                message = `You must be at least ${validationResult.value} years old.`;
                break;
            default:
                message = `This field is invalid.`;
                break;
        }
        return message;
    }


    private getValidationMessages(name: string) {
        let messages = [];
        if (this.form.controls[name] != null
            && this.form.controls[name].errors != null) {
            let validationErrors = Object.keys(this.form.controls[name].errors);
            for (let validatorName of validationErrors) {
                messages.push(this.getValidatorErrorMessage(validatorName, this.form.controls[name].errors[validatorName]));
            }
        }
        return messages.join('\n');
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : this.occupations.filter(v => new RegExp(term, 'gi').test(v.name)).map(v => v.name).splice(0, 10));


}
